import json
import os
from datetime import datetime

"""
BUGWORLD_CHEAT_SHEET_BUILDER v1.0
Library: dbugtools
Description: Generates a comprehensive cheat sheet for CLI commands (Rituals).
"""

def build_cheat_sheet(target_path="../../../../../config/bugworld_cheat_sheet.md"):
    content = f"""# BUGWORLD CHEAT SHEET
## Synchron OS project A | Tiangan Rituals
**Generated:** {datetime.now().isoformat()}
**Signature:** bugsarefree

---

### 🛡️ CORE RITUALS (CLI)

#### 1. SPAWN MODULE
`command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>`
- **Explanation**: Creates a new isolated functional node (`db{{suffix}}`).
- **Safety**: Locked if suffix is '0'.

#### 2. REMOVE MODULE
`command synchron remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>`
- **Explanation**: Purges an existing module folder. 
- **Destructive**: Cannot be undone. Seed node (db0) is immune.

#### 3. ROLE CHANGE
`command synchron role --change --<ROLE> <R> --<USERNAME> <U> --OFF <B> --bugsarefree <S>`
- **Explanation**: Shifts authorization identity between `adminp`, `dbugx`, and `user`.
- **Enforcement**: Only AdminP can trigger this transition.

#### 4. SYNC KERNEL
`command synchron kernel --sync --adminp <M> --admins <Y> --bugsarefree <S>`
- **Explanation**: Synchronizes state between the human (AdminP) and AI (AdminS).

#### 5. INTEGRITY CHECK
`command synchron integrity --check --bugsarefree <S>`
- **Explanation**: Verifies that root config files have not been tampered with.

#### 6. TERMINATE SESSION
`command synchron --close`
- **Explanation**: Clean shutdown. Persistent islands remain intact.

---
### 🏝️ ARCHITECTURAL LAWS
1. **Isolation**: Never touch root from db{{suffix}}.
2. **Signature**: All commands MUST end with `bugsarefree`.
3. **Immutability**: db0 is the genesis.

"Bugs are free !!!"
"""
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[+] Success: bugworld_cheat_sheet.md updated.")

if __name__ == "__main__":
    build_cheat_sheet()