require('dotenv').config();
const {createPool} = require('mysql');

const connection = createPool({
    host: process.env.dbHost,
    database: process.env.dbName,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    multipleStatements: true,
    connectionLimit: 30
})

connection.query('SELECT 1', (error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to database!');
    }
});

module.exports = connection