import {
  IonApp,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react'

import { IonReactRouter } from '@ionic/react-router'

import { Route, Redirect } from 'react-router-dom'

import {
  homeOutline,
  micOutline,
  calendarOutline,
  personOutline
} from 'ionicons/icons'

import Home from './pages/Home'
import VoiceAssistant from './pages/VoiceAssistant'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'

function App() {

  return (
    <IonApp>

      <IonReactRouter>

        <IonTabs>

          <IonRouterOutlet>

            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/appointments"
              component={Appointments}
            />

            <Route
              exact
              path="/voiceAssistant"
              component={VoiceAssistant}
            />

            <Route
              exact
              path="/profile"
              component={Profile}
            />

            <Route exact path="/">
              <Redirect to="/" />
            </Route>

          </IonRouterOutlet>

          <IonTabBar slot="bottom">

            <IonTabButton tab="home" href="/">
              <IonIcon icon={homeOutline} />
              <IonLabel>Inicio</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="appointments"
              href="/appointments"
            >
              <IonIcon icon={calendarOutline} />
              <IonLabel>Citas</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>

            <IonTabButton
              tab="voiceAssistant"
              href="/voiceAssistant"
            >
              <IonIcon icon={micOutline} />
              <IonLabel>Voz</IonLabel>
            </IonTabButton>

          </IonTabBar>

        </IonTabs>

      </IonReactRouter>

    </IonApp>
  )
}

export default App