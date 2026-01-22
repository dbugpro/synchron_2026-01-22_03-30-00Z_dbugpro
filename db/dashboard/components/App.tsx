
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PulseRing from './PulseRing';
import ProjectManifestView from './ProjectManifest';
import ModuleRegistry from './ModuleRegistry';
import SessionLog from './SessionLog';
import DashboardView from '../DashboardView';
import CheatSheetView from './CheatSheetView';
import MirrorExportView from './MirrorExportView';
import DirectoryTreeView from './DirectoryTreeView';
import LibraryView from './LibraryView';
import DeveloperHandbookView from './DeveloperHandbookView';
import GitHubIntegrationView from './GitHubIntegrationView';
import { Task, TranscriptionMessage, TianganModule } from '../../../types';
import { gemini } from '../services/geminiService';

const REPO_0 = "synchron0_2026-01-18_18-15-00Z_dbugproductions";
const REPO_00 = "synchron00_2026-01-19_00-00-00Z_dbugproductions";

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Copy App to Drive (dbugproductions)', category: 'admin', priority: 'high', dueDate: '260117', synced: true },
  { id: 't2', title: 'Share with dbugproductions@gmail.com', category: 'admin', priority: 'high', dueDate: '260117', synced: true },
  { id: 't3', title: 'AI Studio Copy (dbugproductions)', category: 'admin', priority: 'high', dueDate: '260117', synced: true },
  { id: 't4', title: 'GitHub Save (db00 module)', category: 'admin', priority: 'high', dueDate: '260117', synced: true },
  { id: 't5', title: 'Re-open Drive App (dbugproductions)', category: 'admin', priority: 'high', dueDate: '260118', synced: true },
  { id: 't6', title: 'Kernel Handshake (AdminP/S)', category: 'admin', priority: 'high', dueDate: '260118', synced: true },
  { id: 't7', title: 'Remove db00 Ritual', category: 'admin', priority: 'high', dueDate: '260118', synced: true },
  { id: 't8', title: 'Save synchron0 Seed', category: 'admin', priority: 'high', dueDate: '260118', synced: true },
  { id: 't9', title: 'Share synchron0 (dbugproductions)', category: 'admin', priority: 'high', dueDate: '260119', synced: true },
  { id: 't10', title: 'AI Studio (dbugproductions) Open', category: 'admin', priority: 'high', dueDate: '260119', synced: true },
  { id: 't11', title: 'Create 2 Repos (dbugproductions GH)', category: 'admin', priority: 'high', dueDate: '260119', synced: true },
  { id: 't12', title: 'Transfer to SYNCHRONORG', category: 'admin', priority: 'high', dueDate: '260119', synced: true },
  { id: 't13', title: 'Unified System Merge', category: 'work', priority: 'high', dueDate: '260119', synced: true },
  { id: 't14', title: 'Add GitHub & Docker Integration', category: 'work', priority: 'high', dueDate: '260121', synced: false },
  { id: 't15', title: 'Enhance Module Registry UI', category: 'growth', priority: 'medium', dueDate: '260121', synced: false },
  { id: 't16', title: 'Write GitHub/Docker Guide', category: 'admin', priority: 'high', dueDate: '260121', synced: false }
];

const INITIAL_MODULES: TianganModule[] = [
  { id: 'NODE_ALPHA', name: REPO_0, status: 'stable', complexity: 100, lastUpdate: '2026-01-18', workFolder: '/db0' },
  { id: 'NODE_BETA', name: REPO_00, status: 'stable', complexity: 100, lastUpdate: '2026-01-19', workFolder: '/db00' }
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [modules, setModules] = useState<TianganModule[]>(INITIAL_MODULES);
  const [role, setRole] = useState<'adminp' | 'dbugx' | 'user'>('adminp');
  const [view, setView] = useState<'dashboard' | 'architecture' | 'library' | 'manifest' | 'cheatsheet' | 'logs' | 'mirror' | 'directory' | 'developer_handbook' | 'github'>('dashboard');
  const [isMuted, setIsMuted] = useState(false);
  const transcriptionRef = useRef<TranscriptionMessage[]>([]);

  const [transcriptions, setTranscriptions] = useState<TranscriptionMessage[]>([
    { text: "SYSTEM: Protocol Stage 8 active. Decentralized architecture 0.2.8 verified.", sender: 'system', timestamp: Date.now() - 5000 },
    { text: "KRNL_MSG: Session 14 (DBUG 260119) handshake complete. 25 toolkit files committed.", sender: 'system', timestamp: Date.now() - 2000 },
    { text: "KRNL_MSG: Unified System Merge verified. synchronorg remote origin stable.", sender: 'system', timestamp: Date.now() }
  ]);

  useEffect(() => {
    transcriptionRef.current = transcriptions;
  }, [transcriptions]);

  const handleTranscription = useCallback((text: string, sender: 'user' | 'ai' | 'system') => {
    setTranscriptions(prev => [...prev, { text, sender, timestamp: Date.now() }]);
  }, []);

  const handleAddTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
    handleTranscription(`TASK_COMMITTED: New objective "${task.title}" with priority ${task.priority.toUpperCase()} integrated.`, 'system');
  }, [handleTranscription]);

  const runSynchronicityAnalysis = useCallback(async (input: string) => {
    if (!input) return;
    const lowerNotes = input.toLowerCase();

    if (lowerNotes.includes('command synchron task --create')) {
      handleTranscription(input, 'user');
      const titleMatch = input.match(/--title "([^"]+)"/);
      const priorityMatch = input.match(/--priority (low|medium|high)/);
      
      if (titleMatch && input.includes('bugsarefree')) {
        const title = titleMatch[1];
        const priority = (priorityMatch ? priorityMatch[1] : 'medium') as any;
        handleAddTask({
          id: `task_${Date.now()}`,
          title,
          priority,
          category: 'admin',
          dueDate: '260121',
          synced: false
        });
      } else {
        handleTranscription("BIBR_ERROR: Ritual signature verification failed for task creation.", 'system');
      }
      return;
    }

    if (lowerNotes.includes('command synchron role --change')) {
      handleTranscription(input, 'user');
      const parts = input.split(' ');
      const newRoleFlag = parts.find(p => p.startsWith('--') && !['--change', '--bugsarefree', '--OFF'].includes(p))?.replace('--', '');
      
      if (input.includes('bugsarefree')) {
        const targetRole = (newRoleFlag === 'adminp' ? 'adminp' : (newRoleFlag === 'dbugx' ? 'dbugx' : 'user')) as any;
        setRole(targetRole);
        handleTranscription(`IDENTITY_SHIFT: Authorization set to ${targetRole.toUpperCase()}. consensus recalibrated.`, 'system');
      } else {
        handleTranscription("BIBR_ERROR: Ritual signature verification failed.", 'system');
      }
      return;
    }

    if (lowerNotes.includes('command synchron integrity --check')) {
      handleTranscription(input, 'user');
      if (input.includes('bugsarefree')) {
        handleTranscription("INTEGRITY_HANDSHAKE: Suffix 0 Baseline and Core Configs Verified. Seed is stable.", 'ai');
      } else {
        handleTranscription("BIBR_ERROR: Unsigned integrity check rejected.", 'system');
      }
      return;
    }

    const result = await gemini.analyzeSynchronicity(tasks, input);
    handleTranscription(result.data.summary, 'ai');
  }, [tasks, handleTranscription, handleAddTask]);

  useEffect(() => {
    (window as any).executeRitualCommand = (cmd: string) => {
      runSynchronicityAnalysis(cmd);
    };
  }, [runSynchronicityAnalysis]);

  const openTranscriptAudit = () => {
    const popup = window.open('', '_blank', 'width=1000,height=1200');
    if (!popup) {
      alert("POPUP_BLOCKED: Transcription handshake failed.");
      return;
    }

    const messagesHtml = transcriptionRef.current.map(msg => `
      <div class="msg-card ${msg.sender}">
        <div class="msg-meta">
          <span class="sender-tag">${msg.sender === 'user' ? 'ADMIN_P' : msg.sender === 'system' ? 'KRNL_MSG' : 'ADMIN_S'}</span>
          <span class="time-tag">${new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
        <div class="msg-text">${msg.text}</div>
      </div>
    `).join('');

    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SYNCHRON_OS | NEURAL_TRANSCRIPT_AUDIT</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; padding-top: 100px; }
          .fixed-nav { position: fixed; top: 0; left: 0; right: 0; background: #0f172a; border-bottom: 1px solid #1e293b; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; }
          .close-btn { background: #ef4444; color: white; font-size: 10px; font-weight: 900; padding: 8px 16px; border-radius: 8px; cursor: pointer; text-transform: uppercase; border: none; }
          .msg-card { margin-bottom: 20px; padding: 20px; border-radius: 20px; border: 1px solid #1e293b; background: #0f172a80; }
          .msg-card.user { border-left: 4px solid #10b981; }
          .msg-card.ai { border-left: 4px solid #06b6d4; }
          .msg-card.system { border-left: 4px solid #ef4444; background: #450a0a20; }
          .msg-meta { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 10px; font-weight: bold; }
          .sender-tag { color: #f8fafc; }
          .msg-text { font-size: 13px; line-height: 1.6; color: #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="fixed-nav">
          <div style="font-weight: 900; color: #06b6d4; font-size: 12px;">NEURAL_TRANSCRIPT_AUDIT [v0.2.6]</div>
          <button onclick="window.close()" class="close-btn">CLOSE AUDIT</button>
        </div>
        <div class="messages-container">
          ${messagesHtml}
        </div>
      </body>
      </html>
    `);
    popup.document.close();
  };

  const openRitualConsole = () => {
    const popup = window.open('', '_blank', 'width=600,height=400');
    if (!popup) {
      alert("POPUP_BLOCKED: Ritual console initialization failed.");
      return;
    }

    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SYNCHRON_OS | RITUAL_CONSOLE</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; padding: 40px; display: flex; flex-direction: column; height: 100vh; margin: 0; box-sizing: border-box; }
          .console-input { width: 100%; background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; color: #10b981; font-size: 14px; outline: none; transition: border-color 0.2s; margin-bottom: 20px; }
          .console-input:focus { border-color: #06b6d4; }
          .exec-btn { background: #06b6d4; color: #020617; font-size: 12px; font-weight: 900; padding: 16px; border-radius: 12px; cursor: pointer; text-transform: uppercase; border: none; width: 100%; transition: opacity 0.2s; }
          .exec-btn:hover { opacity: 0.8; }
        </style>
      </head>
      <body>
        <div style="margin-bottom: 24px;">
           <div style="font-[8px]; font-weight: 900; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.3em;">Ritual Command Console</div>
           <div style="font-size: 10px; color: #475569; margin-top: 4px;">Awaiting AdminP consensus ritual...</div>
        </div>
        <input id="ritualInput" type="text" class="console-input" placeholder="command synchron ritual..." autofocus />
        <button id="execBtn" class="exec-btn">Execute Ritual</button>
        <script>
           const input = document.getElementById('ritualInput');
           const btn = document.getElementById('execBtn');
           const handleExec = () => {
              const val = input.value.trim();
              if(val && window.opener) {
                window.opener.executeRitualCommand(val);
                window.close();
              }
           };
           btn.onclick = handleExec;
           input.onkeydown = (e) => { if(e.key === 'Enter') handleExec(); };
        </script>
      </body>
      </html>
    `);
    popup.document.close();
  };

  const handleMerge = (moduleId: string) => {
    if (role === 'user') {
      handleTranscription("ACCESS_DENIED: Generic users cannot initiate organizational merges.", 'system');
      return;
    }
    handleTranscription(`ORG_MERGE_PROTOCOL: Requesting verification for synchronorg integration of ${moduleId}.`, 'ai');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row font-sans selection:bg-cyan-500/30 relative overflow-hidden transition-all duration-300">
      <aside className="w-full md:w-80 border-r border-slate-800 bg-slate-900/40 p-6 pb-24 flex flex-col relative z-20 backdrop-blur-2xl sticky top-0 h-screen">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-tr from-emerald-600 via-cyan-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white mono text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span>8</span>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
              Synchron <span className="text-cyan-500">A</span>
            </h1>
            <span className="text-[9px] mono font-bold uppercase tracking-widest text-cyan-500 mt-1 block">DECENTRALIZED_KRNL</span>
          </div>
        </div>

        <nav className="flex flex-col space-y-1 mb-8 overflow-y-auto custom-scrollbar pr-1">
          {[
            { id: 'dashboard', label: 'ORCHESTRATION', icon: 'M 3 3 H 21 V 21 H 3 Z M 8 16 V 12 M 12 16 V 8 M 16 16 V 10' },
            { id: 'architecture', label: 'ORGANIZATION', icon: 'M 12 2 L 2 7 L 12 12 L 22 7 Z M 2 17 L 12 22 L 22 17' },
            { id: 'library', label: 'KERNEL_LIBRARIES', icon: 'M 12 6.03L2 11l10 4.97L22 11l-10-4.97zM2 17l10 5 10-5M2 14l10 5 10-5' },
            { id: 'github', label: 'GITHUB_VCS', icon: 'M 10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
            { id: 'directory', label: 'DIRECTORY_TREE', icon: 'M 3 7 v 10 a 2 2 0 0 0 2 2 h 14 a 2 2 0 0 0 2-2 V 9 a 2 2 0 0 0-2-2 h-6 l-2-2 H 5 a 2 2 0 0 0-2 2 z' },
            { id: 'developer_handbook', label: 'DEV_HANDBOOK', icon: 'M 9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
            { id: 'cheatsheet', label: 'RITUAL_HANDBOOK', icon: 'M 12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'mirror', label: 'MIRROR_SYNC', icon: 'M 8 7 H 16 M 8 11 H 16 M 8 15 H 12 M 17 21 l 4 -4 m 0 0 l -4 -4 m 4 4 H 3' },
            { id: 'manifest', label: 'MANIFEST', icon: 'M 19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z' },
            { id: 'logs', label: 'ORG_AUDIT', icon: 'M 9 5 H 7 a 2 2 0 00-2 2 v 12 a 2 2 0 00 2 2 h 10 a 2 2 0 00 2-2 V 7 a 2 2 0 00-2-2 h-2 M 9 5 a 2 2 0 00 2 2 h 2 a 2 2 0 00 2-2 M 9 5 a 2 2 0 01 2-2 h 2 a 2 2 0 01 2 2' }
          ].map(item => (
            <button key={item.id} onClick={() => setView(item.id as any)} className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${view === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              <span className="text-[10px] mono font-black tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border border-slate-800 rounded-2xl bg-slate-900/40">
           <div className="flex items-center justify-between mb-2">
              <label className="text-[8px] mono text-slate-500 uppercase tracking-widest">Auth_Identity</label>
              <span className={`text-[9px] mono font-black uppercase ${role === 'adminp' ? 'text-emerald-400' : 'text-amber-500'}`}>{role}</span>
           </div>
           <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden mb-4">
              <div className={`h-full ${role === 'adminp' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: role === 'adminp' ? '100%' : '60%' }} />
           </div>
           <div className="text-[7px] text-slate-700 italic leading-tight uppercase">
              Suffix 0 Seed locked to dbugproductions. Cross-node writes restricted.
           </div>
        </div>
      </aside>

      <main className="flex-1 px-6 pt-6 pb-0 flex flex-col relative z-10 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto relative custom-scrollbar">
          <header className="flex justify-between items-start gap-8 mb-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-slate-500 text-[10px] mono uppercase tracking-[0.2em] font-black">
                <span className="text-emerald-500 h-2 w-2 rounded-full inline-block animate-pulse"></span>
                <span>SYNCHRONORG_NAMESPACE</span>
                <span className="opacity-30">/</span>
                <span className="text-cyan-500 uppercase italic font-bold">ALPHA_V0.2.8</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-tight">{view.replace('_', ' ')}</h2>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1">
            <div className="lg:col-span-8 space-y-10 min-h-0 pr-4">
              {view === 'dashboard' ? (
                  <DashboardView modules={modules} tasks={tasks} onMerge={handleMerge} onAddTask={handleAddTask} />
              ) : view === 'architecture' ? (
                  <ModuleRegistry modules={modules} onMerge={handleMerge} />
              ) : view === 'library' ? (
                  <LibraryView />
              ) : view === 'cheatsheet' ? (
                  <CheatSheetView />
              ) : view === 'mirror' ? (
                  <MirrorExportView username="dbugproductions" onLog={handleTranscription} />
              ) : view === 'directory' ? (
                  <DirectoryTreeView onLog={handleTranscription} />
              ) : view === 'developer_handbook' ? (
                  <DeveloperHandbookView />
              ) : view === 'github' ? (
                  <GitHubIntegrationView username="dbugpro" onLog={handleTranscription} />
              ) : view === 'manifest' ? (
                  <ProjectManifestView 
                    manifest={{
                      versionId: REPO_0,
                      repoType: 'module_repo',
                      suffix: '0',
                      username: 'dbugproductions',
                      createdAt: '2026-01-18',
                      workDirectory: '/db0',
                      promptLineage: [],
                      modules: modules,
                      coreSettings: {}
                    }}
                    onExport={() => handleTranscription("MANIFEST_EXPORT_INIT", "system")}
                  />
              ) : <SessionLog />}
            </div>

            <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 pb-10 flex flex-col backdrop-blur-2xl shadow-3xl sticky top-0 h-fit max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
              <PulseRing onTranscription={handleTranscription} isMuted={isMuted} />
              <div className="mt-8 flex-1 flex flex-col min-h-0">
                 <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="text-center space-y-1">
                      <span className="text-[8px] mono text-slate-500 uppercase tracking-[0.2em] font-black">Neural_Packet_Buffer</span>
                    </div>
                    <button onClick={openTranscriptAudit} className="w-full max-w-[220px] py-2.5 rounded-full bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group relative overflow-hidden flex items-center justify-center space-x-3 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <svg className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <span className="text-[10px] mono font-black text-cyan-400 uppercase tracking-[0.2em] group-hover:text-cyan-300">Neural Transcript</span>
                    </button>
                    <button onClick={openRitualConsole} className="w-full max-w-[220px] py-2.5 rounded-full bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group relative overflow-hidden flex items-center justify-center space-x-3 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <svg className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      <span className="text-[10px] mono font-black text-emerald-400 uppercase tracking-[0.2em] group-hover:text-emerald-300">Ritual Console</span>
                    </button>
                    <div className="w-full pt-4 border-t border-slate-800/30 flex justify-between items-center text-[8px] mono text-slate-700 italic">
                      <span>AdminP Verified</span>
                      <span>SICS Stable</span>
                    </div>
                 </div>
                <div className="mt-auto max-w-[220px] mx-auto w-full space-y-4 mb-4">
                  <div className="flex items-center justify-between px-2">
                    <button onClick={() => setIsMuted(!isMuted)} className={`flex items-center space-x-2 text-[8px] mono font-black uppercase transition-all ${isMuted ? 'text-red-500' : 'text-slate-500 hover:text-cyan-400'}`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMuted ? "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" : "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} /></svg>
                      <span>{isMuted ? 'Muted' : 'Audio_On'}</span>
                    </button>
                    <span className="text-[8px] mono text-slate-700 uppercase">Buffer: 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Global Footer (33px Height) */}
          <footer className="h-[33px] min-h-[33px] border-t border-slate-800/50 flex items-center justify-between px-8 text-[7px] mono text-slate-600 uppercase tracking-[0.3em] font-black z-30 bg-[#020617]/80 backdrop-blur-sm sticky bottom-0">
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span>SICS_STABLE_0.2.8</span>
               </div>
               <span className="opacity-30">|</span>
               <span>AdminP: dbugpro</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="italic text-slate-700">"The manifold is a recursive box."</span>
              <span className="text-cyan-600 font-bold">bugsarefree</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
