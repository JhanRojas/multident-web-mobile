import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface TTSContextType {
  ttsEnabled: boolean;
  assistantVoiceEnabled: boolean;
  isReading: boolean;
  rate: number;
  setRate: (rate: number) => void;
  toggleTTS: (enabled: boolean) => void;
  toggleAssistantVoice: (enabled: boolean) => void;
  speak: (text: string) => void;
  speakAssistant: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

const TTSContext = createContext<TTSContextType | null>(null);

export const useTTSContext = () => {
  const ctx = useContext(TTSContext);
  if (!ctx) throw new Error('useTTSContext must be used inside TTSProvider');
  return ctx;
};

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [assistantVoiceEnabled, setAssistantVoiceEnabled] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [rate, setRateState] = useState(1);
  const currentTextRef = useRef<string>('');
  const rateRef = useRef<number>(1);

  useEffect(() => {
    const saved = localStorage.getItem('ttsEnabled');
    const savedAssistantVoice =
      localStorage.getItem('assistantVoiceEnabled');
    const savedRate = localStorage.getItem('ttsRate');
    if (saved) {
      setTtsEnabled(JSON.parse(saved));
    }
    if (savedAssistantVoice) {
      setAssistantVoiceEnabled(
        JSON.parse(savedAssistantVoice)
      );
    } else {
      localStorage.setItem(
        'assistantVoiceEnabled',
        'true'
      );
    }
    if (savedRate) {
      const r = parseFloat(savedRate);
      setRateState(r);
      rateRef.current = r;
    }
  }, []);


  const speakText = useCallback((text: string) => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = localStorage.getItem('language') === 'en' ? 'en-US' : 'es-ES';
      utt.rate = rateRef.current;
      utt.onstart = () => setIsReading(true);
      utt.onend = () => setIsReading(false);
      utt.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utt);
    }, 100);
  }, []);

  const speak = useCallback((text: string) => {
    if (!ttsEnabled || !text.trim()) return;
    currentTextRef.current = text;
    speakText(text);
  }, [ttsEnabled, speakText]);

  const speakAssistant = useCallback((text: string) => {
    if (!assistantVoiceEnabled || !text.trim()) return;

    currentTextRef.current = text;

    speakText(text);
  }, [assistantVoiceEnabled, speakText]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    currentTextRef.current = '';
  }, []);


  const pause = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }, []);


  const resume = useCallback(() => {
    if (currentTextRef.current) {
      speakText(currentTextRef.current);
    }
  }, [speakText]);

  const setRate = useCallback((newRate: number) => {
    rateRef.current = newRate;
    setRateState(newRate);
    localStorage.setItem('ttsRate', String(newRate));

    if (currentTextRef.current) {
      speakText(currentTextRef.current);
    }
  }, [speakText]);

  const toggleTTS = useCallback((enabled: boolean) => {
    if (!enabled) {
      window.speechSynthesis.cancel();
      currentTextRef.current = '';
      setIsReading(false);
    }
    localStorage.setItem('ttsEnabled', JSON.stringify(enabled));
    setTtsEnabled(enabled);
  }, []);

  const toggleAssistantVoice = useCallback(
    (enabled: boolean) => {

      localStorage.setItem(
        'assistantVoiceEnabled',
        JSON.stringify(enabled)
      );

      setAssistantVoiceEnabled(enabled);

    },
    []
  );

  return (
    <TTSContext.Provider value={{
      ttsEnabled,
      assistantVoiceEnabled,
      isReading,
      rate,
      setRate,
      toggleTTS,
      toggleAssistantVoice,
      speak,
      speakAssistant,
      pause,
      resume,
      stop
    }}>
      {children}
    </TTSContext.Provider>
  );
};