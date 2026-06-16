import {
  IonPage,
  IonContent,
  IonText,
  IonDatetime,
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
  IonRow,
  IonChip,
  IonListHeader,
} from "@ionic/react";

import { personOutline } from "ionicons/icons";

import { translations } from '../../../utils/translations';
import BookingStepper from "./BookingStepper";

export default function ScheduleStep({
  specialty,
  appointmentDate,
  setAppointmentDate,
  appointmentTime,
  setAppointmentTime,
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
        <BookingStepper step={2} />
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader className="ion-no-padding ion-text-center">
          <IonLabel >Seleccione la fecha</IonLabel>
        </IonListHeader>
        <IonList inset>
          <IonItem>
            <IonDatetime
              presentation="date"
              value={appointmentDate}
              onIonChange={(e) =>
                setAppointmentDate(e.detail.value)
              }
            />
          </IonItem>
        </IonList>
        <IonListHeader className="ion-no-padding ion-text-center">
          <IonLabel >Seleccione la hora</IonLabel>
        </IonListHeader>
        <IonList inset>
          <IonItem>
            <IonChip
              color={appointmentTime === "09:00" ? "primary" : undefined}
              onClick={() => {
                setAppointmentTime("09:00");
                onNext();
              }}
            >
              09:00
            </IonChip>

            <IonChip
              color={appointmentTime === "10:00" ? "primary" : undefined}
              onClick={() => {
                setAppointmentTime("10:00");
                onNext();
              }}
            >
              10:00
            </IonChip>

            <IonChip
              color={appointmentTime === "12:00" ? "primary" : undefined}
              onClick={() => {
                setAppointmentTime("12:00");
                onNext();
              }}
            >
              12:00
            </IonChip>

            <IonChip
              color={appointmentTime === "16:00" ? "primary" : undefined}
              onClick={() => {
                setAppointmentTime("16:00");
                onNext();
              }}
            >
              16:00
            </IonChip>

            <IonChip
              color={appointmentTime === "18:00" ? "primary" : undefined}
              onClick={() => {
                setAppointmentTime("18:00");
                onNext();
              }}
            >
              18:00
            </IonChip>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}