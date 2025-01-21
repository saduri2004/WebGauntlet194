const express = require('express');
const cors = require('cors');
const { logScamAttempt } = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to log scam attempts
app.post('/log-scam', (req, res) => {
    const { type, source, component } = req.body;
    logScamAttempt(type, source, component);
    res.json({ success: true });
});

// Serve static files
app.use(express.static(__dirname));

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Scam logging server running on port ${PORT}`);
});
