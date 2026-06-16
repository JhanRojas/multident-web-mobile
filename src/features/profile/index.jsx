import {
  IonPage,
  IonContent,
  IonAvatar,
  IonButton,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react'

import {
  locationOutline,
  personOutline,
  callOutline,
  mailOutline,
  chevronForwardOutline,
  businessOutline,
  notificationsOutline
} from 'ionicons/icons'

import { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppointments } from '../../shared/context/AppointmentsContext'
import { useTTSContext } from '../../shared/context/TTSContext';
import { translations } from '../../utils/translations';

export default function Profile() {
  const history = useHistory()
  const { appointments } = useAppointments()

  const [activeTab, setActiveTab] = useState('perfil')
  const [user, setUser] = useState(null)

  const { speak, ttsEnabled } = useTTSContext();
  const hasSpoken = useRef(false);

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  const [segment, setSegment] = useState("profile");

  useEffect(() => {
    if (ttsEnabled && !hasSpoken.current) {
      hasSpoken.current = true;
      speak("Pantalla de perfil. Aquí puede ver y editar su información.");
    }
    return () => {
      hasSpoken.current = false;
      window.speechSynthesis.cancel();
    };
  }, [ttsEnabled]);

  useEffect(() => {
    if (!ttsEnabled) return;
    if (activeTab === 'perfil') speak("Mostrando información de perfil.");
    if (activeTab === 'historial') speak("Mostrando historial clínico de citas.");
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [activeTab, ttsEnabled]);;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'))

    if (!storedUser) {
      history.replace('/login')
      return
    }

    setUser(storedUser)
  }, [history])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    history.replace('/login')
  }

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : ''

  const userPhone = user?.phone || 'No registrado'
  const userEmail = user?.email || 'No registrado'

  if (!user) {
    return null
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="3">
              <IonAvatar
                style={{
                  width: "72px",
                  height: "72px"
                }}
              >
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar" />
              </IonAvatar>
            </IonCol>
            <IonCol size="9">
              <IonText>
                <h3 className="ion-no-margin">
                  {user
                    ? `${user.firstName} ${user.lastName}`
                    : ""}
                </h3>
              </IonText>
              <IonRow>
                <IonCol size="auto">
                  <IonButton size="small">
                    {t.buttonEditProfile}
                  </IonButton>
                </IonCol>
                <IonCol size="auto">
                  <IonButton
                    size="small"
                    fill="solid"
                    color="danger"
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      history.replace("/login");
                    }}
                  >
                    {t.buttonLogout}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Segment */}
        <IonList inset>
          <IonSegment
            value={segment}
            onIonChange={(e) =>
              setSegment(e.detail.value)
            }
          >
            <IonSegmentButton value="profile">
              <IonLabel>{t.segmentButtonProfile}</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="history">
              <IonLabel>{t.segmentButtonMedicalHistory}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonList>
        {/* Datos */}
        <IonList inset>
          <IonItem>
            <IonIcon
              icon={personOutline}
              slot="start"
              color="medium"
            />
            <IonLabel>
              {user
                ? `${user.firstName} ${user.lastName}`
                : ""}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={callOutline}
              slot="start"
              color="medium"
            />
            <IonLabel>{user?.phone}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={mailOutline}
              slot="start"
              color="medium"
            />
            <IonLabel>{user?.email}</IonLabel>
          </IonItem>
        </IonList>
        <IonList inset>
          <IonItem
            button
            routerLink="/accessibility"
          >
            <IonLabel>
              {t.labelLinkAccessibility}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}