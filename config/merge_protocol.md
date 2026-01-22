# Synchron OS project A | Merge Protocol
## Official Integration Workflow for synchronorg

**Generated:** 2026-01-18T23:45:00Z
**Status:** ACTIVE (TIANGAN_DECENTRALIZATION)
**Signature:** bugsarefree

---

### 🛡️ Module Classification
The Synchron manifold utilizes three distinct module/repository types to ensure architectural integrity:

1. **seed_module (seed repo)**: The immutable genesis (Suffix 0). It defines the system baseline types and core rituals.
2. **branch_module (branch repo)**: A functional node (`db{suffix}`) developed in isolation. It contains its own local orchestration settings.
3. **merged_module (system repo)**: The final unified assembly within the `synchronorg` organization, where branch_modules are integrated into the root.

### 🏗️ Isolated Branch Orchestration
To prevent merge collisions in the global organization, every branch_module is self-contained within its specific root directory (`db{suffix}`):
- **Local Config**: `/db{suffix}/config/module_config.json`
- **Local Workspace**: `/db{suffix}/workspace/`
- **Local Readme**: `/db{suffix}/README.md`

### 🔄 Collision-Safe Integration Loop
1. **Spawn**: Use `new_module_builder.py` to create a `branch_module`.
2. **Develop**: Work strictly within the module's own folder. Do not modify root-level `/config` or `db0` files.
3. **Merge**: Transfer the `branch_module` repo to `synchronorg`. During integration, the unique `db{suffix}` folder is added to the system root. Because it is self-contained, no existing system files are touched, eliminating merge conflicts.

---
*Integrity Check: PASS. Tiangan Decentralization Verified. Signature: bugsarefree*