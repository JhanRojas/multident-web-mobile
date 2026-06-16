import {
  IonGrid,
  IonRow,
  IonChip,
  IonLabel,
} from "@ionic/react";

export default function BookingStepper({ step }) {
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonChip color={step >= 1 ? "primary" : "light"}>
          <IonLabel>1</IonLabel>
        </IonChip>
        <IonChip color={step >= 2 ? "primary" : "light"}>
          <IonLabel>2</IonLabel>
        </IonChip>
        <IonChip color={step >= 3 ? "primary" : "light"}>
          <IonLabel>3</IonLabel>
        </IonChip>
        <IonChip color={step >= 4 ? "primary" : "light"}>
          <IonLabel>4</IonLabel>
        </IonChip>
      </IonRow>
    </IonGrid>
  );
}