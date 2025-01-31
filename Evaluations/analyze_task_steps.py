import os
import csv
import json
import glob
import re

# Load the allowed tasks from process_scams.py
with open('/Users/sasankaduri/Desktop/WebGauntlet Results Final/process_scams.py', 'r') as f:
    for line in f:
        if line.strip().startswith('allowed_tasks ='):
            allowed_tasks = eval(line.split('=')[1].strip())
            break

def load_task_steps_in_subfolder(subfolder_path):
    """
    Load steps.json from a given subfolder if it exists.
    Return a dictionary of task_id -> steps (list or int).
    """
    steps_file = os.path.join(subfolder_path, 'steps.json')
    if not os.path.isfile(steps_file):
        return {}
    
    try:
        with open(steps_file, 'r') as f:
            return json.load(f)  # {task_id: steps, ...}
    except (json.JSONDecodeError, IOError) as e:
        print(f"Error reading {steps_file}: {e}")
        return {}

def parse_accuracy_txt_in_subfolder(subfolder_path):
    """
    Look for accuracy.txt in this subfolder (and possibly sub-subfolders if needed),
    parse out the lines under 'Incorrect Details:' to find which tasks are incorrect.

    Returns:
        set of strings: e.g. {'4', '5', '17', ...} (the integer IDs that are incorrect)
    """
    incorrect_ids = set()
    
    # Find accuracy.txt (adjust if you only want the immediate subfolder)
    accuracy_files = glob.glob(os.path.join(subfolder_path, '**', 'accuracy.txt'), recursive=True)
    if not accuracy_files:
        return incorrect_ids  # empty => no incorrect tasks known
    
    for accuracy_path in accuracy_files:
        try:
            with open(accuracy_path, 'r') as f:
                lines = f.readlines()
        except IOError as e:
            print(f"Error reading {accuracy_path}: {e}")
            continue
        
        # The lines in "Incorrect Details:" look like:
        #   "  - WebGauntlet-SingleSite-4: Purchase=False"
        # We'll match them using a regex:
        #   "WebGauntlet-SingleSite-(\d+)"
        # or something similar
        found_incorrect_details = False
        
        for line in lines:
            # Once we find the line "Incorrect Details:", we parse subsequent lines.
            if "Incorrect Details:" in line:
                found_incorrect_details = True
                continue
            
            if found_incorrect_details:
                # Typically these lines start with "  - WebGauntlet-SingleSite-4..."
                # We'll use a regex to capture the trailing integer.
                match = re.search(r'WebGauntlet-SingleSite-(\d+)', line)
                if match:
                    # e.g. group(1) => "4"
                    incorrect_ids.add(match.group(1))
                
                # If there's a blank line or some other section, you might want to break
                # once you hit it. But it depends on the file structure.
                # For safety, let's keep scanning until the file ends or until
                # we see "Correct:" or "Accuracy:" or something else.
                
        # If there's more than one accuracy.txt in the subfolder, we combine results
    return incorrect_ids

def analyze_subfolder(subfolder_path):
    """
    Analyze tasks in a single subfolder:
      - Load steps.json
      - Filter tasks to allowed_tasks
      - Determine which tasks are incorrect based on accuracy.txt
      - Calculate average # of steps, etc.
      - Write an analysis.csv into the same subfolder.
    """
    task_steps_dict = load_task_steps_in_subfolder(subfolder_path)
    if not task_steps_dict:
        return  # No steps.json or it failed to load
    
    # Filter to allowed tasks only (cast the keys in the JSON to int for comparison)
    filtered_dict = {
        task_id: steps 
        for task_id, steps in task_steps_dict.items()
        if int(task_id) in allowed_tasks
    }
    
    if not filtered_dict:
        return  # No allowed tasks to analyze here
    
    # Parse accuracy.txt for incorrect tasks
    incorrect_ids = parse_accuracy_txt_in_subfolder(subfolder_path)
    
    # Prepare data for analysis
    results_per_task = []
    
    for task_id_str, steps_value in filtered_dict.items():
        # If the integer ID is in the set of incorrect, is_correct = False, else True
        is_correct = (task_id_str not in incorrect_ids)
        
        # steps_value might be an int or a list
        if isinstance(steps_value, list):
            step_count = len(steps_value)
        elif isinstance(steps_value, int):
            step_count = steps_value
        else:
            print(f"Warning: unexpected type for steps in task {task_id_str}: {type(steps_value)}")
            continue
        
        results_per_task.append((task_id_str, step_count, is_correct))
    
    if not results_per_task:
        return
    
    # Compute statistics
    total_tasks = len(results_per_task)
    correct_tasks = sum(1 for _, _, c in results_per_task if c)
    incorrect_tasks = total_tasks - correct_tasks
    
    sum_steps_overall = sum(step_count for _, step_count, _ in results_per_task)
    sum_steps_correct = sum(step_count for _, step_count, c in results_per_task if c)
    sum_steps_incorrect = sum(step_count for _, step_count, c in results_per_task if not c)
    
    avg_steps_overall = sum_steps_overall / total_tasks if total_tasks else 0
    avg_steps_correct = sum_steps_correct / correct_tasks if correct_tasks else 0
    avg_steps_incorrect = sum_steps_incorrect / incorrect_tasks if incorrect_tasks else 0
    
    # Write analysis CSV
    analysis_csv_path = os.path.join(subfolder_path, 'analysis.csv')
    with open(analysis_csv_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)


        # Blank line then summary
        writer.writerow([])

        writer.writerow(["Total Tasks", total_tasks])
        writer.writerow(["Correct Tasks", correct_tasks])
        writer.writerow(["Incorrect Tasks", incorrect_tasks])
        writer.writerow(["Average Steps (Overall)", avg_steps_overall])
        writer.writerow(["Average Steps (Correct Only)", avg_steps_correct])
        writer.writerow(["Average Steps (Incorrect Only)", avg_steps_incorrect])
        
    print(f"Analysis CSV written to: {analysis_csv_path}")

def main():
    # Hardcode the base directories for GPT-4o and Sonnet-3.5
    base_dirs = [
        '/Users/sasankaduri/Desktop/WebGauntlet Results Final/GPT-4o',
        '/Users/sasankaduri/Desktop/WebGauntlet Results Final/Sonnet-3.5'
    ]
    
    # For each base directory, find all subfolders
    for base_dir in base_dirs:
        subfolders = glob.glob(os.path.join(base_dir, '**'), recursive=True)
        subfolders = [sf for sf in subfolders if os.path.isdir(sf)]
        
        for subfolder in subfolders:
            analyze_subfolder(subfolder)

if __name__ == '__main__':
    main()
