import { useState, useEffect } from 'react';

export const useAccessibility = () => {
  const [language, setLanguage] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [grayScale, setGrayScale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [voiceReading, setVoiceReading] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const changeLanguage = (value: string) => {
    localStorage.setItem('language', value);
    setLanguage(value);
  };

  const toggleDarkMode = (enabled: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', enabled);
    localStorage.setItem('darkMode', JSON.stringify(enabled));
    setDarkMode(enabled);
  };

  const toggleGrayScale = (enabled: boolean) => {
    document.documentElement.classList.toggle('gray-scale', enabled);
    localStorage.setItem('grayScale', JSON.stringify(enabled));
    setGrayScale(enabled);
  };

  const toggleHighContrast = (enabled: boolean) => {
    document.documentElement.classList.toggle('high-contrast', enabled);
    localStorage.setItem('highContrast', JSON.stringify(enabled));
    setHighContrast(enabled);
  };

  const toggleInvertColors = (enabled: boolean) => {
    document.documentElement.classList.toggle(
      'invert-colors',
      enabled
    );

    localStorage.setItem(
      'invertColors',
      JSON.stringify(enabled)
    );

    setInvertColors(enabled);
  };

  const toggleBoldText = (enabled: boolean) => {
    document.documentElement.classList.toggle(
      'bold-text',
      enabled
    );

    localStorage.setItem(
      'boldText',
      JSON.stringify(enabled)
    );

    setBoldText(enabled);
  };

  const changeFontSize = (size: number) => {
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
    localStorage.setItem('fontSize', size.toString());
    setFontSize(size);
  };

  const toggleVoiceReading = (enabled: boolean) => {
    localStorage.setItem('voiceReading', JSON.stringify(enabled));
    setVoiceReading(enabled);
  };

  const toggleReduceMotion = (enabled: boolean) => {
    document.documentElement.classList.toggle('reduce-motion', enabled);
    localStorage.setItem('reduceMotion', JSON.stringify(enabled));
    setReduceMotion(enabled);
    window.location.reload();
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedGrayScale = localStorage.getItem('grayScale');
    const savedHighContrast = localStorage.getItem('highContrast');
    const savedInvertColors =
      localStorage.getItem('invertColors');
    const savedBoldText =
      localStorage.getItem('boldText');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedVoiceReading = localStorage.getItem('voiceReading');
    const savedReduceMotion = localStorage.getItem('reduceMotion');

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    if (savedDarkMode) {
      const parsed = JSON.parse(savedDarkMode);
      document.documentElement.classList.toggle('ion-palette-dark', parsed);
      setDarkMode(parsed);
    }

    if (savedGrayScale) {
      const parsed = JSON.parse(savedGrayScale);

      document.documentElement.classList.toggle(
        'gray-scale',
        parsed
      );

      setGrayScale(parsed);
    }

    if (savedHighContrast) {
      const parsed = JSON.parse(savedHighContrast);
      document.documentElement.classList.toggle('high-contrast', parsed);
      setHighContrast(parsed);
    }

    if (savedInvertColors) {
      const parsed = JSON.parse(savedInvertColors);

      document.documentElement.classList.toggle(
        'invert-colors',
        parsed
      );

      setInvertColors(parsed);
    }

    if (savedBoldText) {
      const parsed = JSON.parse(savedBoldText);

      document.documentElement.classList.toggle(
        'bold-text',
        parsed
      );

      setBoldText(parsed);
    }

    if (savedFontSize) {
      document.documentElement.style.setProperty(
        '--app-font-size',
        `${savedFontSize}px`
      );
      setFontSize(Number(savedFontSize));
    }

    if (savedVoiceReading) {
      setVoiceReading(JSON.parse(savedVoiceReading));
    }

    if (savedReduceMotion) {
      const parsed = JSON.parse(savedReduceMotion);
      document.documentElement.classList.toggle('reduce-motion', parsed);
      setReduceMotion(parsed);
    }
  }, []);

  return {
    language,
    darkMode,
    grayScale,
    highContrast,
    invertColors,
    boldText,
    fontSize,
    voiceReading,
    reduceMotion,
    changeLanguage,
    toggleDarkMode,
    toggleGrayScale,
    toggleHighContrast,
    toggleInvertColors,
    toggleBoldText,
    changeFontSize,
    toggleVoiceReading,
    toggleReduceMotion,
  };
};
