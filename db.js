// set up the database for users
require('dotenv').config()
const mongoose = require('mongoose')

const newdb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }

    const db = mongoose.connection;
    db.on('error', (error) => console.error('Database error:', error));

    // Optional: Close the connection when the Node.js process ends
    /*process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Database connection closed due to application termination');
        process.exit(0);
    });*/
};

module.exports = newdb