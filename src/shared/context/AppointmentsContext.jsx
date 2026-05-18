import { createContext, useContext, useState } from 'react'

const AppointmentsContext = createContext(null)

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([])

  const addAppointment = (appt) => {
    setAppointments(prev => [appt, ...prev])
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  return useContext(AppointmentsContext)
}
