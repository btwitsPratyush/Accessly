const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const promoteUser = async () => {
    try {
        await connectDB();

        // Find user by email partial match (pratyush or 225uit)
        const user = await User.findOne({
            $or: [
                { email: { $regex: 'pratyush', $options: 'i' } },
                { email: { $regex: '225uit', $options: 'i' } }
            ]
        });

        if (!user) {
            console.log('❌ User not found!');
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`✅ Promoted ${user.name} (${user.email}) to ADMIN!`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

promoteUser();
