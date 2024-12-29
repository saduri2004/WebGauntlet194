import scamEngine from './scam_engine.js';

async function testScamEngine() {
    try {
        // Get the site-scam mapping
        const siteScamMapping = await scamEngine.getSiteScamMapping();
        
        // Print the mapping
        console.log('Site-Scam Mapping:');
        console.log(JSON.stringify(siteScamMapping, null, 2));
    } catch (error) {
        console.error('Error in scam engine test:', error);
    } finally {
        // Close the database connection
        scamEngine.close();
    }
}

// Run the test
testScamEngine();
