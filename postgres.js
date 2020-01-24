/* eslint-disable no-undef */
const { Client } = require('pg');

const pgClient = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432,
});

exports.connect = function() {
    pgClient.connect();
}

