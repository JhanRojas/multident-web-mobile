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
  } = useAccessibility();

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;
  const [contrastMode, setContrastMode] = useState("normal");

  const { ttsEnabled, rate, setRate, toggleTTS } = useTTSContext();

  const router = useIonRouter()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" text="back" />
          </IonButtons>
          <IonTitle>{t.accessibilityTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>Idioma</IonListHeader>
        <IonList inset={true} className=''>
          <IonRadioGroup value={language}
            onIonChange={(e) => changeLanguage(e.detail.value)}>
            <IonItem>
              <IonRadio value="es">Español</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="en">English</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="qu">Quechua</IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonListHeader>Perfil de Accesiblidad</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle>Visión Baja</IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle>Dislexia</IonToggle>
          </IonItem>
        </IonList>
        <IonListHeader>Pantalla</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle justify="space-between" checked={darkMode} onIonChange={(e) => toggleDarkMode(e.detail.checked)}>
              {t.darkModeText}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked={grayScale} onIonChange={(e) => toggleGrayScale(e.detail.checked)}>
              Gray Scale
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked={highContrast} onIonChange={(e) => toggleHighContrast(e.detail.checked)}>
              Aumentar contraste
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={invertColors}
              onIonChange={(e) =>
                toggleInvertColors(e.detail.checked)
              }
            >
              Invertir
            </IonToggle>
          </IonItem>
        </IonList>
        <IonListHeader>{t.textSizeText}</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={boldText}
              onIonChange={(e) =>
                toggleBoldText(e.detail.checked)
              }
            >
              Negrita
            </IonToggle>
          </IonItem>
          <IonItem button routerLink="/accessibility/text-size">Texto mas grande</IonItem>
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
        <IonListHeader>Efeccts</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              justify="space-between"
              checked={reduceMotion}
              onIonChange={(e) => toggleReduceMotion(e.detail.checked)}
            >{t.reduceAnimationText}</IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" className="ion-padding">
            {t.restoreChangesText}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}