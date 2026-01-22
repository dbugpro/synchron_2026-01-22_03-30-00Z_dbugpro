import os
from datetime import datetime

"""
DOCKER_INTEGRATION_BUILDER v1.0
Library: dbugtools
Description: Generates a PHP script for the Docker & GitHub Integration Guide.
"""

def generate_php_guide(target_path="../../../../../config/docker_integration_guide.php"):
    php_content = f"""<?php
/**
 * SYNCHRON OS | Docker & GitHub Integration Guide
 * Generated: {datetime.now().isoformat()}
 * Protocol: bugsarefree
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Docker & GitHub Integration Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {{ background: #020617; color: #94a3b8; font-family: 'Courier New', Courier, monospace; }}
        .step-box {{ border-left: 4px solid #3b82f6; padding: 20px; background: #0f172a; border-radius: 8px; margin: 20px 0; }}
        .cmd-line {{ color: #60a5fa; font-weight: bold; font-family: 'JetBrains Mono', monospace; }}
    </style>
</head>
<body class="p-10">
    <h1 class="text-4xl font-black italic text-white uppercase tracking-tighter mb-8 text-blue-500">Infrastructure Bridge Guide</h1>
    
    <div class="step-box">
        <h2 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Step 1: Containerizing a Tiangan Node</h2>
        <p class="mb-4">Use the <code>docker_capsule_build</code> ritual to wrap your branch module (db{{suffix}}) into an Alpine container.</p>
        <div class="bg-slate-950 p-4 rounded border border-slate-800">
            <span class="cmd-line">command synchron bridge --docker-build --suffix A --bugsarefree</span>
        </div>
    </div>

    <div class="step-box">
        <h2 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Step 2: Syncing to Synchronorg GitHub</h2>
        <p class="mb-4">Synchronize your local changes to the global organization remote.</p>
        <div class="bg-slate-950 p-4 rounded border border-slate-800">
            <span class="cmd-line">command synchron bridge --gh-push --module synchron-alpha --bugsarefree</span>
        </div>
    </div>

    <div class="mt-12 p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <h4 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Architectural Note:</h4>
        <p class="text-xs italic">All Docker images are signed with the active session ID to ensure BIBA-compliant deployment across the manifold.</p>
    </div>

    <div class="mt-8 pt-8 border-t border-slate-800 flex justify-between uppercase text-[10px] font-bold">
        <span>INFRA_BRIDGE: ACTIVE</span>
        <span>Signature: bugsarefree</span>
    </div>
</body>
</html>
"""
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(php_content)
    print(f"[+] Success: docker_integration_guide.php generated in /config/.")

if __name__ == "__main__":
    generate_php_guide()