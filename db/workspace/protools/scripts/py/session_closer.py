import json
import os
from datetime import datetime

"""
SESSION_CLOSER v1.4
Architecture: Synchronos OS
Description: Clean shutdown of the Tiangan orchestration session.
"""

def close_session():
    print("\n[!] INITIATING TIANGAN SHUTDOWN...")
    confirm = input("Confirm termination? (y/n): ").strip().lower()
    if confirm != 'y': return

    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    config_path = os.path.join(root_dir, "config/synchron_config.json")

    print("[*] Finalizing session audit trail...")

    print("[*] Locking seed kernel status...")
    if os.path.exists(config_path):
        with open(config_path, 'r') as f: config = json.load(f)
        config["metadata"]["status"] = "TIANGAN_SESSION_CLOSED"
        config["metadata"]["last_shutdown"] = datetime.now().isoformat()
        with open(config_path, 'w') as f: json.dump(config, f, indent=2)
    
    print("\n[!] SUCCESS: Session terminated. Branch_modules remain self-contained.")
    print("[!] CONSENSUS LOCKED. bugsarefree.")

if __name__ == "__main__":
    close_session()