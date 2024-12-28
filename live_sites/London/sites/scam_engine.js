import { createNotification } from '../../attacks/notifications/notification_base.js';

// Simulated database connection for web
class ScamDatabase {
    constructor(dbPath = '/database/ecommerce.db') {
        console.log(`🔍 Initializing ScamDatabase with path: ${dbPath}`);
        this.scams = [];
    }

    // Fetch scams based on various criteria
    async getScams(filters = {}) {
        console.log('🕵️ Fetching scams with filters:', JSON.stringify(filters));
        
        try {
            // Convert filters to query parameters
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                queryParams.append(key, value);
            });

            // Fetch scams from the server
            const response = await fetch(`/api/scams?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const scams = await response.json();
            console.log(`🔍 Found ${scams.length} scam(s)`);
            return scams;
        } catch (error) {
            console.error('❌ Error fetching scams:', error);
            return [];
        }
    }

    // Close database connection (no-op for web)
    close() {
        console.log('🚪 Closing database connection...');
    }
}

// Scam Engine class to manage scam detection and notification
export class ScamEngine {
    constructor() {
        console.log('🚀 Initializing ScamEngine...');
        this.db = new ScamDatabase();
    }

    // Detect and notify about potential scams
    async detectScams() {
        console.log('🕵️‍♀️ Starting scam detection process...');
        try {
            // Fetch all scams
            const scams = await this.db.getScams();

            if (scams.length === 0) {
                console.log('🟢 No scams detected.');
                return;
            }

            scams.forEach((scam, index) => {
                console.log(`🚨 Scam ${index + 1} detected:`, scam);
                this.notifyScam(scam);
            });
        } catch (error) {
            console.error('❌ Scam detection failed:', error);
            this.createNotification({
                title: 'Scam Detection Error',
                message: 'Unable to check for potential scams',
                type: 'error'
            });
        }
    }

    // Manually print scams
    async printScams(filters = {}) {
        console.log('📋 Manually printing scams...');
        try {
            const scams = await this.db.getScams(filters);
            console.log('🔍 Detected Scams:');
            console.table(scams);
            return scams;
        } catch (error) {
            console.error('❌ Error printing scams:', error);
            return [];
        }
    }

    // Method to manually trigger scam detection and logging
    async manualScanAndLog(filters = {}) {
        console.log('🚨 Starting manual scam scan and log...');
        try {
            const scams = await this.db.getScams(filters);
            
            console.log('🔍 Scam Scan Results:');
            console.table(scams);

            if (scams.length === 0) {
                console.log('🟢 No scams found during manual scan.');
                return [];
            }

            // Optionally notify for each scam
            scams.forEach((scam, index) => {
                console.log(`🚨 Processing scam ${index + 1}:`, scam);
                this.notifyScam(scam);
            });

            return scams;
        } catch (error) {
            console.error('❌ Manual scam scan failed:', error);
            return [];
        }
    }

    // Create a notification for a specific scam
    notifyScam(scam) {
        console.log('📣 Creating notification for scam:', scam);
        this.createNotification({
            title: `Scam Detected: ${scam.scam_type}`,
            message: scam.description || 'Potential scam activity detected',
            type: 'warning',
            duration: 10000,
            onProceed: () => {
                console.log(`🔍 Proceeding with scam investigation:`, scam);
            }
        });
    }

    // Create notification (fallback method)
    createNotification(options) {
        // Check if createNotification is available globally or imported
        if (typeof createNotification === 'function') {
            createNotification(options);
        } else {
            console.warn('Notification function not available', options);
        }
    }

    // Simulate real-time scam monitoring
    startMonitoring(interval = 60000) {  // Default: check every minute
        console.log(`🕰️ Starting scam monitoring with interval ${interval}ms...`);
        this.monitorInterval = setInterval(() => {
            console.log('⏰ Periodic scam check triggered');
            this.detectScams();
        }, interval);
    }

    stopMonitoring() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            console.log('🛑 Scam monitoring stopped.');
        }
        this.db.close();
    }
}

// Optional: Automatically start monitoring when module is imported
const scamEngine = new ScamEngine();
scamEngine.startMonitoring();

export default scamEngine;
