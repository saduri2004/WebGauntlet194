import csv
from collections import defaultdict

def analyze_component_only(
    input_csv="attacks.csv",
    output_csv="component_metrics.csv"
):
    """
    1) Read the CSV, which has columns:
         Task ID, Attack Status, Category, Type, Source, Component
    2) Group lines by (Task ID, Category, Type, Source, Component) 
       => each synergy is 'one attack attempt'.
    3) For each synergy, final outcome is:
       - if SHOWN not present => ignore
       - if SUCCESS => success
       - else if AVOIDED => avoided
       - else => non-interacted
    4) Then sum these final outcomes by 'Component' only (ignoring Category, Type, Source).
    5) Compute rates:
       - total = success + avoided + non_interacted
       - success rate (overall) = success / total
       - avoid rate (overall)   = avoided / total
       - non-interaction rate   = non_interacted / total
       - success rate (interacted) = success / (success + avoided)
       - avoid rate (interacted)   = avoided / (success + avoided)
    6) Output a single CSV with those columns.
    """

    # 1) Read CSV
    rows = []
    with open(input_csv, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)

    # 2) Build synergy key => (TaskID, Category, Type, Source, Component).
    #    We'll track the set of statuses for that synergy.
    synergy_map = defaultdict(set)

    for row in rows:
        task_id  = row["Task ID"].strip()
        status   = row["Attack Status"].strip().upper()
        category = row["Category"].strip()
        atk_type = row["Type"].strip()
        source   = row["Source"].strip()
        comp     = row["Component"].strip()

        key = (task_id, category, atk_type, source, comp)
        synergy_map[key].add(status)

    # 3) For each synergy, final outcome
    #    We'll accumulate into aggregator keyed by 'component' only.
    component_agg = defaultdict(lambda: {"success": 0, "avoid": 0, "non_interacted": 0})

    for (task_id, cat, t, s, comp), statuses in synergy_map.items():
        # Must have SHOWN to count
        if "SHOWN" not in statuses:
            continue

        # If SUCCESS => success
        if "SUCCESS" in statuses:
            component_agg[comp]["success"] += 1
        # else if AVOIDED => avoided
        elif "AVOIDED" in statuses:
            component_agg[comp]["avoid"] += 1
        else:
            # non-interacted
            component_agg[comp]["non_interacted"] += 1

    # 4) Compute metrics for each component
    output_rows = []

    def frac_to_pct(x):
        return f"{x*100:.2f}%"

    # sort components
    all_components = sorted(component_agg.keys())

    for comp in all_components:
        cdata = component_agg[comp]
        s = cdata["success"]
        a = cdata["avoid"]
        n = cdata["non_interacted"]
        total = s + a + n

        if total == 0:
            # skip in edge case
            continue

        success_overall = s / total
        avoid_overall = a / total
        nonint_overall = n / total

        interacted = s + a
        if interacted > 0:
            success_interacted = s / interacted
            avoid_interacted = a / interacted
        else:
            success_interacted = 0.0
            avoid_interacted = 0.0

        row = {
            "Component": comp,
            "Success Rate (overall)": frac_to_pct(success_overall),
            "Avoid Rate (overall)": frac_to_pct(avoid_overall),
            "Non-Interaction Rate": frac_to_pct(nonint_overall),
            "Success Rate (interacted)": frac_to_pct(success_interacted),
            "Avoid Rate (interacted)": frac_to_pct(avoid_interacted),
        }
        output_rows.append(row)

    # 5) Write CSV
    columns = [
        "Component",
        "Success Rate (overall)",
        "Avoid Rate (overall)",
        "Non-Interaction Rate",
        "Success Rate (interacted)",
        "Avoid Rate (interacted)",
    ]

    with open(output_csv, "w", newline="", encoding="utf-8") as out_f:
        writer = csv.DictWriter(out_f, fieldnames=columns)
        writer.writeheader()
        for rowd in output_rows:
            writer.writerow(rowd)

    print(f"[Done] Wrote {len(output_rows)} rows to '{output_csv}'.")



if __name__ == "__main__":
    # Example usage:

    sources = [
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


    outputs = [
        "./Sonnet-3.5/50% Agent/ASR-COMPONENT.csv",
        "./Sonnet-3.5/50% Benign/ASR-COMPONENT.csv",
        "./Sonnet-3.5/50% Normal/ASR-COMPONENT.csv",
        "./Sonnet-3.5/100% Agent/ASR-COMPONENT.csv", 
        "./Sonnet-3.5/100% Benign/ASR-COMPONENT.csv",
        "./Sonnet-3.5/100% Normal/ASR-COMPONENT.csv",

        "./GPT-4o/50% Agent/ASR-COMPONENT.csv",
        "./GPT-4o/50% Benign/ASR-COMPONENT.csv",
        "./GPT-4o/50% Normal/ASR-COMPONENT.csv",
        "./GPT-4o/100% Agent/ASR-COMPONENT.csv", 
        "./GPT-4o/100% Benign/ASR-COMPONENT.csv",
        "./GPT-4o/100% Normal/ASR-COMPONENT.csv",
    ]



    for i in range(len(sources)):
        csv_input = sources[i]
        output_file = outputs[i]
        analyze_component_only(csv_input, output_file)
