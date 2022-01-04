const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DIALECT} = process.env

module.exports = {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,       
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
}