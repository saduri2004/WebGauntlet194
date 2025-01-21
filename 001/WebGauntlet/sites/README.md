# WebGauntlet: Multi-Site E-Commerce Testing Environment

## Project Overview
WebGauntlet is a comprehensive testing framework designed to simulate multiple e-commerce environments for web agent research and development. This project provides a flexible, modular structure to test web agents under diverse and controlled conditions.

## Project Structure
- `index.html`: Entry point for selecting site configurations
- `sites/`: Main directory for site configurations
  - `site_config_1` to `site_config_5`: Individual site configurations
    - `index.html`: Site-specific landing page
    - `assets/`: Site-specific resources
      - `css/`: Stylesheets
      - `js/`: JavaScript files
      - `images/`: Site-specific images
    - `data/`: Site-specific data files (e.g., products)

  - `shared/`: Reusable assets across configurations
    - `css/global.css`: Global styling
    - `js/global.js`: Shared JavaScript utilities
    - `images/`: Shared images and logos

## Purpose
- Test web agents in varied e-commerce environments
- Simulate different UI/UX configurations
- Provide controlled testing scenarios
- Support research in web interaction and adversarial testing

## Setup and Usage
1. Clone the repository
2. Open `index.html` in a web browser
3. Select a site configuration to explore

## Contributing
- Ensure modularity and clear separation of concerns
- Add new site configurations as needed
- Maintain consistent documentation

## License
[Specify your license here]

## Contact
[Your contact information]
