import 'dotenv/config'

const requiredEnvVars = [
  'KOA_KEYS',
  'DATABASE_URL'
]

for (const name of requiredEnvVars) {
  if (!process.env[name]) {
    throw new Error(`Missing environment var "${name}"`)
  }
}

export default {
  db: {
    url: process.env.DATABASE_URL,
  },
  koa: {
    keys: process.env.KOA_KEYS!.split(','),
  }
}