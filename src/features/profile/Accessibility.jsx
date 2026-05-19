import {
  IonContent,
  IonIcon,
  IonPage,
  IonRange,
  IonToggle,
  useIonRouter,
} from '@ionic/react'

import {
  arrowBackOutline,
  contrastOutline,
  globeOutline,
  personOutline,
  reorderThreeOutline,
  textOutline
} from 'ionicons/icons'

import './styles/Accessibility.css'

export default function Accessibility() {

  const router = useIonRouter()

  return (
    <IonPage>
      <IonContent fullscreen className="accessibility-page">
        <div className="accessibility-container">
          <div className="accessibility-header">
            <IonIcon icon={arrowBackOutline} onClick={() => router.goBack()} />
            <h2>Accesibilidad</h2>
          </div>
          <div className="section-title ion-justify-content-start">
            <IonIcon icon={globeOutline} />
            <span>Idioma</span>
          </div>
          <div className="card-box">
            <div className="option-item">Español</div>
            <div className="option-item">English</div>
            <div className="option-item no-border">Quechua</div>
          </div>
          <div className="section-title ion-justify-content-start">
            <IonIcon icon={personOutline} />
            <span>Perfil de accesibilidad</span>
          </div>
          <div className="card-box">
            <div className="toggle-item">
              <span>Visión Baja</span>
              <IonToggle />
            </div>
            <div className="toggle-item">
              <span>Dislexia</span>
              <IonToggle />
            </div>
            <div className="toggle-item no-border">
              <span>Daltonismo</span>
              <IonToggle />
            </div>
          </div>
          <div className="slider-section">
            <div className="section-title ion-justify-content-start">
              <IonIcon icon={textOutline} />
              <span>Tamaño de texto</span>
            </div>
            <div className="slider-box">
              <span>A</span>
              <IonRange min={0} max={100} value={50} />
              <span className="big-a">A</span>
            </div>
          </div>
          <div className="slider-section">
            <div className="section-title ion-justify-content-start">
              <IonIcon icon={reorderThreeOutline} />
              <span>Interlineado</span>
            </div>
            <div className="slider-box">
              <span>=</span>
              <IonRange min={0} max={100} value={60} />
              <span>=</span>
            </div>
          </div>
          <div className="contrast-section">
            <div className="section-title ion-justify-content-start">
              <IonIcon icon={contrastOutline} />
              <span>Contraste</span>
            </div>
            <div className="contrast-buttons">
              <button className="contrast-btn active">Claro</button>
              <button className="contrast-btn">Oscuro</button>
              <button className="contrast-btn">Alto</button>
            </div>
          </div>
          <button className="reset-btn">Restablecer</button>
        </div>
      </IonContent>
    </IonPage>
  )
}