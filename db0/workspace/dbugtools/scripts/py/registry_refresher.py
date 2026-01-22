import os
import json
from datetime import datetime

"""
REGISTRY_REFRESHER v1.0
Library: dbugtools
Description: Scans the manifold for isolated module folders and verifies their metadata.
"""

def refresh_registry():
    print("\n[!] REFRESHING DECENTRALIZED MODULE REGISTRY...")
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    
    modules_found = []
    for entry in os.listdir(root_dir):
        if entry.startswith("db") and os.path.isdir(os.path.join(root_dir, entry)):
            config_path = os.path.join(root_dir, entry, "config/module_config.json")
            if os.path.exists(config_path):
                with open(config_path, 'r') as f:
                    m_data = json.load(f)
                    modules_found.append(m_data)
                    print(f"[*] Node Found: db{m_data['module_id']} ({m_data['repo_name']})")
            elif entry == "db0":
                 print(f"[*] Seed Found: db0 (Baseline Kernel)")

    print(f"\n[+] REFRESH COMPLETE: {len(modules_found)} isolated nodes registered.")
    print("[!] System State: DECENTRALIZED_STABLE. bugsarefree.")

if __name__ == "__main__":
    refresh_registry()