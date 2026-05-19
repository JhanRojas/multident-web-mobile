import { IonPage, IonContent, IonToast } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Auth.css";

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

    const userFound = users.find((user) => {
      const matchesIdentifier = useEmail
        ? user.email === identifier
        : user.phone === identifier;

      return matchesIdentifier && user.password === password;
    });

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
      <IonContent fullscreen className="auth-page">
        <main className="auth-card login-card">
          <div className="auth-logo">M</div>

          <div className="auth-field-header">
            <span>{useEmail ? "Correo" : "Teléfono"}</span>

            <button
              type="button"
              className="auth-link-button"
              onClick={() => {
                setUseEmail(!useEmail);
                setIdentifier("");
              }}
            >
              {useEmail ? "Usar teléfono" : "Usar correo"}
            </button>
          </div>

          <input
            className="auth-input"
            type={useEmail ? "email" : "tel"}
            placeholder={useEmail ? "correo@gmail.com" : "908 456 824"}
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
          />

          <div className="auth-password-wrapper">
            <input
              className="auth-input password-input"
              type="password"
              placeholder="PSww#25.com"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className="password-eye">◉</span>
          </div>

          <button type="button" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </button>

          <button
            type="button"
            className="auth-primary-button"
            onClick={handleLogin}
          >
            INGRESAR
          </button>

          <p className="auth-register-text">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => history.push("/register")}
            >
              Regístrate
            </button>
          </p>

          <div className="social-login-area">
            <button type="button" className="social-button">
              <span className="facebook-icon">f</span>
              Continuar con Facebook
            </button>

            <button type="button" className="social-button">
              <span className="google-icon">G</span>
              Continuar con Google
            </button>
          </div>
        </main>

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