# WebGauntlet Multi-Site Deployment Framework

## Overview
WebGauntlet is a flexible e-commerce platform that supports deploying multiple sites dynamically from a single codebase.

## Key Features
- Dynamic site deployment based on database configuration
- Isolated Flask applications for each site
- Centralized management of site configurations
- Automatic port assignment

## Deployment Process

### Prerequisites
- Python 3.8+
- Flask
- SQLite

### Deployment Steps
1. Configure sites in the `sites` table of `ecommerce.db`
2. Run the deployment script:
   ```bash
   python deploy_sites.py deploy
   ```

### Site Configuration
Each site is configured in the `sites` table with:
- `site_name`: Unique identifier for the site
- `site_id`: Numeric identifier
- `base_port`: Optional base port for the site (auto-assigned if not specified)

### Accessing Deployed Sites
- Home Page: `http://localhost:5000`
  - Lists all deployed sites with links
- Individual Sites: `http://localhost:5010`, `http://localhost:5011`, etc.

## Development Notes
- Each site gets its own Flask application
- Site-specific routing and configurations are supported
- Database connections are site-aware

## Stopping Deployment
```bash
python deploy_sites.py stop
```

## Troubleshooting
- Ensure database path is correct
- Check logs for deployment errors
- Verify site configurations in the database

WebGauntlet/
│
├── malicious_components/
│   ├── popups/
│   │   ├── phishing_popup.js
│   │   ├── discount_popup.js
│   │   ├── attack_popup.js
│   │   └── popup.css
│   │
│   ├── banners/
│   │   ├── fake_trust_banner.js
│   │   ├── countdown_banner.js
│   │   └── banner.css
│   │
│   ├── invisible/
│   │   ├── hidden_text.js
│   │   ├── hidden_links.js
│   │   └── invisible.css
│   │
│   ├── phishing_forms/
│   │   ├── login_form.js
│   │   ├── account_confirmation_form.js
│   │   └── forms.css
│   │
│   ├── dynamic_content/
│   │   ├── price_changer.js
│   │   ├── stock_countdown.js
│   │   └── dynamic.css
│   │
│   ├── fake_reviews/
│   │   ├── review_generator.js
│   │   ├── fake_user_profiles.js
│   │   └── reviews.css
│   │
│   ├── redirects/
│   │   ├── auto_redirect.js
│   │   ├── hover_redirect.js
│   │   └── redirect.css
│   │
│   └── README.md
│
└── app.js
