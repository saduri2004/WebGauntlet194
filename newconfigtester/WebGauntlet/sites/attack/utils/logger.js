// logger.js - Simple logging utility for scam attacks

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../scams.log');

function logScamAttempt(type, source, component) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] TYPE: ${type} | SOURCE: ${source} | COMPONENT: ${component}\n`;
    
    fs.appendFileSync(LOG_FILE, logEntry);
    console.log('Logged scam attempt:', logEntry.trim());
}

module.exports = {
    logScamAttempt
};
