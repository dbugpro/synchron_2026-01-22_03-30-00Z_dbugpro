import os
import json
from datetime import datetime

"""
BUGWORLD_DIRECTORY_BUILDER v1.0
Library: dbugtools
Description: Scans the Synchron-OS project root and generates a directory tree index.
"""

def build_directory_tree(root_path="."):
    print("\n[!] INITIATING DIRECTORY MAPPING RITUAL...")
    
    def get_tree(path):
        d = {'name': os.path.basename(path), 'type': 'folder'}
        if os.path.isdir(path):
            d['children'] = []
            try:
                # Exclude noise
                entries = sorted([e for e in os.listdir(path) if not e.startswith('.') and e != 'node_modules'])
                for entry in entries:
                    child_path = os.path.join(path, entry)
                    if os.path.isdir(child_path):
                        d['children'].append(get_tree(child_path))
                    else:
                        d['children'].append({'name': entry, 'type': 'file', 'status': 'synced'})
            except Exception as e:
                print(f"[X] ERROR READING {path}: {e}")
        return d

    # Resolve relative root
    abs_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    tree_data = get_tree(abs_root)
    
    target_path = os.path.join(abs_root, "config", "directory_tree_index.json")
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    with open(target_path, 'w') as f:
        json.dump({
            "generated_at": datetime.now().isoformat(),
            "signature": "bugsarefree",
            "tree": tree_data
        }, f, indent=2)
        
    print(f"[+] Directory Tree Index built: {target_path}")
    print(f"[!] CONSENSUS: bugsarefree")

if __name__ == "__main__":
    build_directory_tree()