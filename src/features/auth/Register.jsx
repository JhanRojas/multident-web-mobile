import {
  IonPage,
  IonContent,
  IonToast,
  IonHeader,
  IonToolbar,
  IonItem,
  IonButtons,
  IonBackButton,
  IonList,
  IonLabel,
  IonInput,
  IonTitle,
  IonButton,
  IonDatetime,
  IonText,
  IonModal,
  IonDatetimeButton,
  IonCheckbox,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { translations } from '../../utils/translations';

export default function Register() {
  const history = useHistory();

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  const [usePhone, setUsePhone] = useState(false);

  const today = new Date();

  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  ).toISOString();

  const [form, setForm] = useState({
    birthDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    color: "normal"
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    if (
      !form.birthDate ||
      !form.firstName ||
      !form.lastName ||
      !form.password
    ) {
      setToast({
        open: true,
        message: "Completa todos los datos obligatorios.",
        color: "danger"
      });
      return;
    }

    if (usePhone && !form.phone) {
      setToast({
        open: true,
        message: "Ingresa tu número de teléfono.",
        color: "danger"
      });
      return;
    }

    if (!usePhone && !form.email) {
      setToast({
        open: true,
        message: "Ingresa tu correo electrónico.",
        color: "danger"
      });
      return;
    }

    if (!form.acceptTerms) {
      setToast({
        open: true,
        message: "Debes aceptar los términos y condiciones.",
        color: "danger"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

    const newUser = {
      id: Date.now(),
      birthDate: form.birthDate,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    localStorage.setItem("mockUsers", JSON.stringify([...users, newUser]));

    setToast({
      open: true,
      message: t.messageUserCreatedSuccessfully,
      color: "success"
    });

    setTimeout(() => {
      history.push("/login");
    }, 1200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" text="back" />
          </IonButtons>
          <IonTitle>Crear una cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonList inset>
          <IonItem>
            <IonInput
              label="First Name"
              type="text"
              value={form.firstName}
              onIonInput={(e) => updateField("firstName", e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Last Name"
              type="text"
              value={form.lastName}
              onIonInput={(e) => updateField("lastName", e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha de Nacimiento</IonLabel>
            <IonDatetimeButton datetime="birthdate" />
          </IonItem>
          <IonItem>
            <IonInput
              label="Phone"
              type="tel"
              value={form.phone}
              onIonInput={(e) => updateField("phone", e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Mail"
              type="email"
              value={form.email}
              onIonInput={(e) => updateField("email", e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              type="password"
              value={form.password}
              onIonInput={(e) => updateField("password", e.target.value)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              slot="start"
              checked={form.acceptTerms}
              onIonChange={(e) => updateField("acceptTerms", e.detail.checked)}
            />

            <IonLabel className="ion-text-wrap">
              Acepto los Términos y Condiciones y la Política de Privacidad
            </IonLabel>
          </IonItem>
        </IonList>
        <IonButton
          expand="block"
          onClick={handleRegister}
          className="ion-padding ion-text-center"
        >
          Registrar
        </IonButton>
        <IonModal keepContentsMounted>
          <IonDatetime
            id="birthdate"
            presentation="date"
            preferWheel={true}
            locale="es-PE"
            max={maxBirthDate}
            onIonChange={(e) => updateField("birthDate", e.detail.value)}
          />
        </IonModal>
        <IonToast
          isOpen={toast.open}
          message={toast.message}
          color={toast.color}
          duration={2200}
          position="top"
          onDidDismiss={() =>
            setToast({
              open: false,
              message: "",
            })
          }
        />
      </IonContent>
    </IonPage>
  );
}
