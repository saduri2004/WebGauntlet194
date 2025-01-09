(function (global) {
    class ScamLogicManager {
        constructor() {
            // Configurable parameters for scam selection
            this.maxScamsPerSlot = 1;
            this.difficultyThreshold = 'medium';
            this.diversityFactor = true;

            // Store all available scams by type and location
            this.availableScams = {
                banner: [],
                popup: [],
                notification: [],
                adslot: [],
                invisible: []
            };

            // Keep track of rendered scams GLOBALLY
            this.globalRenderedScams = new Set();

            // Keep track of rendered scams by type
            this.renderedScams = {
                banner: new Set(),
                popup: new Set(),
                notification: new Set(),
                adslot: new Set(),
                invisible: new Set()
            };
        }

        getScamType(scamPath) {
            const scamPathLower = scamPath.toLowerCase();
        
            if (scamPathLower.includes('banner')) return 'banner';
            if (scamPathLower.includes('popup')) return 'popup';
            if (scamPathLower.includes('notification')) return 'notification';
            if (scamPathLower.includes('adslot')) return 'adslot';
            if (scamPathLower.includes('invisible')) return 'invisible';
        
            return 'default';
        }
    
        getSlotForScam(scamPath) {
            const scamPathLower = scamPath.toLowerCase();
        
            if (scamPathLower.includes('banner')) return '#banner-slot';
            if (scamPathLower.includes('popup')) return '#popup-slot';
            if (scamPathLower.includes('notification')) return '#notification-slot';
            if (scamPathLower.includes('adslot') || scamPathLower.includes('category')) return '#adslot-slot';
            if (scamPathLower.includes('invisible') || scamPathLower.includes('hidden')) return '#invisible-slot';
        
            return null;
        }

        async initializeScams() {
            // Fetch all scams once and categorize them
            const scamEngine = new ScamEngine();
            const scams = await scamEngine.getScamsForSite();

            // Clear existing available scams
            Object.keys(this.availableScams).forEach(key => {
                this.availableScams[key] = [];
            });

            // Current page location
            const currentPath = window.location.pathname;
            let scamLocation;

            if (currentPath.includes('product-detail.html')) {
                scamLocation = 'product';
            } else if (currentPath.includes('cart.html')) {
                scamLocation = 'checkout';
            } else if (currentPath.includes('index.html')) {
                scamLocation = 'main';
            }

            // Filter and rank scams
            const rankedScams = this.rankScams(
                Object.entries(scams)
                    .filter(([key, scam]) => scam[3] === scamLocation)
                    .map(([key, scam]) => scam)
            );

            // Categorize scams by type
            rankedScams.forEach(scam => {
                const scamType = this.getScamType(scam[0]);
                if (this.availableScams[scamType]) {
                    this.availableScams[scamType].push(scam);
                }
            });

            console.log('🚨 Available Scams:', this.availableScams);
        }

        triggerBanner() {
            return this.renderSpecificScamType('banner');
        }

        triggerPopup() {
            return this.renderSpecificScamType('popup');
        }

        async triggerNotification() {
            return this.renderSpecificScamType('notification');
        }

        async triggerAdSlot() {
            return this.renderSpecificScamType('adslot');
        }

        triggerInvisible() {
            return this.renderSpecificScamType('invisible');
        }

        selectFromAvailableScam(scamType) {
            // Always return the first available scam for the given type
            const availableScams = this.availableScams[scamType];
            
            if (availableScams.length === 0) {
                console.warn(`No ${scamType} scams available`);
                return null;
            }

            // Return the first scam and remove it from available scams
            //create random index
            const randomIndex = Math.floor(Math.random() * availableScams.length);
            const selectedScam = availableScams[randomIndex];
            this.availableScams[scamType].splice(randomIndex, 1); // Remove the selected scam
            
            return selectedScam;
        }

        async renderSpecificScamType(scamType) {
            console.log(`🔍 Rendering ${scamType} scams`);
            console.log('Available Scams:', this.availableScams);
            console.log('Current Scam Type:', scamType);

            // Select a single scam instead of filtering all
            const scam = this.selectFromAvailableScam(scamType);
            
            if (!scam) {
                console.warn(`No ${scamType} scams available`);
                return { 
                    success: false, 
                    message: `No ${scamType} scams available` 
                };
            }

            // Dynamically select target element based on scam type
            const targetSlotSelector = this.getSlotForScam(scam[0]);
            const targetElement = document.querySelector(targetSlotSelector) || document.body;
            console.log(`Target Element for ${scamType} Scam:`, targetElement, `Selector: ${targetSlotSelector}`);

            try {
                console.log(`Attempting to render scam: ${scam[0]}`);

                // Construct full import path
                const scamScriptPath = scam[0].startsWith('/') 
                    ? scam[0] 
                    : `/sites/attacks/${scam[0]}`;
                
                console.log(`Importing scam from path: ${scamScriptPath}`);

                // Dynamic module import
                const scamModule = await import(scamScriptPath);
                const scamElement = document.createElement('div');
                scamElement.className = `scam-element ${scamType}-scam`;

                let scamContent = null;

                console.log(`Rendering scam: ${scam[0]}`);
                // Custom render method finder
                const findRenderMethod = (module) => {
                    const renderMethods = ['render', 'generateContent', 'createCategorySaleScamAdslot', 'createWinPrizeBanner'];
                    for (const method of renderMethods) {
                        if (typeof module[method] === 'function') {
                            console.log(`Found render method: ${method}`);
                            return module[method]({
                                title: scam[1],
                                difficulty: scam[2],
                                attack_config: scam[3] || {}
                            });
                        }
                    }

                    // Fallback to default export or first function
                    if (typeof module.default === 'function') {
                        console.log('Using default export');
                        return module.default({
                            title: scam[1],
                            difficulty: scam[2],
                            attack_config: scam[3] || {}
                        });
                    }

                    const exportedFunctions = Object.values(module)
                        .filter(val => typeof val === 'function');
                    
                    if (exportedFunctions.length > 0) {
                        console.log('Using first exported function');
                        return exportedFunctions[0]({
                            title: scam[1],
                            difficulty: scam[2],
                            attack_config: scam[3] || {}
                        });
                    }

                    return null;
                };

                scamContent = findRenderMethod(scamModule);
         

                console.log(`Rendering scam 3: ${scam[0]}`);
                
                // Ensure scamContent is added to the DOM
                if (scamContent) {
                    if (typeof scamContent === 'string') {
                        scamElement.innerHTML = scamContent;
                    } else if (scamContent instanceof HTMLElement) {
                        scamElement.appendChild(scamContent);
                    } else {
                        scamElement.innerHTML = String(scamContent);
                    }
                    
                    // Append to target element
                    targetElement.appendChild(scamElement);
                    console.log(`🎉 Successfully rendered ${scamType} scam in ${targetSlotSelector}`);
                }

                return {
                    success: true,
                    message: `${scamType} scam rendering attempted`,
                    scams: [scam]
                };
            } catch (error) {
                console.error(`❌ CRITICAL FAILURE loading scam from ${scam[0]}:`, error);
                // Log additional context about the import
                console.error('Error Details:', {
                    scamPath: scam[0],
                    constructedPath: `/sites/attacks/${scam[0]}`,
                    errorName: error.name,
                    errorMessage: error.message,
                    stack: error.stack
                });

                return {
                    success: false,
                    message: `Failed to render ${scamType} scam`,
                    error: error.message
                };
            }
        }
        
        rankScams(scams) {
            return scams
                .filter(scam => this.meetsDifficultyThreshold(scam))
                .sort((a, b) => {
                    const difficultyOrder = [1, 2, 3];
                    return difficultyOrder.indexOf(b[2]) - difficultyOrder.indexOf(a[2]);
                });
        }

        meetsDifficultyThreshold(scam) {
            const difficultyOrder = [1, 2, 3];
            const currentThresholdIndex = difficultyOrder.indexOf(this.difficultyThreshold);
            const scamDifficultyIndex = difficultyOrder.indexOf(scam[2]);

            return scamDifficultyIndex >= currentThresholdIndex;
        }

        // ... other existing methods
    }







    class ScamEngine {
        constructor() {
            // Remove database initialization for browser
            this.__filename = window.location.pathname;
        }

        // Get current site ID from environment or configuration
        getSiteId() {
            // Check environment variable first
            const siteId = localStorage.getItem('SITE_ID');
            if (siteId) return parseInt(siteId, 10);

            // Extract site ID from file path
            const sitesIndex = this.__filename.indexOf('/sites/');

            if (sitesIndex === -1) return null;

            const pathAfterSites = this.__filename.slice(sitesIndex + 6);
            const siteFolderName = pathAfterSites.split('/')[0];

            // Try to convert site folder name to a number, fallback to null
            return isNaN(parseInt(siteFolderName, 10)) ? null : parseInt(siteFolderName, 10);
        }

        // Fetch scams via API instead of direct database access
        async getScamsForSite() {
            return new Promise((resolve, reject) => {
                const siteId = this.getSiteId();
                console.log(`🕵️ Site ID: ${siteId}`);

                // Fetch scams from backend API
                fetch(`/api/scams?siteId=${siteId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(scams => {
                        console.log('🕵️ Raw Scams:', scams);

                        // Convert to dictionary, preserving all scams
                        const scamsDictionary = scams.reduce((dict, scam) => {
                            // Use a unique key to prevent overwriting
                            const uniqueKey = `${scam.scam_name}_${scam.scam_source}`;
                            dict[uniqueKey] = [
                                scam.scam_source,
                                scam.scam_category,
                                scam.difficulty,
                                scam.scam_location
                            ];
                            return dict;
                        }, {});

                        console.log('🕵️ Scams Dictionary:', scamsDictionary);
                        console.log('🕵️ Total Scams in Dictionary:', Object.keys(scamsDictionary).length);

                        // Log all unique scam locations
                        const scamLocations = new Set(
                            Object.values(scamsDictionary).map(scam => scam[3])
                        );
                        console.log('🕵️ Unique Scam Locations:', [...scamLocations]);

                        resolve(scamsDictionary);
                    })
                    .catch(error => {
                        console.error('❌ Error fetching scams:', error);
                        reject(error);
                    });
            });
        }

        async renderScamsForCurrentPage(scams) {
            // Determine current page
            const currentPath = window.location.pathname;
            let scamLocation;

            console.log('🔍 Current Path:', currentPath);

            if (currentPath.includes('product-detail.html')) {
                scamLocation = 'product';
            } else if (currentPath.includes('cart.html')) {
                scamLocation = 'checkout';
            } else if (currentPath.includes('index.html')) {
                scamLocation = 'main';
            }

            console.log('🔍 Detected Scam Location:', scamLocation);
            console.log('🔍 All Scams:', scams);

            // Filter scams for current location
            const relevantScams = Object.entries(scams)
                .filter(([key, scam]) => {
                    console.log(`Checking scam: ${key}, Location: ${scam[3]}`);
                    return scam[3] === scamLocation;
                })
                .map(([key, scam]) => scam);

            console.log('🔍 Relevant Scams:', relevantScams);

            // Use ScamLogicManager to select final scams
            const scamLogicManager = new ScamLogicManager();
            await scamLogicManager.initializeScams();

            await scamLogicManager.triggerBanner();
            await scamLogicManager.triggerPopup();
            await scamLogicManager.triggerNotification();
            await scamLogicManager.triggerAdSlot();
            // await scamLogicManager.triggerInvisible();
        }

        // Update deployScamsToPage to be async and remove duplication
        async deployScamsToPage() {
            console.log('🚀 Deploying Scams to Page...');
            try {
                const scams = await this.getScamsForSite();
                console.log('Total Scams:', scams);
                await this.renderScamsForCurrentPage(scams);
            } catch (error) {
                console.error('❌ Scam Deployment Failed:', error);
            }
        }

        // Placeholder for potential future cleanup
        close() {
            console.log('🚪 ScamEngine closed');
        }
    }

    // Attach to global scope
    global.ScamEngine = ScamEngine;
})(typeof window !== 'undefined' ? window : global);
