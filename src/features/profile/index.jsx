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

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppointments } from '../../shared/context/AppointmentsContext'

import "./styles/index.css";

export default function Profile() {
  const history = useHistory()
  const { appointments } = useAppointments()

  const [activeTab, setActiveTab] = useState('perfil')
  const [user, setUser] = useState(null)

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
      <IonContent fullscreen className="profile-page">
        <div className="profile-container">
          <div className="profile-card">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
              alt="perfil"
              className="profile-image"
            />

            <div className="profile-info">
              <h3>{fullName || 'Usuario'}</h3>

              <div className="profile-location">
                <IonIcon icon={locationOutline} />
                <span>Lima centro</span>
              </div>

              <div className="profile-buttons">
                <button className="edit-btn">
                  Editar perfil
                </button>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          <div className="tabs-container">
            <button
              className={activeTab === 'perfil' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('perfil')}
            >
              Perfil
            </button>

            <button
              className={activeTab === 'historial' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('historial')}
            >
              Historial Clínico
            </button>
          </div>

          {activeTab === 'perfil' && (
            <div className="profile-details">
              <div className="detail-item">
                <IonIcon icon={personOutline} />
                <span>{fullName || 'Usuario'}</span>
              </div>

              <div className="detail-item">
                <IonIcon icon={callOutline} />
                <span>{userPhone}</span>
              </div>

              <div className="detail-item">
                <IonIcon icon={mailOutline} />
                <span>{userEmail}</span>
              </div>

              <div
                className="accessibility-item"
                onClick={() => history.push('/accessibility')}
              >
                <span>Accesibilidad</span>
                <IonIcon icon={chevronForwardOutline} />
              </div>
            </div>
          )}

          {activeTab === 'historial' && (
            <div className="appointments-list">
              {appointments.length === 0 ? (
                <p className="empty-history">
                  No tienes citas registradas.
                </p>
              ) : (
                appointments.map((appointment, index) => (
                  <div className="appointment-card" key={index}>
                    <div className="appointment-date">
                      <h1>{appointment.date?.day || appointment.day}</h1>
                      <span>{appointment.date?.month || appointment.month}</span>
                      <small>{appointment.year || ''}</small>
                    </div>

                    <div className="appointment-info">
                      <h3>{appointment.specialty}</h3>
                      <p>{appointment.doctor}</p>
                      <p>{appointment.time}</p>
                      <small>{appointment.status}</small>
                    </div>

                    <div className="appointment-location">
                      <IonIcon icon={businessOutline} />
                      <small>{appointment.sede || appointment.location}</small>
                    </div>

                    <IonIcon
                      icon={chevronForwardOutline}
                      className="arrow-icon"
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}