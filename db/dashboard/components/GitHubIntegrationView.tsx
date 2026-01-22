
import React, { useState } from 'react';
import { GitCommit } from '../../../types';
import { gemini } from '../services/geminiService';

interface GitHubIntegrationViewProps {
  onLog: (text: string, sender: 'user' | 'ai' | 'system') => void;
  username: string;
}

const INITIAL_COMMITS: GitCommit[] = [
  { id: '8f2a1c', message: 'Initial manifold seed deployment', author: 'dbugpro', timestamp: '2026-01-18T12:00:00Z', node: 'db0' },
  { id: '4e9b7d', message: 'SICS restraint protocols initialized', author: 'dbugpro', timestamp: '2026-01-18T18:45:00Z', node: 'db0' },
  { id: '2c5f8a', message: 'Handshake verified for db00 branch', author: 'dbugpro', timestamp: '2026-01-19T00:05:00Z', node: 'db00' }
];

const GitHubIntegrationView: React.FC<GitHubIntegrationViewProps> = ({ onLog, username }) => {
  const [commits, setCommits] = useState<GitCommit[]>(INITIAL_COMMITS);
  const [commitMessage, setCommitMessage] = useState('');
  const [ritualSignature, setRitualSignature] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      onLog("KRNL_MSG: Commit aborted. Empty objective message.", "system");
      return;
    }
    if (ritualSignature !== 'bugsarefree') {
      onLog("BIBR_ERROR: Unsigned commit ritual. Access denied.", "system");
      return;
    }

    setIsSyncing(true);
    setProgress(0);
    onLog(`GH_SYNC_INIT: Committing changes to synchronorg/core_a...`, 'system');

    // Simulate git ritual
    try {
      setProgress(20);
      await new Promise(r => setTimeout(r, 600));
      onLog("GIT_DIFF: Scanning local branch db0 for mutations...", "system");
      
      setProgress(50);
      await new Promise(r => setTimeout(r, 800));
      onLog("SICS_AUDIT: Verifying commit signature against BBC BOOK...", "system");

      setProgress(80);
      const aiResponse = await gemini.simulateGitHubSync(commitMessage);
      onLog(aiResponse || "REMOTE_PUSH: Manifold state mirrored to synchronorg.", "ai");

      const newCommit: GitCommit = {
        id: Math.random().toString(16).substring(2, 8),
        message: commitMessage,
        author: username,
        timestamp: new Date().toISOString(),
        node: 'db0'
      };

      setCommits([newCommit, ...commits]);
      setCommitMessage('');
      setRitualSignature('');
      setProgress(100);
      onLog(`GH_SYNC_SUCCESS: Commit ${newCommit.id} pushed.`, 'system');
    } catch (err) {
      onLog("GH_SYNC_FAILURE: Connection to synchronorg lost.", "system");
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
        setProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">Git_Integration_v0.2.8</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">Remote Manifold Sync</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] mono text-slate-600 block uppercase">Organization</span>
           <span className="text-[10px] mono text-blue-500 font-bold uppercase tracking-widest">synchronorg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Commit Interface */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-2 relative">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-3 bg-blue-500 mr-2 rounded-full" /> STAGE_CHANGES
            </h3>
            <p className="text-[11px] text-slate-500 italic">Declare the objective of this mutation.</p>
          </div>

          <div className="space-y-4 relative">
             <div className="space-y-2">
                <label className="text-[8px] mono text-slate-600 uppercase">Commit_Message</label>
                <textarea 
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Summarize kernel mutations..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm mono text-blue-400 focus:outline-none focus:border-blue-500/50 min-h-[100px] resize-none"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[8px] mono text-slate-600 uppercase">Ritual_Signature</label>
                <input 
                  type="text"
                  value={ritualSignature}
                  onChange={(e) => setRitualSignature(e.target.value)}
                  placeholder="signature..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs mono text-emerald-400 focus:outline-none focus:border-emerald-500/50"
                />
             </div>

             <div className="pt-4">
                {isSyncing && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-[8px] mono text-blue-500 uppercase font-black">
                       <span>Push_Progress</span>
                       <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
                
                <button 
                  disabled={isSyncing}
                  onClick={handleCommit}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-lg ${isSyncing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] shadow-blue-500/10'}`}
                >
                  {isSyncing ? 'Pushing_Ritual...' : 'Commit_and_Push_to_Org'}
                </button>
             </div>
          </div>
        </div>

        {/* Right: Repository Status */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">REMOTE_STATUS</h3>
              <div className="flex items-center space-x-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[9px] mono text-blue-400 font-black">SYNCHRONORG_LIVE</span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-center">
                 <div className="space-y-1">
                    <span className="text-[8px] mono text-slate-600 uppercase">Active_Branch</span>
                    <span className="text-xs font-bold text-slate-200 block">main_kernel</span>
                 </div>
                 <div className="text-right space-y-1">
                    <span className="text-[8px] mono text-slate-600 uppercase">Upstream</span>
                    <span className="text-xs font-bold text-blue-400 block">synchronorg/core_a</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[8px] mono text-slate-600 uppercase block mb-1">Local_Changes</span>
                    <span className="text-xl font-black italic text-white">0.2.8_DIRTY</span>
                 </div>
                 <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-[8px] mono text-slate-600 uppercase block mb-1">Sync_State</span>
                    <span className="text-xl font-black italic text-emerald-500 uppercase">AHEAD_3</span>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <p className="text-[10px] text-blue-400/70 italic leading-relaxed uppercase">
                "Commits in Synchron OS are atomic signatures in the BBC BOOK. Every push is a ritual of consensus between AdminP and the remote organizational manifold."
              </p>
           </div>
        </div>
      </div>

      {/* Commit History */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center">
          <span className="w-1 h-3 bg-blue-500 mr-2 rounded-full shadow-[0_0_8px_#3b82f6]" /> 
          COMMIT_LOG_MANIFOLD
        </h3>

        <div className="space-y-4">
          {commits.map((commit, idx) => (
            <div key={commit.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
              <div className="flex items-center space-x-5">
                <div className="text-[10px] mono font-black text-blue-500 bg-blue-500/5 px-2 py-1 rounded border border-blue-500/20">
                  {commit.id}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-100 italic">"{commit.message}"</div>
                  <div className="flex items-center space-x-3 text-[9px] mono text-slate-500 uppercase font-black">
                    <span>@{commit.author}</span>
                    <span className="opacity-30">|</span>
                    <span>Node: {commit.node}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                 <span className="text-[9px] mono text-slate-600 block">{new Date(commit.timestamp).toLocaleTimeString()}</span>
                 <span className="text-[8px] mono text-emerald-500 font-bold uppercase tracking-widest">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubIntegrationView;
