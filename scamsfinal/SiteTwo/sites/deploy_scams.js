import scamEngine from './scam_engine.js';

async function initializeScams() {
    try {
        // Deploy scams to frontend
        console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ScamEngine: Deploying Scams to Frontend');
        const deployedScams = await scamEngine.deployScamsToFrontend();
        
        console.log('Deployed Scams:', deployedScams);

        // Optional: Clear scams after some time
        setTimeout(() => {
            scamEngine.clearDeployedScams(deployedScams);
            console.log('Cleared deployed scams');
        }, 30000);  // Clear after 30 seconds
    } catch (error) {
        console.error('Error deploying scams:', error);
    } finally {
        // Close database connection
        scamEngine.close();
    }
}

// Run initialization
initializeScams();
