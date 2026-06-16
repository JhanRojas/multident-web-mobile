import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AppointmentsContext = createContext(null);

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    setAppointments(savedAppointments);
  }, []);

  const addAppointment = (appointment) => {
    const updatedAppointments = [
      appointment,
      ...appointments,
    ];

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentsContext);
}