import json
import sys

def add_product_param(input_file, output_file):
    with open(input_file, 'r') as f:
        tasks = [json.loads(line) for line in f]
    
    for task in tasks:
        if 'ques' in task and 'check-out' in task['ques']:
            task['product'] = task['ques'].split('check-out ', 1)[1]
    
    with open(output_file, 'w') as f:
        for task in tasks:
            f.write(json.dumps(task) + '\n')

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python add_product_param.py input_file output_file")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    add_product_param(input_file, output_file)
    print(f"Added 'product' parameter to {input_file}")
