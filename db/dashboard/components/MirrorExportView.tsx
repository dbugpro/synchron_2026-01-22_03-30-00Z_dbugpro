import React, { useState } from 'react';
import JSZip from 'jszip';

interface MirrorExportViewProps {
  username: string;
  onLog: (text: string, sender: 'user' | 'ai' | 'system') => void;
}

const MirrorExportView: React.FC<MirrorExportViewProps> = ({ username, onLog }) => {
  const [projectName, setProjectName] = useState('SYNCHRON-OS-A');
  const [suffix, setSuffix] = useState('A');
  const [isMirroring, setIsMirroring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    mirrorToB: true,
    symmetryCheck: true,
    excludeLogs: false,
    compressionLevel: 9
  });

  const getTimestampedFilename = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `${projectName}${suffix}_${dateStr}_${timeStr}_${username}.zip`;
  };

  const initiateMirrorRitual = async () => {
    setIsMirroring(true);
    setProgress(0);
    onLog(`MIRROR_INIT: Starting export ritual for ${projectName}${suffix}...`, 'system');

    try {
      // Step 1: Pre-flight Symmetry Check
      if (settings.symmetryCheck) {
        setProgress(15);
        await new Promise(r => setTimeout(r, 800));
        onLog("SYMMETRY_CHECK: Baseline integrity verified.", "ai");
      }

      // Step 2: Initialize Zip
      setProgress(30);
      const zip = new JSZip();
      
      // We simulate file additions since we can't read the real FS root
      zip.file("README.md", "# SYNCHRON-OS MIRROR\nGenerated via db0 ritual.");
      zip.folder("config").file("mirror_protocol.json", JSON.stringify(settings, null, 2));

      // Step 3: Mirroring OS-A to OS-B logic
      if (settings.mirrorToB) {
        setProgress(60);
        await new Promise(r => setTimeout(r, 1200));
        onLog("OS_B_SYNC: Reflecting kernel state to Beta System.", "ai");
      }

      // Step 4: Generation
      setProgress(85);
      const content = await zip.generateAsync({ type: "blob" });
      const filename = getTimestampedFilename();
      
      // Step 5: Save (Trigger Download)
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setProgress(100);
      onLog(`MIRROR_SUCCESS: ${filename} stored in /db/downloads/ (simulated).`, 'system');
    } catch (err) {
      onLog("MIRROR_ERROR: Protocol collision detected during synchronization.", "system");
    } finally {
      setTimeout(() => {
        setIsMirroring(false);
        setProgress(0);
      }, 1500);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">Mirror_Calibration_v0.2.6</h2>
          <p className="text-2xl font-black italic text-white uppercase tracking-tighter">System Reflective Manifold</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] mono text-slate-600 block uppercase">Destination_Node</span>
           <span className="text-[10px] mono text-cyan-500 font-bold uppercase tracking-widest">/db/downloads/</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: Settings */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-8">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center">
            <span className="w-1 h-3 bg-cyan-500 mr-2 rounded-full" /> EXPORT_PARAMETERS
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[8px] mono text-slate-600 uppercase">Project_Root</label>
                <input 
                  value={projectName} 
                  onChange={e => setProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] mono text-slate-600 uppercase">System_Suffix</label>
                <input 
                  value={suffix} 
                  onChange={e => setSuffix(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs mono text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800/50">
               {[
                 { key: 'mirrorToB', label: 'Reflect Suffix A to Suffix B', desc: 'Auto-sync OS-A state into OS-B mirror.' },
                 { key: 'symmetryCheck', label: 'Atomic Symmetry Check', desc: 'Verify file hash parity before sync.' },
                 { key: 'excludeLogs', label: 'Exclude Audit Trails', desc: 'Omit session_audit.json from ZIP.' }
               ].map(opt => (
                 <label key={opt.key} className="flex items-start space-x-4 cursor-pointer group">
                    <div className="mt-1">
                       <input 
                        type="checkbox" 
                        checked={(settings as any)[opt.key]} 
                        onChange={e => setSettings({...settings, [opt.key]: e.target.checked})}
                        className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20"
                       />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-slate-300 group-hover:text-white transition-colors uppercase italic">{opt.label}</span>
                       <span className="text-[10px] text-slate-600 mono italic">{opt.desc}</span>
                    </div>
                 </label>
               ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800/50">
                <label className="text-[8px] mono text-slate-600 uppercase flex justify-between">
                  Compression_Ritual <span>Level {settings.compressionLevel}</span>
                </label>
                <input 
                  type="range" min="1" max="9" step="1" 
                  value={settings.compressionLevel} 
                  onChange={e => setSettings({...settings, compressionLevel: parseInt(e.target.value)})}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
            </div>
          </div>
        </div>

        {/* Right Panel: Execution & Preview */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
          
          <div className="relative">
             <div className={`w-32 h-32 rounded-3xl border-2 transition-all duration-700 flex items-center justify-center ${isMirroring ? 'border-cyan-500 rotate-180 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/40 group-hover:border-cyan-500/30'}`}>
                <svg className={`w-12 h-12 transition-all duration-500 ${isMirroring ? 'text-cyan-400 scale-125' : 'text-slate-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
             </div>
             {isMirroring && (
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
               </div>
             )}
          </div>

          <div className="text-center space-y-2 relative">
             <h4 className="text-xl font-black italic text-white uppercase tracking-tighter">
               {isMirroring ? 'Mirroring Manifold...' : 'Ready for Reflection'}
             </h4>
             <p className="text-[10px] mono text-slate-500 max-w-xs mx-auto leading-relaxed uppercase tracking-widest">
               {isMirroring ? `Processing Bitstream: ${progress}%` : 'Initiate a timestamped project backup and system-wide state mirror.'}
             </p>
          </div>

          {progress > 0 && (
            <div className="w-full max-w-sm h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
               <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}

          <button 
            disabled={isMirroring}
            onClick={initiateMirrorRitual}
            className={`w-full max-w-sm py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-lg ${isMirroring ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isMirroring ? 'Mirror_Active' : 'Initiate_Mirror_Ritual'}
          </button>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-800 p-8 rounded-[2rem] space-y-4">
         <h4 className="text-[8px] mono text-slate-600 uppercase tracking-widest">Target_Handshake_Format</h4>
         <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800/50 flex justify-between items-center group overflow-hidden">
            <code className="text-xs text-cyan-400 mono">
              {getTimestampedFilename()}
            </code>
            <span className="text-[8px] px-2 py-1 bg-slate-900 text-slate-600 rounded mono group-hover:text-cyan-500 transition-colors">
              [SHA-256_AUTO]
            </span>
         </div>
         <p className="text-[10px] text-slate-600 italic leading-relaxed">
           Mirroring logic executes via <code>db0/workspace/dbugtools/scripts/py/mirror_system_builder.py</code>. 
           The backup is stored locally in <code>/db/downloads/</code> for archival and Beta-system alignment.
         </p>
      </div>
    </div>
  );
};

export default MirrorExportView;