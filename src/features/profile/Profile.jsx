import {
  IonContent,
  IonPage,
  IonIcon
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

import { useState } from 'react'

import { useIonRouter } from '@ionic/react'

import './styles/Profile.css'

export default function Profile() {

  const [activeTab, setActiveTab] = useState('perfil')
  const router = useIonRouter()

  const appointments = [
    {
      day: '24',
      month: 'Dic',
      year: '2024',
      specialty: 'Odontología',
      doctor: 'Dr. Carlos Abanto',
      time: '09:00 a 10:00 AM',
      status: 'PAGADO',
      location: 'Lima Centro'
    },
    {
      day: '08',
      month: 'Sep',
      year: '2024',
      specialty: 'Radiología',
      doctor: 'Dr. Juan Ortega',
      time: '08:30 a 09:30 AM',
      status: 'PAGADO',
      location: 'Lima / La Molina'
    }
  ]

  return (
    <IonPage>
      <IonContent fullscreen className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h2>Perfil</h2>
            <IonIcon icon={notificationsOutline} onClick={() => router.back()} />
          </div>
          <div className="profile-card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" alt="perfil" className="profile-image"/>
            <div className="profile-info">
              <h3>Carmen Salazar Muñoz</h3>
              <div className="profile-location">
                <IonIcon icon={locationOutline} />
                <span>Lima centro</span>
              </div>
              <div className="profile-buttons">
                <button className="edit-btn">Editar perfil</button>
                <button className="logout-btn">Cerrar Sesión</button>
              </div>
            </div>
          </div>
          <div className="tabs-container">
            <button className={activeTab === 'perfil' ? 'tab active' : 'tab'} onClick={() => setActiveTab('perfil')}>Perfil</button>
            <button  className={activeTab === 'historial' ? 'tab active' : 'tab'} onClick={() => setActiveTab('historial')}>Historial Clínico</button>
          </div>
          {
            activeTab === 'perfil' && (
              <div className="profile-details">
                <div className="detail-item">
                  <IonIcon icon={personOutline} />
                  <span>Carmen Salazar Muñoz</span>
                </div>
                <div className="detail-item">
                  <IonIcon icon={callOutline} />
                  <span>(+51) 98715594</span>
                </div>
                <div className="detail-item">
                  <IonIcon icon={mailOutline} />
                  <span>carmen@gmail.com</span>
                </div>
                <div className="accessibility-item" onClick={() => router.push('/accessibility')}>
                  <span>Accesibilidad</span>
                  <IonIcon icon={chevronForwardOutline} />
                </div>
              </div>
            )
          }
          {
            activeTab === 'historial' && (
              <div className="appointments-list">
                {
                  appointments.map((appointment, index) => (
                    <div className="appointment-card" key={index}>
                      <div className="appointment-date">
                        <h1>{appointment.day}</h1>
                        <span>{appointment.month}</span>
                        <small>{appointment.year}</small>
                      </div>
                      <div className="appointment-info">
                        <h3>{appointment.specialty}</h3>
                        <p>{appointment.doctor}</p>
                        <p>{appointment.time}</p>
                        <small>{appointment.status}</small>
                      </div>
                      <div className="appointment-location">
                        <IonIcon icon={businessOutline} />
                        <small>{appointment.location}</small>
                      </div>
                      <IonIcon icon={chevronForwardOutline} className="arrow-icon"/>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </IonContent>
    </IonPage>
  )
}