import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonText,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonListHeader,
  IonLabel,
} from "@ionic/react";

import BookingStepper from "./BookingStepper";

import { translations } from '../../../utils/translations';
import { specialties } from "../../../mocks/specialties.mock";

export default function SpecialtyStep({
  specialty,
  setSpecialty,
  onNext,
}) {
  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
        <BookingStepper step={1} />
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader className="ion-no-padding ion-text-center">
          <IonLabel >{t.listHeaderApptSpeciality}</IonLabel>
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {specialties.map((item) => (
              <IonCol size="6" key={item.id}>
                <IonCard
                  button
                  className="ion-no-margin"
                  color={
                    specialty?.id === item.id
                      ? "primary"
                      : undefined
                  }

                  style={{
                    height: '120px',
                    alignContent: 'center'
                  }}
                  onClick={() => {
                    setSpecialty(item);
                    onNext();
                  }}
                >
                  <IonCardContent className="ion-text-center">
                    {item.name}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
}