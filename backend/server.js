const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gigs', require('./routes/gigRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Campus Hub API Gateway is active' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));