import React from 'react';

const LIBRARIES = [
  {
    name: 'dbugtools',
    visibility: 'RESTRICTED',
    color: 'amber',
    tagline: 'CORE_KERNEL_BASELINE',
    functions: [
      { name: 'kernel_sync', desc: 'Synchronize core kernel parameters across nodes.' },
      { name: 'html_frame_builder', desc: 'Harvest HTML output from findex(url) with BBC BOOK session logging.' },
      { name: 'biba_audit', desc: 'Run integrity checks on protected kernel files.' },
      { name: 'bibr_lock', desc: 'Initiate core system lock on unauthorized requests.' }
    ]
  },
  {
    name: 'protools',
    visibility: 'PUBLIC',
    color: 'cyan',
    tagline: 'SHARED_WORKSPACE_UTILITIES',
    functions: [
      { name: 'ui_pulse', desc: 'Trigger a visual pulse on the system interface.' },
      { name: 'task_sort', desc: 'Reorganize tasks based on neural priority.' },
      { name: 'new_module_builder', desc: 'Spawn a new standalone Tiangan module directory (db{suffix}).' },
      { name: 'module_remover', desc: 'Ritual-enforced removal of a module and its manifest history.' },
      { name: 'session_closer', desc: 'Clean 5-step finalization and status locking of the active session.' },
      { name: 'system_index_builder', desc: 'Update root portal landing page logic.' }
    ]
  },
  {
    name: 'bridge_kit',
    visibility: 'PUBLIC',
    color: 'blue',
    tagline: 'EXTERNAL_INFRA_CONNECTORS',
    functions: [
      { name: 'gh_push_ritual', desc: 'Mirror local manifold branch to remote synchronorg repository.' },
      { name: 'docker_capsule_build', desc: 'Package branch module into an atomic Alpine container.' },
      { name: 'docker_registry_sync', desc: 'Push signed container images to the SICS-protected registry.' },
      { name: 'manifold_remote_audit', desc: 'Run remote SICS compliance checks via GitHub actions.' }
    ]
  }
];

const LibraryView: React.FC = () => {
  const openLibraryIndex = (libName: string) => {
    const popup = window.open('', '_blank', 'width=800,height=600');
    if (!popup) return;
    
    const libData = LIBRARIES.find(l => l.name === libName);
    
    popup.document.write(`
      <html>
        <head>
          <title>LIBRARY_INDEX | ${libName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; }
            .index-entry { background: #0f172a; padding: 15px; border-radius: 8px; border: 1px solid #1e293b; margin-bottom: 12px; }
          </style>
        </head>
        <body>
          <div class="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <h1 class="text-xs font-black text-cyan-500 uppercase tracking-widest">REGISTRY_INDEX_STREAM</h1>
            <button onclick="window.close()" class="text-[10px] bg-red-500/20 text-red-500 px-3 py-1 rounded-md border border-red-500/50 uppercase font-bold">Exit</button>
          </div>
          <div class="mb-10">
            <h2 class="text-3xl font-black italic text-white uppercase tracking-tighter">${libName} <span class="text-cyan-500">v0.2.8</span></h2>
            <p class="text-xs text-slate-500 mt-2 italic">Visibility: ${libData?.visibility} • Status: Stable</p>
          </div>
          <div class="space-y-4">
            ${libData?.functions.map(fn => `
              <div class="index-entry">
                <div class="text-[11px] font-bold text-cyan-400 mb-1">${fn.name}()</div>
                <div class="text-[10px] text-slate-500 italic">${fn.desc}</div>
              </div>
            `).join('')}
          </div>
          <div class="mt-10 pt-6 border-t border-slate-800 flex justify-between">
            <span class="text-[8px] text-slate-700 uppercase">Synchronorg Verified</span>
            <span class="text-[8px] text-slate-700 uppercase">bugsarefree</span>
          </div>
        </body>
      </html>
    `);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">Library_Registry_v0.2.8</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Shared Functional Workspace</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] mono text-slate-600 block uppercase">Registry_Location</span>
           <span className="text-[10px] mono text-cyan-500 font-bold uppercase tracking-widest">/db/workspace/lib</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LIBRARIES.map(lib => (
          <div key={lib.name} className={`bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 hover:bg-slate-900/60 transition-all group overflow-hidden relative shadow-2xl`}>
            <div className={`absolute top-0 right-0 p-8 text-[9px] mono font-black uppercase tracking-widest ${lib.color === 'amber' ? 'text-amber-500' : lib.color === 'blue' ? 'text-blue-500' : 'text-cyan-500'}`}>
              [{lib.visibility}]
            </div>
            
            <div className="mb-8">
               <span className={`text-[8px] mono font-black uppercase tracking-[0.2em] mb-1 block ${lib.color === 'amber' ? 'text-amber-600' : lib.color === 'blue' ? 'text-blue-600' : 'text-cyan-600'}`}>{lib.tagline}</span>
               <h3 className={`text-4xl font-black italic uppercase tracking-tighter ${lib.color === 'amber' ? 'text-amber-500' : lib.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'}`}>
                {lib.name}
              </h3>
            </div>

            <div className="space-y-4">
              {lib.functions.map(fn => (
                <div key={fn.name} className="bg-slate-950/60 border border-slate-800/50 rounded-2xl p-5 group-hover:border-slate-700 transition-all">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${lib.color === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : lib.color === 'blue' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'}`} />
                    <code className="text-xs font-bold text-slate-200 mono">{fn.name}()</code>
                  </div>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed">{fn.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[9px] mono text-slate-600 uppercase tracking-widest font-black">v2.8_INTEGRATED</span>
              <button 
                onClick={() => openLibraryIndex(lib.name)}
                className={`px-4 py-1.5 rounded-full text-[9px] mono font-black transition-all uppercase tracking-tighter border ${
                lib.color === 'amber' 
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-slate-950' 
                  : lib.color === 'blue'
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-slate-950'
                  : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950'
              }`}>
                [OPEN_{lib.name.toUpperCase()}_INDEX]
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-amber-950/10 border border-amber-900/30 rounded-[2.5rem] mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <svg className="w-24 h-24 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
           </svg>
        </div>
        <div className="flex items-center space-x-4 text-amber-500 mb-4 relative z-10">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs mono font-black uppercase tracking-[0.2em]">SECURITY_ADVISORY: KERNEL_INTEGRITY</span>
        </div>
        <p className="text-sm text-amber-500/70 leading-relaxed italic relative z-10 max-w-2xl">
          Execution of rituals within the <b>dbugtools</b> library is restricted to AdminP consensus. 
          The kernel enforces a BIBR (Banned Action by Response) protocol on unauthorized baseline calls. 
          All library activity is echoed into <code>session_audit.json</code>.
        </p>
      </div>
    </div>
  );
};

export default LibraryView;