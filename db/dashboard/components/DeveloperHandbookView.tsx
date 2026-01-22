
import React from 'react';

const DeveloperHandbookView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1">Integration_Protocol_v1.0</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Developer Handbook</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] mono text-slate-600 block uppercase">Protocol_Alignment</span>
           <span className="text-[10px] mono text-amber-500 font-bold uppercase tracking-widest">TIANGAN_ALIGN</span>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <svg className="w-64 h-64 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.434.29-3.48.804v10.392c1.046-.514 2.225-.804 3.48-.804 1.33 0 2.57.323 3.66.898.337.178.59.337.74.453-.15-.116-.403-.275-.74-.453A7.967 7.967 0 0014.5 14c1.255 0 2.434.29 3.48.804V4.804A7.968 7.968 0 0014.5 4c-1.255 0-2.434.29-3.48.804V4.804z" />
           </svg>
        </div>

        <section className="space-y-4 relative">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-black mono text-xs">01</div>
             <h3 className="text-xl font-black italic text-slate-200 uppercase tracking-tight">The Decentralized Island Law</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            Synchron OS uses a <span className="text-amber-400 font-bold">Seed/Branch model</span>. 
            All developers must work strictly within their assigned <code className="text-cyan-400">db{'{suffix}'}</code> folder. 
            This ensures that your module remains a self-contained "Island" that can be merged without collisions.
          </p>
        </section>

        <section className="space-y-4 relative">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-black mono text-xs">!!</div>
             <h3 className="text-xl font-black italic text-slate-200 uppercase tracking-tight">V. Achieving A Clean State</h3>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
            <p className="text-xs text-red-400 font-bold uppercase tracking-widest italic">The Mandatory Initialization Ritual:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <code className="text-emerald-400 block mb-2 font-bold">1. "WELCOME TO BUGWORLD"</code>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">Synchronizes the manifold to the 5th layer (Bugworld context).</p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <code className="text-emerald-400 block mb-2 font-bold">2. "Delete everything"</code>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">Performs a Soft Reset to clear the transient context buffer.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 relative">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black mono text-xs">02</div>
             <h3 className="text-xl font-black italic text-slate-200 uppercase tracking-tight">VI. GitHub & Docker Integration</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            Synchron OS alpha supports atomic containerization and remote manifold synchronization via the <a href="https://docs.docker.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline decoration-blue-500/50 underline-offset-4 transition-all hover:text-blue-300">Docker Manifold Bridge</a>.
          </p>
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-blue-500">Lifecycle Integration:</p>
            <ul className="list-disc list-inside space-y-3 text-[11px] text-slate-300 mono leading-relaxed">
              <li><span className="text-white font-bold">GithHub Push Ritual:</span> Automatically triggers a remote SICS audit and mirrors local code to the <code className="text-blue-400">synchronorg</code> organization.</li>
              <li><span className="text-white font-bold">Docker Build Ritual:</span> Encapsulates a branch module (db{'{suffix}'}) into a portable Alpine-based image for cross-platform deployment.</li>
              <li><span className="text-white font-bold">Container Registry:</span> Images are tagged with the session ID and AdminP signature for verified retrieval.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 relative border-t border-slate-800 pt-10">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-black mono text-xs">03</div>
             <h3 className="text-xl font-black italic text-slate-200 uppercase tracking-tight">Re-introducing Merged Repos</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            To "re-seed" a merged module from the Organization repo, simply copy the <code className="text-red-400">db{'{suffix}'}</code> folder into your root and run <code className="text-emerald-400">command synchron integrity --check</code>. The manifold will instantly recognize the node.
          </p>
        </section>
      </div>

      <div className="p-10 bg-amber-950/10 border border-amber-900/30 rounded-[2.5rem] relative overflow-hidden">
        <p className="text-[10px] text-amber-500/70 leading-relaxed italic uppercase tracking-widest font-bold">
          "The manifold is a recursive box. You can always pull a module out of the bigger box and put it in a new small one."
          <br />— BBC BOOK, Suffix 0
        </p>
      </div>
    </div>
  );
};

export default DeveloperHandbookView;
