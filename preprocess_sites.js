const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Paths
const DB_PATH = path.join(__dirname, 'database/ecommerce.db');
const SITES_OUTPUT_DIR = path.join(__dirname, 'generated_sites');
const TEMPLATE_DIR = path.join(__dirname, 'sites/template');

// Ensure directory exists
function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

// Preprocessing function
function preprocessSites() {
    // Create output directory
    ensureDirectoryExists(SITES_OUTPUT_DIR);

    // Connect to database
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Database connection error:', err);
            return;
        }
        console.log('Connected to the database');

        // Fetch all sites
        db.all('SELECT * FROM sites', (err, sites) => {
            if (err) {
                console.error('Error fetching sites:', err);
                db.close();
                return;
            }

            // Process each site
            const processedSites = sites.map(site => ({
                site_id: site.site_id,
                site_name: site.site_name
            }));

            sites.forEach(site => {
                generateSiteFiles(site);
            });

            // Generate manifest
            generateSitesManifest(processedSites);

            console.log(`Preprocessed ${sites.length} sites`);
            db.close();
        });
    });
}

// Generate site-specific files
function generateSiteFiles(site) {
    const siteDir = path.join(SITES_OUTPUT_DIR, `site_${site.site_id}`);
    ensureDirectoryExists(siteDir);

    // Read template files
    const templateFiles = [
        'index.html',
        'product-detail.html',
        'cart.html',  // Updated from checkout.html
        'attack.html'
    ];

    templateFiles.forEach(templateName => {
        const templatePath = path.join(TEMPLATE_DIR, templateName);
        
        // Skip if template doesn't exist
        if (!fs.existsSync(templatePath)) {
            console.warn(`Template ${templateName} not found. Skipping.`);
            return;
        }

        const outputPath = path.join(siteDir, templateName);

        try {
            // Read template
            const templateContent = fs.readFileSync(templatePath, 'utf8');
            
            // Compile Handlebars template
            const template = Handlebars.compile(templateContent);

            // Render template with site-specific data
            const renderedContent = template({
                site_name: site.site_name,
                site_id: site.site_id,
                difficulty: site.scam_difficulty,
                layout_id: site.layout_id,
                product_id: site.end_product_id
            });

            // Write rendered file
            fs.writeFileSync(outputPath, renderedContent);
            console.log(`Generated ${outputPath}`);
        } catch (error) {
            console.error(`Error processing ${templateName} for site ${site.site_id}:`, error);
        }
    });

    // Copy static assets
    const staticAssets = ['css', 'js', 'images'];
    staticAssets.forEach(assetType => {
        const srcDir = path.join(TEMPLATE_DIR, assetType);
        const destDir = path.join(siteDir, assetType);
        
        if (fs.existsSync(srcDir)) {
            ensureDirectoryExists(destDir);
            fs.cpSync(srcDir, destDir, { recursive: true });
            console.log(`Copied ${assetType} for site ${site.site_id}`);
        }
    });
}

// Generate sites manifest
function generateSitesManifest(sites) {
    const manifestPath = path.join(SITES_OUTPUT_DIR, 'sites_manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(sites, null, 2));
    console.log('Generated sites manifest');
}

// Main execution
preprocessSites();
