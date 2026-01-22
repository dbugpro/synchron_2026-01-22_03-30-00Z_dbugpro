import React, { useState } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  status?: 'synced' | 'local' | 'warning';
}

const INITIAL_TREE: FileNode[] = [
  {
    name: 'SYNCHRON-OS-A',
    type: 'folder',
    children: [
      { name: 'index.tsx', type: 'file', status: 'synced' },
      { name: 'metadata.json', type: 'file', status: 'synced' },
      { name: 'index.html', type: 'file', status: 'synced' },
      { name: 'types.ts', type: 'file', status: 'synced' },
      { name: 'README.md', type: 'file', status: 'synced' },
      {
        name: 'config',
        type: 'folder',
        children: [
          { name: 'synchron_config.json', type: 'file', status: 'synced' },
          { name: 'synchron_glossary.json', type: 'file', status: 'synced' },
          { name: 'tiangan_suffix_manifest.csv', type: 'file', status: 'synced' },
          { name: 'merge_protocol.md', type: 'file', status: 'synced' },
          { name: 'metadata.json', type: 'file', status: 'synced' },
          { name: 'cli_handbook.md', type: 'file', status: 'synced' },
          { name: 'cli_commands_index.json', type: 'file', status: 'synced' },
          { name: 'bugworld_cheat_sheet.md', type: 'file', status: 'synced' },
          { name: 'directory_tree_index.json', type: 'file', status: 'synced' }
        ]
      },
      {
        name: 'db',
        type: 'folder',
        children: [
          { name: 'protools_index.json', type: 'file', status: 'synced' },
          {
            name: 'dashboard',
            type: 'folder',
            children: [
              { name: 'README.md', type: 'file', status: 'synced' },
              { name: 'DashboardView.tsx', type: 'file', status: 'synced' },
              { name: 'index.html', type: 'file', status: 'synced' },
              { name: 'index.tsx', type: 'file', status: 'synced' },
              { name: 'types.ts', type: 'file', status: 'synced' },
              {
                name: 'components',
                type: 'folder',
                children: [
                  { name: 'App.tsx', type: 'file', status: 'synced' },
                  { name: 'LibraryView.tsx', type: 'file', status: 'synced' },
                  { name: 'ModuleRegistry.tsx', type: 'file', status: 'synced' },
                  { name: 'ProjectManifest.tsx', type: 'file', status: 'synced' },
                  { name: 'PulseRing.tsx', type: 'file', status: 'synced' },
                  { name: 'SessionLog.tsx', type: 'file', status: 'synced' },
                  { name: 'SyncTimeline.tsx', type: 'file', status: 'synced' },
                  { name: 'CheatSheetView.tsx', type: 'file', status: 'synced' },
                  { name: 'MirrorExportView.tsx', type: 'file', status: 'synced' },
                  { name: 'DirectoryTreeView.tsx', type: 'file', status: 'synced' }
                ]
              },
              {
                name: 'services',
                type: 'folder',
                children: [
                  { name: 'geminiService.ts', type: 'file', status: 'synced' }
                ]
              },
              {
                name: 'session_logs',
                type: 'folder',
                children: [
                  { name: 'session_audit.json', type: 'file', status: 'synced' },
                  { name: 'README.md', type: 'file', status: 'synced' }
                ]
              }
            ]
          },
          {
            name: 'workspace',
            type: 'folder',
            children: [
              {
                name: 'protools',
                type: 'folder',
                children: [
                  {
                    name: 'scripts',
                    type: 'folder',
                    children: [
                      {
                        name: 'py',
                        type: 'folder',
                        children: [
                          { name: 'system_index_builder.py', type: 'file', status: 'synced' },
                          { name: 'merge_protocol_builder.py', type: 'file', status: 'synced' },
                          { name: 'system_dashboard_builder.py', type: 'file', status: 'synced' },
                          { name: 'new_module_builder.py', type: 'file', status: 'synced' },
                          { name: 'module_remover.py', type: 'file', status: 'synced' },
                          { name: 'session_closer.py', type: 'file', status: 'synced' }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'db0',
        type: 'folder',
        children: [
          { name: 'README.md', type: 'file', status: 'synced' },
          {
            name: 'workspace',
            type: 'folder',
            children: [
              {
                name: 'dbugtools',
                type: 'folder',
                children: [
                  {
                    name: 'scripts',
                    type: 'folder',
                    children: [
                      {
                        name: 'py',
                        type: 'folder',
                        children: [
                          { name: 'synchron_config_builder.py', type: 'file', status: 'synced' },
                          { name: 'dbugtools_index_builder.py', type: 'file', status: 'synced' },
                          { name: 'synchron_glossary_builder.py', type: 'file', status: 'synced' },
                          { name: 'session_log_builder.py', type: 'file', status: 'synced' },
                          { name: 'tiangan_suffix_manifest_builder.py', type: 'file', status: 'synced' },
                          { name: 'integrity_checker.py', type: 'file', status: 'synced' },
                          { name: 'role_manager.py', type: 'file', status: 'synced' },
                          { name: 'registry_refresher.py', type: 'file', status: 'synced' },
                          { name: 'bugworld_cheat_sheet_builder.py', type: 'file', status: 'synced' },
                          { name: 'cli_commands_index_builder.py', type: 'file', status: 'synced' },
                          { name: 'bugworld_directory_builder.py', type: 'file', status: 'synced' },
                          { name: 'html_frame_builder.py', type: 'file', status: 'synced' }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'db00',
        type: 'folder',
        children: [
          {
            name: 'config',
            type: 'folder',
            children: [
              { "name": "module_config.json", "type": "file", "status": "synced" }
            ]
          },
          {
            "name": "workspace",
            "type": "folder",
            "children": [
              {
                "name": "dbug_toolkit",
                "type": "folder",
                "children": [
                  { "name": "core.py", "type": "file", "status": "synced" }
                ]
              }
            ]
          },
          { "name": "README.md", "type": "file", "status": "synced" }
        ]
      }
    ]
  }
];

const TreeNode: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);

  const openFileViewer = (filename: string) => {
    const popup = window.open('', '_blank', 'width=900,height=700');
    if (!popup) return;
    
    popup.document.write(`
      <html>
        <head>
          <title>SOURCE_VIEW | ${filename}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; margin: 0; }
            .header { background: #0f172a; border-bottom: 1px solid #1e293b; padding: 20px 40px; position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; }
            .code-block { background: #0a0a0a; border: 1px solid #1e293b; border-radius: 12px; padding: 30px; margin-top: 30px; font-size: 13px; line-height: 1.6; color: #94a3b8; overflow-x: auto; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">KRNL_SOURCE_VIEW_v1.0</span>
            </div>
            <button onclick="window.close()" class="text-[9px] font-bold text-white bg-red-600 px-4 py-1.5 rounded-lg hover:bg-red-500 transition-colors uppercase tracking-widest">Terminate View</button>
          </div>
          <div class="px-10 pb-10">
            <div class="mt-10">
              <h1 class="text-3xl font-black italic text-white uppercase tracking-tighter">${filename}</h1>
              <div class="flex items-center space-x-4 mt-2">
                <span class="text-[10px] mono text-emerald-500 uppercase font-bold tracking-widest">State: SYNCED</span>
                <span class="text-[10px] mono text-slate-600 uppercase font-bold tracking-widest">Access: AdminP_Only</span>
              </div>
            </div>
            <div class="code-block">
/**
 * TIANGAN_MANIFEST_STREAM: ${filename}
 * Orchestrated by dbugproductions
 * Signature: bugsarefree
 */

export const initialize_system = async () => {
  const kernel = await kernel.handshake();
  if (kernel.status === "stable") {
    console.log("Synchron OS project A online.");
    return true;
  }
  return false;
};

// END OF MODULE_SEED
            </div>
          </div>
        </body>
      </html>
    `);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      openFileViewer(node.name);
    }
  };

  const getIcon = () => {
    if (node.type === 'folder') {
      return (
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'text-cyan-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" : "M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"} />
        </svg>
      );
    }
    const ext = node.name.split('.').pop();
    if (ext === 'py') return <span className="text-[10px] mono text-emerald-400">py</span>;
    if (ext === 'json') return <span className="text-[10px] mono text-amber-500">{"{}"}</span>;
    if (ext === 'tsx') return <span className="text-[10px] mono text-cyan-400">tsx</span>;
    return <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center space-x-3 py-1 px-3 rounded-lg transition-all cursor-pointer hover:bg-slate-800/40 group ${depth === 0 ? 'bg-slate-900/60 border border-slate-800' : ''}`}
        onClick={handleClick}
        style={{ marginLeft: `${depth * 1}rem` }}
      >
        <div className="flex-shrink-0 flex items-center justify-center w-5">
          {getIcon()}
        </div>
        <span className={`text-[10px] mono font-bold uppercase tracking-tighter ${node.type === 'folder' ? 'text-slate-200' : 'text-slate-400 group-hover:text-cyan-400 transition-colors'}`}>
          {node.name}
        </span>
        {node.status && (
          <div className={`w-1 h-1 rounded-full ml-auto ${node.status === 'synced' ? 'bg-emerald-500/40' : node.status === 'local' ? 'bg-cyan-500 animate-pulse shadow-[0_0_5px_cyan]' : 'bg-red-500'}`} />
        )}
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div className="relative">
           {node.children.length > 0 && <div className="absolute left-[0.6rem] top-0 bottom-2 w-px bg-slate-800/50" style={{ marginLeft: `${depth * 1}rem` }} />}
           {node.children.map((child, i) => <TreeNode key={i} node={child} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
};

const DirectoryTreeView: React.FC<{ onLog: (text: string, sender: 'user' | 'ai' | 'system') => void }> = ({ onLog }) => {
  const [isScanning, setIsScanning] = useState(false);

  const runBuilderRitual = () => {
    setIsScanning(true);
    onLog("DIR_BUILDER: Executing bugworld_directory_builder.py...", "system");
    setTimeout(() => {
      onLog("DIR_BUILDER: Mapping complete. Manifold structure refreshed.", "ai");
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">Architecture_Scanner_v1.0</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Bugworld Directory Tree</p>
        </div>
        <button 
          onClick={runBuilderRitual}
          disabled={isScanning}
          className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-all ${isScanning ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-cyan-600/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white shadow-lg shadow-cyan-500/10'}`}
        >
          <svg className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-[10px] mono font-black uppercase tracking-widest">{isScanning ? 'BUILDING...' : 'RE-SCAN_DIRECTORY'}</span>
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
        <div className="relative space-y-1 overflow-y-auto max-h-[600px] custom-scrollbar pr-2">
          {INITIAL_TREE.map((node, i) => <TreeNode key={i} node={node} depth={0} />)}
        </div>
      </div>

      <div className="p-8 bg-slate-950/60 border border-slate-800 rounded-[2rem] space-y-4">
         <div className="flex items-center space-x-3 text-slate-500 uppercase text-[8px] mono font-bold tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span>Kernel_Enforcement: Recursive_Scan_Depth=Infinite</span>
         </div>
         <p className="text-[11px] text-slate-600 italic leading-relaxed">
           The <code>bugworld_directory_builder.py</code> script performs a recursive traversal of the Synchron OS project A manifold. 
           It verifies node integrity and localizes module configurations within the <code>db{'{suffix}'}</code> isolated islands. 
           The current tree reflects 100% sync parity between local workspace and the <code>synchronorg</code> organizational state.
         </p>
      </div>
    </div>
  );
};

export default DirectoryTreeView;