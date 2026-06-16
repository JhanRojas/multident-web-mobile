import { useState } from "react";

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonToggle,
  IonButton,
  IonAvatar,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonListHeader,
  IonList,
} from "@ionic/react";

import { personOutline } from "ionicons/icons";

import { translations } from '../../../utils/translations';
import BookingStepper from "./BookingStepper";
import { useAppointments } from "../../../shared/context/AppointmentsContext";

export default function PaymentStep({
  specialty,
  doctor,
  appointmentDate,
  appointmentTime,
  onBack,
  onAppointmentCreated,
}) {

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [saveCard, setSaveCard] =
    useState(false);

  const [cardNumber, setCardNumber] =
    useState("");

  const [cardHolder, setCardHolder] =
    useState("");

  const [expirationDate, setExpirationDate] =
    useState("");

  const [cvc, setCvc] =
    useState("");

  const { addAppointment } = useAppointments();

  const selectedLocation = JSON.parse(
    localStorage.getItem("selectedLocation")
  );

  const handlePayment = () => {
    const appointment = {
      id: Date.now(),
      patientId: currentUser?.id,
      specialty: specialty,
      doctor: doctor,
      appointmentDate:
        typeof appointmentDate === "string"
          ? appointmentDate.substring(0, 10)
          : "",
      appointmentTime: appointmentTime,
      status: "Scheduled",
      location: selectedLocation,
    };
    addAppointment(appointment);
    if (onAppointmentCreated) {
      onAppointmentCreated();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" text={t.buttonBack} onClick={onBack} />
          </IonButtons>
        </IonToolbar>
        <BookingStepper step={4} />
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>Resumen</IonListHeader>
        <IonList inset>
          <IonItem>
            <IonLabel>Paciente</IonLabel>
            <IonLabel>{currentUser?.firstName} {currentUser?.lastName}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Especialidad</IonLabel>
            <IonLabel>{specialty?.name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Doctor</IonLabel>
            <IonLabel>{doctor?.name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha y hora</IonLabel>
            <IonLabel>{appointmentDate
              ? new Date(
                appointmentDate
              ).toLocaleDateString()
              : "-"} {appointmentTime}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pago</IonLabel>
            <IonLabel>S/ 120.00</IonLabel>
          </IonItem>
        </IonList>
        <IonListHeader>Pago</IonListHeader>
        <IonList inset>
          <IonItem>
            <IonLabel>Método</IonLabel>
            <IonLabel>Tarjeta</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Tarjeta</IonLabel>
            <IonLabel>1000 4444 5555 2222</IonLabel>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonButton
            expand="block"
            onClick={handlePayment}
          >
            Confirmar cita
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}