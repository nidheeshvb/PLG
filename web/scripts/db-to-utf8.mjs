// One-off: converts an existing local database (web/.postgres) to UTF-8, keeping all content.
// Clusters created before UTF-8 was enforced use the Windows code page (WIN1252), so Arabic text and emoji
// can't be saved. Run with the database and dev server STOPPED:  npm run db:utf8
//
// How: start the old cluster and a new UTF-8 cluster side by side, build the schema on the new one with
// `payload migrate` (identical to the development schema), copy every table (PostgreSQL converts the text
// as it reads), reset the id counters, check the row counts, then swap the folders. The old folder is kept
// as .postgres-old-<date> until you delete it.
import EmbeddedPostgres from 'embedded-postgres'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, renameSync, rmSync } from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pgPkg from 'pg'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// PG_DATA_DIR: convert another cluster folder (used to test this script on a copy)
const oldDir = process.env.PG_DATA_DIR ? path.resolve(process.env.PG_DATA_DIR) : path.join(root, '.postgres')
const newDir = oldDir + '-utf8'
const database = process.env.PG_DATABASE ?? 'plg'
const OLD_PORT = 5436
const NEW_PORT = 5437
const url = (port) => `postgres://postgres:postgres@127.0.0.1:${port}/${database}`
const fail = (msg) => {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}

if (!existsSync(path.join(oldDir, 'PG_VERSION'))) fail('No local database in web/.postgres: nothing to convert (npm run db creates a UTF-8 one).')
// a postmaster.pid can be left behind by a crash: only refuse if a server really answers on its port
const pidFile = path.join(oldDir, 'postmaster.pid')
if (existsSync(pidFile)) {
  const pidPort = Number(readFileSync(pidFile, 'utf8').split(/\r?\n/)[3])
  const running = await new Promise((resolve) => {
    const s = net.connect({ host: '127.0.0.1', port: pidPort || 5433 }, () => (s.destroy(), resolve(true)))
    s.on('error', () => resolve(false))
  })
  if (running) fail('The local database is running. Stop "npm run db" and the dev server first.')
  rmSync(pidFile)
}

const common = { user: 'postgres', password: 'postgres', persistent: true, onLog: () => {} }
const oldPg = new EmbeddedPostgres({ ...common, databaseDir: oldDir, port: OLD_PORT })
await oldPg.start()
const src = new pgPkg.Client({ connectionString: url(OLD_PORT) })
src.on('error', () => {}) // the server is stopped at the end; don't crash on the closed connection
await src.connect()
let dst = null
const enc = (await src.query('SHOW server_encoding')).rows[0].server_encoding
if (enc === 'UTF8') {
  await src.end()
  await oldPg.stop()
  console.log('The local database is already UTF-8: nothing to do.')
  process.exit(0)
}
console.log(`Local database is ${enc}. Creating a UTF-8 copy …`)

if (existsSync(newDir)) rmSync(newDir, { recursive: true, force: true })
const newPg = new EmbeddedPostgres({ ...common, databaseDir: newDir, port: NEW_PORT, initdbFlags: ['--encoding=UTF8', '--locale=C'] })
let ok = false
try {
  await newPg.initialise()
  await newPg.start()
  await newPg.createDatabase(database)

  console.log('Building the schema with the migrations …')
  const mig = spawnSync('npx', ['payload', 'migrate'], {
    cwd: root,
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: url(NEW_PORT), NODE_ENV: 'production', NODE_OPTIONS: '--no-deprecation' },
  })
  if (mig.status !== 0) throw new Error('payload migrate failed on the new database')

  dst = new pgPkg.Client({ connectionString: url(NEW_PORT) })
  dst.on('error', () => {})
  await dst.connect()
  const cols = async (c) =>
    Object.fromEntries(
      (
        await c.query(
          `select table_name, string_agg(column_name || ':' || data_type, ',' order by column_name) cols
           from information_schema.columns where table_schema = 'public' group by table_name`,
        )
      ).rows.map((r) => [r.table_name, r.cols]),
    )
  const a = await cols(src)
  const b = await cols(dst)
  const mismatch = Object.keys(a).filter((t) => a[t] !== b[t])
  if (mismatch.length)
    throw new Error(
      `The local schema differs from the migrations in ${mismatch.length} table(s) (${mismatch.slice(0, 5).join(', ')}). ` +
        'Start the dev server once on the current code (so the schema is up to date), or create a migration first.',
    )

  const tables = Object.keys(a)
  await dst.query('BEGIN')
  await dst.query("SET LOCAL session_replication_role = 'replica'") // no FK checks while copying
  await dst.query(`TRUNCATE ${tables.map((t) => `"${t}"`).join(', ')} CASCADE`)
  let rowsCopied = 0
  for (const t of tables) {
    const { rows } = await src.query(`SELECT row_to_json(qz_row)::text AS j FROM "${t}" qz_row`)
    for (let i = 0; i < rows.length; i += 200) {
      const chunk = '[' + rows.slice(i, i + 200).map((r) => r.j).join(',') + ']'
      await dst.query(`INSERT INTO "${t}" SELECT * FROM json_populate_recordset(NULL::"${t}", $1::json)`, [chunk])
    }
    rowsCopied += rows.length
  }
  await dst.query('COMMIT')

  // id counters
  const seqs = (
    await dst.query(`SELECT s.relname seq, t.relname tbl, a.attname col FROM pg_class s
      JOIN pg_depend d ON d.objid = s.oid JOIN pg_class t ON d.refobjid = t.oid
      JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = d.refobjsubid WHERE s.relkind = 'S'`)
  ).rows
  // keep the old counter where it is higher (rows deleted earlier), so ids are never reused
  const oldSeq = Object.fromEntries((await src.query('SELECT sequencename s, last_value v FROM pg_sequences')).rows.map((r) => [r.s, r.v == null ? 0 : Number(r.v)]))
  for (const s of seqs) {
    const max = Number((await dst.query(`SELECT COALESCE(MAX("${s.col}"), 0) m FROM "${s.tbl}"`)).rows[0].m)
    const next = Math.max(max, oldSeq[s.seq] ?? 0)
    await dst.query(`SELECT setval('"${s.seq}"', $1, $2)`, [Math.max(next, 1), next > 0])
  }

  // check every table has the same number of rows
  const diff = []
  for (const t of tables) {
    const x = (await src.query(`SELECT COUNT(*)::int n FROM "${t}"`)).rows[0].n
    const y = (await dst.query(`SELECT COUNT(*)::int n FROM "${t}"`)).rows[0].n
    if (x !== y) diff.push(`${t} ${x}→${y}`)
  }
  if (diff.length) throw new Error('Row counts differ: ' + diff.join(', '))
  const newEnc = (await dst.query('SHOW server_encoding')).rows[0].server_encoding
  await dst.end()
  dst = null
  console.log(`Copied ${rowsCopied} rows in ${tables.length} tables, ${seqs.length} id counters set; new database is ${newEnc}.`)
  ok = true
} catch (err) {
  console.error('\n✖ Conversion stopped, nothing was changed:', err.message)
} finally {
  await src.end().catch(() => {})
  await dst?.end().catch(() => {})
  await oldPg.stop().catch(() => {})
  await newPg.stop().catch(() => {})
}
if (!ok) {
  rmSync(newDir, { recursive: true, force: true })
  process.exit(1)
}
const kept = `${oldDir}-old-${new Date().toISOString().slice(0, 10)}`
renameSync(oldDir, kept)
renameSync(newDir, oldDir)
console.log(`\n✔ Done. ${path.basename(oldDir)} is now UTF-8. The old database is kept in ${path.basename(kept)} (delete it when you're happy).`)
