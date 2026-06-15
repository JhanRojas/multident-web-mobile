import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface TTSContextType {
  ttsEnabled: boolean;
  isReading: boolean;
  rate: number;
  setRate: (rate: number) => void;
  toggleTTS: (enabled: boolean) => void;
  speak: (text: string) => void;
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
  const [isReading, setIsReading] = useState(false);
  const [rate, setRateState] = useState(1);
  const currentTextRef = useRef<string>(''); 
  const rateRef = useRef<number>(1);          

  useEffect(() => {
    const saved = localStorage.getItem('ttsEnabled');
    const savedRate = localStorage.getItem('ttsRate');
    if (saved) setTtsEnabled(JSON.parse(saved));
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

  return (
    <TTSContext.Provider value={{
      ttsEnabled, isReading, rate, setRate,
      toggleTTS, speak, pause, resume, stop
    }}>
      {children}
    </TTSContext.Provider>
  );
};