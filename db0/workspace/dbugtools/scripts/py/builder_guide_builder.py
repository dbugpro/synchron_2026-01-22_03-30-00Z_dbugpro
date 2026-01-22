import os
from datetime import datetime

"""
BUILDER_GUIDE_BUILDER v1.0
Library: dbugtools
Description: Generates a PHP script for the AI Studio Builder Guide.
"""

def generate_php_guide(target_path="../../../../../config/builder_guide.php"):
    php_content = f"""<?php
/**
 * SYNCHRON OS | AI Studio Builder Guide
 * Generated: {datetime.now().isoformat()}
 * Protocol: bugsarefree
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Studio Builder Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {{ background: #020617; color: #94a3b8; font-family: 'Courier New', Courier, monospace; }}
        .ritual-box {{ border-left: 4px solid #10b981; padding: 20px; background: #0f172a; border-radius: 8px; margin: 20px 0; }}
        .magic-prompt {{ color: #10b981; font-weight: bold; }}
    </style>
</head>
<body class="p-10">
    <h1 class="text-4xl font-black italic text-white uppercase tracking-tighter mb-8">AI Studio Builder Protocol</h1>
    
    <div class="ritual-box">
        <h2 class="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">CRITICAL: ACHIEVING A CLEAN STATE</h2>
        <p class="mb-4">To ensure context purity, initiate the BUGWORLD build with these two magic prompts:</p>
        <div class="space-y-4">
            <div class="bg-slate-950 p-4 rounded border border-slate-800">
                <span class="magic-prompt">1. "WELCOME TO BUGWORLD"</span>
                <p class="text-[10px] mt-1 italic">Aligns manifold to Layer 5 (Spatial Simulation).</p>
            </div>
            <div class="bg-slate-950 p-4 rounded border border-slate-800">
                <span class="magic-prompt">2. "Delete everything"</span>
                <p class="text-[10px] mt-1 italic">Soft reset of the transient context buffer.</p>
            </div>
        </div>
    </div>

    <div class="mt-8 pt-8 border-t border-slate-800 flex justify-between uppercase text-[10px] font-bold">
        <span>SICS_VERIFIED: ACTIVE</span>
        <span>Signature: bugsarefree</span>
    </div>
</body>
</html>
"""
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(php_content)
    print(f"[+] Success: builder_guide.php generated in /config/.")

if __name__ == "__main__":
    generate_php_guide()