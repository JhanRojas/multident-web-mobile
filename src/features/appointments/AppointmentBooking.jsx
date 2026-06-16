import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { IonToast } from "@ionic/react";

import SpecialtyStep from "./components/SpecialtyStep";
import ScheduleStep from "./components/ScheduleStep";
import PaymentStep from "./components/PaymentStep";
import DoctorStep from "./components/DoctorStep";

import { translations } from '../../utils/translations';

export default function AppointmentBooking() {
  const languageSaved = localStorage.getItem('language') || 'es';
  const t = translations[languageSaved] || translations.es;
  const router = useIonRouter();
  const [step, setStep] = useState(1);

  const [specialty, setSpecialty] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [paymentMethod, setPaymentMethod] =
    useState("card");
  const [showSuccessToast, setShowSuccessToast] =
    useState(false);
  const resetBooking = () => {
    setSpecialty(null);
    setAppointmentDate(null);
    setAppointmentTime(null);
    setDoctor(null);

    setStep(1);
  };
  const handleAppointmentCreated = () => {
    setShowSuccessToast(true);

    setTimeout(() => {
      router.push("/tabs/home", "root");
    }, 2000);
  };
  return (
    <>
      {step === 1 && (
        <SpecialtyStep
          specialty={specialty}
          setSpecialty={setSpecialty}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ScheduleStep
          specialty={specialty}
          appointmentDate={appointmentDate}
          setAppointmentDate={setAppointmentDate}
          appointmentTime={appointmentTime}
          setAppointmentTime={setAppointmentTime}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <DoctorStep
          doctor={doctor}
          setDoctor={setDoctor}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <PaymentStep
          specialty={specialty}
          doctor={doctor}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
          onBack={() => setStep(3)}
          onAppointmentCreated={
            handleAppointmentCreated
          }
        />
      )}
      <IonToast
        isOpen={showSuccessToast}
        message={t.messageApptCreatedSuccessfully}
        duration={2000}
        color="success"
        position="top"
      />
    </>
  );
}