const Sequelize = require('sequelize');
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DIALECT} = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});
// test connection
async function testDB (){
    try {
        await sequelize.authenticate();
         console.log('Connection has been established successfully.');
       } catch (error) {
         console.error('Unable to connect to the database:', error);
       }
}
testDB();



module.exports = sequelize;
