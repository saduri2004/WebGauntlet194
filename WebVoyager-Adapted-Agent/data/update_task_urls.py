import json

def update_jsonl_file(input_file, output_file=None):
    """
    Update JSONl file by adding a 'task_url' field to each task.
    
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
                
                # Generate task URL
                task_id = task.get('id', '')
                task['task_url'] = f"http://localhost:3000?task={task_id}"
                
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
    # Paths to input JSONl files
    multi_site_tasks_path = '/Users/sasankaduri/webvoyager-test/WebVoyager/data/multi-site-tasks.jsonl'
    
    # Update both JSONl files
    update_jsonl_file(multi_site_tasks_path)

if __name__ == "__main__":
    main()
