import { useState } from "react";

import SpecialtyStep from "./components/SpecialtyStep";
import ScheduleStep from "./components/ScheduleStep";
import PaymentStep from "./components/PaymentStep";
import DoctorStep from "./components/DoctorStep";

export default function AppointmentBooking() {
  const [step, setStep] = useState(1);

  const [specialty, setSpecialty] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [paymentMethod, setPaymentMethod] =
    useState("card");

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
        />
      )}
    </>
  );
}