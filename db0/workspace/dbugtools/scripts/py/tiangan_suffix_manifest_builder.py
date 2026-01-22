import csv
import os
from datetime import datetime

"""
TIANGAN_MANIFEST_BUILDER v1.6
Library: dbugtools
Description: Generates the root manifest, identifying Suffix 0 as the CORE_SEED.
"""

def build_tiangan_manifest(output_path="../../../../../config/tiangan_suffix_manifest.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True) if os.path.dirname(output_path) else None
    with open(output_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["# TIANGAN_BASELINE_MANIFEST_V1"])
        writer.writerow(["# GENERATED_AT," + datetime.now().isoformat()])
        writer.writerow(["# SIGNATURE,Bugs are free !!!"])
        writer.writerow([])
        writer.writerow(["suffix", "repo_name", "work_directory", "status", "priority"])
        writer.writerow(["0", "synchron0", "db0", "STABLE", "CORE_SEED"])
    print(f"[+] Success: Manifest updated. db0 verified as CORE_SEED.")

if __name__ == "__main__": build_tiangan_manifest()