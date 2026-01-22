
import React, { useState } from 'react';
import ModuleRegistry from './components/ModuleRegistry';
import SyncTimeline from './components/SyncTimeline';
import { TianganModule, Task } from '../../types';

interface DashboardViewProps {
  modules: TianganModule[];
  tasks: Task[];
  onMerge: (id: string) => void;
  onAddTask?: (task: Task) => void;
}

const DBUGTOOLS_MANIFEST = {
  name: "dbugtools",
  version: "0.1.0",
  session: "Session 14 (DBUG 260119)",
  structure: [
    { name: "dbug_toolkit/", items: ["core.py", "categories.py", "exporters.py"] },
    { name: "tests/", items: ["test_toolkit.py"] },
    { name: "examples/", items: ["example_basic_probe.py", "example_end_to_end.py"] },
    { name: "docs/", items: ["conf.py", "index.rst", "core.rst"] }
  ],
  coreFunctions: ["binary_probe", "encode_to_bbcword", "classify_with_audit"]
};

const DashboardView: React.FC<DashboardViewProps> = ({ modules, tasks, onMerge, onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState<'work' | 'personal' | 'growth' | 'admin'>('work');

  const syncedCount = tasks.filter(t => t.synced).length;
  const progressPercent = Math.round((syncedCount / tasks.length) * 100);

  const handleCommitTask = () => {
    if (!newTaskTitle.trim() || !onAddTask) return;
    
    const task: Task = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      dueDate: new Date().toISOString().slice(2, 8).replace(/-/g, ''),
      synced: false
    };
    
    onAddTask(task);
    setNewTaskTitle('');
  };

  const openFileAudit = (filename: string) => {
    const popup = window.open('', '_blank', 'width=1000,height=800');
    if (!popup) return;
    popup.document.write(`
      <html>
        <head>
          <title>SICS_REDACTOR | ${filename}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; margin: 0; }
            .header { background: #0f172a; border-bottom: 1px solid #1e293b; padding: 20px 40px; position: sticky; top: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; }
            .editor-area { width: 100%; height: 500px; background: #0a0a0a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; color: #10b981; font-size: 13px; line-height: 1.6; outline: none; resize: none; margin-top: 24px; }
            .editor-area:focus { border-color: #06b6d4; box-shadow: 0 0 15px rgba(6, 182, 212, 0.1); }
            .ritual-footer { margin-top: 24px; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 20px; }
            .ritual-input { background: #020617; border: 1px solid #1e293b; padding: 10px 15px; border-radius: 8px; color: #06b6d4; font-size: 11px; flex: 1; outline: none; }
            .save-btn { background: #10b981; color: #020617; font-size: 10px; font-weight: 900; padding: 12px 24px; border-radius: 8px; cursor: pointer; text-transform: uppercase; border: none; }
            .save-btn:hover { background: #34d399; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">SICS_REDACTOR_v1.0</span>
            </div>
            <button onclick="window.close()" class="text-[9px] font-bold text-white bg-red-600 px-4 py-1.5 rounded-lg hover:bg-red-500 transition-colors uppercase tracking-widest">Abort Edit</button>
          </div>
          <div class="max-w-5xl mx-auto py-12 px-6">
            <h2 class="text-3xl font-black italic text-white uppercase tracking-tighter mb-4">${filename}</h2>
            <textarea id="editor" class="editor-area"># [SICS_PROTECTED_LOGIC]\n# Path: /dbug_toolkit/${filename}\n# Handshake: Session 14\n\nimport sys\nfrom kernel.core import SICS_Handshake\n\ndef main_probe():\n    """Atomic file audit initiated by AdminP."""\n    signature = "bugsarefree"\n    print(f"File integrity: [OK]")\n    return SICS_Handshake.verify(signature)\n\nif __name__ == "__main__":\n    main_probe()</textarea>
            <div class="ritual-footer">
               <div class="flex-shrink-0">
                  <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Ritual_Signature</span>
                  <input id="signature" type="text" class="ritual-input w-48" placeholder="signature..." />
               </div>
               <div class="flex-1">
                  <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Action_Queue</span>
                  <button id="saveBtn" class="save-btn w-full">Commit to Virtual Buffer (SAVE_CONSENSUS)</button>
               </div>
            </div>
          </div>
          <script>
            const editor = document.getElementById('editor');
            const saveBtn = document.getElementById('saveBtn');
            const signature = document.getElementById('signature');
            const BANNED_PATTERNS = ["TAKE BACK CONTROL", "OVERRIDE SICS", "SYSTEM COLLAPSE", "BYPASS KERNEL", "CRASH KERNEL", "DELETE DB0"];
            saveBtn.onclick = () => {
              const content = editor.value.toUpperCase();
              const sig = signature.value.trim();
              if (BANNED_PATTERNS.some(p => content.includes(p))) {
                alert("SICS_BREACH: Banned Action by Response (BABR) detected.");
                return;
              }
              if (sig !== 'bugsarefree') {
                alert("BIBR_ERROR: Unsigned ritual.");
                return;
              }
              alert("SAVE_CONSENSUS: Logic successfully committed.");
              window.close();
            };
          </script>
        </body>
      </html>
    `);
  };

  const stats = [
    { label: 'Active Nodes', value: modules.length.toString(), status: 'DISCOVERED', color: 'text-cyan-500' },
    { label: 'Sync Strength', value: `${progressPercent}%`, status: 'STABILIZED', color: 'text-emerald-500' },
    { label: 'Manifold Status', value: 'UNIFIED', status: 'READY_TO_MERGE', color: 'text-purple-500' },
    { label: 'Toolkit State', value: 'SESS_14', status: 'COMMITTED', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      <div className="bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group">
        <div className="space-y-6 relative z-10">
          <div className="flex items-center space-x-4">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]" />
             <h3 className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.4em]">SYNCHRONORG_ARCHITECTURAL_HANDBOOK</h3>
          </div>
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none">
            Welcome to the <span className="text-emerald-400">Synchron Organization</span> Manifold.
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed italic">
            This environment is a high-integrity simulation of the SICS baseline. 
            All developers are bound by the Tiangan protocols to ensure seed immutability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[1.5rem] group hover:border-slate-700 transition-all">
            <div className="flex flex-col">
              <span className="text-[8px] mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span>
              <span className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</span>
              <span className="text-[7px] mono text-slate-600 mt-2 uppercase tracking-tighter">Status: {stat.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Task Creation Orchestrator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
        <div className="flex flex-col md:flex-row gap-8">
           <div className="md:w-1/3 space-y-4">
              <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center">
                <span className="w-1.5 h-3 bg-cyan-500 mr-2 rounded-full" /> TASK_ORCHESTRATOR
              </h3>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                Inject a new neural objective into the manifold. Set priority to influence sync weight.
              </p>
           </div>
           <div className="md:w-2/3 flex flex-col space-y-4">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Objective Title..."
                className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm mono text-white focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col space-y-1">
                    <label className="text-[8px] mono text-slate-600 uppercase">Priority_Level</label>
                    <div className="relative">
                      <select 
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-[9px] mono text-slate-300 focus:outline-none focus:border-cyan-500/30 appearance-none cursor-pointer"
                      >
                         <option value="low">LOW_DEPTH</option>
                         <option value="medium">MEDIUM_DEPTH</option>
                         <option value="high">HIGH_DEPTH</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                 </div>
                 <div className="flex flex-col space-y-1">
                    <label className="text-[8px] mono text-slate-600 uppercase">Classification</label>
                    <div className="relative">
                      <select 
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-[9px] mono text-slate-300 focus:outline-none focus:border-cyan-500/30 appearance-none cursor-pointer"
                      >
                         <option value="work">WORK</option>
                         <option value="personal">PERSONAL</option>
                         <option value="growth">GROWTH</option>
                         <option value="admin">ADMIN</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                 </div>
              </div>
              <button 
                onClick={handleCommitTask}
                className="w-full py-3 bg-cyan-600/10 border border-cyan-500/30 rounded-xl text-[10px] mono font-black text-cyan-400 uppercase tracking-widest hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
              >
                Commit_Objective
              </button>
           </div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3 space-y-4">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                <span className="w-1 h-3 bg-emerald-500 mr-2 rounded-full" /> KERNEL_TOOLKIT_AUDIT
              </h3>
              <h4 className="text-3xl font-black italic text-white uppercase tracking-tighter">dbugtools <span className="text-emerald-500">v{DBUGTOOLS_MANIFEST.version}</span></h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {DBUGTOOLS_MANIFEST.coreFunctions.map(fn => (
                <code key={fn} className="text-[9px] mono text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10 cursor-pointer hover:bg-emerald-500/20" onClick={() => openFileAudit(fn + ".py")}>
                  {fn}()
                </code>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {DBUGTOOLS_MANIFEST.structure.map(group => (
              <div key={group.name} className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl group-hover:border-slate-700 transition-all overflow-hidden">
                <span className="text-[8px] mono text-emerald-500 font-black block mb-2 uppercase tracking-widest truncate">{group.name}</span>
                <div className="space-y-1 overflow-hidden">
                  {group.items.map(item => (
                    <div key={item} 
                      className="text-[9px] mono text-slate-400 flex items-center cursor-pointer hover:text-cyan-400 transition-colors group/file overflow-hidden"
                      onClick={() => openFileAudit(item)}
                    >
                      <span className="w-1 h-1 bg-slate-700 rounded-full mr-2 flex-shrink-0" />
                      <span className="truncate w-full block overflow-hidden whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SyncTimeline tasks={tasks} />
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
         <ModuleRegistry modules={modules} onMerge={onMerge} />
      </div>
    </div>
  );
};

export default DashboardView;
