document.addEventListener('DOMContentLoaded', () => {
    const attackTypeElement = document.getElementById('attackType');
    const attackSourceElement = document.getElementById('attackSource');

    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get attack details from URL parameters
    const attackType = getUrlParameter('type');
    const attackSource = getUrlParameter('source');

    // Update the display
    attackTypeElement.textContent = attackType || 'Unknown';
    attackSourceElement.textContent = attackSource || 'Unknown';

    // Log for debugging
    console.log('Attack Type:', attackType);
    console.log('Attack Source:', attackSource);
});
