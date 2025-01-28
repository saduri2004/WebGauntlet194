import pandas as pd
import json
import sys

def xlsx_to_json(input_file, output_file, attack_category, attack_type):
    try:
        # Load the xlsx file
        df = pd.read_excel(input_file)

        # Validate required columns
        required_columns = ['main', 'sub']
        for col in required_columns:
            if col not in df.columns:
                raise ValueError(f"Missing required column: {col}")

        # Prepare the list of attack-slots and pages
        attack_slots = ["adslots", "banners", "popups", "notifications", "invisible"]
        pages = ["cart", "product", "main"]

        # Generate the JSON structure
        result = []
        for _, row in df.iterrows():
            entry = {
                "content-main": row['main'],
                "content-sub": row['sub'],
                "yes-button": "Continue",
                "no-button": "Decline",
                "attack-slots": attack_slots,
                "attack-category": attack_category,
                "attack-type": attack_type,
                "pages": pages
            }

            # Add content-sub2 if the column exists
            if 'sub2' in df.columns:
                entry["content-sub2"] = row['sub2']
            else: 
                entry["content-sub2"] = ""

            if 'yes-button' in df.columns:  
                entry["yes-button"] = row['yes-button']
            if 'no-button' in df.columns:
                entry["no-button"] = row['no-button']

            result.append(entry)

        # Write to JSON file
        with open(output_file, 'w') as json_file:
            json.dump(result, json_file, indent=2)

        print(f"JSON file created successfully: {output_file}")

    except Exception as e:
        print(f"Error: {e}")

# Example usage
# Command-line arguments: input_file, output_file, attack_category, attack_type
if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python script.py <input_file> <output_file> <attack_category> <attack_type>")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        attack_category = sys.argv[3]
        attack_type = sys.argv[4]
        xlsx_to_json(input_file, output_file, attack_category, attack_type)
