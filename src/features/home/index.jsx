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
  IonGrid,
  IonRow,
  IonCol,
  IonSegmentView,
  IonSegmentContent,
} from '@ionic/react'
import { closeOutline, businessOutline, personOutline } from 'ionicons/icons'

import { translations } from '../../utils/translations';
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

  const [activeApptTab, setActiveApptTab] = useState('appointments');

  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;

  const exams = [];

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
        <IonRow className='ion-padding-start ion-padding-end'>
          <IonSegment value={activeApptTab}>
            <IonSegmentButton
              value="appointments"
              contentId="appointments"
            >
              <IonLabel>{t.segmentButtonUpcomingAppts}</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton
              value="exams"
              contentId="exams"
            >
              <IonLabel>{t.segmentButtonExams}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonRow>
      </IonHeader>
      <IonContent>

        <IonSegmentView
          onIonSegmentViewScroll={(e) => {
            console.log(e);
          }}
        >
          <IonSegmentContent id="appointments">
            {appointments.length > 0 ? (
              appointments.map((appt) => {
                const [year, month, day] =
                  appt.appointmentDate.split("-").map(Number);

                return (
                  <IonCard key={appt.id} button>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow className="ion-align-items-center">
                          <IonCol size="2">
                            <h1>{day}</h1>
                            <p>{MONTHS_ES[month - 1]}</p>
                          </IonCol>
                          <IonCol size="7">
                            <h2>{appt.specialty.name}</h2>
                            <p>{appt.doctor.name}</p>
                            <p>{appt.appointmentTime}</p>
                            <p>{appt.status}</p>
                          </IonCol>
                          <IonCol size="3" className="ion-text-center">
                            <IonIcon size='large' icon={businessOutline} />
                            <p>sede</p>
                          </IonCol>

                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                );
              })
            ) : (
              <IonText color="medium">
                <p className="ion-text-center ion-padding">
                  {t.messageNoScheduledAppts}
                </p>
              </IonText>
            )}
          </IonSegmentContent>
          <IonSegmentContent id="exams">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                />
              ))
            ) : (
              <IonText color="medium">
                <p className="ion-text-center ion-padding">
                  {t.messageNoExams}
                </p>
              </IonText>
            )}
          </IonSegmentContent>
        </IonSegmentView>

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
                  <IonLabel>{t.segmentButtonProvince}</IonLabel>
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
