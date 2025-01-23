// client-logger.js - Client-side logging utility


export async function logScamInteract(attack_config, component, interaction) {
    console.log(' 🟢🟢🟢🟢  Logging scam attempt:', { attack_config, component, interaction });
    try {
        
        //category: "normal", type: "data-harvesting", source: "cart" }

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
            body: JSON.stringify({ site_id, category, type, source, component, interaction })
        });
        console.log('Logged scam attempt:', { site_id, category, type, source, component, interaction });
    } catch (error) {
        console.error('Failed to log scam attempt:', error);
    }
}