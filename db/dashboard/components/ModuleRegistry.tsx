import React from 'react';
import { TianganModule } from '../../../types';

interface ModuleRegistryProps {
  modules: TianganModule[];
  onMerge: (id: string) => void;
}

const ModuleRegistry: React.FC<ModuleRegistryProps> = ({ modules, onMerge }) => {
  const openMergeProtocol = (module: TianganModule) => {
    const popup = window.open('', '_blank', 'width=700,height=500');
    if (!popup) return;
    
    popup.document.write(`
      <html>
        <head>
          <title>MERGE_HANDSHAKE | ${module.name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; }
            .step { border-left: 2px solid #334155; padding-left: 20px; margin-bottom: 20px; position: relative; }
            .step::before { content: ''; position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #1e293b; }
            .step.active::before { background: #8b5cf6; box-shadow: 0 0 10px #8b5cf6; }
          </style>
        </head>
        <body>
          <h1 class="text-xs font-black text-purple-500 uppercase tracking-[0.3em] mb-6">ORG_MERGE_PROTOCOL_V1</h1>
          <h2 class="text-2xl font-black italic text-white uppercase tracking-tighter mb-10">Handshake: ${module.name}</h2>
          
          <div class="space-y-8">
            <div class="step active">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 1: Identity_Verification</div>
              <div class="text-xs text-slate-500">Checking AdminP consensus... [VERIFIED]</div>
            </div>
            <div class="step">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 2: Collision_Detection</div>
              <div class="text-xs text-slate-500">Scanning root namespace for overlaps...</div>
            </div>
            <div class="step">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 3: Neural_Sync</div>
              <div class="text-xs text-slate-500">Aligning baseline suffix manifest...</div>
            </div>
          </div>
          
          <div class="mt-12 flex space-x-4">
            <button onclick="window.close()" class="flex-1 py-3 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20">Authorize Merge</button>
            <button onclick="window.close()" class="px-6 py-3 border border-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-900 transition-all">Abort</button>
          </div>
        </body>
      </html>
    `);
    
    onMerge(module.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <span className="w-1 h-3 bg-purple-500 mr-2 rounded-full shadow-[0_0_8px_#8b5cf6]" /> 
          TIANGAN_NODE_MAP
        </h2>
        <div className="flex items-center space-x-4">
           <span className="text-[8px] mono text-slate-600 uppercase">Latency: 2ms</span>
           <span className="text-[9px] mono text-purple-400 font-bold uppercase tracking-widest">v0.2.8_ORCHESTRATOR</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map(module => (
          <div 
            key={module.id} 
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859C13.487 12.333 14 11.238 14 10a4 4 0 00-8 0c0 1.238.513 2.333 1.523 3.141.269.213.462.518.477.859h4z" />
               </svg>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-100 mono tracking-tighter uppercase italic">{module.name}</h3>
                <div className="flex items-center space-x-2">
                   <span className="text-[9px] text-purple-400 mono uppercase font-bold tracking-widest">{module.id}</span>
                   <span className="text-slate-600 px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-[8px] mono uppercase font-bold truncate max-w-[120px]">{module.workFolder}</span>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-[8px] mono font-black uppercase tracking-widest ${
                module.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                module.status === 'merging' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse' :
                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              }`}>
                {module.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-[9px] mono uppercase tracking-widest text-slate-500">
               <div>
                  <span className="block text-slate-700 mb-1">Sync_Latency</span>
                  <span className="text-emerald-500 font-bold">~0.4ms</span>
               </div>
               <div>
                  <span className="block text-slate-700 mb-1">Docker_State</span>
                  <span className="text-blue-500 font-bold">READY</span>
               </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[8px] mono text-slate-600 uppercase font-black">
                 <span>Orchestration_Depth</span>
                 <span>{module.complexity}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 transition-all duration-1000" 
                  style={{ width: `${module.complexity}%` }} 
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                 <span className="text-[7px] mono text-slate-700 italic">Last Handshake: {module.lastUpdate}</span>
                 <button 
                  onClick={() => openMergeProtocol(module)}
                  className="px-3 py-1 bg-purple-600/10 border border-purple-500/30 text-purple-400 text-[9px] mono font-black uppercase tracking-tighter hover:bg-purple-500 hover:text-white transition-all rounded-md"
                >
                  [SYNC_ORG]
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleRegistry;