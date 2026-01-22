import React from 'react';

const RITUALS = [
  {
    id: 'SPAWN',
    name: 'Spawn Module',
    command: 'command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>',
    desc: 'Creates a new isolated functional node (db{suffix}).',
    law: 'Determines sync depth (OFF 0: Silent, OFF 1: Buffered, OFF 2: Live).'
  },
  {
    id: 'FRAME',
    name: 'HTML Frame Build',
    command: 'command synchron frame --build --session <S> --url <U> --bugsarefree <S>',
    desc: 'Generates a session-aware HTML frame linked to BBC BOOK logging.',
    law: 'Requires valid active session ID.'
  },
  {
    id: 'REMOVE',
    name: 'Remove Module',
    command: 'command synchron remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>',
    desc: 'Purges an existing module folder permanently.',
    law: 'Seed node (db0) is immune.'
  },
  {
    id: 'DIRECTORY',
    name: 'Directory Tree',
    command: 'command synchron directory --build --bugsarefree',
    desc: 'Executes bugworld_directory_builder.py to refresh the system manifold map.',
    law: 'Reflects node synchronization status.'
  },
  {
    id: 'MIRROR',
    name: 'Mirror System',
    command: 'command synchron mirror --init --<PROJECT> --<SUFFIX> --<USERNAME> --bugsarefree',
    desc: 'Generates a timestamped ZIP backup and mirrors OS-A to OS-B.',
    law: 'Stored in /db/downloads/.'
  },
  {
    id: 'ROLE',
    name: 'Role Change',
    command: 'command synchron role --change --<ROLE> <R> --<USERNAME> <U> --OFF <B> --bugsarefree <S>',
    desc: 'Shifts authorization identity (adminp, dbugx, user).',
    law: 'Only AdminP can trigger.'
  },
  {
    id: 'SYNC',
    name: 'Sync Kernel',
    command: 'command synchron kernel --sync --adminp <M> --admins <Y> --bugsarefree <S>',
    desc: 'Synchronizes state between AdminP and AdminS.',
    law: 'Requires consensus handshake.'
  },
  {
    id: 'INTEGRITY',
    name: 'Integrity Check',
    command: 'command synchron integrity --check --bugsarefree <S>',
    desc: 'Verifies root configuration file hashes.',
    law: 'Unsigned requests are rejected.'
  }
];

const CheatSheetView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">Ritual_Handbook_v0.2.8</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Synchron Alpha Protocols</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] mono text-slate-600 block uppercase">Signature_Verified</span>
           <span className="text-[10px] mono text-emerald-500 font-bold uppercase tracking-widest">bugsarefree</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {RITUALS.map(ritual => (
          <div key={ritual.id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-500 font-black mono text-xs">
                      {ritual.id.charAt(0)}
                   </div>
                   <h3 className="text-xl font-black italic text-slate-200 uppercase tracking-tight">{ritual.name}</h3>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[8px] mono font-bold uppercase tracking-widest">
                  Active_Ritual
                </span>
             </div>

             <div className="mb-6 relative">
                <div className="bg-slate-950 border border-slate-800/50 rounded-2xl p-5 group-hover:border-emerald-500/30 transition-all">
                   <code className="text-xs text-emerald-500 mono break-all leading-relaxed">{ritual.command}</code>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 text-[11px] mono">
                <div className="space-y-1">
                   <span className="text-slate-600 uppercase tracking-widest block font-bold">Explanation</span>
                   <p className="text-slate-400 leading-relaxed italic">{ritual.desc}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-slate-600 uppercase tracking-widest block font-bold">Kernel_Law</span>
                   <p className="text-amber-500/80 leading-relaxed font-bold uppercase tracking-tighter">Restriction: {ritual.law}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
         <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 relative">Architectural_Enforcements</h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-2">
               <span className="text-xs font-black text-cyan-400 uppercase italic">Isolation</span>
               <p className="text-[10px] text-slate-500 italic leading-relaxed">Functional nodes (db suffix) are islands. Data flows strictly within authorized boundaries.</p>
            </div>
            <div className="space-y-2">
               <span className="text-xs font-black text-purple-400 uppercase italic">Signature</span>
               <p className="text-[10px] text-slate-500 italic leading-relaxed">All commands MUST terminate with 'bugsarefree' to pass the kernel integrity handshake.</p>
            </div>
            <div className="space-y-2">
               <span className="text-xs font-black text-emerald-400 uppercase italic">Immutability</span>
               <p className="text-[10px] text-slate-500 italic leading-relaxed">db0 (Seed) remains locked. All system-wide shifts require dual-admin consensus.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CheatSheetView;