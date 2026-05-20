import * as Vosk from 'vosk-browser';

let model = null;
let isInitialized = false;

export async function initVosk() {
  if (isInitialized) return model;
  try {
    model = await Vosk.createModel(
      'https://huggingface.co/AlphaBoom/vosk-model-small-en-us/resolve/main/model.tar.gz'
    );
    isInitialized = true;
    return model;
  } catch (err) {
    console.warn('Vosk init failed, falling back to webkitSpeechRecognition:', err);
    isInitialized = false;
    return null;
  }
}

export function createSpeechRecognition({ onResult, onEnd, onError }) {
  if (model && isInitialized) {
    let mediaStream = null;
    let audioContext = null;
    let recognizer = null;
    let sourceNode = null;
    let scriptNode = null;
    let recording = false;

    const start = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            channelCount: 1,
            sampleRate: 16000
          },
        });

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.sampleRate !== 16000) {
          audioContext.close();
          audioContext = new AudioContext({ sampleRate: 16000 });
        }

        recognizer = new model.KaldiRecognizer(audioContext.sampleRate);
        recognizer.on('result', (msg) => {
          onResult({ result: [{ transcript: msg.result.text }] });
        });
        recognizer.on('partial-result', (msg) => {
          onResult({ result: [{ transcript: msg.partial }] });
        });
        recognizer.on('error', (err) => {
          onError({ error: 'network' });
        });

        sourceNode = audioContext.createMediaStreamSource(mediaStream);
        scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
        scriptNode.onaudioprocess = (e) => {
          if (!recording) return;
          try {
            recognizer.acceptWaveform(e.inputBuffer);
          } catch {}
        };

        sourceNode.connect(scriptNode);
        recording = true;
      } catch (err) {
        onError({ error: 'network' });
      }
    };

    const stop = () => {
      recording = false;
      try {
        if (scriptNode) { scriptNode.disconnect(); scriptNode = null; }
        if (sourceNode) { sourceNode.disconnect(); sourceNode = null; }
        if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
        if (audioContext) audioContext.close();
      } catch {}
    };

    return { start, stop };
  }

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = onResult;
    recognition.onend = onEnd;
    recognition.onerror = onError;

    return {
      start: () => { try { recognition.start(); } catch {} },
      stop: () => { try { recognition.stop(); } catch {} },
    };
  }

  onError({ error: 'not-supported' });
  return { start: () => {}, stop: () => {} };
}