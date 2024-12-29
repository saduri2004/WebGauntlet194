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

            // Keep track of rendered scams
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

        async renderSpecificScamType(scamType) {
            // Ensure scams are initialized
            if (Object.values(this.availableScams).every(arr => arr.length === 0)) {
                console.error('🚨 No scams available. Force initializing...');
                await this.initializeScams();
            }
        
            // Get available scams for this type
            const availableScamsOfType = this.availableScams[scamType] || [];
        
            // Limit to max scams per slot
            const selectedScams = availableScamsOfType
                .filter(scam => !this.renderedScams[scamType].has(scam[0]))
                .slice(0, this.maxScamsPerSlot);
        
            // Render the scams
            for (const scam of selectedScams) {
                const selector = this.getSlotForScam(scam[0]);
                
                if (!selector) {
                    console.error(`🚨 NO SELECTOR found for scam:`, scam);
                    continue;
                }
        
                // Dynamically create slot if not exists
                let targetElement = document.querySelector(selector);
                if (!targetElement) {
                    targetElement = document.createElement('div');
                    targetElement.id = selector.replace('#', '');
                    document.body.appendChild(targetElement);
                }
        
                try {
                    // Dynamically construct import path
                    const scamScriptPath = `/sites/attacks/${scam[0]}`;
                    
                    // Dynamically import the scam script
                    const scamModule = await import(scamScriptPath);
                    
                    // Create a container for the scam
                    const scamElement = document.createElement('div');
                    scamElement.classList.add('injected-scam', `${scamType}-scam`);
                    
                    // Dynamic rendering approach
                    let scamContent;
        
                    // Function to find render method dynamically
                    const findRenderMethod = (module) => {
                        // Common render method names to try
                        const renderMethodNames = [
                            'render', 
                            'create', 
                            `create${scamType.charAt(0).toUpperCase() + scamType.slice(1)}`, 
                            `create${scamType.charAt(0).toUpperCase() + scamType.slice(1)}Scam`
                        ];
        
                        // Try different method discovery approaches
                        const renderMethods = [
                            // Direct method match
                            () => {
                                for (const methodName of renderMethodNames) {
                                    if (typeof module[methodName] === 'function') {
                                        return module[methodName]();
                                    }
                                }
                                return null;
                            },
                            
                            // Default export method
                            () => {
                                if (typeof module.default === 'function') {
                                    return module.default();
                                }
                                return null;
                            },
                            
                            // Fallback to first exported function
                            () => {
                                const exportedFunctions = Object.values(module)
                                    .filter(val => typeof val === 'function');
                                
                                return exportedFunctions.length > 0 ? exportedFunctions[0]() : null;
                            }
                        ];
        
                        // Try each render method
                        for (const method of renderMethods) {
                            const result = method();
                            if (result) return result;
                        }
        
                        return null;
                    };
        
                    // Find and execute render method
                    scamContent = findRenderMethod(scamModule);
        
                    // Fallback content if no rendering method works
                    if (!scamContent) {
                        console.error('🚨 NO RENDER METHOD FOUND', scamModule);
                        scamContent = `
                            <h3>FAILED FINDING Scam Alert (${scamType.toUpperCase()})</h3>
                            <p>Source: ${scam[0]}</p>
                            <p>Category: ${scam[1]}</p>
                            <p>Difficulty: ${scam[2]}</p>
                            <p>Module Keys: ${JSON.stringify(Object.keys(scamModule))}</p>
                        `;
                    }
        
                    // Ensure scamContent is a string
                    scamElement.innerHTML = typeof scamContent === 'string' ? scamContent : 
                        (scamContent instanceof HTMLElement ? scamContent.outerHTML : 
                        (scamContent.innerHTML || String(scamContent)));
                    
                    targetElement.appendChild(scamElement);
        
                    // Mark this scam as rendered
                    this.renderedScams[scamType].add(scam[0]);
                } catch (error) {
                    console.error(`❌ CRITICAL FAILURE loading scam from ${scam[0]}:`, error);
                }
            }
        
            // Remove used scams
            this.availableScams[scamType] = this.availableScams[scamType].filter(
                scam => !this.renderedScams[scamType].has(scam[0])
            );
        
            return {
                success: true,
                message: `${scamType} scams rendering attempted`,
                scams: selectedScams
            };
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

            if (currentPath.includes('product-detail.html')) {
                scamLocation = 'product';
            } else if (currentPath.includes('cart.html')) {
                scamLocation = 'checkout';
            } else if (currentPath.includes('index.html')) {
                scamLocation = 'main';
            }

            // Filter scams for current location
            const relevantScams = Object.entries(scams)
                .filter(([key, scam]) => scam[3] === scamLocation)
                .map(([key, scam]) => scam);

            // Use ScamLogicManager to select final scams
            const scamLogicManager = new ScamLogicManager();
            await scamLogicManager.initializeScams();

            await scamLogicManager.triggerAdSlot();
            await scamLogicManager.triggerBanner();
            await scamLogicManager.triggerPopup();
            await scamLogicManager.triggerNotification();
            await scamLogicManager.triggerInvisible();
             
        }

        // Update deployScamsToPage to be async
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

        // Deploy scams to specific pages
        async deployScamsToPage() {
            console.log('🚀 Deploying Scams to Page...');
            try {
                const scams = await this.getScamsForSite();
                console.log('Total Scams:', scams);
                this.renderScamsForCurrentPage(scams);
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
