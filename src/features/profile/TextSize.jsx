import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonRange,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonFooter,
} from "@ionic/react";
import { useState } from "react";

import { translations } from '../../utils/translations';
import { useAccessibility } from '../../hooks/useAccessibility';

const TextSize = () => {
    const {
        fontSize,
        changeFontSize,
    } = useAccessibility();

    const languageSaved = localStorage.getItem('language') || 'es';
    const t = translations[languageSaved] || translations.es;

    const [largeText, setLargeText] = useState(() => {
        return JSON.parse(
            localStorage.getItem("largeText") || "false"
        );
    });

    const handleLargeTextChange = (checked) => {
        setLargeText(checked);

        localStorage.setItem(
            "largeText",
            JSON.stringify(checked)
        );

        changeFontSize(checked ? 22 : 18);
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/accessibility" />
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        {t.titleAugmented}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                <IonList inset>
                    <IonItem>
                        <IonLabel>{t.labelMoreLegibleSizes}</IonLabel>
                        <IonToggle
                            checked={fontSize >= 22}
                            onIonChange={(e) =>
                                handleLargeTextChange(e.detail.checked)
                            }
                        />
                    </IonItem>
                </IonList>
                <IonText color="medium">
                    <p className="ion-text-center ion-padding-horizontal">
                        {t.messageMoreLegibleSizes}
                    </p>
                </IonText>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonGrid>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="1">
                                <IonText color="medium">
                                    A
                                </IonText>
                            </IonCol>

                            <IonCol>
                                <IonRange min={18}
                                    max={24}
                                    step={2}
                                    snaps={true}
                                    pin={true}
                                    value={fontSize}
                                    onIonChange={(e) => changeFontSize(Number(e.detail.value))} />
                            </IonCol>
                            <IonCol size="1">
                                <IonText color="medium">
                                    <h1>A</h1>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default TextSize;