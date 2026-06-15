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
          <IonItem>
            <IonToggle>{t.lowVision}</IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle>{t.dyslexia}</IonToggle>
          </IonItem>
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
              onIonChange={(e) =>
                toggleInvertColors(e.detail.checked)
              }
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
              onIonChange={(e) =>
                toggleBoldText(e.detail.checked)
              }
            >
              {t.bold}
            </IonToggle>
          </IonItem>
          <IonItem button routerLink="/accessibility/text-size">{t.largerText}</IonItem>
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
          <IonButton expand="block" className="ion-padding">
            {t.buttonRestoreChanges}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}