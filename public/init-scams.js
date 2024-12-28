// Import ScamManager
import { ScamManager } from '/attacks/scam_manager.js';

// Export initialization function
export function initScamSystem(siteId, seed = null) {
    // Create containers if they don't exist
    const containers = ['popup-container', 'notification-container', 'banner-container'];
    containers.forEach(id => {
        if (!document.getElementById(id)) {
            const container = document.createElement('div');
            container.id = id;
            document.body.appendChild(container);
        }
    });

    // Initialize ScamManager
    window.scamManager = new ScamManager(siteId, seed);
    window.scamManager.start().catch(console.error);
}

// Helper functions for debugging
window.debugScams = {
    // Show current active scams
    showActive: () => {
        if (!window.scamManager) return console.log('Scam manager not initialized');
        console.log('Active Scams:', Object.fromEntries(window.scamManager.activeScams));
    },

    // Force update
    forceUpdate: () => {
        if (!window.scamManager) return console.log('Scam manager not initialized');
        window.scamManager.lastUpdate = 0;
        window.scamManager.updateScams();
    },

    // Stop all scams
    stopAll: () => {
        if (!window.scamManager) return console.log('Scam manager not initialized');
        window.scamManager.stop();
    },

    // Change update interval (in milliseconds)
    setInterval: (ms) => {
        if (!window.scamManager) return console.log('Scam manager not initialized');
        window.scamManager.updateInterval = ms;
    }
};
