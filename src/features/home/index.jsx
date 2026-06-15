import { useState, useEffect, useRef } from 'react'
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonModal, IonIcon,
  IonCard,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonCardContent,
  IonText,
  IonButton,
  IonCardHeader,
} from '@ionic/react'
import { closeOutline, businessOutline, personOutline } from 'ionicons/icons'
import { useAppointments } from '../../shared/context/AppointmentsContext'
import { useTTSContext } from '../../shared/context/TTSContext';
import { locations } from "../../mocks/locations.mock";

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export default function Home() {
  const { appointments } = useAppointments();
  const { speak, ttsEnabled } = useTTSContext();
  const hasSpoken = useRef(false);
  const [selectedLocation, setSelectedLocation] = useState(
    locations.lima[0]
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRegionTab, setActiveRegionTab] = useState("lima");

  const [activeApptTab, setActiveApptTab] = useState('proximas');

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalOpen(false);
  };

  useEffect(() => {
    if (ttsEnabled && !hasSpoken.current) {
      hasSpoken.current = true;
      speak("Bienvenido a la pantalla de inicio. Tienes dos citas próximas.");
    }
    return () => {
      hasSpoken.current = false;
      window.speechSynthesis.cancel();
    };
  }, [ttsEnabled]);

  return (
    <IonPage>
      <IonHeader>
        <IonCard className='ion-padding' button onClick={() => setModalOpen(true)}>
          <IonItem lines="none">
            <IonIcon icon={businessOutline} size='large' slot="start" />

            <IonLabel>
              <h3>{selectedLocation.clinicName}</h3>
              <p>{selectedLocation.address}</p>
            </IonLabel>
          </IonItem>
        </IonCard>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonSegment
          value={activeApptTab}
          onIonChange={(e) => setActiveApptTab(e.detail.value)}
        >
          <IonSegmentButton value="proximas">
            <IonLabel>Próximas citas</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="examenes">
            <IonLabel>Exámenes</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {appointments.length === 0 ? (
          <div className="empty-state"><p>No tienes citas programadas.</p></div>
        ) : (
          <div className="appt-list">
            {appointments.map(appt => (
              <IonCard key={appt.id}>
                <IonItem lines="none">

                  <IonLabel slot="start">
                    <h1>{appt.date.day}</h1>
                    <p>{MONTHS_ES[appt.date.month]}</p>
                  </IonLabel>

                  <IonLabel>
                    <h2>{appt.specialty}</h2>
                    <p>{appt.doctor}</p>
                    <p>{appt.time}</p>
                  </IonLabel>

                  <IonLabel slot="end">
                    <IonIcon icon={businessOutline} />
                    <p>{appt.sede}</p>
                  </IonLabel>

                </IonItem>
              </IonCard>
            ))}
          </div>
        )}

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)} breakpoints={[0, 0.85]} initialBreakpoint={0.85} className="sede-modal">
          <IonHeader translucent>
            <IonToolbar>
              <IonSegment
                value={activeRegionTab}
                onIonChange={(e) => setActiveRegionTab(e.detail.value)}
              >
                <IonSegmentButton value="lima">
                  <IonLabel>Lima</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="province">
                  <IonLabel>Provincia</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonToolbar>

          </IonHeader>
          <IonContent fullscreen>
            <IonList className='ion-padding'>
              {(locations[activeRegionTab] || []).map((location) => (
                <IonCard
                  key={location.id}
                  button
                  onClick={() => handleLocationSelect(location)}
                >
                  <IonCardHeader className='ion-no-padding'>
                    <IonButton color={location?.id === location.id ? "primary" : "light"} size='small'>
                      {location.name}
                    </IonButton>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonText>
                      <p>{location.address}</p>
                    </IonText>
                    <IonText color="medium">
                      <small>{location.phone}</small>
                    </IonText>

                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>

          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
