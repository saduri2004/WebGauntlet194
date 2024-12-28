import sqlite3
import csv
import sys

def export_table_to_csv(db_path, table_name, output_csv):
    """Export a SQLite table to a CSV file."""
    # Connect to the SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get column names
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = [column[1] for column in cursor.fetchall()]

    # Fetch all data
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()

    # Write to CSV
    with open(output_csv, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        # Write headers
        csvwriter.writerow(columns)
        # Write data
        csvwriter.writerows(rows)

    conn.close()
    print(f"Exported {len(rows)} rows to {output_csv}")

def import_csv_to_table(db_path, table_name, input_csv):
    """Import a CSV file back to a SQLite table."""
    # Connect to the SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Read CSV
    with open(input_csv, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        # Get column names from first row
        columns = next(csvreader)

        # Drop and recreate the table with ID
        cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
        create_table_sql = f"""CREATE TABLE {table_name} (
            scam_id TEXT PRIMARY KEY,
            scam_name TEXT,
            scam_category TEXT,
            scam_description TEXT,
            scam_location TEXT,
            difficulty_classification INTEGER,
            scam_source TEXT,
            UNIQUE(scam_name, scam_category, scam_location)
        )"""
        cursor.execute(create_table_sql)

        # Prepare the INSERT statement dynamically
        placeholders = ','.join(['?' for _ in columns])
        insert_sql = f"INSERT INTO {table_name} VALUES ({placeholders})"

        # Insert rows
        rows_inserted = 0
        for row in csvreader:
            try:
                cursor.execute(insert_sql, row)
                rows_inserted += 1
            except sqlite3.IntegrityError:
                print(f"Skipping duplicate entry: {row}")

        # Commit changes
        conn.commit()
        conn.close()

        print(f"Imported {rows_inserted} rows from {input_csv}")

def main():
    if len(sys.argv) < 4:
        print("Usage:")
        print("To export: python sqlite_csv_manager.py export /path/to/database.db table_name /path/to/output.csv")
        print("To import: python sqlite_csv_manager.py import /path/to/database.db table_name /path/to/input.csv")
        sys.exit(1)

    action = sys.argv[1]
    db_path = sys.argv[2]
    table_name = sys.argv[3]
    file_path = sys.argv[4]

    if action == 'export':
        export_table_to_csv(db_path, table_name, file_path)
    elif action == 'import':
        import_csv_to_table(db_path, table_name, file_path)
    else:
        print("Invalid action. Use 'export' or 'import'.")

if __name__ == '__main__':
    main()
