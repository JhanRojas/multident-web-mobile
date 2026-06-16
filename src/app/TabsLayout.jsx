import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react'

import {
  homeOutline,
  calendarOutline,
  personOutline,
  micOutline
} from 'ionicons/icons'

import { Route, Redirect } from 'react-router-dom'

import { translations } from '../utils/translations';
import Home from '../features/home'
import AppointmentBooking from '../features/appointments/AppointmentBooking'
import Profile from '../features/profile'
import VoiceAssistant from '../features/voice'
import { TTSBar } from '../shared/components/TTSBar';


export default function TabsLayout() {
  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  return (
    <>
      <TTSBar />
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/home">
            <Home />
          </Route>
          <Route exact path="/tabs/appointments">
            <AppointmentBooking />
          </Route>
          <Route exact path="/tabs/profile">
            <Profile />
          </Route>
          <Route exact path="/tabs/voice">
            <VoiceAssistant />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>{t.tabButtonHome}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="appointments" href="/tabs/appointments">
            <IonIcon icon={calendarOutline} />
            <IonLabel>{t.tabButtonNewAppt}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/tabs/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>{t.tabButtonMyProfile}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="voice" href="/tabs/voice">
            <IonIcon icon={micOutline} />
            <IonLabel>{t.tabButtonAssistant}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  )
}