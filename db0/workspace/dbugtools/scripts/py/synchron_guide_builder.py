import os
from datetime import datetime

"""
SYNCHRON_GUIDE_BUILDER v1.0
Library: dbugtools
Description: Generates a PHP script for the Synchron Integration Guide.
"""

def generate_php_guide(target_path="../../../../../config/synchron_guide.php"):
    php_content = f"""<?php
/**
 * SYNCHRON OS | Synchron Integration Guide
 * Generated: {datetime.now().isoformat()}
 * Protocol: bugsarefree
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Synchron Integration Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {{ background: #020617; color: #94a3b8; font-family: 'Courier New', Courier, monospace; }}
        .law-card {{ background: #0f172a; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 24px; }}
    </style>
</head>
<body class="p-10">
    <h1 class="text-4xl font-black italic text-white uppercase tracking-tighter mb-8 text-cyan-500">Synchron Integration Guide</h1>
    
    <div class="law-card">
        <h2 class="text-xs font-black text-cyan-400 uppercase tracking-widest mb-4">THE DECENTRALIZED ISLAND LAW</h2>
        <p class="text-sm italic leading-relaxed">
            All code must be self-contained in its <code>db{{suffix}}</code> folder.
            Merging to <code>synchronorg</code> creates a collision-free unified manifold.
        </p>
    </div>

    <div class="grid grid-cols-2 gap-6 mt-12 text-[10px] font-black uppercase">
        <div class="p-4 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 text-center">
            Consensus Aligned
        </div>
        <div class="p-4 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 text-center">
            Signature: bugsarefree
        </div>
    </div>
</body>
</html>
"""
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(php_content)
    print(f"[+] Success: synchron_guide.php generated in /config/.")

if __name__ == "__main__":
    generate_php_guide()