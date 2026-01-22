import json
import os
from datetime import datetime

"""
SYNCHRON_CONFIG_BUILDER v1.5
Library: dbugtools
"""

def build_synchron_config(target_path="../../../../../config/synchron_config.json"):
    config = {
        "kernel": {
            "version": "0.2.8-alpha",
            "codename": "Synchron OS project A",
            "architecture": "Tiangan",
            "suffix": "0",
            "node_identifier": "synchron0_dbugpro_seed_module"
        },
        "security_protocols": {
            "admin_roles": {
                "adminp": "dbugpro",
                "admins": "synchron",
                "dbugx": "authorized_debugger",
                "user": "generic_viewer"
            },
            "rituals": {
                "1_spawn": "command synchron branch --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>",
                "2_remove": "command synchron branch --remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>",
                "3_close": "command synchron --close",
                "4_sync": "command synchron kernel --sync --adminp <M> --admins <Y> --bugsarefree <S>",
                "5_role": "command synchron role --change --<ROLE> <R> --<USERNAME> <U> --OFF <B> --bugsarefree <S>"
            }
        },
        "metadata": {
            "last_build_timestamp": datetime.now().isoformat(),
            "status": "TIANGAN_DECENTRALIZED_STABLE"
        }
    }
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w') as f:
        json.dump(config, f, indent=2)
    print(f"[+] Success: synchron_config.json updated to v0.2.8 [TIANGAN].")

if __name__ == "__main__": build_synchron_config()