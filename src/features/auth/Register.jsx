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
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const [usePhone, setUsePhone] = useState(false);

  const [form, setForm] = useState({
    day: "",
    month: "",
    year: "",
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
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    if (
      !form.day ||
      !form.month ||
      !form.year ||
      !form.firstName ||
      !form.lastName ||
      !form.password
    ) {
      setToast({
        open: true,
        message: "Completa todos los datos obligatorios.",
      });
      return;
    }

    if (usePhone && !form.phone) {
      setToast({
        open: true,
        message: "Ingresa tu número de teléfono.",
      });
      return;
    }

    if (!usePhone && !form.email) {
      setToast({
        open: true,
        message: "Ingresa tu correo electrónico.",
      });
      return;
    }

    if (!form.acceptTerms) {
      setToast({
        open: true,
        message: "Debes aceptar los términos y condiciones.",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

    const newUser = {
      id: Date.now(),
      birthDate: `${form.day}/${form.month}/${form.year}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    localStorage.setItem("mockUsers", JSON.stringify([...users, newUser]));

    setToast({
      open: true,
      message: "Cuenta creada correctamente.",
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
          <IonItem button>
            <IonLabel>Fecha de Nacimiento</IonLabel>
            <IonLabel>27/09/1992</IonLabel>
          </IonItem>
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
        </IonList>
        <IonButton
          expand="block"
          onClick={handleRegister}
          className="ion-padding ion-text-center"
        >
          Registrar
        </IonButton>
        <IonToast
          isOpen={toast.open}
          message={toast.message}
          duration={2200}
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
