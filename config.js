const dotenv = require('dotenv')

dotenv.config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:
${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
})

const cloudinaySetup = {
    cloud_name: "samspecial",
    API_Key: 416273491525724,
    API_Secret: "HD-1mVldft0xey1oP5kbF290z-M"
}
console.log(pool)
console.log(connectionString)

module.exports = { pool }