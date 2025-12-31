const User = require('../models/User');

// @desc    Update user details
// @route   PUT /api/users/profile
// @access  Private
exports.updateDetails = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update password
// @route   PUT /api/users/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        if (!(await user.matchPassword(req.body.currentPassword))) {
            return res.status(401).json({ success: false, error: 'Incorrect current password' });
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Password updated successfully'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
