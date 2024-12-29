function queryAndRender(siteNickname, currentPage, productId = null) {
    console.log("QUERY AND RENDER: ", siteNickname, currentPage, productId);
    
    // Determine database path - use a relative path from the current script
    const dbPath = '../../../database/ecommerce.db';
    
    // Open database connection
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Database connection error:', err);
            return;
        }
        
        // First, query site difficulty
        db.get(
            `SELECT scam_difficulty 
             FROM sites 
             WHERE site_name = ?`,
            [siteNickname],
            (err, siteRow) => {
                if (err) {
                    console.error('Error querying site difficulty:', err);
                    db.close();
                    return;
                }
                
                if (!siteRow) {
                    console.error('No site found with this name');
                    db.close();
                    return;
                }
                
                const siteDifficulty = siteRow.scam_difficulty;
                
                // Query scams based on site difficulty and page
                db.all(
                    `SELECT * 
                     FROM scams 
                     WHERE difficulty <= ? 
                     AND (page IS NULL OR page = ?)`,
                    [siteDifficulty, currentPage],
                    (err, scams) => {
                        if (err) {
                            console.error('Error querying scams:', err);
                        } else {
                            console.log("Scams for this site and page:", scams);
                        }
                        
                        // Always close the database connection
                        db.close();
                    }
                );
            }
        );
    });
}