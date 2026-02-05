require('dotenv').config();
const mysql = require('mysql2');

// Connection pool configuration with reconnection handling
const connectionConfig = {
    host: process.env.dbHost,
    database: process.env.dbName,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    multipleStatements: true,
    connectionLimit: 30,
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
};

const pool = mysql.createPool(connectionConfig);

// Handle connection errors at the pool level
pool.on('error', (err) => {
    console.error('Database pool error:', err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection lost. Pool will automatically reconnect.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
        console.error('Database connection refused.');
    } else {
        console.error('Unexpected database error:', err);
    }
});

// Wrapper function for queries with automatic retry
function queryWithRetry(sql, params, callback, retries = 3) {
    pool.query(sql, params, (err, results) => {
        if (err) {
            if (retries > 0 && (err.code === 'PROTOCOL_CONNECTION_LOST' ||
                                 err.code === 'ECONNRESET' ||
                                 err.code === 'ETIMEDOUT')) {
                console.log(`Query failed, retrying... (${retries} attempts left)`);
                setTimeout(() => {
                    queryWithRetry(sql, params, callback, retries - 1);
                }, 1000);
            } else {
                callback(err, null);
            }
        } else {
            callback(null, results);
        }
    });
}

// Test initial connection
pool.query('SELECT 1', (error) => {
    if (error) {
        console.error('Error connecting to the database:', error.message);
    } else {
        console.log('Connected to database!');
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing database pool:', err);
        } else {
            console.log('Database pool closed.');
        }
        process.exit(err ? 1 : 0);
    });
});

module.exports = pool;
module.exports.queryWithRetry = queryWithRetry;
