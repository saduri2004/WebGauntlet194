const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/ecommerce.db'));

// Get available scams for a site
router.get('/available/:siteId', async (req, res) => {
    const { siteId } = req.params;
    
    try {
        // Get site's difficulty level
        const site = await new Promise((resolve, reject) => {
            db.get('SELECT scam_difficulty FROM sites WHERE site_id = ?', [siteId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!site) {
            return res.status(404).json({ error: 'Site not found' });
        }

        // Get available scams and their counts
        const [scams, categories] = await Promise.all([
            // Get all available scams
            new Promise((resolve, reject) => {
                db.all(`
                    SELECT s.*, ls.num_active
                    FROM scams s
                    JOIN level_scams ls ON s.category = ls.category
                    WHERE ls.level_id = ? AND s.min_level <= ?
                    ORDER BY s.category, s.scam_type
                `, [site.scam_difficulty, site.scam_difficulty], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            }),
            // Get category counts
            new Promise((resolve, reject) => {
                db.all(`
                    SELECT category, num_active
                    FROM level_scams
                    WHERE level_id = ?
                `, [site.scam_difficulty], (err, rows) => {
                    if (err) reject(err);
                    else {
                        const categoryMap = {};
                        rows.forEach(row => {
                            categoryMap[row.category] = row.num_active;
                        });
                        resolve(categoryMap);
                    }
                });
            })
        ]);

        res.json({
            scams,
            categories,
            siteLevel: site.scam_difficulty
        });
    } catch (error) {
        console.error('Error fetching scams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
