import { makeDb } from '../src/adapters/data-access'

;(async function setupDb () {
  console.log('Setting up database...')

  const db = await makeDb()
  const result = await db;

  console.log(result)
  console.log('Database setup complete...')
  process.exit()
})()
