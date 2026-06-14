import {
  IonPage,
  IonContent,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonText,
  IonLabel,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const [useEmail, setUseEmail] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

    console.log("=== LOGIN ===");
    console.log("useEmail:", useEmail);
    console.log("identifier:", identifier);
    console.log("password:", password);
    console.log("users:", users);

    const userFound = users.find((user) => {
      const matchesIdentifier = useEmail
        ? user.email === identifier
        : user.phone === identifier;

      const matchesPassword = user.password === password;

      console.log({
        user,
        matchesIdentifier,
        matchesPassword,
      });

      return matchesIdentifier && matchesPassword;
    });

    console.log("userFound:", userFound);

    if (!userFound) {
      setToast({
        open: true,
        message: "Datos incorrectos. Verifica tu acceso.",
      });
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(userFound));
    history.push("/tabs/home");
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonRow className="ion-justify-content-center ion-margin-top ion-margin-bottom">
          <IonCol size="3">
            <IonImg src="/images/Logo.png" alt="Multident" />
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-padding-start">
          <IonCol>
            <IonText>
              <h3>{useEmail ? "Correo" : "Teléfono"}</h3>
            </IonText>
          </IonCol>
          <IonCol className="ion-text-end">
            <IonButton
              fill="clear"
              size="small"
              onClick={() => {
                setUseEmail(!useEmail);
                setIdentifier("");
              }}
            >
              {useEmail ? "Usar teléfono" : "Usar correo"}
            </IonButton>
          </IonCol>
        </IonRow>
        <IonList>
          <IonItem>
            <IonInput
              type={useEmail ? "email" : "tel"}
              placeholder={useEmail ? "correo@gmail.com" : "908 456 824"}
              value={identifier}
              onIonInput={(e) => {
                console.log("EMAIL:", e.detail.value);
                setIdentifier(e.detail.value ?? "");
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonRow className="ion-align-items-center ion-padding-start">
          <IonCol>
            <IonText>
              <h3>Contraseña</h3>
            </IonText>
          </IonCol>
        </IonRow>

        <IonList>
          <IonItem>
            <IonInput
              type="password"
              placeholder="*********"
              value={password}
              onIonInput={(e) => {
                console.log("PASSWORD:", e.detail.value);
                setPassword(e.detail.value ?? "");
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonRow>
          <IonCol>
            <IonButton fill="clear" size="small">
              ¿Olvidaste tu contraseña?
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-margin-top">
          <IonCol>
            <IonButton expand="block" onClick={handleLogin}>
              INGRESAR
            </IonButton>
          </IonCol>
        </IonRow>

        <p className="auth-register-text">
          ¿No tienes cuenta?{" "}
          <IonButton
            className="button-small"
            fill="clear"
            onClick={() => history.push("/register")}
          >
            Regístrate
          </IonButton>
        </p>
        <IonToast
          isOpen={toast.open}
          message={toast.message}
          color={"danger"}
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
