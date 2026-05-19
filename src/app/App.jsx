import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import TabsLayout from "./TabsLayout";
import Accessibility from "../features/profile/Accessibility";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import { AppointmentsProvider } from "../shared/context/AppointmentsContext";

export default function App() {
  return (
    <AppointmentsProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/accessibility" component={Accessibility} />
            <Route path="/tabs" component={TabsLayout} />

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppointmentsProvider>
  );
}