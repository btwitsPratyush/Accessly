const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ email: 'admin@demo.com' });
        if (adminExists) {
            console.log('⚠️  Admin user exists. Deleting to ensure fresh password...');
            await User.findOneAndDelete({ email: 'admin@demo.com' });
        }

        const user = await User.create({
            name: 'Super Admin',
            email: 'admin@demo.com',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'admin'
        });

        console.log(`✅ Admin User Created: ${user.email} / password123`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
