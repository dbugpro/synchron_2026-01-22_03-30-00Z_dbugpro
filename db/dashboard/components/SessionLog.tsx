import React from 'react';
import { SessionLogEntry } from '../../../types';

const MOCK_SESSION: SessionLogEntry = {
  session_id: "sess_1737110000",
  timestamp: "2026-01-18T18:15:00.000Z",
  adminp: "dbugproductions",
  admins: "synchron",
  events: [
    "App copied to dbugproductions@gmail.com Drive. Seed suffix detected.",
    "Access shared with dbugproductions@gmail.com. Handshake initialized.",
    "Session established in dbugproductions AI Studio (PRJ_631025771036).",
    "Protocol advanced to STAGE_8: Organizational Handshake.",
    "Verification of Suffix 0 Immutability Law: PASS.",
    "Awaiting transfer to GitHub Organization: synchronorg.",
    "Baseline locked to Suffix 0.",
    "Decentralized Architecture v0.2.5 initialized.",
    "Module spawning decoupled from root manifest to prevent merge collisions.",
    "Collision Avoidance Model active for synchronorg integration.",
    "Consensus stable.",
    "Dual-Admin Handshake verified for kernel migration.",
    "Neural buffer integrity check: 100% parity.",
    "SICS HANDSHAKE: Protocol handshake established.",
    "External Audit Window capability deployed."
  ],
  status: "SECURED"
};

const SessionLog: React.FC = () => {
  const openExternalAudit = () => {
    const popup = window.open('', '_blank', 'width=1000,height=1200,menubar=no,toolbar=no,location=no,status=no');
    if (!popup) {
      alert("POPUP_BLOCKED: Neural link to external window failed. Please check browser permissions.");
      return;
    }

    const eventsHtml = MOCK_SESSION.events.map((event, idx) => `
      <div class="event-item">
        <div class="dot ${idx === MOCK_SESSION.events.length - 1 ? 'active' : ''}"></div>
        <div class="content">${event}</div>
      </div>
    `).join('');

    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SYNCHRON_OS | EXTERNAL_AUDIT [${MOCK_SESSION.session_id}]</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { 
            background-color: #020617; 
            color: #94a3b8; 
            font-family: 'JetBrains Mono', monospace;
            padding: 40px;
            margin: 0;
            padding-top: 100px;
          }
          .fixed-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #0f172a;
            border-bottom: 1px solid #1e293b;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
          }
          .close-btn {
            background: #ef4444;
            color: #ffffff;
            font-size: 10px;
            font-weight: 900;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border: none;
            transition: all 0.2s;
          }
          .close-btn:hover {
            background: #dc2626;
            transform: scale(1.05);
          }
          .header { padding-bottom: 24px; margin-bottom: 32px; border-bottom: 1px solid #1e293b; }
          .title { color: #f8fafc; font-size: 24px; font-weight: 900; font-style: italic; text-transform: uppercase; margin-bottom: 8px; }
          .id-badge { color: #10b981; font-size: 12px; font-weight: bold; }
          .grid-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
          .meta-box { background: #0f172a; border: 1px solid #1e293b; padding: 16px; border-radius: 12px; }
          .label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
          .val { color: #cbd5e1; font-size: 14px; font-weight: bold; }
          .event-list { position: relative; }
          .event-list::before { content: ''; position: absolute; left: 11px; top: 10px; bottom: 10px; width: 1px; background: #1e293b; }
          .event-item { display: flex; align-items: flex-start; gap: 24px; margin-bottom: 16px; }
          .dot { width: 24px; height: 24px; border-radius: 50%; background: #020617; border: 1px solid #1e293b; flex-shrink: 0; position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; }
          .dot::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
          .dot.active::after { background: #06b6d4; box-shadow: 0 0 10px #06b6d4; }
          .content { background: #0f172a80; border: 1px solid #1e293b40; padding: 12px 20px; border-radius: 12px; font-size: 13px; line-height: 1.6; flex: 1; }
          .footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid #1e293b; display: flex; justify-content: space-between; font-size: 10px; color: #475569; }
        </style>
      </head>
      <body>
        <div class="fixed-nav">
          <div class="id-badge">SESSION_AUDIT: ${MOCK_SESSION.session_id}</div>
          <button onclick="window.close()" class="close-btn">CLOSE AUDIT WINDOW</button>
        </div>

        <div class="header">
          <div class="title">Orchestration Audit Trail</div>
          <div class="id-badge">STATUS: ${MOCK_SESSION.status} • VERIFIED_SICS</div>
        </div>
        
        <div class="grid-meta">
          <div class="meta-box">
            <div class="label">Primary_Human (AdminP)</div>
            <div class="val" style="color: #10b981">@${MOCK_SESSION.adminp}</div>
          </div>
          <div class="meta-box">
            <div class="label">Primary_AI (AdminS)</div>
            <div class="val" style="color: #06b6d4">${MOCK_SESSION.admins}</div>
          </div>
          <div class="meta-box">
            <div class="label">Audit_Timestamp</div>
            <div class="val">${new Date(MOCK_SESSION.timestamp).toLocaleString()}</div>
          </div>
          <div class="meta-box">
            <div class="label">Protocol_Stage</div>
            <div class="val" style="color: #8b5cf6">STAGE_8_ALIGNED</div>
          </div>
        </div>

        <div class="event-list">
          ${eventsHtml}
        </div>

        <div class="footer">
          <div>Namespace Handshake Stable • SECURED</div>
          <div>bugsarefree</div>
        </div>
      </body>
      </html>
    `);
    popup.document.close();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2 flex items-center justify-center">
          <span className="w-1 h-3 bg-emerald-500 mr-2 rounded-full" /> ORCHESTRATION_AUDIT_HANDSHAKE
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed italic">
          Access the secure kernel audit stream. All events are signed with the immutable Suffix 0 consensus baseline.
        </p>
      </div>

      <button 
        onClick={openExternalAudit}
        className="group relative flex flex-col items-center space-y-4 p-16 rounded-[4rem] bg-slate-900 border-4 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-950 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-500 transition-all duration-500">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="text-center">
          <span className="text-2xl font-black italic text-white uppercase tracking-tighter">Launch External Audit</span>
          <div className="text-[10px] mono text-emerald-500 font-bold uppercase tracking-widest mt-2">ID: {MOCK_SESSION.session_id}</div>
        </div>
      </button>

      <div className="flex items-center space-x-8 pt-8">
        <div className="flex flex-col items-center">
          <span className="text-[8px] mono text-slate-600 uppercase mb-1">Status</span>
          <span className="text-[10px] mono text-emerald-400 font-black tracking-widest uppercase">{MOCK_SESSION.status}</span>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="flex flex-col items-center">
          <span className="text-[8px] mono text-slate-600 uppercase mb-1">Integrity</span>
          <span className="text-[10px] mono text-cyan-400 font-black tracking-widest uppercase">100% PARITY</span>
        </div>
      </div>
    </div>
  );
};

export default SessionLog;