import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

import TabsLayout from './TabsLayout'
import Accessibility from '../features/profile/Accessibility'
import { AppointmentsProvider } from '../shared/context/AppointmentsContext'

export default function App() {
  return (
    <AppointmentsProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/accessibility" component={Accessibility}/>
            <Route path="/tabs" component={TabsLayout}/>
            <Redirect exact from="/" to="/tabs/home"/>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppointmentsProvider>
  )
}
