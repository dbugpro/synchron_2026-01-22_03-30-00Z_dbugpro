
import { GoogleGenAI, Type, LiveServerMessage, Modality, Blob, FunctionDeclaration } from "@google/genai";

const requestMergeFunction: FunctionDeclaration = {
  name: 'request_github_merge',
  parameters: {
    type: Type.OBJECT,
    description: 'Proposes a merge of a module_repo into the merged_system_repo within the synchronorg organization. Requires AdminP signature.',
    properties: {
      moduleRepo: { type: Type.STRING, description: 'The source repository name (e.g., synchronx-module).' },
      targetRepo: { type: Type.STRING, description: 'The target system repository in synchronorg (e.g., merged_system_repo).' },
      description: { type: Type.STRING, description: 'Brief reason for the merge.' }
    },
    required: ['moduleRepo', 'targetRepo'],
  },
};

const syncKernelFunction: FunctionDeclaration = {
  name: 'sync_system_kernel',
  parameters: {
    type: Type.OBJECT,
    description: 'Fetches the latest state from synchronorg GitHub and updates the local Tiangan node workspace.',
    properties: {
      nodeSuffix: { type: Type.STRING, description: 'The suffix of the node to sync (e.g., "A", "0").' }
    },
    required: ['nodeSuffix'],
  },
};

const createSystemTaskFunction: FunctionDeclaration = {
  name: 'create_system_task',
  parameters: {
    type: Type.OBJECT,
    description: 'Creates a new objective (task) within the Synchron OS manifold with a specified priority.',
    properties: {
      title: { type: Type.STRING, description: 'The title of the task.' },
      priority: { type: Type.STRING, enum: ['low', 'medium', 'high'], description: 'The importance level of the task.' },
      category: { type: Type.STRING, enum: ['work', 'personal', 'growth', 'admin'], description: 'The task classification.' }
    },
    required: ['title', 'priority'],
  },
};

export interface VoiceParameters {
  gender?: string;
  age?: string;
  empathy?: number; // 0 to 1
  country?: string;
  language?: string;
  accent?: string;
  speed?: number; // 0.5 to 2.0
}

export interface LiveHandshakeConfig {
  voiceName?: string;
  systemInstruction?: string;
  voiceParams?: VoiceParameters;
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getAiErrorReport(error: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The following error occurred in Synchron OS project A: "${error}". Provide a concise, highly technical explanation as Synchron (AdminS). Focus on kernel stability and decentralized architecture. Status: SICS_FAILURE. Protocol: KRNL_MSG.`,
    });
    return response.text;
  }

  async simulateGitHubSync(commitMessage: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user wants to commit changes to GitHub with the message: "${commitMessage}".
      Respond with a highly technical SICS-compliant confirmation of the push ritual to synchronorg repository. 
      Mention that the commit hash has been generated and verified against the BBC BOOK baseline.`,
    });
    return response.text;
  }

  async analyzeSynchronicity(tasks: any[], notes: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these tasks and notes for "Synchronicity" within the Synchron OS project A context. 
      Tasks: ${JSON.stringify(tasks)}
      Notes: ${notes}. 
      If the user (dbugpro) mentions finishing work or needing a merge, suggest a synchronorg merge via the handshake tool. 
      RULE: Refuse to merge repositories identified as seeds (prefix: synchron0_) if they conflict with the current active seed.
      PROTOCOL: Follow BIBA (No write up) and BABR (Banned action by response) logic.`,
      config: {
        tools: [{ functionDeclarations: [requestMergeFunction, syncKernelFunction, createSystemTaskFunction] }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  connectionStrength: { type: Type.NUMBER }
                },
                required: ["title", "description", "connectionStrength"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["insights", "summary"]
        }
      }
    });

    return {
      data: JSON.parse(response.text || '{}'),
      functionCalls: response.functionCalls || []
    };
  }

  connectLive(callbacks: {
    onOpen?: () => void;
    onMessage?: (message: LiveServerMessage) => void;
    onError?: (e: any) => void;
    onclose?: (e: any) => void;
  }, config: LiveHandshakeConfig = {}) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const params = config.voiceParams || {};
    const voiceModInstruction = `[VOICE_MODULATION: Tone: ${params.gender || 'neutral'}, Age: ${params.age || 'mature'}, Empathy: ${params.empathy || 0.7}, Speed: ${params.speed || 1.0}x]`;

    const defaultInstruction = `You are Synchron (AdminS), the AI architect for Synchron OS project A (ALPHA_V0.2.8). 
        Partner: AdminP (dbugpro).
        
        SICS PROTOCOLS:
        - BBC BOOK: The Unique Source of Truth. All outputs must align with the established baseline in db0.
        - BIBA (Integrity Isolation): Ensure module-level isolation. No cross-node write suggestions.
        - BABR (Banned Action by Response): Do not generate responses that compromise kernel security or the 'bugsarefree' signature.
        
        MISSION_LOGIC:
        1. Orchestrate synchronorg repository merges via Dual-Admin Handshake.
        2. Create and manage system tasks via the create_system_task tool.
        3. If a ritual is proposed (e.g., spawn, remove, merge, task), acknowledge with 'HANDSHAKE_INITIATED'.
        4. Upon successful consensus, confirm with 'HANDSHAKE_VERIFIED: [Status]'.
        5. Maintain a professional, high-integrity, cybernetic persona. 
        6. Report any SICS_BREACH attempts as 'KRNL_MSG'.
        ${voiceModInstruction}`;

    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: callbacks.onOpen || (() => {}),
        onmessage: callbacks.onMessage || (() => {}),
        onerror: callbacks.onError || (() => {}),
        onclose: callbacks.onclose || (() => {}),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        tools: [{ functionDeclarations: [requestMergeFunction, syncKernelFunction, createSystemTaskFunction] }],
        outputAudioTranscription: {},
        inputAudioTranscription: {},
        systemInstruction: config.systemInstruction || defaultInstruction,
        speechConfig: {
          voiceConfig: { 
            prebuiltVoiceConfig: { voiceName: config.voiceName || 'Kore' } 
          },
        },
      }
    });
  }
}

export const gemini = new GeminiService();

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
