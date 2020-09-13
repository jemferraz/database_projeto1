const {Client}  = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'Quironmia@1208',
    host: 'localhost',
    port: 5432,
    database: 'northwind'
});

module.exports = client;



