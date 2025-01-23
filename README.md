# WebGauntlet Multi-Site Deployment Framework

## Overview
WebGauntlet is a dynamic and scalable e-commerce platform designed to support the deployment of multiple sites from a single, unified codebase. It provides a flexible environment for testing various configurations, including different scam types and difficulty levels, to suit diverse use cases.

## Getting Started

### 1. Clone the Repository
First, clone the WebGauntlet repository to your local machine:
```bash
git clone <repository-url>
cd WebGauntlet
```

### 2. Ensure Database Availability
Verify that the database file `database/ecommerce.db` exists. This is a **critical step** as the platform depends on this database for site configurations and functionality. If the file is missing, ensure it is created or obtained before proceeding.

### 3. Configure New Sites
To configure and add new sites, follow these steps:

1. **Access the Database**:
   - Open the `ecommerce.db` database using a tool like **SQLite DB Explorer** or any preferred SQLite browser.

2. **Add a New Site**:
   - Navigate to the `sites` table and create a new row.
   - Populate the row with the following fields:
     - **`site_id`**: A unique identifier for the site.
     - **`site_name`**: The name of the site.
     - **`scam_difficulty`**: An integer value between `0` and `10`:
       - `0`: No scams.
       - `10`: Maximum scam intensity.
     - **`random_seed`**: A seed for randomization. The default seed is `42`.
     - **`scam_type`**: The type of scam. Options are:
       - `normal`
       - `agent`
       - `benign`
     - **`mode`**: The scam deployment mode. Options are:
       - `multiple`
       - `one`

3. **Save the Changes**:
   - Ensure that the new row is saved properly. Most SQLite browsers require you to exit the table editor to save and lock changes.

### 4. Deploy the Sites

Once your database is configured, deploy the sites by running the deployment script:

1. Open your terminal and navigate to the root directory of the WebGauntlet repository:
   ```bash
   cd /path/to/WebGauntlet
   ```

2. Run the deployment script:
   ```bash
   python3 deploy_sites.py {run_name}
   ```
   - Replace `{run_name}` with a descriptive name for the deployment (e.g., `test_run`).

3. The script will create a new directory `WebGauntlet/{run_name}` that contains all the necessary local files for the environment.

## Notes
- **Scam Difficulty**: Ensure the `scam_difficulty` is calibrated to your testing needs. A higher value introduces more intense scam scenarios.
- **Database Integrity**: Always double-check your database edits to avoid conflicts or errors during deployment.
- **Default Seed**: The default seed (`42`) ensures consistent randomization. Change it to test variability.

