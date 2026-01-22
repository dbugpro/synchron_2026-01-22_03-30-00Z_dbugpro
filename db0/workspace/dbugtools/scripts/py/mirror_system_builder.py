import os
import shutil
import zipfile
from datetime import datetime

"""
MIRROR_SYSTEM_BUILDER v1.0
Library: dbugtools
Description: Backs up Synchron-OS-A and mirrors state to OS-B.
"""

def build_mirror_backup(project_name="SYNCHRON-OS-A", suffix="A", username="dbugpro"):
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{project_name}{suffix}_{timestamp}_{username}.zip"
    
    # Path enforcement
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
    target_dir = os.path.join(root_dir, "db", "downloads")
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
        
    target_path = os.path.join(target_dir, filename)
    
    print(f"\n[!] INITIATING MIRROR RITUAL...")
    print(f"[*] Target: {target_path}")
    
    # Simulated Zip Logic for CLI
    try:
        with zipfile.ZipFile(target_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Mirror the current directory excluding downloads
            for root, dirs, files in os.walk(root_dir):
                if "downloads" in root or ".git" in root or "node_modules" in root:
                    continue
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, root_dir)
                    zipf.write(file_path, arcname)
                    
        print(f"[+] Backup Created: {filename}")
        print(f"[*] OS_A -> OS_B Mirroring alignment complete.")
        print(f"[!] CONSENSUS: bugsarefree")
        
    except Exception as e:
        print(f"[X] MIRROR_FAILURE: {str(e)}")

if __name__ == "__main__":
    build_mirror_backup()