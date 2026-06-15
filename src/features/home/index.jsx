import { useState, useEffect, useRef} from 'react'
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonModal, IonIcon,
} from '@ionic/react'
import { closeOutline, businessOutline, personOutline } from 'ionicons/icons'
import { useAppointments } from '../../shared/context/AppointmentsContext'
import './styles/index.css'
import { useTTSContext } from '../../shared/context/TTSContext';
 
const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
 
const SEDES = {
  Lima: [
    { id: 'lima-centro', nombre: 'Lima centro',  nombreClinica: 'Clínica Lima Centro',  direccion: 'Av. Bolivia 501',                    telefono: '(01) 355-2421' },
    { id: 'la-molina',   nombre: 'La Molina',    nombreClinica: 'Clínica La Molina',    direccion: 'Av. Raúl Ferrero 1141',              telefono: '(01)3653676 - 985584971' },
    { id: 'los-olivos',  nombre: 'Los Olivos',   nombreClinica: 'Clínica Los Olivos',   direccion: 'Av. Carlos Izaguirre 548 – 2do piso',telefono: '938794280 / (01) 485-0678' },
    { id: 'san-miguel',  nombre: 'San Miguel',   nombreClinica: 'Clínica San Miguel',   direccion: 'Ca. Laureno Martínez 160',           telefono: '(01) 263-7878' },
  ],
  Provincia: [
    { id: 'arequipa', nombre: 'Arequipa', nombreClinica: 'Clínica Arequipa', direccion: 'Av. Ejército 123',       telefono: '(054) 123-4567' },
    { id: 'trujillo', nombre: 'Trujillo', nombreClinica: 'Clínica Trujillo', direccion: 'Jr. Independencia 456', telefono: '(044) 234-5678' },
  ],
}
 
export default function Home() {
  const { appointments } = useAppointments()
  const { speak, ttsEnabled } = useTTSContext();
  const hasSpoken = useRef(false);
  const [selectedSede, setSelectedSede]         = useState(SEDES.Lima[0])
  const [modalOpen, setModalOpen]               = useState(false)
  const [activeRegionTab, setActiveRegionTab]   = useState('Lima')
  const [activeApptTab, setActiveApptTab]       = useState('proximas')
 
  const handleSedeSelect = (sede) => { setSelectedSede(sede); setModalOpen(false) }

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
      <IonContent fullscreen className="home-content">
        <div className="clinic-card" onClick={() => setModalOpen(true)}>
          <div className="clinic-icon"><IonIcon icon={businessOutline} /></div>
          <div className="clinic-info">
            <h3 className="clinic-name">{selectedSede.nombreClinica}</h3>
            <p className="clinic-address">{selectedSede.direccion}</p>
          </div>
          <div className="clinic-chevron">›</div>
        </div>
 
        <div className="appointment-tabs">
          <button className={`appt-tab ${activeApptTab === 'proximas' ? 'active' : ''}`} onClick={() => setActiveApptTab('proximas')}>Próximas citas</button>
          <button className={`appt-tab ${activeApptTab === 'examenes' ? 'active' : ''}`} onClick={() => setActiveApptTab('examenes')}>Exámenes</button>
        </div>
 
        {appointments.length === 0 ? (
          <div className="empty-state"><p>No tienes citas programadas.</p></div>
        ) : (
          <div className="appt-list">
            {appointments.map(appt => (
              <div key={appt.id} className="appt-card">
                <div className="appt-date-badge">
                  <span className="appt-day">{appt.date.day}</span>
                  <span className="appt-month">{MONTHS_ES[appt.date.month]}</span>
                </div>
 
                <div className="appt-info">
                  <p className="appt-specialty">{appt.specialty}</p>
                  <p className="appt-doctor">{appt.doctor}</p>
                  <p className="appt-time">{appt.time} - {appt.sede}</p>
                </div>
 
                <div className="appt-right">
                  <div className="appt-icon"><IonIcon icon={businessOutline} /></div>
                  <span className="appt-status">{appt.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
 
        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)} breakpoints={[0, 0.85]} initialBreakpoint={0.85} className="sede-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-clinic-icon"><IonIcon icon={businessOutline} /></div>
              <div className="modal-clinic-info">
                <h3>{selectedSede.nombreClinica}</h3>
                <p>{selectedSede.direccion}</p>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}><IonIcon icon={closeOutline} /></button>
            </div>
 
            <div className="region-tabs">
              {['Lima', 'Provincia'].map(tab => (
                <button key={tab} className={`region-tab ${activeRegionTab === tab ? 'active' : ''}`} onClick={() => setActiveRegionTab(tab)}>{tab}</button>
              ))}
            </div>
 
            <div className="sede-list">
              {SEDES[activeRegionTab].map(sede => (
                <div key={sede.id} className="sede-item" onClick={() => handleSedeSelect(sede)}>
                  <div className={`sede-item-name ${selectedSede.id === sede.id ? 'selected' : ''}`}><span>{sede.nombre}</span></div>
                  <div className="sede-item-details">
                    <p className="sede-direccion">{sede.direccion}</p>
                    <p className="sede-telefono">{sede.telefono}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
