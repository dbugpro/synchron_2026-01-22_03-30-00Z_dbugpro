import json
import os
from datetime import datetime

"""
CLI_COMMANDS_INDEX_BUILDER v1.1
Library: dbugtools
Description: Creates a JSON index of available CLI rituals for dynamic UI consumption.
Includes the HTML Frame Build ritual for session-aware harvesting.
"""

def build_command_index(target_path="../../../../../config/cli_commands_index.json"):
    commands = {
        "metadata": {
            "version": "0.2.8",
            "last_updated": datetime.now().isoformat(),
            "signature": "bugsarefree"
        },
        "registry": [
            {
                "id": "spawn",
                "ritual": "command synchron module --init",
                "params": ["suffix", "username", "off", "bugsarefree"],
                "description": "Initialize a new decentralized node."
            },
            {
                "id": "frame",
                "ritual": "command synchron frame --build",
                "params": ["session", "url", "verbose", "bugsarefree"],
                "description": "Build an HTML frame with BBC BOOK logging integration."
            },
            {
                "id": "remove",
                "ritual": "command synchron remove --init",
                "params": ["suffix", "username", "off", "bugsarefree"],
                "description": "Remove an isolated node."
            },
            {
                "id": "role",
                "ritual": "command synchron role --change",
                "params": ["role", "username", "off", "bugsarefree"],
                "description": "Transition authorization role."
            },
            {
                "id": "sync",
                "ritual": "command synchron kernel --sync",
                "params": ["adminp", "admins", "bugsarefree"],
                "description": "Synchronize kernel baseline state."
            },
            {
                "id": "integrity",
                "ritual": "command synchron integrity --check",
                "params": ["bugsarefree"],
                "description": "Check system file hashes."
            },
            {
                "id": "close",
                "ritual": "command synchron --close",
                "params": [],
                "description": "Terminate active orchestration session."
            }
        ]
    }
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w') as f:
        json.dump(commands, f, indent=2)
    print(f"[+] Success: cli_commands_index.json updated to v0.2.8.")

if __name__ == "__main__":
    build_command_index()