const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Campus Hub API Gateway is active (DB pending)'
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});