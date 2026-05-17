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
import Home from '../features/home/Home'
import Appointments from '../features/appointments/Appointments'
import Profile from '../features/profile/Profile'
import VoiceAssistant from '../features/voice/VoiceAssistant'

export default function TabsLayout() {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <Home />
        </Route>
        <Route exact path="/tabs/appointments">
          <Appointments />
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
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="appointments" href="/tabs/appointments">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Nueva Cita</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Mi Perfil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="voice" href="/tabs/voice">
          <IonIcon icon={micOutline} />
          <IonLabel>Voz</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}