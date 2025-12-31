const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const forcePromote = async () => {
    try {
        await connectDB();

        const email = 'pratyushk537@gmail.com'; // User from screenshot

        // Use updateOne to bypass 'pre save' hooks entirely
        const res = await User.updateOne(
            { email: email },
            { $set: { role: 'admin' } }
        );

        if (res.matchedCount === 0) {
            console.log('❌ User not found!');
        } else {
            console.log(`✅ FORCED promotion for ${email}. Modified: ${res.modifiedCount}`);
        }

        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

forcePromote();
