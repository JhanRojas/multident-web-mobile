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
} from '@ionic/react';

import { personCircle, personCircleOutline, sunny, sunnyOutline, arrowBackOutline } from 'ionicons/icons';

export default function Accessibility() {

  const [paletteToggle, setPaletteToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark palette
  const toggleChange = (event) => {
    toggleDarkPalette(event.detail.checked);
  };

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark) => {
    setPaletteToggle(isDark);
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    const setDarkPaletteFromMediaQuery = (mediaQuery) => {
      initializeDarkPalette(mediaQuery.matches);
    };

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener('change', setDarkPaletteFromMediaQuery);
    };
  }, []);

  const router = useIonRouter()

  return (
 <IonPage>
  <IonContent fullscreen className="accessibility-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon icon={arrowBackOutline} onClick={() => router.goBack()} />
          </IonButtons>
          <IonTitle>Accesibilidad</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
        <IonListHeader>Idioma</IonListHeader>
        <IonList inset={true}>
          <IonItem>Español</IonItem>
          <IonItem>English</IonItem>
          <IonItem>Quechua</IonItem>
        </IonList>

        <IonListHeader>Perfil de Accesiblidad</IonListHeader>
        <IonList inset={true}>
          <IonRadioGroup>
            <IonItem>
              <IonRadio value="lowvision">Visión Baja</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="dyslexia">Dislexia</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="colorBlindness">Daltonismo</IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>

        <IonListHeader>Tamaño de Texto</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonRange min={0} max={100} value={50} />
          </IonItem>
        </IonList>

        <IonListHeader>Interlineado</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonRange min={0} max={100} value={50} />
          </IonItem>
        </IonList>

        <IonListHeader>Constraste</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle checked={paletteToggle} onIonChange={toggleChange} justify="space-between">
              Modo Oscuro
            </IonToggle>
          </IonItem>
        </IonList>

      </IonContent>
    </IonContent>
</IonPage>
  )
}