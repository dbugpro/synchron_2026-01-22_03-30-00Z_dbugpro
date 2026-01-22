
import React, { useEffect, useState, useRef } from 'react';
import { gemini, createPcmBlob, decode, decodeAudioData, VoiceParameters } from '../services/geminiService';
import { LiveServerMessage, Modality } from '@google/genai';

interface PulseRingProps {
  onTranscription: (text: string, sender: 'user' | 'ai' | 'system') => void;
  isMuted?: boolean;
}

const VOICES = [
  { id: 'Kore', label: 'KORE (Optimistic)' },
  { id: 'Puck', label: 'PUCK (Playful)' },
  { id: 'Charon', label: 'CHARON (Analytical)' },
  { id: 'Fenrir', label: 'FENRIR (Deep)' },
  { id: 'Zephyr', label: 'ZEPHYR (Fluid)' }
];

const PulseRing: React.FC<PulseRingProps> = ({ onTranscription, isMuted = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'handshake' | 'error'>('idle');
  const [showSettings, setShowSettings] = useState(false);
  
  const [voiceName, setVoiceName] = useState('Kore');
  const [sensitivity, setSensitivity] = useState(1.0);
  const [vp, setVp] = useState<VoiceParameters>({
    gender: 'neutral',
    age: 'mature',
    empathy: 0.7,
    country: 'Global',
    language: 'English',
    accent: 'Neutral',
    speed: 1.0
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Ref to track active state for audio processing closure
  const isActiveRef = useRef(false);
  const statusRef = useRef<'idle' | 'connecting' | 'listening' | 'speaking' | 'handshake' | 'error'>('idle');

  // Keep refs in sync with state
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const playStatusTone = (type: 'connect' | 'disconnect' | 'error' | 'handshake') => {
    if (isMuted) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    switch (type) {
      case 'connect':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.3);
        break;
      case 'disconnect':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1320, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        break;
      case 'error':
        osc.type = 'square';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.setValueAtTime(70, now + 0.1);
        break;
      case 'handshake':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        osc.frequency.setValueAtTime(1100, now + 0.2);
        break;
    }
    
    osc.start(now);
    osc.stop(now + 0.4);
  };

  useEffect(() => {
    if (outputContextRef.current) {
      if (isMuted) {
        outputContextRef.current.suspend().catch(console.error);
      } else {
        outputContextRef.current.resume().catch(console.error);
      }
    }
  }, [isMuted]);

  const startSession = async () => {
    try {
      setStatus('connecting');
      setIsActive(true);
      playStatusTone('connect');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("UNSUPPORTED_HARDWARE: Audio capture restricted by kernel.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000
        } 
      });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      await inputCtx.resume();
      await outputCtx.resume();
      
      audioContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;

      const sessionPromise = gemini.connectLive({
        onOpen: () => {
          setStatus('listening');
          onTranscription("NEURAL_LINK: Established. Awaiting AdminP input.", "system");
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          
          processor.onaudioprocess = (e) => {
            try {
              // Use ref to avoid stale closure on status/isActive
              if (!isActiveRef.current) return;
              
              const inputData = e.inputBuffer.getChannelData(0);
              const processedData = new Float32Array(inputData.length);
              // Simple peak detection for visual indicator if needed later
              for(let i=0; i<inputData.length; i++) processedData[i] = inputData[i] * sensitivity;
              
              const blob = createPcmBlob(processedData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: blob });
              });
            } catch (err) {
              console.error("KRNL_AUDIO_SYNC_FAILURE:", err);
            }
          };

          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onMessage: async (message: LiveServerMessage) => {
          const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioBase64 && outputContextRef.current) {
            setStatus('speaking');
            const ctx = outputContextRef.current;
            const lookahead = 0.1;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime + lookahead);
            
            const buffer = await decodeAudioData(decode(audioBase64), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.onended = () => {
              sourcesRef.current.delete(source);
              // Only go back to listening if we aren't performing a handshake ritual
              if (sourcesRef.current.size === 0 && statusRef.current !== 'handshake') setStatus('listening');
            };
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.inputTranscription) {
            onTranscription(message.serverContent.inputTranscription.text, 'user');
          }
          if (message.serverContent?.outputTranscription) {
            const text = message.serverContent.outputTranscription.text;
            onTranscription(text, 'ai');
            if (text.includes("HANDSHAKE_VERIFIED") || text.includes("CONSENSUS_STABLE")) {
               playStatusTone('handshake');
               setStatus('handshake');
               setTimeout(() => setStatus('listening'), 3000);
            }
          }
          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setStatus('listening');
          }
        },
        onError: async (e: any) => {
            playStatusTone('error');
            setStatus('error');
            const aiMsg = await gemini.getAiErrorReport(e.message || "Unknown neural sync failure");
            onTranscription(aiMsg || "SICS_BREACH: Neural synchronization failed.", "system");
            stopSession();
        },
        onclose: () => stopSession()
      }, { voiceName, voiceParams: vp });

      sessionPromiseRef.current = sessionPromise;

    } catch (err: any) {
      playStatusTone('error');
      setStatus('error');
      const errorMessage = err.name === 'NotAllowedError' 
        ? "MIC_RESTRICTED: AdminP must authorize audio capture." 
        : (err.message || "KRNL_ABORT: Audio handshake failure.");
      
      onTranscription(errorMessage, "system");
      setIsActive(false);
    }
  };

  const stopSession = () => {
    if (isActive) playStatusTone('disconnect');
    setIsActive(false);
    setStatus('idle');
    streamRef.current?.getTracks().forEach(t => t.stop());
    
    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close().catch(console.error);
    }
    if (outputContextRef.current?.state !== 'closed') {
      outputContextRef.current?.close().catch(console.error);
    }
    
    sessionPromiseRef.current?.then((s: any) => {
      try { s.close(); } catch(e){}
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 relative">
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className={`absolute top-0 right-0 p-2.5 rounded-2xl transition-all z-50 ${showSettings ? 'bg-cyan-500 text-slate-950 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'}`}
        title="Neural Calibration"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {showSettings && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/20 animate-in fade-in duration-300" 
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="w-full max-w-[280px] bg-slate-900 border-2 border-slate-700 p-5 rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <h4 className="text-[9px] mono font-bold text-cyan-400 uppercase tracking-[0.2em]">Calibration</h4>
                <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-white transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[7px] mono text-slate-500 uppercase tracking-widest">Voice_Signature</label>
                  <select 
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    disabled={isActive}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[10px] mono text-slate-300 focus:outline-none focus:border-cyan-500 appearance-none disabled:opacity-50"
                  >
                    {VOICES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[7px] mono text-slate-500 uppercase tracking-widest">Gender</label>
                    <select value={vp.gender} onChange={(e) => setVp({...vp, gender: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[10px] mono text-slate-300 focus:outline-none focus:border-cyan-500/30">
                      <option value="male">MALE</option>
                      <option value="female">FEMALE</option>
                      <option value="neutral">NEUTRAL</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[7px] mono text-slate-500 uppercase tracking-widest">Age</label>
                    <select value={vp.age} onChange={(e) => setVp({...vp, age: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[10px] mono text-slate-300 focus:outline-none focus:border-cyan-500/30">
                      <option value="youthful">YOUTH</option>
                      <option value="mature">MATURE</option>
                      <option value="ancient">ANCIENT</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[7px] mono text-slate-500 uppercase tracking-widest flex justify-between font-bold">Empathy <span className="text-cyan-400">{Math.round((vp.empathy || 0) * 100)}%</span></label>
                  <input type="range" min="0" max="1" step="0.1" value={vp.empathy} onChange={(e) => setVp({...vp, empathy: parseFloat(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[7px] mono text-slate-500 uppercase tracking-widest flex justify-between font-bold">Mic <span className="text-cyan-400">{Math.round(sensitivity * 100)}%</span></label>
                  <input type="range" min="0.5" max="2.0" step="0.1" value={sensitivity} onChange={(e) => setSensitivity(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[7px] mono text-slate-500 uppercase tracking-widest flex justify-between font-bold">Frequency <span className="text-cyan-400">{vp.speed}x</span></label>
                  <input type="range" min="0.5" max="2" step="0.1" value={vp.speed} onChange={(e) => setVp({...vp, speed: parseFloat(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                </div>

                <div className="pt-3 mt-1 border-t border-slate-800 flex justify-between items-center text-slate-400 text-[8px] mono uppercase font-bold tracking-widest">
                   <span>AdminS: {isActive ? 'SYNC' : 'STBY'}</span>
                   <span className={isActive ? 'text-emerald-500' : 'text-slate-600'}>SICS_LOCK</span>
                </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="relative group cursor-pointer"
        onClick={() => isActive ? stopSession() : startSession()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute -inset-10 bg-cyan-500/10 rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'opacity-100 scale-125 animate-pulse' : 'opacity-0 scale-90'}`} />
        <div className={`absolute -inset-6 border border-cyan-500/20 rounded-full transition-all duration-700 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-75'}`} />
        
        <div className={`absolute -inset-8 border-2 border-amber-500/30 rounded-full transition-all duration-1000 ${status === 'handshake' ? 'opacity-100 scale-125 blur-sm' : 'opacity-0 scale-50'}`} />

        <div className={`
          relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 border-2
          ${isActive ? 'bg-cyan-600 border-cyan-400 shadow-[0_0_60px_rgba(8,145,178,0.6)]' : 'bg-slate-900 border-slate-800 hover:border-cyan-500 hover:bg-slate-800 shadow-2xl'}
          ${status === 'handshake' ? 'border-amber-400 bg-amber-600 shadow-[0_0_60px_rgba(245,158,11,0.6)]' : ''}
          ${status === 'error' ? 'border-red-500 bg-red-950/20 shadow-[0_0_60px_rgba(239,68,68,0.4)] animate-shake' : ''}
        `}>
          <svg 
            data-icon="microphone"
            className={`w-14 h-14 absolute transition-all duration-500 
              ${isHovered ? 'scale-110' : 'scale-100'} 
              ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'} 
              ${status === 'connecting' || status === 'speaking' || status === 'handshake' ? 'opacity-20 scale-75 blur-[1px]' : 'opacity-100'}
              ${status === 'listening' ? 'animate-mic-pulse' : ''}
              ${status === 'error' ? 'text-red-500 animate-glitch' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>

          {(status === 'connecting' || status === 'handshake') && (
            <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin absolute ${status === 'handshake' ? 'border-amber-200' : 'border-cyan-200'}`} />
          )}

          {status === 'speaking' && (
            <div className="flex items-end space-x-1.5 h-10 absolute">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s`, height: `${40 + Math.random() * 60}%` }} />
               ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className={`text-2xl font-black tracking-[0.2em] uppercase italic transition-all duration-500 ${isActive ? 'text-cyan-400 scale-105' : 'text-white'} ${status === 'handshake' ? 'text-amber-400' : status === 'error' ? 'text-red-500' : ''}`}>
          {status === 'handshake' ? 'RITUAL ACTIVE' : status === 'error' ? 'KRNL_ABORT' : isActive ? 'SYNCHRONOS ACTIVE' : 'ORCHESTRATE'}
        </h3>
        <p className={`text-[10px] mt-2 uppercase tracking-[0.3em] font-bold transition-all duration-300 ${status === 'listening' ? 'text-cyan-400' : status === 'speaking' ? 'text-emerald-400' : status === 'handshake' ? 'text-amber-400' : status === 'error' ? 'text-red-600' : 'text-slate-500'}`}>
          {status === 'listening' ? 'Hearing neural packets...' : status === 'speaking' ? 'Relaying insight...' : status === 'handshake' ? 'Dual-Admin Handshake...' : status === 'error' ? 'SICS Collision detected' : 'Tap for neural handshake'}
        </p>
      </div>
    </div>
  );
};

export default PulseRing;
