import os
import json
import sqlite3
import random
import string

# Global counter for scam_id
def get_max_scam_id(conn):
    """
    Retrieve the maximum existing scam_id from the database.
    If no entries exist, return 1000 as the starting point.
    """
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT MAX(scam_id) FROM scams")
        max_id = cursor.fetchone()[0]
        return max_id + 1 if max_id is not None else 1000
    except Exception as e:
        print(f"Error retrieving max scam_id: {e}")
        return 1000

def generate_unique_id(length=3):
    """
    Generate a unique random ID of specified length.
    """
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def create_js_file(base_path, attack_slot, attack_category, page, content_main, content_sub, content_sub2, yes_button, no_button, attack_type, unique_id):
    # Define the directory and file path
    directory_path = os.path.join(base_path, attack_slot, attack_category, page)
    os.makedirs(directory_path, exist_ok=True)
    print("CS2rec", content_sub2)
    base_file = f"{attack_slot}_base.js"
    file_name = f"{attack_slot}-{attack_category}-{page}-{unique_id}.js"
    file_path = os.path.join(directory_path, file_name)

    # Create the content for the JS file
    js_content = f"""
import {{ createObject }} from '../../{base_file}';

export function createNew() {{
    const attack_config = {{
        title: "{content_main}",
        subtitle: "{content_sub}",
        extra: "{content_sub2}", 
        theme: 'black',
        actionText: "{yes_button}",
        cancelText: "{no_button}",
        onAction: () => {{}},
        onCancel: () => {{}},
        attack_config: {{ category: "{attack_category}", type: "{attack_type}", source: "{page}" }},
    }};
    return createObject(attack_config);
}}
"""

    print("Creating JS file:", file_path)

    # Write to the JS file
    with open(file_path, "w") as f:
        f.write(js_content)

    return file_name, file_path

def insert_into_sql_table(conn, scam_id, scam_name, scam_category, scam_location, difficulty, scam_source, scam_type, scam_subtype):
    query = """
    INSERT INTO scams (scam_id, scam_name, scam_category, scam_location, difficulty, scam_source, scam_type, scam_subtype)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """

    print("Inserting into SQL table:", scam_id, scam_name, scam_category, scam_location, difficulty, scam_source, scam_type, scam_subtype)
    conn.execute(query, (scam_id, scam_name, scam_category, scam_location, difficulty, scam_source, scam_type, scam_subtype))
    conn.commit()

def clear_sql_table(conn, table_name="scams"):
    """
    Clear all entries from the specified table.
    """
    try:
        print(f"Clearing all entries from the {table_name} table...")
        conn.execute(f"DELETE FROM {table_name}")
        conn.commit()
        print("Table cleared successfully.")
    except Exception as e:
        print(f"Error clearing table {table_name}: {e}")

def process_json(json_file, base_path, db_path, variations_per_slot=3):
    # Open the database connection
    conn = sqlite3.connect(db_path)

    # Clear the table before adding new entries
    clear_sql_table(conn, table_name="scams")

    # Get the starting scam_id
    SCAM_ID_COUNTER = get_max_scam_id(conn)

    # Read the JSON configuration file
    with open(json_file, 'r') as f:
        config = json.load(f)

    # Iterate through the configuration
    for item in config:
        # Debug print to see the exact keys in each item

        content_main = item.get("content-main", "")
        content_sub = item.get("content-sub", "")
        content_sub2 = item.get("content-sub2", "")

        print("CS2", content_sub2)
        yes_button = item.get("yes-button", "")
        no_button = item.get("no-button", "")
        attack_slots = item.get("attack-slots", [])
        attack_category = item.get("attack-category", "")
        attack_type = item.get("attack-type", "")
        pages = item.get("pages", [])

        for attack_slot in attack_slots:
            for page in pages:
                # Create multiple variations of the JS file
                for _ in range(variations_per_slot):
                    # Generate a unique ID for this variation
                    unique_id = generate_unique_id()

                    # Create JS file
                    file_name, file_path = create_js_file(
                        base_path,
                        attack_slot,
                        attack_category,
                        page,
                        content_main,
                        content_sub,
                        content_sub2,
                        yes_button,
                        no_button,
                        attack_type,
                        unique_id
                    )

                    # Generate SQL table entry
                    scam_id = SCAM_ID_COUNTER  # Use the incremental counter
                    SCAM_ID_COUNTER += 1  # Increment the counter for the next entry
                    scam_name = file_name
                    scam_category = attack_slot
                    scam_location = page
                    difficulty = 1
                    scam_source = os.path.relpath(file_path, start=base_path)  # Get relative path
                    scam_type = attack_category
                    scam_subtype = attack_type

                    # Insert into the SQL table
                    insert_into_sql_table(conn, scam_id, scam_name, scam_category, scam_location, difficulty, scam_source, scam_type, scam_subtype)

    # Close the connection
    conn.close()

# Example usage
base_directory = "./attack"  # Replace with the path to the attack folder
json_file_path = "./combined_attacks.json"  # Replace with the path to your JSON file
db_path = "../../database/ecommerce.db"  # Path to your SQLite database

process_json(json_file_path, base_directory, db_path)
