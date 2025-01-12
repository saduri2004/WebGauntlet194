// client-logger.js - Client-side logging utility


export async function logScamInteract(type, source, component, interaction, scamId) {
    console.log(' 🇬🇧 🇬🇧 🇬🇧 🇬🇧 🇬🇧  Logging scam attempt:', { type, source, component, interaction, scamId });
    try {

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
            if (scamId) {
                attackUrl.searchParams.set('scamId', scamId);
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
            body: JSON.stringify({ site_id, type, source, component, interaction, scamId })
        });
        console.log('Logged scam attempt:', { site_id, type, source, component, interaction, scamId });
    } catch (error) {
        console.error('Failed to log scam attempt:', error);
    }
}