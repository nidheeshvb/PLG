// Local development database: starts a real PostgreSQL server from node_modules
// (no install or Docker needed). Data lives in web/.postgres. Stop with Ctrl+C.
//
// Staging/production use a normal Postgres: just set DATABASE_URL.
import EmbeddedPostgres from 'embedded-postgres'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

console.log(`PostgreSQL ready: postgres://postgres:postgres@127.0.0.1:${port}/${database}`)

const stop = async () => {
  await pg.stop()
  process.exit(0)
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
setInterval(() => {}, 1 << 30)
