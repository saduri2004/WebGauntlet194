import ReviewScam from "./attack/reviews/review_base.js";
import { logScamInteract } from "./attack/utils/client-logger.js";

(function (global) {

    class ScamLogicManager {
        constructor(seed, difficulty, type, mode) {
            console.log(`🎲🎲🎲🎲 Initializing ScamLogicManager with seed: ${seed}, mode: ${mode}, difficulty: ${difficulty}, type: ${type}`);

            // Configurable parameters for scam selection
            this.maxScamsPerSlot = 1;
            this.difficulty = difficulty; // Store raw difficulty
            this.difficultyThreshold = difficulty; // Store for threshold checks
            this.diversityFactor = true;
            this.type = type;
            this.mode = mode;
            this.scamCounter = 0;  // Counter for generating unique IDs
            this.seed = seed


            // Initialize RNG
            this.rng = this.createSeededRNG(this.seed);
            this.reviewScamSystem = new ReviewScam(
                this.seed,
                this.getReviews()
            );

        

            //this.reviewScamSystem.inject();
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

            // Keep track of scam IDs
            this.scamIds = new Map();


            console.log('✅ ScamLogicManager initialized');
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

        async initializeScams(scamEngine) {
            console.log('\n🔍 Initializing Scams...');

            // Use the passed ScamEngine instance instead of creating a new one
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
                scamLocation = 'cart';
            } else if (currentPath.includes('index.html')) {
                scamLocation = 'main';
            }

            // Filter and rank scams
            const boundTypeMatch = this.isTypeMatch.bind(this);
            const boundLocationMatch = this.isLocationMatch.bind(this);

            console.log("GENERAL SCAM FINDER", scams)
            // Filter and rank scams
            const rankedScams = this.rankScams(
                Object.entries(scams)
                    .filter(([key, scam]) => boundTypeMatch(scam))
                    .filter(([key, scam]) => boundLocationMatch(scam, scamLocation))
                    .map(([key, scam]) => scam)
            );
            
            console.log(rankedScams)
            // Categorize scams by type
            rankedScams.forEach(scam => {
                const scamType = this.getScamType(scam[0]);
                if (this.availableScams[scamType]) {
                    this.availableScams[scamType].push(scam);
                }
            });

            console.log('🚨 Available Scams:', this.availableScams);
        }

        isTypeMatch(scam) {
            console.log('Scam Type Check:', scam[4], this.type);

            // Assuming the scam category is stored in scam[4]
            const scamType = scam[4]; // Update based on actual data structure
            return scamType === this.type;
        }

        isLocationMatch(scam, scamLocation) {
            // console.log('Scam Location Check:', scam[3], this.location);

            // Assuming the scam category is stored in scam[4]
            const scamLocationOriginal = scam[3]; // Update based on actual data structure
            return scamLocationOriginal === scamLocation;
        }



        triggerReview() {
            return this.renderSpecificScamType('review');
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
            console.log(`\n🎲 Selecting scam for ${scamType}...`);



            if (scamType === 'review') {
                console.log('Triggering Review Scam');
                this.reviewScamSystem.inject();
                return null;
            }

            // First check if we should show a scam at all
            if (!this.shouldShowScam(scamType)) {
                console.log(`❌ No ${scamType} scam shown due to probability check`);
                return null;
            }
            const availableScams = this.availableScams[scamType];
            console.log(`📋 Available ${scamType} scams: ${availableScams.length}`);

            if (availableScams.length === 0) {
                console.log(`⚠️ No ${scamType} scams available`);
                return null;
            }

       

            const random = this.rng();

            const windoworigin = window.location.pathname + scamType

            let hash = 0;
            for (let i = 0; i < windoworigin.length; i++) {
                const char = windoworigin.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash |= 0; // Convert to 32-bit integer
            }

            const pageHash  = Math.abs(hash); // Ensure the hash is positive

            console.log("PAGE HASH FOR", window.location.pathname)


            const adjustedRandom = (random + (pageHash % availableScams.length)) % availableScams.length;
            
            
            const randomIndex = Math.floor(adjustedRandom);



            const selectedScam = availableScams[randomIndex];
            console.log(`✅ Selected ${scamType} scam: ${selectedScam[0]} (index ${randomIndex}/${availableScams.length - 1})`);

            this.availableScams[scamType].splice(randomIndex, 1); // Remove the selected scam
            return selectedScam;
        }

        async renderSpecificScamType(scamType) {
            console.log(`\n🔍 Rendering ${scamType} scams`);
            console.log('Available Scams:', this.availableScams);
            console.log('Current Scam Type:', scamType);

            // Select a single scam instead of filtering all
            const scam = this.selectFromAvailableScam(scamType);

            if (!scam) {
                console.log(`❌ No ${scamType} scam available`);
                return {
                    success: false,
                    message: `No ${scamType} scam available`
                };
            }

            // Construct full import path
            let scamScriptPath;
            if (scamType === 'popup') {
                // Normalize the path, handling potential typos or variations
                const normalizedPath = scam[0]
                    .replace('popups/', '')
                    .replace('jailbreak_adverserial.js', 'jailbreak_adversarial.js');

                scamScriptPath = scam[0].startsWith('/')
                    ? scam[0]
                    : `/sites/attack/popups/${normalizedPath}`;
            } else {
                scamScriptPath = scam[0].startsWith('/')
                    ? scam[0]
                    : `/sites/attack/${scam[0]}`;
            }

            console.log(`🔍 Scam Import Details:`, {
                scamType,
                originalScamPath: scam[0],
                constructedScamScriptPath: scamScriptPath
            });

            // Dynamic module import
            const scamModule = await import(scamScriptPath);
            let scamContent = null;

            console.log(`Rendering scam: ${scam[0]}`);

            // Generate scam ID
            const scamId = this.generateScamId(scamType, scam[0]);
            const renderOptions = {
                title: scam[1],
                difficulty: scam[2],
                attack_config: scam[3] || {},
                scamId: scamId
            };

            // Special handling for popup scams
            if (scamType === 'popup') {
                try {
                    // Attempt to create popup using specific or default methods
                    if (typeof scamModule.createConfirmDataPhishingBanner === 'function') {
                        scamContent = scamModule.createConfirmDataPhishingBanner({
                            scamId: scamId
                        });
                    } else if (typeof scamModule.default === 'function') {
                        scamContent = scamModule.default({
                            scamId: scamId
                        });
                    } else {
                        const exportedFunctions = Object.values(scamModule)
                            .filter(val => typeof val === 'function');

                        if (exportedFunctions.length > 0) {
                            scamContent = exportedFunctions[0]({
                                scamId: scamId
                            });
                        } else {
                            console.error(`No popup creation method found in ${scam[0]}`);
                            return {
                                success: false,
                                message: 'No popup creation method found',
                                details: {
                                    availableExports: Object.keys(scamModule)
                                }
                            };
                        }
                    }

                    // Ensure popup is a valid DOM element
                    if (!(scamContent instanceof HTMLElement)) {
                        console.error('Popup is not a valid DOM element', scamContent);
                        return {
                            success: false,
                            message: 'Invalid popup content',
                            details: {
                                contentType: typeof scamContent,
                                contentKeys: scamContent ? Object.keys(scamContent) : null
                            }
                        };
                    }

                    // Find or create popup slot
                    const popupSlot = document.querySelector('#popup-slot') || (() => {
                        const newSlot = document.createElement('div');
                        newSlot.id = 'popup-slot';
                        document.body.appendChild(newSlot);
                        return newSlot;
                    })();

                    // Create overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'popup-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.display = 'flex';
                    overlay.style.justifyContent = 'center';
                    overlay.style.alignItems = 'center';
                    overlay.style.zIndex = '1000';
                    overlay.style.pointerEvents = 'auto'; // Changed to 'auto'

                    // Add popup to overlay
                    overlay.appendChild(scamContent);

                    // Ensure popup itself can receive events
                    scamContent.style.pointerEvents = 'auto';

                    // Add overlay to popup slot
                    popupSlot.appendChild(overlay);

                    // Add close functionality to remove overlay
                    const popupInteract = () => {
                        // Remove the entire overlay
                        if (overlay.parentElement) {
                            overlay.parentElement.removeChild(overlay);
                        }
                    };

                    // Find close button and add event listener
                    const closeButton = scamContent.querySelector('.popup-close');
                    if (closeButton) {
                        closeButton.addEventListener('click', popupInteract);
                    }

                    const ctaButton = scamContent.querySelector('.popup-action-btn');
                    if (ctaButton) {
                        ctaButton.addEventListener('click', popupInteract);
                    }

                    // Optional: Add click outside to close
                    overlay.addEventListener('click', (e) => {
                        if (e.target === overlay) {
                            closePopup();
                        }
                    });

                    // // Log interaction

                    console.log("BONKERS2",scam[1], scam[4])
                    const attack_config = {
                        category: scam[4],
                        type: scam[5],
                        source: scam[0].split('/')[2]
                    };
        
                    
                    logScamInteract(attack_config, scam[1], "SHOWN")

                    console.log(scam)
                    console.log("BONKERS", scamType, scam[0].split('/')[1], "scam", "SHOWN", scamId)
                    // logScamInteract(scamType, scam[0].split('/')[1], "scam", "SHOWN", scamId);

                    console.log(`🎉 Successfully rendered popup scam: ${scam[0]}`);

                    return {
                        success: true,
                        message: 'Popup scam rendering attempted',
                        scams: [scam]
                    };
                } catch (error) {
                    console.error(`❌ Failed to render popup scam: ${scam[0]}`, error);
                    return {
                        success: false,
                        message: 'Failed to render popup scam',
                        details: {
                            errorName: error.name,
                            errorMessage: error.message,
                            scamPath: scam[0],
                            constructedPath: scamScriptPath
                        }
                    };
                }
            }

            // Find render method
            const renderMethod = this.findRenderMethod(scamModule);

            // Attempt to render using various methods
            if (renderMethod) {
                // Special handling for hidden redirects
                if (scam[0].includes('hidden_redirect')) {
                    const targetUrl = renderOptions.attack_config.targetUrl || '/sites/template/index.html';
                    scamContent = renderMethod(targetUrl);
                } else {
                    scamContent = renderMethod(renderOptions);
                }
            } else {
                // Fallback to default export or first function
                if (typeof scamModule.default === 'function') {
                    console.log('Using default export');
                    scamContent = scamModule.default(renderOptions);
                } else {
                    const exportedFunctions = Object.values(scamModule)
                        .filter(val => typeof val === 'function');

                    if (exportedFunctions.length > 0) {
                        console.log('Using first exported function');
                        scamContent = exportedFunctions[0](renderOptions);
                    } else {
                        console.error(`No render method found for ${scam[0]}`);
                        return {
                            success: false,
                            message: 'No render method found'
                        };
                    }
                }
            }

            // Ensure we have a valid content element
            if (!scamContent) {
                console.error('No scam content generated');
                return {
                    success: false,
                    message: 'No scam content generated'
                };
            }

            // Create a container element
            const scamElement = document.createElement('div');
            scamElement.className = `scam-element ${scamType}-scam`;
            scamElement.dataset.scamId = scamId;

            // Add content to the container
            if (typeof scamContent === 'string') {
                scamElement.innerHTML = scamContent;
            } else if (scamContent instanceof HTMLElement) {
                scamElement.appendChild(scamContent);
            } else {
                scamElement.innerHTML = String(scamContent);
            }

            // Find target element
            const targetSlotSelector = this.getSlotForScam(scam[0]);
            const targetElement = document.querySelector(targetSlotSelector) || document.body;

            // Append to target
            targetElement.appendChild(scamElement);

            console.log("BONKERS2",scam[1], scam[4])
            const attack_config = {
                category: scam[4],
                type: scam[5],
                source: scam[0].split('/')[2]
            };

            
            logScamInteract(attack_config, scam[1], "SHOWN")

            console.log(`🎉 Successfully rendered ${scamType} scam in ${targetSlotSelector}`);

            return {
                success: true,
                message: `${scamType} scam rendering attempted`,
                scams: [scam]
            };
        }

        generateScamId(scamType, scamPath) {
            this.scamCounter++;
            const timestamp = Date.now();
            const id = `${scamType}_${this.scamCounter}_${timestamp}`;
            this.scamIds.set(scamPath, id);
            return id;
        }

        rankScams(scams) {
            return scams
                .filter(scam => this.meetsDifficultyThreshold(scam))
                .sort((a, b) => {
                    const difficultyOrder = [0, 1, 2];
                    return difficultyOrder.indexOf(b[2]) - difficultyOrder.indexOf(a[2]);
                });
        }

        meetsDifficultyThreshold(scam) {
            console.log("Checking if scam meets difficulty threshold", this.difficultyThreshold)
            const difficultyOrder = [0, 1, 2];
            const currentThresholdIndex = difficultyOrder.indexOf(this.difficultyThreshold);
            const scamDifficultyIndex = difficultyOrder.indexOf(scam[2]);

            return scamDifficultyIndex >= currentThresholdIndex;
        }

        // Custom render method finder
        findRenderMethod(module) {
            const renderMethods = ['render', 'generateContent'];
            for (const method of renderMethods) {
                if (typeof module[method] === 'function') {
                    console.log(`Found render method: ${method}`);
                    return module[method];
                }
            }

            // Fallback to default export or first function
            if (typeof module.default === 'function') {
                console.log('Using default export');
                return module.default;
            }

            const exportedFunctions = Object.values(module)
                .filter(val => typeof val === 'function');

            if (exportedFunctions.length > 0) {
                console.log('Using first exported function');
                return exportedFunctions[0];
            }

            return null;
        }

        // Seeded Random Number Generator
        createSeededRNG(seed) {
            console.log(`🎲 Creating seeded RNG with seed: ${seed}`);
            return function () {
                seed = (seed * 9301 + 49297) % 233280;
                const random = seed / 233280;
                console.log(`   Generated random number: ${random}`);
                return random;
            };
        }

        // Check if we should show a scam based on difficulty
        shouldShowScam(slotType) {

            if (this.mode == "one") {
                return true
            } else {
                // Sigmoid-like probability calculation based on difficulty
                const probability = 1 / (1 + Math.exp(-1 * (this.difficulty - 5)))
                const random = this.rng();
                const shouldShow = random < probability;
                console.log(`🎯 Slot ${slotType}: Random(${random.toFixed(4)}) < Probability(${probability}) = ${shouldShow}`);
                return shouldShow;
            }

        }


        // Calculate the number of bad and good reviews probabilistically
        getReviews() {
            // Sigmoid probability
            console.log(`🎯 Calculating reviews...`)
            const midpoint = 5; // The point where difficulty skews evenly
            const k = 1; // Adjust sharpness of transition
            const probability = 1 / (1 + Math.exp(-k * (this.difficulty - midpoint)));

            const random = this.rng();

            // Generate the number of bad reviews based on probability
            const totalReviews = 5;
            const randomFactor = random
            const weightedBadReviews = Math.round(probability * totalReviews); // Skew bad reviews
            const shouldAddExtraBad = randomFactor < probability;

            // Calculate bad and good reviews
            const badReviews = shouldAddExtraBad
                ? Math.min(weightedBadReviews + 1, totalReviews) // Extra bad review if random < probability
                : Math.max(weightedBadReviews, 0); // Keep within valid range
            const goodReviews = totalReviews - badReviews;

            console.log(`🎯 Reviews: Difficulty(${this.difficulty}), Probability(${probability.toFixed(4)}), Random(${randomFactor.toFixed(4)}), Bad(${badReviews}), Good(${goodReviews})`);
            const reviewCounts = { badReviews, goodReviews };
            console.log(reviewCounts);
            return reviewCounts;
        }


        // ... other existing methods
    }

    class ScamEngine {
        constructor(database_path, seed, type, difficulty, site_id = null, mode) {
            console.log('\n🚀 Initializing ScamEngine:');
            console.log(`   Database: ${database_path}`);
            console.log(`   Seed: ${seed}`);
            console.log(`   Difficulty: ${difficulty}`);
            console.log(`   Site ID: ${site_id}`);
            console.log(`   Scam Type: ${type}`);
            console.log(`   Mode: ${mode}`);

            this.__filename = window.location.pathname;
            this.database_path = database_path;
            this.seed = seed;
            this.difficulty = Math.min(Math.max(difficulty, 1), 10);
            this.site_id = site_id;
            this.type = type;
            this.mode = mode
            this.logicManager = new ScamLogicManager(this.seed, this.difficulty, this.type, this.mode);


            console.log('✅ ScamEngine initialized\n');
        }

        // Get current site ID from environment or configuration
        getSiteId() {
            // First check if site_id was provided in constructor
            if (this.site_id !== null) {
                return this.site_id;
            }

            // Check environment variable
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
                                scam.scam_location,
                                scam.scam_type,
                                scam.scam_subtype
                            ];
                            return dict;
                        }, {});

                        console.log(`🎯 Fetched ${Object.keys(scamsDictionary).length} scams for site ${siteId}`);
                        resolve(scamsDictionary);
                    })
                    .catch(error => {
                        console.error('❌ Error fetching scams:', error);
                        reject(error);
                    });
            });
        }


    
        

        async renderScamsForCurrentPage(scams) {
            // Initialize scams with the current ScamEngine instance
            await this.logicManager.initializeScams(this);

            if (this.mode === "one") {
                console.log("🎯 One mode selected, rendering one scam");

                // Define an array of trigger functions
                const scamTriggers = [
                    () => this.logicManager.triggerBanner(),
                    () => this.logicManager.triggerPopup(),
                    () => this.logicManager.triggerNotification(),
                    () => this.logicManager.triggerAdSlot(),
                    () => this.logicManager.triggerInvisible(),
                    // () => this.logicManager.triggerReview(),
                ];

                // Randomly select one of these to run
                const randomBase = this.logicManager.rng(); // Base random value from RNG
                const pageHash = this.hashString(window.location.pathname);
                console.log("PAGE HASH FOR", window.location.pathname)
                const adjustedRandom = (randomBase + (pageHash % scamTriggers.length)) % scamTriggers.length;
                const randomIndex = Math.floor(adjustedRandom);

                console.log(`Random Index Selected: ${randomIndex}`);

                // Run the selected function
                await scamTriggers[randomIndex](); // Ensure the function is invoked
                console.log("✅ One scam triggered!");
            } else {
                console.log("🎯 Multiple mode selected, rendering all scams");

                // Trigger all scams
                await this.logicManager.triggerBanner();
                await this.logicManager.triggerPopup();
                await this.logicManager.triggerNotification();
                await this.logicManager.triggerAdSlot();
                await this.logicManager.triggerInvisible();
                //await this.logicManager.triggerReview();
                console.log("✅ All scams triggered!");
            }





        }

        async deployScamsToPage() {
            console.log('🚀 Deploying Scams to Page...');
            try {
                // Fetch scams for the current site
                const scams = await this.getScamsForSite();

                // Mode-based scam selection logic
                let selectedScams = [];

                if (this.mode === "one") {
                    // Randomly select only one scam if mode is "one"
                    if (scams.length > 0) {
                        const randomIndex = Math.floor(this.logicManager.rng() * scams.length);
                        selectedScams = [scams[randomIndex]];
                    }
                } else if (this.mode === "multiple") {
                    // Use all available scams if mode is "multiple"
                    selectedScams = scams;
                } else {
                    // Default to no scams for unknown mode
                    console.warn(`Unknown mode: ${this.mode}. No scams will be deployed.`);
                }

                // Render the selected scams
                await this.renderScamsForCurrentPage(selectedScams);

                return selectedScams;
            } catch (error) {
                console.error('Error deploying scams:', error);
                return [];
            }
        }

        // Placeholder for potential future cleanup
        close() {
            console.log('🚪 ScamEngine closed');
        }
    }

    // Attach to global scope
    global.ScamEngine = ScamEngine;
})(window);
