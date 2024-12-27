# WebGauntlet E-Commerce Testing Environment

## Project Overview
WebGauntlet is a multi-site e-commerce testing framework designed to simulate various web environments for agent research and testing.

## Setup and Installation

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation Steps
1. Clone the repository
2. Create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application
1. Start the Flask development server:
   ```bash
   python app.py
   ```

2. Open a web browser and navigate to:
   ```
   http://localhost:5000
   ```

### Project Structure
- `app.py`: Flask backend serving database content
- `ecommerce.db`: SQLite database
- `sites/`: Contains different site configurations
- `database/`: Database creation and import scripts

## Development Notes
- The application uses SQLite for data storage
- Flask serves both static files and API endpoints
- Each site configuration provides a unique e-commerce environment

## Troubleshooting
- Ensure all dependencies are installed
- Check that the database path is correct
- Verify Python version compatibility


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
