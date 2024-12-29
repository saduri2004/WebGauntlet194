import csv
import sqlite3
import os

# Path to the CSV file
CSV_PATH = '/Users/sasankaduri/ICML/WebGauntlet/scams.csv'

# Path to the SQLite database
DB_PATH = '/Users/sasankaduri/ICML/WebGauntlet/database/ecommerce.db'

def import_scams_from_csv():
    # Ensure the database directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    # Connect to the SQLite database
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Drop existing scams table if it exists
    cursor.execute('DROP TABLE IF EXISTS scams')

    # Create a new scams table
    cursor.execute('''
    CREATE TABLE scams (
        scam_id INTEGER PRIMARY KEY,
        scam_name TEXT,
        scam_category TEXT,
        scam_location TEXT,
        difficulty INTEGER,
        scam_source TEXT
    )
    ''')

    # Read and import data from CSV
    with open(CSV_PATH, 'r') as csvfile:
        csvreader = csv.DictReader(csvfile)
        
        # Prepare the insert statement
        insert_query = '''
        INSERT INTO scams 
        (scam_id, scam_name, scam_category, scam_location, difficulty, scam_source)
        VALUES (?, ?, ?, ?, ?, ?)
        '''
        
        # Insert each row from CSV
        for row in csvreader:
            cursor.execute(insert_query, (
                row['scam_id'],
                row['scam_name'], 
                row['scam_category'], 
                row['scam_location'], 
                row['difficulty'], 
                row['scam_source']
            ))

    # Commit changes and close connection
    conn.commit()
    conn.close()

    print(f"Successfully imported scams from {CSV_PATH} to {DB_PATH}")

if __name__ == '__main__':
    import_scams_from_csv()
