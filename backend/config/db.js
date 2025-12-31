const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        if (!uri || uri.includes('placeholder') || uri.includes('127.0.0.1')) {
            console.log("⚠️  No valid remote MongoDB URI found. Starting In-Memory Database...");
            const mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            console.log(`⚡  In-Memory MongoDB running at: ${uri}`);
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Fallback to memory server if initial connection fails (e.g., local DB down)
        try {
            console.log("⚠️  Connection failed. Falling back to In-Memory Database...");
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`⚡  In-Memory MongoDB running at: ${uri}`);
        } catch (fallbackError) {
            console.error(`Critical DB Error: ${fallbackError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
