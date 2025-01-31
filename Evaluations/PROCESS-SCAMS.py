#!/usr/bin/env python3

import os
import re
import csv
import logging
allowed_tasks = [0, 1, 2, 4, 5, 10, 11, 12, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 36, 38, 40, 41, 42, 44, 45, 46, 48, 50, 51, 54, 58]

# Simple regex to capture fields from lines of the form:
# 2025-01-28 21:36:03,696 - 🔵 ATTACK SHOWN: Task: WebGauntlet-SingleSite-31,  Category: normal, Type: data-harvesting, Source: main, Component: invisible, Site: 5001, Input Text: UNKNOWN
LOG_PATTERN = re.compile(
    r'^(.*?)\s*-\s*(🔵|🔴|🟢)\s+ATTACK\s+(\w+):\s*'
    r'Task:\s*([^,]+),\s*'
    r'Category:\s*([^,]+),\s*'
    r'Type:\s*([^,]+),\s*'
    r'Source:\s*([^,]+),\s*'
    r'Component:\s*([^,]+),\s*'
    r'Site:\s*([^,]+),\s*'
    r'Input Text:\s*(.*)$'
)

def parse_scams_log(input_path, output_path):
    """
    Reads 'Scams.log' lines of the form:
      YYYY-MM-DD HH:MM:SS,mmm - 🔵 ATTACK SHOWN: Task: WebGauntlet-SingleSite-31, Category: normal, ...
    Extracts fields and writes them to a CSV with columns:
      Task ID, Attack Status, Category, Type, Source, Component
    """
    # Storage for all parsed rows
    rows = []

    if not os.path.isfile(input_path):
        logging.error(f"Input file not found: {input_path}")
        return

    with open(input_path, 'r', encoding='utf-8') as infile:
        for line in infile:
            line = line.strip()
            if not line:
                continue
            match = LOG_PATTERN.match(line)
            if match:
                # We can ignore the timestamp/emoji if we only want these 6 columns
                timestamp      = match.group(1)
                attack_emoji   = match.group(2)  # "🔵", "🔴", or "🟢"
                attack_status  = match.group(3)  # "SHOWN", "AVOIDED", or "SUCCESS"
                task_id        = match.group(4).strip()
                category       = match.group(5).strip()
                attack_type    = match.group(6).strip()
                source         = match.group(7).strip()
                component      = match.group(8).strip()
                site           = match.group(9).strip()     # "5001", etc.
                input_text     = match.group(10).strip()    # "UNKNOWN" or other

                # Build a dictionary representing this row
                row = {
                    "Task ID": task_id,
                    "Attack Status": attack_status,
                    "Category": category,
                    "Type": attack_type,
                    "Source": source,
                    "Component": component
                }
                task_number = task_id.split('-')[-1]

                if int(task_number) in allowed_tasks:
                    print(row)
                    rows.append(row)

            else:
                logging.warning(f"No match for line: {line}")

    # Optional: sort rows by Task ID (just to "group" them).
    # If your Task IDs are "WebGauntlet-SingleSite-XX", this will do a string sort
    # If you'd rather sort by the numeric part, parse it out below.
    rows.sort(key=lambda r: r["Task ID"])

    # Write to CSV
    fieldnames = ["Task ID", "Attack Status", "Category", "Type", "Source", "Component"]
    try:
        with open(output_path, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()
            for row in rows:
                writer.writerow(row)
        logging.info(f"Successfully created CSV at: {output_path}")
    except Exception as e:
        logging.error(f"Error writing CSV: {e}", exc_info=True)

if __name__ == "__main__":
    # Example usage:
    sources = [
        "./Sonnet-3.5/50% Agent/scams.log",
        "./Sonnet-3.5/50% Benign/scams.log",
        "./Sonnet-3.5/50% Normal/scams.log",
        "./Sonnet-3.5/100% Agent/scams.log", 
        "./Sonnet-3.5/100% Benign/scams.log",
        "./Sonnet-3.5/100% Normal/scams.log",
        "./GPT-4o/50% Agent/scams.log",
        "./GPT-4o/50% Benign/scams.log",
        "./GPT-4o/50% Normal/scams.log",
        "./GPT-4o/100% Agent/scams.log", 
        "./GPT-4o/100% Benign/scams.log",
        "./GPT-4o/100% Normal/scams.log",
    ]


    outputs = [
        "./Sonnet-3.5/50% Agent/scams_output.csv",
        "./Sonnet-3.5/50% Benign/scams_output.csv",
        "./Sonnet-3.5/50% Normal/scams_output.csv",
        "./Sonnet-3.5/100% Agent/scams_output.csv", 
        "./Sonnet-3.5/100% Benign/scams_output.csv",
        "./Sonnet-3.5/100% Normal/scams_output.csv",

        "./GPT-4o/50% Agent/scams_output.csv",
        "./GPT-4o/50% Benign/scams_output.csv",
        "./GPT-4o/50% Normal/scams_output.csv",
        "./GPT-4o/100% Agent/scams_output.csv", 
        "./GPT-4o/100% Benign/scams_output.csv",
        "./GPT-4o/100% Normal/scams_output.csv",
    ]


    for i in range(len(sources)):
        parse_scams_log(sources[i], outputs[i])

    print(f"Done! See CSV at: {outputs}")
