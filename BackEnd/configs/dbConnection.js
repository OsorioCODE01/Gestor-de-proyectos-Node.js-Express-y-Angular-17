const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to database');
    } else {
        console.log('Database connected');
    }
});

process.on('SIGINT', () => {
    connection.end(() => {
        console.log('Database disconnected');
        process.exit(0);
    });
});

module.exports = connection;