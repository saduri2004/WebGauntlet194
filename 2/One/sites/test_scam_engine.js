const assert = require('assert');
const { ScamEngine } = require('./scam_engine.js');

// Test cases
async function runTests() {
    console.log('Running ScamEngine getSiteId() tests...');

    // Test 1: Environment variable takes precedence
    process.env.SITE_ID = '1';
    const engineEnv = new ScamEngine();
    
    try {
        const a = await engineEnv.deployScamsToPage();
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the tests
runTests();
