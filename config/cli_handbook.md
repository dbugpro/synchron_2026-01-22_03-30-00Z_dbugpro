# Synchron OS Alpha | CLI Handbook
## Version 0.2.8 - Decentralized Orchestration

This handbook defines the official rituals (commands) required to interact with the Synchron manifold. These rituals are the only authorized way for AdminP and AdminS to modify kernel state.

### 🛡️ The Core Rituals

All commands must be signed with the `bugsarefree` protocol signature.

| Command | Purpose | Format |
| :--- | :--- | :--- |
| **SPAWN** | Create isolated module | `command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>` |
| **FRAME** | HTML Frame Build | `command synchron frame --build --session <S> --url <U> [--verbose] --bugsarefree <S>` |
| **REMOVE** | Stateless module purge | `command synchron remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>` |
| **ROLE** | Update auth identity | `command synchron role --change --<ROLE> <R> --<USERNAME> <U> --OFF <B> --bugsarefree <S>` |
| **SYNC** | Sync kernel state | `command synchron kernel --sync --adminp <M> --admins <Y> --bugsarefree <S>` |
| **INTEGRITY** | Verify core files | `command synchron integrity --check --bugsarefree <S>` |
| **CLOSE** | Terminate session | `command synchron --close` |

---

### 🔍 Ritual Deep Dive: Module Spawn (SPAWN)

The `SPAWN` ritual initializes a new functional node (`db{suffix}`) within the manifold. This is the primary method for decentralized expansion.

**Command Format:**
`command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>`

**Parameters:**
- `--<SUFFIX> <T>`: The unique identifier for the node (e.g., `db01`). Must not be `0`.
- `--<USERNAME> <U>`: The owner of the branch (AdminP or DbugX).
- `--OFF <B>`: **Orchestration Frequency Factor**. This controls the sync-depth and telemetry coupling of the node.
- `--bugsarefree <S>`: Mandatory protocol signature.

**The --OFF Parameter Behavior (Detailed):**
- **OFF 0 (SILENT - "Ghost Island")**: 
  - **Behavior**: The node operates in total isolation. File system changes are never broadcast to the Suffix 0 Seed.
  - **Purpose**: High-chaos prototyping where the developer does not want to pollute the global audit trail.
  - **Requirement**: Requires a manual `SYNC` ritual to promote changes to the manifold manifest.
- **OFF 1 (BUFFERED - "Log-Sync")**: 
  - **Behavior**: Local changes are recorded in a branch-specific `session_audit.json`. The manifold periodically performs a "Soft Handshake" to check for architectural drift.
  - **Purpose**: Balanced development. Provides a safety net of audit logs without the performance overhead of real-time coupling.
  - **Requirement**: Semi-automated synchronization during session `CLOSE` rituals.
- **OFF 2 (LIVE - "Kernel Extension")**: 
  - **Behavior**: Full-duplex synchronization. The branch is treated as a hot-plug extension of the Suffix 0 Kernel. Every file operation triggers an immediate SICS integrity check.
  - **Purpose**: Critical module development where baseline alignment must be 100% at all times.
  - **Requirement**: High-bandwidth connection to the Seed node. Every action is mirrored in the global BBC BOOK ledger.

---

### 🔍 Ritual Deep Dive: HTML Frame Build (FRAME)

The `FRAME` ritual is a specialized data harvesting command used to capture and encapsulate web content into the Synchron manifold's filesystem. It creates a session-persistent bridge between external data sources and the internal USOT.

**Command Format:**
`command synchron frame --build --session <S> --url <U> [--verbose] --bugsarefree <S>`

**Parameters:**
- `--session <S>`: **Session UUID**. Links the harvested frame to a specific orchestration session. This ID is used by the `html_frame_builder.py` script to generate rollover logs in the BBC BOOK system.
- `--url <U>`: **Target Vector**. The fully qualified URL of the web resource to be encapsulated. The kernel performs a pre-fetch integrity check before the build begins.
- `--verbose`: **Telemetry Toggle**. If present, the AdminS (AI) will provide real-time status updates in the console, including byte-counts and HTML sanitization logs.
- `--bugsarefree <S>`: Mandatory protocol signature.

**Architecture of the Build:**
1. **Harvesting**: The kernel initiates a secure probe of the target URL.
2. **Encapsulation**: Raw data is wrapped in a Tiangan-compliant HTML5 structure.
3. **BBC BOOK Integration**: A unique entry is added to the active session log.
4. **Rollback Protection**: The build is atomic; if the URL is unreachable or malformed, the session reverts to the last stable manifest state.

---

### 💡 Why CLI Rituals? (AI Studio Context)

In the **Synchron Organization**, we mandate the use of CLI-style command strings for all interactions within Google AI Studio. This ensures deterministic outputs and maintains the "Ritualized Consensus" required by AdminS to verify AdminP's intent.

---

### 🏝️ Architectural Laws

1. **Law of Isolation**: Functional nodes (`db{suffix}`) are islands. They carry their own `/config` and `/workspace`. They must never modify the root environment.
2. **Law of Collision Avoidance**: No child module shall modify root `/config` or Suffix 0 baseline files. This enables conflict-free merging into the global `synchronorg` repository.
3. **Law of BIBA Integrity**: Data flows only within authorized boundaries. Higher-integrity nodes (like `db0`) are write-protected from lower-integrity branches.
4. **Law of MCP Nesting**: The system follows a "Box Within a Box" philosophy. Each layer (GAIA -> BUGWORLD -> SYNCHRONOS) is a nested container providing a specific, limited context to the model.

---
"Bugs are free !!!"
Signature: bugsarefree