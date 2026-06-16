import { useEffect } from 'react'
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import { applyAccessibilitySettings } from "../hooks/useAccessibility";
import TabsLayout from "./TabsLayout";
import Accessibility from "../features/profile/Accessibility";
import TextSize from "../features/profile/TextSize";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import { AppointmentsProvider } from "../shared/context/AppointmentsContext";

import { TTSProvider } from "../shared/context/TTSContext";

export default function App() {
  useEffect(() => {
    applyAccessibilitySettings();
  }, []);
  return (
    //para aplicar lectura
    <TTSProvider>
      <AppointmentsProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/accessibility" component={Accessibility} />
              <Route exact path="/accessibility/text-size" component={TextSize} />
              <Route path="/tabs" component={TabsLayout} />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </AppointmentsProvider>
    </TTSProvider>
  );
}