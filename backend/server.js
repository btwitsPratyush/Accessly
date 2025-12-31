const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logger

// Routes
const auth = require('./routes/authRoutes');
const users = require('./routes/userRoutes');
const admin = require('./routes/adminRoutes');

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/admin', admin);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
