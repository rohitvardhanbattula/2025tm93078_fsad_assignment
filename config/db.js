// config/db.js
const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.PG_URI,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log('✅ Connected to Cloud PostgreSQL'))
    .catch(err => console.error('⚠️ PostgreSQL connection failed:', err.message));

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to Cloud MongoDB');
    } catch (err) {
        console.error('⚠️ MongoDB connection failed:', err.message);
    }
};

connectMongo();

module.exports = {
    query: (text, params) => pool.query(text, params),
};