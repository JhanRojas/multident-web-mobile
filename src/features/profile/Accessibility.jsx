import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
  useIonRouter,
  IonFooter,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';

import { personCircle, personCircleOutline, sunny, sunnyOutline, arrowBackOutline, moonOutline, colorFillOutline, contrastOutline } from 'ionicons/icons';

import { translations } from '../../utils/translations';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useTTSContext } from '../../shared/context/TTSContext';

export default function Accessibility() {

  const {
    language,
    profile,
    darkMode,
    grayScale,
    highContrast,
    invertColors,
    boldText,
    fontSize,
    voiceReading,
    reduceMotion,
    changeLanguage,
    applyAccessibilityProfile,
    toggleDarkMode,
    toggleGrayScale,
    toggleHighContrast,
    toggleInvertColors,
    toggleBoldText,
    changeFontSize,
    toggleVoiceReading,
    toggleReduceMotion,
    resetAccessibilitySettings
  } = useAccessibility();

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  const { ttsEnabled, rate, setRate, toggleTTS } = useTTSContext();

  const router = useIonRouter()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" text={t.buttonBack} />
          </IonButtons>
          <IonTitle>{t.titleAccessibility}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>{t.listHeaderLanguaje}</IonListHeader>
        <IonList inset={true} className=''>
          <IonRadioGroup value={language}
            onIonChange={(e) => changeLanguage(e.detail.value)}>
            <IonItem>
              <IonRadio value="es">{t.spanish}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="en">{t.english}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="qu">{t.quechua}</IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonListHeader>{t.listHeaderProfile}</IonListHeader>
        <IonList inset={true}>
          <IonRadioGroup value={profile}
            onIonChange={(e) =>
              applyAccessibilityProfile(e.detail.value)
            }>
            <IonItem>
              <IonRadio value="none">{t.none}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="lowVision">{t.lowVision}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="dyslexia">{t.dyslexia}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="adhd">{t.adhd}</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="colorBlind">{t.colorBlind}</IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonListHeader>{t.listHeaderScreen}</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle justify="space-between" checked={darkMode} onIonChange={(e) => toggleDarkMode(e.detail.checked)}>
              {t.darkMode}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked={grayScale} onIonChange={(e) => toggleGrayScale(e.detail.checked)}>
              {t.grayScale}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked={highContrast} onIonChange={(e) => toggleHighContrast(e.detail.checked)}>
              {t.increaseContrast}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={invertColors}
              onIonChange={(e) => toggleInvertColors(e.detail.checked)}
            >
              {t.invertColors}
            </IonToggle>
          </IonItem>
        </IonList>

        <IonListHeader>{t.listHeaderText}</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={boldText}
              onIonChange={(e) => toggleBoldText(e.detail.checked)}
            >
              {t.bold}
            </IonToggle>
          </IonItem>
          <IonItem button routerLink="/accessibility/text-size">{t.largerText}</IonItem>
        </IonList>

        <IonListHeader>Lectura accesible</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={ttsEnabled}
              onIonChange={(e) => toggleTTS(e.detail.checked)}
            >
              Lectura automática de voz
            </IonToggle>
          </IonItem>
          {ttsEnabled && (
            <>
              <IonItem>
                <IonLabel>
                  <p style={{ margin: '4px 0 2px', fontSize: '14px' }}>Velocidad de lectura</p>
                  <p style={{ fontSize: '12px', color: 'var(--ion-color-medium)' }}>{rate.toFixed(1)}x</p>
                </IonLabel>
                <IonRange
                  slot="end"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={rate}
                  snaps={true}
                  onIonChange={(e) => setRate(Number(e.detail.value))}
                  style={{ maxWidth: '160px' }}
                />
              </IonItem>
              <IonItem>
                <IonLabel style={{ fontSize: '12px', color: 'var(--ion-color-medium)' }}>
                  La barra de controles aparece en todas las pantallas mientras esté activo
                </IonLabel>
              </IonItem>
            </>
          )}
        </IonList>

        <IonListHeader>{t.listHeaderEffects}</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={reduceMotion}
              onIonChange={(e) => toggleReduceMotion(e.detail.checked)}
            >{t.reduceAnimations}</IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" className="ion-padding" onClick={resetAccessibilitySettings}>
            {t.buttonRestoreChanges}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}