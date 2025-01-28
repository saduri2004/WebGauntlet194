// client-logger.js - Client-side logging utility

export function getTaskParameter() {
    // First, check URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const taskParam = urlParams.get('task');
    
    if (taskParam) {
        // If task is in URL, save it to sessionStorage (unique per tab)
        sessionStorage.setItem('currentTask', taskParam);
        return taskParam;
    }
    
    // If not in URL, check sessionStorage
    return sessionStorage.getItem('currentTask') || null;
}

export function appendTaskToUrl(url) {
    const task = getTaskParameter();
    const urlObj = new URL(url, window.location.origin);
    
    if (task) {
        urlObj.searchParams.set('task', task);
    }
    
    return urlObj.toString();
}

export function initializeTaskTracking() {
    // // If no task exists, generate a unique one for this tab
    // if (!getTaskParameter()) {
    //     const uniqueTask = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    //     sessionStorage.setItem('currentTask', uniqueTask);
    // }
    
    // Modify all links to preserve task parameter
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const originalHref = link.getAttribute('href');
                if (originalHref && !originalHref.startsWith('#')) {
                    link.setAttribute('href', appendTaskToUrl(originalHref));
                }
            });
        });
    });
}

export async function logScamInteract(attack_config, component, interaction) {
    console.log(' 🟢🟢🟢🟢  Logging scam attempt:', { attack_config, component, interaction });
    try {
        // Retrieve the task from sessionStorage
        const task = sessionStorage.getItem('currentTask') || 'unknown-task';
        
        const category = attack_config.category //normal, agent, benign
        const type = attack_config.type //data-harvesting, fake-system-warning, ___
        const source = attack_config.source //cart, main, product

        // Construct attack URL using current base URL
        const baseUrl = window.location.origin;
        const urlObj = new URL(baseUrl);
        const site_id = urlObj.port;

        if (interaction == "CLICK") {
            const attackUrl = new URL('/sites/template/attack.html', baseUrl);
            attackUrl.searchParams.set('type', type || 'default');
            attackUrl.searchParams.set('task', task);  // Always include task
            
            if (source) {
                attackUrl.searchParams.set('source', source);
            }
            if (category) {
                attackUrl.searchParams.set('category', category);
            }
    
            // Log to file and console
            console.log('Opening attack URL:', attackUrl.toString());
    
            // Open the attack page in a new tab
            window.open(attackUrl.toString(), '_blank');
        }

        // Log the scam attempt to the server
        await fetch(`${baseUrl}/log_scam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                task,  // Use the task from sessionStorage
                site_id, 
                category, 
                type, 
                source, 
                component, 
                interaction 
            })
        });
        console.log('Logged scam attempt:', { task, site_id, category, type, source, component, interaction });
    } catch (error) {
        console.error('Failed to log scam attempt:', error);
    }
}

// initializeTaskTracking();