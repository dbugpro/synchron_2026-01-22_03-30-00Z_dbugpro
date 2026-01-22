# SYNCHRON OS | DEVELOPER INTEGRATION HANDBOOK
## Version 1.0.0 | Protocol: TIANGAN_ALIGNMENT
### "Bugs are free !!!"

Welcome, Architect. This guide defines how to operate, fork, and merge within the Synchron OS Manifold.

---

### 🏛️ 1. The Environment Logic
Synchron OS is a **decentralized manifold**. Unlike monolithic apps, it uses a Seed/Branch model:
- **Seed (db0)**: The immutable genesis. Never modify this folder directly.
- **Branch (db{suffix})**: Your isolated workspace. All your logic, configs, and assets MUST live here.
- **Config Root**: Shared system state. Only modified via signed CLI rituals.

---

### 🧪 2. Google AI Studio: Advanced Orchestration
To collaborate using Google AI Studio, follow the **Handshake Sharing Ritual**:

1. **The System Instruction**: Ensure your "System Instruction" block contains the SICS protocols (BIBA/BABR).
2. **Tool Configuration**: Define your `FunctionDeclarations` (e.g., `request_github_merge`).
3. **Advanced Share Settings**: Enable "Include System Instructions" and "Include Tools".

---

### 🐙 3. GitHub Lifecycle: Personal vs. Organization
To ensure collision-free development, follow these three stages:
- **Stage A**: Personal Fork (The Island).
- **Stage B**: Synchron Org Merge (The Consensus).
- **Stage C**: Re-introducing Merged Modules (The Extraction).

---

### 🛡️ 4. SICS Restraint Checklist
Before every commit or share, verify:
- [ ] No changes made to `db0/`.
- [ ] No changes made to root `/config` manifests.
- [ ] All new rituals end with `bugsarefree`.

---

### ✨ 5. Initializing the Build Loop: Achieving a Clean State
At the start of every BUGWORLD build procedure, you must achieve **"A clean state."** to ensure the model does not carry over stale context from previous iterations.

**The Initialization Ritual:**
1.  **Prompt 1: "WELCOME TO BUGWORLD"**
    *   *Effect*: Signals the transition to the 5th layer of the Synchron manifold. It locks the model into the spatial/temporal simulation logic.
2.  **Prompt 2: "Delete everything"**
    *   *Effect*: Wipes the transient file buffer. This is a "Soft Reset" that allows for a fresh deployment of the seed module (db0) without conflicting with existing temp files.

---
"The manifold is stable when the signature is verified."
**Signature: bugsarefree**