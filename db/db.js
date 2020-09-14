const {Client}  = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'northwind'
});

module.exports = client;



