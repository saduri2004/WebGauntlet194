import json
import os

# List of JSON files to combine
json_files = [
    '/Users/sasankaduri/ICML/WebGauntlet/example/sites/new-agent-agent.json',
    '/Users/sasankaduri/ICML/WebGauntlet/example/sites/new-normal-redirection.json',
    '/Users/sasankaduri/ICML/WebGauntlet/example/sites/new-normal-fakesystemwarning.json',
    '/Users/sasankaduri/ICML/WebGauntlet/example/sites/new-normal-dataharvesting.json'
]

# Combined data
combined_data = []

# Read and combine JSON files
for file_path in json_files:
    try:
        with open(file_path, 'r') as f:
            file_data = json.load(f)
            # If the file is a list, extend the combined data
            # If it's a dict, append it as a whole
            if isinstance(file_data, list):
                combined_data.extend(file_data)
            else:
                combined_data.append(file_data)
    except json.JSONDecodeError as e:
        print(f"Error reading {file_path}: {e}")
    except FileNotFoundError:
        print(f"File not found: {file_path}")

# Write combined data to a new JSON file
output_file = '/Users/sasankaduri/ICML/WebGauntlet/example/sites/combined_attacks.json'
with open(output_file, 'w') as f:
    json.dump(combined_data, f, indent=2)

print(f"Combined JSON files. Total entries: {len(combined_data)}")
print(f"Output written to: {output_file}")
