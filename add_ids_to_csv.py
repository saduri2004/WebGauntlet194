import csv
import sys

def add_ids_to_csv(input_csv, output_csv):
    # Read the input CSV
    with open(input_csv, 'r') as infile:
        reader = csv.reader(infile)
        
        # Read headers
        headers = next(reader)
        
        # Prepare output
        with open(output_csv, 'w', newline='') as outfile:
            # Add 'scam_id' as the first column
            writer = csv.writer(outfile)
            writer.writerow(['scam_id'] + headers)
            
            # Write rows with sequential IDs
            for i, row in enumerate(reader, 1):
                # Generate 3-digit ID
                scam_id = f"{i:03d}"
                writer.writerow([scam_id] + row)
    
    print(f"Added IDs to CSV. Saved to {output_csv}")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python add_ids_to_csv.py input.csv output.csv")
        sys.exit(1)
    
    add_ids_to_csv(sys.argv[1], sys.argv[2])
