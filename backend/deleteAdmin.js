const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const deleteSeededAdmin = async () => {
    try {
        await connectDB();

        // Delete the hardcoded demo admin
        const res = await User.deleteOne({ email: 'admin@demo.com' });

        if (res.deletedCount > 0) {
            console.log('✅ Default "Super Admin" (admin@demo.com) has been removed.');
        } else {
            console.log('ℹ️ Default admin was not found (already deleted).');
        }

        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

deleteSeededAdmin();
