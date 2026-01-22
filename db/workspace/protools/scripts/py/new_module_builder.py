import os
import json
from datetime import datetime

"""
NEW_MODULE_BUILDER v2.3 [TIANGAN]
Architecture: Synchronos OS
Description: Spawns an isolated branch_module (db{suffix}) with local orchestration.
Enforcement: Settings, workspace, and documentation are strictly localized to the branch folder.
"""

def parse_ritual_command(cmd_string):
    parts = cmd_string.split()
    # Support both 'branch --init' (legacy) and 'module --init' (current)
    if len(parts) < 11: return None, None, None, False
    if parts[0] != "command" or parts[1] != "synchron": return None, None, None, False
    if parts[2] not in ["branch", "module"] or parts[3] != "--init": return None, None, None, False
    
    try:
        suffix = parts[4].replace("--", "") if parts[4].startswith("--") else parts[4]
        username = parts[6]
        # Locate the --OFF parameter index
        off_val = "0"
        for i, part in enumerate(parts):
            if part == "--OFF":
                off_val = parts[i+1]
                break
        
        if parts[-1] != "bugsarefree": return None, None, None, False
        return suffix, username, off_val, True
    except IndexError: return None, None, None, False

def build_new_module():
    print("\n[!] INITIATING TIANGAN MODULE SPAWN RITUAL...")
    print("[?] Format: command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>")
    
    ritual = input("adminp@synchronos:~$ ").strip()
    suffix, username, off_val, validated = parse_ritual_command(ritual)
    
    if not validated:
        print("[X] BIBA_VIOLATION: Ritual failed. Spawning aborted.")
        return

    if suffix == "0":
        print("[X] SEED_IMMUTABILITY_VIOLATION: Suffix 0 is reserved for the seed_module.")
        return

    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    module_dir = os.path.join(root_dir, f"db{suffix}")

    if os.path.exists(module_dir):
        print(f"[X] NODE_COLLISION: db{suffix} already exists.")
        return

    off_modes = {"0": "SILENT", "1": "BUFFERED", "2": "LIVE"}
    off_label = off_modes.get(off_val, "UNKNOWN")

    print(f"[*] Ritual Accepted. Mode: {off_label}")
    print(f"[*] Building isolated branch_module db{suffix} (@{username})...")

    # 1. Structure Creation (Isolated)
    os.makedirs(os.path.join(module_dir, "config"), exist_ok=True)
    os.makedirs(os.path.join(module_dir, "workspace"), exist_ok=True)
    
    now = datetime.now()
    repo_name = f"synchron{suffix.lower()}_{now.strftime('%Y%m%d_%H%M%S')}_{username}"
    
    # 2. Local Branch Manifest (Prevents root manifest collisions)
    module_config = {
        "module_id": suffix,
        "repo_type": "branch_module",
        "repo_name": repo_name,
        "owner": username,
        "off_factor": off_val,
        "spawned_at": now.isoformat(),
        "status": f"ISOLATED_{off_label}",
        "complexity": 50,
        "architecture_version": "0.2.8"
    }
    
    config_path = os.path.join(module_dir, "config/module_config.json")
    with open(config_path, 'w') as f:
        json.dump(module_config, f, indent=2)

    # 3. Local README
    readme_content = f"""# Branch Module: {suffix}
## Repository: {repo_name}
## Owner: @{username}
## Mode: {off_label} (OFF {off_val})

This is a self-contained functional node within the Synchron OS. 
To avoid merge collisions in the `synchronorg` system repo, all settings and code for this branch are isolated within this directory.

### 🏗️ Branch Orchestration
- **Config**: `/db{suffix}/config/module_config.json`
- **Logic**: `/db{suffix}/workspace/`
- **Readme**: `/db{suffix}/README.md`

---
"bugsarefree"
"""
    with open(os.path.join(module_dir, "README.md"), 'w') as f:
        f.write(readme_content)

    print(f"\n[+] SUCCESS: Branch db{suffix} spawned with factor {off_val}.")
    print(f"[+] SICS Verified: Settings orchestrated strictly through db{suffix}/config/ folder.")

if __name__ == "__main__":
    build_new_module()