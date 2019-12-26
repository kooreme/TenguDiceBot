/* eslint-disable no-undef */
const { Pool } = require('pg');

const pgPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432,
    max: 20,
});

let instance 

exports.connect = function() {
    pgPool.connect();
}

