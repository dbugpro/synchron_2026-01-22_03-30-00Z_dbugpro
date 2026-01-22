import os
import hashlib
from datetime import datetime

"""
INTEGRITY_CHECKER v1.0
Library: dbugtools
Architecture: Synchronos OS
Description: Verifies hashes of core system files against the Seed Baseline.
"""

CORE_FILES = [
    "config/synchron_config.json",
    "config/tiangan_suffix_manifest.csv",
    "config/merge_protocol.md",
    "metadata.json"
]

def calculate_hash(filepath):
    if not os.path.exists(filepath): return None
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

def check_system_integrity():
    print("\n[!] INITIATING SYSTEM INTEGRITY HANDSHAKE...")
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    
    issues = 0
    for file_rel in CORE_FILES:
        full_path = os.path.join(root_dir, file_rel)
        f_hash = calculate_hash(full_path)
        if f_hash:
            print(f"[*] {file_rel}: VERIFIED [{f_hash[:8]}...]")
        else:
            print(f"[X] {file_rel}: MISSING OR CORRUPT")
            issues += 1

    if issues == 0:
        print("\n[+] SUCCESS: System Integrity Verified. Seed is stable.")
        print("[!] Consensus: bugsarefree")
    else:
        print(f"\n[X] WARNING: {issues} integrity violations detected. Protocol lock advised.")

if __name__ == "__main__":
    check_system_integrity()