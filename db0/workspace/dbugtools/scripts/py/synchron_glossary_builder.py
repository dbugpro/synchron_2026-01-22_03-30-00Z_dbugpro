import json
import os
from datetime import datetime

"""
SYNCHRON_GLOSSARY_BUILDER v1.3
Library: dbugtools
"""

def build_glossary():
    glossary = {
        "system": "Synchron OS project A",
        "acronym_def": "OS = Operating System",
        "architecture": "Tiangan",
        "github_org": "https://github.com/synchronorg",
        "terms": {
            "adminp": "The primary human administrator (dbugpro).",
            "admins": "The primary AI orchestration administrator (synchron).",
            "seed_module": "The genesis repo (Suffix 0) defining system types.",
            "branch_module": "An isolated functional node (db{suffix}) with local orchestration.",
            "merged_module": "The unified system repository within synchronorg.",
            "collision_avoidance": "Ensuring branches do not modify shared root system files.",
            "bugsarefree": "The core protocol signature."
        },
        "version": "1.30",
        "last_update": datetime.now().isoformat()
    }
    path = "../../../../../config/synchron_glossary.json"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f: json.dump(glossary, f, indent=2)
    print("[+] synchron_glossary.json updated with Tiangan classifications.")

if __name__ == "__main__": build_glossary()