import { createNotification } from '../../attacks/notifications/notification_base.js';
import sqlite3 from 'sqlite3';

// Scam Engine class to manage scam detection and mapping
export class ScamEngine {
    constructor(dbPath = '/Users/sasankaduri/ICML/WebGauntlet/database/ecommerce.db') {
        console.log('🚀 Initializing ScamEngine...');
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection error:', err);
            } else {
                console.log('✅ Connected to the SQLite database');
            }
        });
    }

    // Promisify database queries
    _runQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // Get scams for a specific site based on site difficulty
    async getScamsForSite(siteId) {
        return new Promise((resolve, reject) => {
            // First, get the site's scam difficulty
            const siteDifficultyQuery = `
                SELECT scam_difficulty 
                FROM sites 
                WHERE site_id = ?
            `;

            this.db.get(siteDifficultyQuery, [siteId], (err, siteRow) => {
                if (err) {
                    console.error('❌ Error fetching site difficulty:', err);
                    reject(err);
                    return;
                }

                if (!siteRow) {
                    console.warn(`⚠️ No site found with ID: ${siteId}`);
                    resolve([]);
                    return;
                }

                // Get scams matching the site's difficulty
                const scamsQuery = `
                    SELECT s.* 
                    FROM scams s
                    WHERE s.difficulty <= ?
                `;

                this.db.all(scamsQuery, [siteRow.scam_difficulty], (err, scams) => {
                    if (err) {
                        console.error('❌ Error fetching scams:', err);
                        reject(err);
                        return;
                    }

                    console.log(`🕵️ Found ${scams.length} scams for site ${siteId} with difficulty <= ${siteRow.scam_difficulty}`);
                    resolve(scams);
                });
            });
        });
    }

    // Get a mapping of site IDs to their scam IDs
    // Get a mapping of site IDs to their scam tuples
async getSiteScamMapping() {
    try {
        // Fetch all sites
        const sites = await this._runQuery('SELECT * FROM sites');
        
        // Create a mapping of site IDs to scam tuples
        const siteScamMapping = {};

        // Iterate through each site
        for (const site of sites) {
            // Get scams for this site
            const siteScams = await this.getScamsForSite(site.site_id);
            
            // Store the scam tuples for this site
            siteScamMapping[site.site_id] = siteScams.map(scam => [scam.scam_name, scam.scam_id]);
        }

        return siteScamMapping;
    } catch (error) {
        console.error('❌ Error creating site-scam mapping:', error);
        return {};
    }
}
    // Detect and notify about potential scams for a site
    async detectScamsForSite(siteId) {
        try {
            const scams = await this.getScamsForSite(siteId);

            if (scams.length === 0) {
                console.log('🟢 No scams detected for this site.');
                return [];
            }

            // Notify about each scam
            scams.forEach(scam => {
                this.notifyScam(scam);
            });

            return scams;
        } catch (error) {
            console.error('❌ Scam detection failed:', error);
            return [];
        }
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

    // Close database connection
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err);
            } else {
                console.log('🚪 Database connection closed');
            }
        });
    }
}

// Export an instance of ScamEngine
const scamEngine = new ScamEngine();
export default scamEngine;
