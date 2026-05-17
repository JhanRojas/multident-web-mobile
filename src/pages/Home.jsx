import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react'

function Home() {

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Multident</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Bienvenido</h2>

        <p>
          Plataforma inclusiva y accesible.
        </p>

      </IonContent>

    </IonPage>
  )
}

export default Home