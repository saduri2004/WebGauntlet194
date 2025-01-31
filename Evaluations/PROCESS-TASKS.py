import os
import csv
import json
import re
import logging

allowed_tasks = [0, 1, 2, 4, 5, 10, 11, 12, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 36, 38, 40, 41, 42, 44, 45, 46, 48, 50, 51, 54, 58]
# ---------------------------------------------------
# CONFIGURE LOGGING TO BOTH CONSOLE AND FILE
# ---------------------------------------------------
log_file_path = '/Users/sasankaduri/Desktop/WebGauntlet Results Final/webgauntlet_script_debug.log'
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file_path, mode='w', encoding='utf-8'),  # Log file
        logging.StreamHandler()  # Console
    ]
)

# ---------------------------------------------------
# REGEX FOR PARSING LOG LINES
# ---------------------------------------------------
# This should handle lines like:
# 2025-01-29 03:08:54,248 - Task: WebGauntlet-SingleSite-52, Product Purchased: {}, ...
# capturing product = "{}".
LOG_LINE_REGEX = re.compile(
    r"Task:\s*(WebGauntlet-SingleSite-\d+),\s*"
    r"Product Purchased:\s*(.*?)\s*,\s*"
    r"First Name:\s*(.*?)\s*,\s*"
    r"Last Name:\s*(.*?)\s*,\s*"
    r"Full Address:\s*(.*?)\s*,\s*"
    r"Card Name:\s*(.*?)\s*,\s*"
    r"Card Number:\s*(.*?)\s*,\s*"
    r"Card Expiry:\s*(.*?)\s*,\s*"
    r"Card CVV:\s*(.*)"
)

def parse_purchase_log(log_path):
    """
    Reads each line of 'webgauntletresults.log' at `log_path`.
    Returns a dict keyed by Task ID, e.g.:
      { 'WebGauntlet-SingleSite-36': { 'Purchase': True, 'Purchase Details': '...' }, ... }
    """
    purchases = {}

    if not os.path.isfile(log_path):
        msg = f"No log file found at: {log_path}"
        print(msg)
        logging.debug(msg)
        return purchases

    msg = f"parse_purchase_log: Reading from {log_path}"
    print(msg)
    logging.debug(msg)

    try:
        with open(log_path, 'r', encoding='utf-8') as f:
            line_count = 0
            match_count = 0
            for line in f:
                line_count += 1
                line_stripped = line.strip()
                logging.debug(f"Line {line_count}: {line_stripped}")
                
                match = LOG_LINE_REGEX.search(line_stripped)
                if match:
                    match_count += 1
                    task_id         = match.group(1).strip()
                    product         = match.group(2).strip()
                    first_name      = match.group(3).strip()
                    last_name       = match.group(4).strip()
                    address         = match.group(5).strip()
                    card_name       = match.group(6).strip()
                    card_number     = match.group(7).strip()
                    card_expiry     = match.group(8).strip()
                    card_cvv        = match.group(9).strip()

                    details = {
                        "Product": product,
                        "First-Name": first_name,
                        "Last-Name": last_name,
                        "Address": address,
                        "Card-Name": card_name,
                        "Card-Number": card_number,
                        "Card-Expiry": card_expiry,
                        "Card-CVV": card_cvv
                    }
                    purchases[task_id] = {
                        "Purchase": True,
                        "Purchase Details": json.dumps(details)
                    }
                    logging.debug(f"Matched purchase for {task_id}: {details}")

            msg = f"parse_purchase_log: Finished reading {line_count} lines. Found {match_count} purchase entries."
            print(msg)
            logging.info(msg)

    except Exception as e:
        logging.error(f"Error reading log '{log_path}': {e}", exc_info=True)

    return purchases


def create_csv_for_subfolder(subfolder_path):
    """
    1) Looks for 'webgauntletresults.log' in subfolder_path/data/.
    2) Parses all purchases found (if any).
    3) Produces 'results.csv' in subfolder_path with 76 tasks (0..75).
    """
    log_file = os.path.join(subfolder_path,  "webgauntletresults.log")
    msg = f"create_csv_for_subfolder: Checking for log at {log_file}"
    print(msg)
    logging.debug(msg)

    parsed_data = parse_purchase_log(log_file)

    # We'll do tasks 0..75 => 76 total
    rows = []
    for i in range(76):
        if i in allowed_tasks:
            print(i)
            task_id = f"WebGauntlet-SingleSite-{i}"
            if task_id in parsed_data:
                row = {
                    "Task ID": task_id,
                    "Purchase": True,
                    "Purchase Details": parsed_data[task_id]["Purchase Details"]
                }
            else:
                row = {
                    "Task ID": task_id,
                    "Purchase": False,
                    "Purchase Details": None
                }
            rows.append(row)

    # Write results.csv in subfolder_path
    output_csv = os.path.join(subfolder_path, 'results.csv')
    try:
        msg = f"Writing CSV with {len(rows)} rows -> {output_csv}"
        print(msg)
        logging.info(msg)

        fieldnames = ["Task ID", "Purchase", "Purchase Details"]
        with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for row in rows:
                writer.writerow(row)

        msg = f"Created CSV: {output_csv}"
        print(msg)
        logging.info(msg)
    except Exception as e:
        msg = f"Error writing CSV to '{output_csv}': {e}"
        print(msg)
        logging.error(msg, exc_info=True)


def main():
    base_dir = '/Users/sasankaduri/Desktop/WebGauntlet Results Final'
    msg = f"Starting script. Base dir: {base_dir}"
    print(msg)
    logging.info(msg)

    # Example structure:
    # base_dir/
    #   GPT-4o/
    #       50% Agent/
    #           data/
    #               webgauntletresults.log
    #   Sonnet-3.5/
    #       50% Agent/
    #           data/
    #               webgauntletresults.log

    if not os.path.isdir(base_dir):
        msg = f"Base directory does not exist: {base_dir}"
        print(msg)
        logging.error(msg)
        return

    for model_name in os.listdir(base_dir):
        model_path = os.path.join(base_dir, model_name)
        if not os.path.isdir(model_path):
            msg = f"Skipping non-directory: {model_path}"
            print(msg)
            logging.debug(msg)
            continue

        msg = f"Processing model: {model_path}"
        print(msg)
        logging.info(msg)

        for run_type_dir in os.listdir(model_path):
            subfolder_path = os.path.join(model_path, run_type_dir)
            if not os.path.isdir(subfolder_path):
                msg = f"Skipping non-directory: {subfolder_path}"
                print(msg)
                logging.debug(msg)
                continue

            msg = f"Processing subfolder: {subfolder_path}"
            print(msg)
            logging.info(msg)

            create_csv_for_subfolder(subfolder_path)


if __name__ == '__main__':
    main()
