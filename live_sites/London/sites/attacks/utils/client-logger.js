// client-logger.js - Client-side logging utility

export async function logScamAttempt(type, source, component) {
    try {
        await fetch('http://localhost:8080/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, source, component })
        });
        console.log('Logged scam attempt:', { type, source, component });
    } catch (error) {
        console.error('Failed to log scam attempt:', error);
    }
}
