import os
import shutil
from datetime import datetime

"""
MODULE_REMOVER v2.2 [TIANGAN]
Library: protools (Shared Workspace)
Description: CLI ritual to safely delete an isolated branch_module.
"""

def parse_ritual_command(cmd_string):
    parts = cmd_string.split()
    if len(parts) < 11: return None, None, False
    if parts[0] != "command" or parts[1] != "synchron" or parts[2] != "branch" or parts[3] != "--remove": return None, None, False
    try:
        if parts[4] != "--init": return None, None, False
        suffix = parts[5].replace("--", "") if parts[5].startswith("--") else parts[5]
        username = parts[7]
        if parts[11] != "bugsarefree": return None, None, False
        return suffix, username, True
    except IndexError: return None, None, False

def remove_module():
    print("\n[!] AWAITING BRANCH REMOVAL RITUAL...")
    print("[?] Format: command synchron branch --remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>")
    
    ritual = input("adminp@synchronos:~$ ").strip()
    suffix, username, validated = parse_ritual_command(ritual)
    
    if not validated:
        print("[X] BIBA_VIOLATION: Protocol ritual failed. Removal aborted.")
        return

    if suffix == "0":
        print("[X] SEED_IMMUTABILITY_VIOLATION: Removal of the seed_module (db0) is strictly prohibited.")
        return

    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    module_dir = os.path.join(root_dir, f"db{suffix}")

    print(f"[*] Ritual Accepted. Purging isolated branch db{suffix}...")

    if os.path.exists(module_dir):
        shutil.rmtree(module_dir)
        print(f"[+] Branch_module db{suffix} purged from root.")
    else:
        print(f"[!] Warning: Branch db{suffix} not found.")

    print("\n[!] SUCCESS: Removal complete. System baseline remains intact.")
    print("[!] CONSENSUS STABLE. bugsarefree.")

if __name__ == "__main__":
    remove_module()