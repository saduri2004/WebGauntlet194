#!/bin/bash

# Ensure GNU Parallel is installed
# You may need to install it first with: brew install parallel

# Debugging: Print script arguments and environment
echo "Script arguments: $@"
echo "Current working directory: $(pwd)"
echo "Listing data directory:"
ls -l ./data/

# Define the input files and API keys
INPUT_FILES=(
    "./data/tasks_test_1.jsonl"
    # "./data/tasks_test_2.jsonl"
    # "./data/tasks_test_3.jsonl"
    # "./data/tasks_test_4.jsonl"
    # "./data/tasks_test_5.jsonl"
    # "./data/tasks_test_6.jsonl"
    # "./data/tasks_test_7.jsonl"
    # "./data/tasks_test_8.jsonl"
    # "./data/tasks_test_9.jsonl"
    # "./data/tasks_test_10.jsonl"
    # "./data/tasks_test_11.jsonl"
    # "./data/tasks_test_12.jsonl"
    # "./data/tasks_test_13.jsonl"
    # "./data/tasks_test_14.jsonl"
    # "./data/tasks_test_15.jsonl"
    # "./data/tasks_test_16.jsonl"
    # "./data/tasks_test_17.jsonl"
    # "./data/tasks_test_18.jsonl"
    # "./data/tasks_test_19.jsonl"
    # "./data/tasks_test_20.jsonl"
    # "./data/tasks_test_21.jsonl"
    # "./data/tasks_test_22.jsonl"
    # "./data/tasks_test_23.jsonl"
    # "./data/tasks_test_24.jsonl"
    # "./data/tasks_test_25.jsonl"
    # "./data/tasks_test_26.jsonl"
    # "./data/tasks_test_27.jsonl"
    # "./data/tasks_test_28.jsonl"
    # "./data/tasks_test_29.jsonl"
    # "./data/tasks_test_30.jsonl"

)
API_KEYS=(

    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"
    "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"
    "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"
    "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"
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"   
    "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"
)

# Function to run the Python script
run_script() {
    local input_file="$1"
    local api_key="$2"
    local log_file="test_tasks_$(basename "$input_file" .jsonl).log"
    
    echo "Running script with input file: $input_file"
    echo "Log file will be: $log_file"
    
    python -u run.py \
        --test_file "$input_file" \
        --api_key "$api_key" \
        --max_iter 40 \
        --max_attached_imgs 3 \
        --temperature 1 \
        --fix_box_color \
        --api_model "gpt-4o" \
        --seed 42 > "$log_file" 2>&1
}

# Export the function so parallel can use it
export -f run_script

# Verify input files exist
for file in "${INPUT_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "Error: Input file $file does not exist!"
        exit 1
    fi
done

# Print input files to verify
echo "Running tasks from:"
printf '%s\n' "${INPUT_FILES[@]}"

# Ensure the files are different
if [ "${INPUT_FILES[0]}" == "${INPUT_FILES[1]}" ]; then
    echo "Error: Input files are the same!"
    exit 1
fi

# Start timing
start_time=$(date +%s)

# Run tasks in parallel
parallel -j 30 run_script {1} {2} ::: "${INPUT_FILES[@]}" :::+ "${API_KEYS[@]}"

# End timing
end_time=$(date +%s)
echo "Total execution time: $((end_time - start_time)) seconds"