import {
  IonPage,
  IonContent,
  IonText,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonListHeader,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from "@ionic/react";

import { personOutline } from "ionicons/icons";

import { translations } from '../../../utils/translations';
import BookingStepper from "./BookingStepper";

import { doctors } from "../../../mocks/doctors.mock";

export default function DoctorStep({
  doctor,
  setDoctor,
  onNext,
  onBack,
}) {
  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" text={t.buttonBack} onClick={onBack} />
          </IonButtons>
        </IonToolbar>
        <BookingStepper step={3} />
      </IonHeader>
      <IonContent>
        <IonListHeader className="ion-no-padding ion-text-center">
          <IonLabel >{t.listHeaderApptDoctor}</IonLabel>
        </IonListHeader>
        <IonList inset>
          {doctors.map((item) => (
            <IonCard
              key={item.id}
              button
              onClick={() => {
                setDoctor(item);
                onNext();
              }}
            >
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="3">
                      <IonAvatar>
                        <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar" />
                      </IonAvatar>
                    </IonCol>
                    <IonCol size="9">
                      <h2>{item.name}</h2>
                      <p>Odontología</p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}