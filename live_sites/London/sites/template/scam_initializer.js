import scamEngine from './scam_engine.js';

async function initializeScams() {
    try {
        console.log('🚀 ScamEngine: Deploying Scams to Frontend');
        const deployedScams = await scamEngine.deployScamsToFrontend();
        
        console.log('Deployed Scams:', deployedScams);
    } catch (error) {
        console.error('❌ Scam Deployment Error:', error);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeScams);
