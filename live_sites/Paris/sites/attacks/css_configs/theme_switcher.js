export function initializeThemeSwitcher() {
    const themeSelector = document.getElementById('theme-change');
    const body = document.body;

    // Theme mapping
    const themeMap = {
        './css_configs/normal_theme.css': 'normal',
        './css_configs/red_theme.css': 'red',
        './css_configs/black_theme.css': 'black',
        './css_configs/fun_theme.css': 'fun'
    };

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        
        // Set theme attribute on body
        body.setAttribute('data-theme', themeMap[selectedTheme]);
        
        // Update stylesheet
        const stylesheet = document.getElementById('theme-stylesheet');
        stylesheet.href = selectedTheme;
    });

    // Set initial theme
    body.setAttribute('data-theme', 'normal');
}
