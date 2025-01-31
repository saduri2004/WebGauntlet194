import os
import csv
import re
import traceback
import json

def extract_last_iter(log_path):
    try:
        with open(log_path, 'r') as f:
            lines = f.readlines()
            # Reverse the lines and find the first match
            for line in reversed(lines):
                match = re.search(r'INFO - Iter: (\d+)', line)
                if match:
                    return match.group(1)
    except Exception as e:
        print(f"Error processing {log_path}: {e}")
        traceback.print_exc()
    return None

def process_directory(base_dir):
    results = []
    print(f"Processing directory: {base_dir}")
    
    # Expand the search pattern to catch more task ID formats
    task_patterns = [
        r'WebGauntlet-SingleSite-(\d+)',  # Numeric part of the task ID
        r'task-(\d+)',  # More generic pattern
        r'task(\d+)'    # Another possible pattern
    ]
    
    log_files_found = 0
    for root, dirs, files in os.walk(base_dir):
        if 'agent.log' in files:
            log_files_found += 1
            log_path = os.path.join(root, 'agent.log')
            
            # Try multiple task ID extraction patterns
            task_id = None
            task_match = re.search(r'WebGauntlet-SingleSite-(\d+)', root)
            if task_match:
                task_id = task_match.group(1)
            
            if task_id is None:
                print(f"No task ID found in path: {root}")
                continue
            
            iter_num = extract_last_iter(log_path)
            if iter_num is not None:
                results.append({
                    'task': int(task_id),  # Convert to integer
                    'iterations': int(iter_num) + 1  # Add 1 to account for 0-indexing
                })
    
    print(f"Total log files found: {log_files_found}")
    print(f"Tasks extracted: {len(results)}")
    
    # Sort results by task number
    results.sort(key=lambda x: x['task'])
    return results

def write_dict(results, output_path):
    try:
        # Convert results to a dictionary with task as key
        results_dict = {result['task']: result['iterations'] for result in results}
        
        with open(output_path, 'w') as jsonfile:
            json.dump(results_dict, jsonfile, indent=4)
        print(f"Successfully wrote {len(results)} tasks to {output_path}")
    except Exception as e:
        print(f"Error writing to {output_path}: {e}")
        traceback.print_exc()

# Fix the inputs list by adding the missing comma
inputs = [
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-agent-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-agent-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-benign-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-benign-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-normal-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-normal-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-0',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-agent-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-agent-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-benign-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-benign-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-normal-100',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-normal-50',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-0'
]

outputs = [
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-agent-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-agent-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-benign-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-benign-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-normal-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-normal-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/openai-0/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-agent-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-agent-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-benign-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-benign-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-normal-100/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-normal-50/steps.json',
    '/Users/sasankaduri/webvoyager-test/WebVoyager/final-results/sonnet-0/steps.json'
]

for i in range(len(inputs)):
    base_dir = inputs[i]
    output_path = outputs[i]
    results = process_directory(base_dir)
    write_dict(results, output_path)
