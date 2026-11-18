// Local development database: starts a real PostgreSQL server from node_modules
// (no install or Docker needed). Data lives in web/.postgres. Stop with Ctrl+C.
//
// Staging/production use a normal Postgres: just set DATABASE_URL (the database must be UTF-8).
import EmbeddedPostgres from 'embedded-postgres'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pgPkg from 'pg'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const databaseDir = path.join(root, '.postgres')
const port = Number(process.env.PG_PORT ?? 5433)
const database = process.env.PG_DATABASE ?? 'plg'

const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'postgres',
  password: 'postgres',
  port,
  persistent: true,
  // UTF-8 always: without it, initdb takes the Windows code page (WIN1252) and Arabic text or emoji can't be saved.
  initdbFlags: ['--encoding=UTF8', '--locale=C'],
  onLog: () => {},
})

if (!existsSync(path.join(databaseDir, 'PG_VERSION'))) {
  console.log('Creating local database cluster in .postgres …')
  await pg.initialise()
}

await pg.start()
try {
  await pg.createDatabase(database)
  console.log(`Created database "${database}".`)
} catch {
  // already exists
}

// Warn about clusters created before UTF-8 was enforced (they keep their original encoding).
try {
  const client = new pgPkg.Client({ connectionString: `postgres://postgres:postgres@127.0.0.1:${port}/${database}` })
  await client.connect()
  const { rows } = await client.query('SHOW server_encoding')
  await client.end()
  if (rows[0].server_encoding !== 'UTF8') {
    console.warn(
      `\n⚠ This local database uses ${rows[0].server_encoding}, not UTF-8: Arabic text and emoji can't be saved.\n` +
        '  Stop this (Ctrl+C) and the dev server, then run "npm run db:utf8" to convert it (content is kept).\n',
    )
  }
} catch {
  // the check is only a hint
}

console.log(`PostgreSQL ready: postgres://postgres:postgres@127.0.0.1:${port}/${database}`)

const stop = async () => {
  await pg.stop()
  process.exit(0)
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
setInterval(() => {}, 1 << 30)
