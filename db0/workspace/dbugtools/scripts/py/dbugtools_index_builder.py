import json
import os
from datetime import datetime

"""
DBUGTOOLS_INDEX_BUILDER v1.3
Library: dbugtools (Seed Core)
"""

def build_index():
    index_data = {
        "library": "dbugtools",
        "permissions": {
            "access": "seed_only",
            "scope": "Suffix 0 Seed_Module"
        },
        "metadata": {
            "generated_at": datetime.now().isoformat(),
            "architecture": "Tiangan v0.2.8"
        }
    }
    path = "../../../../../config/dbugtools_index.json"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f: json.dump(index_data, f, indent=2)
    print("[+] dbugtools_index.json updated for seed_module.")

if __name__ == "__main__": build_index()