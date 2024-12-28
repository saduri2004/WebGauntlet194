import os
import re
import sqlite3

def extract_description(file_path):
    """Try to extract description from the file."""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            # Look for docstring or comment at the top of the file
            match = re.search(r'(""".*?"""|\'\'\'.*?\'\'\'|//.*|/\*.*?\*/)', content, re.DOTALL)
            if match:
                desc = match.group(1).strip('"\'\n/*/')
                return desc.split('\n')[0] if '\n' in desc else desc
    except Exception:
        pass
    return "No description available"

def generate_scams_table():
    # Path to the attacks directory
    attacks_dir = "/Users/sasankaduri/ICML/WebGauntlet/attacks"
    
    # Scam categories and locations to ignore
    ignore_dirs = {'css_configs', 'old', 'test.js', 'scam_manager.js', 'adslot_base.js', 'banner_base.js', 'popup_base.js'}
    
    # Prepare database
    conn = sqlite3.connect("/Users/sasankaduri/ICML/WebGauntlet/database/ecommerce.db")
    cursor = conn.cursor()
    
    # Drop and recreate scams table with exact columns
    cursor.execute('''DROP TABLE IF EXISTS scams''')
    cursor.execute('''CREATE TABLE scams (
        scam_name TEXT PRIMARY KEY,
        scam_category TEXT,
        scam_description TEXT,
        scam_location TEXT,
        difficulty_classification INTEGER,
        scam_source TEXT
    )''')

    # Walk through attacks directory
    for root, dirs, files in os.walk(attacks_dir):
        # Filter out ignored directories
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        
        for file in files:
            if file.endswith('.js') and file not in ignore_dirs:
                full_path = os.path.join(root, file)
                
                # Extract components
                relative_path = os.path.relpath(full_path, attacks_dir)
                path_parts = relative_path.split(os.path.sep)
                
                # Skip base files and irrelevant directories
                if len(path_parts) < 2 or any(part in ignore_dirs for part in path_parts):
                    continue
                
                # Determine category and location
                category = path_parts[0]
                location = path_parts[1] if len(path_parts) > 1 else 'unknown'
                
                # Scam name is the filename without .js
                scam_name = os.path.splitext(file)[0].replace('_', ' ').title()
                
                # Extract description
                description = extract_description(full_path)
                
                # Scam source is the full relative path
                scam_source = relative_path
                
                # Insert into database
                try:
                    cursor.execute('''INSERT INTO scams 
                        (scam_name, scam_category, scam_description, scam_location, difficulty_classification, scam_source) 
                        VALUES (?, ?, ?, ?, ?, ?)''', 
                        (scam_name, category, description, location, 1, scam_source)
                    )
                except sqlite3.IntegrityError:
                    # Handle duplicate scam names by appending a unique identifier
                    scam_name = f"{scam_name} ({category} {location})"
                    cursor.execute('''INSERT INTO scams 
                        (scam_name, scam_category, scam_description, scam_location, difficulty_classification, scam_source) 
                        VALUES (?, ?, ?, ?, ?, ?)''', 
                        (scam_name, category, description, location, 1, scam_source)
                    )

    # Commit and close
    conn.commit()
    conn.close()

    print("Scams table generated successfully!")

if __name__ == '__main__':
    generate_scams_table()
