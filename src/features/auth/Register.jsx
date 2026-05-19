import { IonPage, IonContent, IonToast } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Auth.css";

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

    localStorage.setItem(
      "mockUsers",
      JSON.stringify([...users, newUser])
    );

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
      <IonContent fullscreen className="auth-page">
        <main className="auth-card register-card">
          <button
            type="button"
            className="register-close"
            onClick={() => history.push("/login")}
          >
            ×
          </button>

          <div className="auth-logo register-logo">M</div>

          <h1 className="register-title">Crear una cuenta</h1>

          <label className="auth-label">Fecha de Nacimiento</label>

          <div className="birth-grid">
            <input
              className="auth-input birth-input"
              placeholder="08"
              value={form.day}
              onChange={(event) => updateField("day", event.target.value)}
            />

            <input
              className="auth-input birth-input"
              placeholder="17"
              value={form.month}
              onChange={(event) => updateField("month", event.target.value)}
            />

            <input
              className="auth-input birth-input"
              placeholder="2001"
              value={form.year}
              onChange={(event) => updateField("year", event.target.value)}
            />
          </div>

          <label className="auth-label">Nombres</label>
          <input
            className="auth-input"
            placeholder="Carmen"
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
          />

          <label className="auth-label">Apellidos</label>
          <input
            className="auth-input"
            placeholder="Salazar Muñoz"
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
          />

          <div className="auth-field-header register-contact-header">
            <span>{usePhone ? "Teléfono" : "Correo"}</span>

            <button
              type="button"
              className="auth-link-button"
              onClick={() => setUsePhone(!usePhone)}
            >
              {usePhone ? "Usar correo" : "Usar teléfono"}
            </button>
          </div>

          {usePhone ? (
            <input
              className="auth-input"
              type="tel"
              placeholder="908 456 824"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          ) : (
            <input
              className="auth-input"
              type="email"
              placeholder="carmen@gmail.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          )}

          <label className="auth-label">Contraseña</label>

          <div className="auth-password-wrapper">
            <input
              className="auth-input password-input"
              type="password"
              placeholder="PSww#25.com"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
            />
            <span className="password-eye">◉</span>
          </div>

          <label className="terms-row">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(event) =>
                updateField("acceptTerms", event.target.checked)
              }
            />
            <span>
              Al registrarte aceptas los{" "}
              <strong>Términos de servicio</strong> y la{" "}
              <strong>Política de privacidad</strong>
            </span>
          </label>

          <button
            type="button"
            className="auth-primary-button register-button"
            onClick={handleRegister}
          >
            REGISTRAR
          </button>

          <div className="social-login-area register-social">
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