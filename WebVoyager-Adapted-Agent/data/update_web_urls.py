import json

def update_jsonl_file(input_file, output_file=None):
    """
    Update JSONl file by setting 'web' to 'task_url' and removing 'task_url' field.
    
    :param input_file: Path to the input JSONl file
    :param output_file: Path to the output JSONl file (optional, defaults to overwriting input file)
    """
    if output_file is None:
        output_file = input_file
    
    updated_tasks = []
    
    # Read the input JSONl file
    with open(input_file, 'r') as f:
        for line in f:
            try:
                task = json.loads(line.strip())
                
                # Set 'web' to 'task_url' if it exists
                if 'task_url' in task:
                    task['web'] = task['task_url']
                    del task['task_url']
                
                updated_tasks.append(task)
                
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")
                continue
    
    # Write updated tasks to output file
    with open(output_file, 'w') as f:
        for task in updated_tasks:
            f.write(f"{json.dumps(task)}\n")
    
    print(f"Updated tasks saved to {output_file}")
    return updated_tasks

def main():
    # Paths to input JSONl files to update
    files_to_update = [
        '/Users/sasankaduri/webvoyager-test/WebVoyager/data/multi-site-tasks.jsonl',
        '/Users/sasankaduri/webvoyager-test/WebVoyager/data/tasks_test.jsonl'
    ]
    
    # Update each file
    for file_path in files_to_update:
        update_jsonl_file(file_path)

if __name__ == "__main__":
    main()
