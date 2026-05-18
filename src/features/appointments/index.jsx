import { useState } from 'react'
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonIcon
} from '@ionic/react'
import { personOutline, businessOutline } from 'ionicons/icons'
import { useAppointments } from '../../shared/context/AppointmentsContext'
import './styles/Appointments.css'
 
const SPECIALTIES = [
  'General', 'Odontología', 'Endodoncia', 'Ortodoncia',
  'Ondotopediatría', 'Cirugía', 'Radiología', 'Periodoncia',
]
 
const DOCTORS = [
  { id: 1, name: 'Dr. Carlos Abanto',  hours: '09:00 a 10:00 am' },
  { id: 2, name: 'Dr. Laura Perez',    hours: '09:00 a 10:00 am' },
  { id: 3, name: 'Dr. Juan Ortega',    hours: '09:00 a 10:00 am' },
]
 
const DAY_HEADERS = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']
const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun',
                   'Jul','Ago','Sep','Oct','Nov','Dic']
 
function buildCalendar(year, month) {
  const first = new Date(year, month, 1).getDay()
  const days  = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)
  return cells
}
 
function pad(n) { return String(n).padStart(2, '0') }
function fmtDate(y, m, d) { return `${MONTHS[m].slice(0,3)} ${d}, ${y}` }
 
export default function Appointments() {
  const today = new Date()
  const { addAppointment } = useAppointments()
 
  const [step, setStep]               = useState('specialty')
  const [specialty, setSpecialty]     = useState(null)
  const [calYear,  setCalYear]        = useState(today.getFullYear())
  const [calMonth, setCalMonth]       = useState(today.getMonth())
  const [selDay,   setSelDay]         = useState(today.getDate())
  const [timeHour, setTimeHour]       = useState(9)
  const [timeMin,  setTimeMin]        = useState(0)
  const [doctor,   setDoctor]         = useState(null)
  const [payMethod, setPayMethod]     = useState('card')
  const [cardNum,   setCardNum]       = useState('')
  const [cardName,  setCardName]      = useState('')
  const [cardExp,   setCardExp]       = useState('')
  const [cardCvc,   setCvc]           = useState('')
  const [saveCard,  setSaveCard]      = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showCode,    setShowCode]    = useState(false)
  const [showBanner,  setShowBanner]  = useState(false)
  const [payCode,     setPayCode]     = useState('')
 
  const stepNum = { specialty: 1, datetime: 2, doctor: 2, summary: 3, done: 3 }[step]
  const cells = buildCalendar(calYear, calMonth)
 
  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }
 
  const formattedDate = fmtDate(calYear, calMonth, selDay)
  const formattedTime = `${pad(timeHour)}:${pad(timeMin)} ${timeHour < 12 ? 'AM' : 'PM'}`
 
  const handleReserve = () => setShowConfirm(true)
 
  const saveAndFinish = (code) => {
    addAppointment({
      id: Date.now(),
      specialty,
      doctor: doctor?.name,
      date: { day: selDay, month: calMonth, year: calYear },
      time: formattedTime,
      sede: 'Lima Centro',
      total: 120,
      payMethod,
      payCode: code,
      status: 'PAGADO',
    })
  }
 
  const handleConfirm = () => {
    setShowConfirm(false)
    const code = String(Math.floor(10000000 + Math.random() * 90000000))
    setPayCode(code)
    if (payMethod === 'cash') {
      setShowCode(true)
    } else {
      saveAndFinish(code)
      setShowBanner(true)
      setStep('done')
      setTimeout(() => setShowBanner(false), 4000)
    }
  }
 
  const handleCodeAccept = () => {
    setShowCode(false)
    saveAndFinish(payCode)
    setShowBanner(true)
    setStep('done')
    setTimeout(() => setShowBanner(false), 4000)
  }
 
  const resetFlow = () => {
    setStep('specialty'); setSpecialty(null); setDoctor(null)
    setCardNum(''); setCardName(''); setCardExp(''); setCvc('')
    setSaveCard(false); setPayMethod('card')
  }
 
  const StepIndicator = () => (
    <div className="step-indicator">
      {[1,2,3].map((n, i) => (
        <span key={n} style={{display:'contents'}}>
          <div className={`step-circle ${stepNum > n ? 'done' : stepNum === n ? 'active' : ''}`}>{n}</div>
          {i < 2 && <div className={`step-line ${stepNum > n ? 'done' : ''}`} />}
        </span>
      ))}
    </div>
  )
 
  const renderSpecialty = () => (
    <div className="appts-page-wrapper">
      <StepIndicator />
      <p className="section-title">Seleccione la especialidad</p>
      <div className="specialties-grid">
        {SPECIALTIES.map(s => (
          <button
            key={s}
            className={`specialty-btn ${specialty === s ? 'selected' : ''}`}
            onClick={() => { setSpecialty(s); setStep('datetime') }}
          >{s}</button>
        ))}
      </div>
    </div>
  )
 
  const renderDatetime = () => (
    <div className="appts-page-wrapper">
      <StepIndicator />
      <p className="section-title">Seleccione la fecha y hora</p>
      <div className="datetime-row">
        <div className="datetime-chip">{formattedDate}</div>
        <div className="datetime-chip">{formattedTime}</div>
      </div>
      <div className="calendar-card">
        <div className="cal-header">
          <button className="cal-nav" onClick={prevMonth}>‹</button>
          <span className="cal-month">{MONTHS[calMonth]} {calYear} ›</span>
          <button className="cal-nav" onClick={nextMonth}>›</button>
        </div>
        <div className="cal-grid">
          {DAY_HEADERS.map(h => <div key={h} className="cal-day-header">{h}</div>)}
          {cells.map((d, i) => (
            <div
              key={i}
              className={`cal-day${!d ? ' empty' : ''}${d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear() ? ' today' : ''}${d === selDay ? ' selected' : ''}`}
              onClick={() => d && setSelDay(d)}
            >{d || ''}</div>
          ))}
        </div>
      </div>
      <div className="time-row">
        <span className="time-label">Time</span>
        <span className="time-value">{formattedTime}</span>
      </div>
      <br />
      <button className="btn-primary" disabled={!selDay} onClick={() => setStep('doctor')}>Continuar</button>
    </div>
  )
 
  const renderDoctor = () => (
    <div className="appts-page-wrapper">
      <StepIndicator />
      <p className="section-title">Seleccione la fecha y hora</p>
      <div className="datetime-row">
        <div className="datetime-chip">{formattedDate}</div>
        <div className="datetime-chip">{formattedTime}</div>
      </div>
      <div className="doctor-list">
        {DOCTORS.map(doc => (
          <div
            key={doc.id}
            className={`doctor-card ${doctor?.id === doc.id ? 'selected' : ''}`}
            onClick={() => setDoctor(doc)}
          >
            <div className="doctor-avatar"><IonIcon icon={personOutline} /></div>
            <div className="doctor-info">
              <p className="doctor-name">{doc.name}</p>
              <p className="doctor-hours">{doc.hours}</p>
            </div>
            <span className="doctor-chevron">›</span>
          </div>
        ))}
      </div>
      <br />
      <button className="btn-primary" disabled={!doctor} onClick={() => setStep('summary')}>Continuar</button>
    </div>
  )
 
  const renderSummary = () => (
    <div className="appts-page-wrapper">
      <StepIndicator />
      <p className="section-title">Resumen de la cita y pago</p>
      <div className="summary-card">
        <div className="summary-patient">
          <div className="summary-avatar"><IonIcon icon={personOutline} /></div>
          <div>
            <p className="summary-patient-name">Carmen Salazar Muñoz</p>
            <p className="summary-patient-label">Paciente</p>
          </div>
        </div>
        <div className="summary-row">
          <p className="summary-row-label">Doctor</p>
          <p className="summary-row-value">{doctor?.name}</p>
        </div>
        <div className="summary-row">
          <p className="summary-row-label">Especialidad</p>
          <p className="summary-row-value">{specialty}</p>
        </div>
        <div className="summary-row">
          <p className="summary-row-label">Horario</p>
          <p className="summary-row-value">{formattedTime} - {pad(timeHour + 1)}:00 {timeHour + 1 < 12 ? 'AM' : 'PM'}</p>
        </div>
        <p className="summary-total">Total a Pagar: S/ 120.0</p>
      </div>
 
      <div className="payment-toggle">
        <button className={`payment-toggle-btn ${payMethod === 'card' ? 'active' : ''}`} onClick={() => setPayMethod('card')}>Con tarjeta</button>
        <button className={`payment-toggle-btn ${payMethod === 'cash' ? 'active' : ''}`} onClick={() => setPayMethod('cash')}>Sin tarjeta</button>
      </div>
 
      {payMethod === 'card' ? (
        <>
          <div className="payment-card-method">
            <div className="payment-field">
              <label>Número de tarjeta <span>*</span></label>
              <input value={cardNum} onChange={e => setCardNum(e.target.value)} placeholder="1234 5678 9012 3456" />
            </div>
            <div className="payment-field">
              <label>Nombre del titular <span>*</span></label>
              <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Jhon Doe" />
            </div>
            <div className="payment-field-row">
              <div className="payment-field">
                <label>Fecha de Expiración <span>*</span></label>
                <input value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM/YYYY" />
              </div>
              <div className="payment-field">
                <label>CVC <span>*</span></label>
                <input value={cardCvc} onChange={e => setCvc(e.target.value)} placeholder="123" />
              </div>
            </div>
          </div>
          <p className="summary-total" style={{marginBottom:'12px'}}>Total a Pagar: S/ 120.0</p>
          <div className="save-card-row">
            <span className="save-card-label">Guardar tarjeta</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <button className="btn-primary" onClick={handleReserve}>Pagar y Reservar</button>
        </>
      ) : (
        <>
          <div className="sin-tarjeta-box">
            <p className="sin-tarjeta-title">Desde la aplicación de un Banco (BCP, BBVA, Interbank)</p>
            <ul>
              <li>Ingrese a la aplicación.</li>
              <li>Ir a la sección de pago de servicios.</li>
              <li>Buscar la empresa "Multident servicios".</li>
              <li>Ingresar el código generado y se mostrará el detalle de la reserva.</li>
              <li>Finalmente, proceder con el pago.</li>
            </ul>
          </div>
          <div className="sin-tarjeta-box">
            <p className="sin-tarjeta-title">Pago presencial en el Banco (BCP, BBVA, Interbank)</p>
            <ul>
              <li>Ir a la sede del Banco.</li>
              <li>En ventanilla solicitar el pago de servicios.</li>
              <li>Indicar el nombre de la empresa "Multident servicios".</li>
              <li>Proporcionar el código de pago.</li>
              <li>Finalmente, proceder con el pago.</li>
            </ul>
          </div>
          <button className="btn-primary" onClick={handleReserve}>Reservar</button>
        </>
      )}
    </div>
  )
 
  const renderDone = () => (
    <div className="appts-page-wrapper" style={{textAlign:'center', paddingTop:'48px'}}>
      <div style={{fontSize:'56px', marginBottom:'16px'}}>✅</div>
      <h2 style={{color:'#1c1c1e', fontWeight:700, marginBottom:'8px'}}>¡Reserva confirmada!</h2>
      <p style={{color:'#636366', fontSize:'14px', marginBottom:'32px'}}>Tu cita ha sido programada. Puedes verla en Inicio.</p>
      <button className="btn-primary" onClick={resetFlow}>Nueva Cita</button>
    </div>
  )
 
  return (
    <IonPage>
      <IonHeader className="appts-header">
        <IonToolbar>
          <IonTitle>Nueva Cita – paso 0{stepNum}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="appts-content">
        {step === 'specialty' && renderSpecialty()}
        {step === 'datetime'  && renderDatetime()}
        {step === 'doctor'    && renderDoctor()}
        {step === 'summary'   && renderSummary()}
        {step === 'done'      && renderDone()}
      </IonContent>
 
      {showConfirm && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-box">
            <h3>¿Está seguro que desea realizar la reserva?</h3>
            <p>{payMethod === 'card'
              ? 'Una vez que haga clic en Aceptar se procesará el pago y se programará su cita.'
              : 'Una vez que haga clic en Aceptar tiene 2 horas para confirmar el pago.'}
            </p>
            <div className="confirm-modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>NO</button>
              <button className="btn-accept" onClick={handleConfirm}>SÍ</button>
            </div>
          </div>
        </div>
      )}
 
      {showCode && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-box">
            <h3>Su código de pago es</h3>
            <div className="confirm-code">{payCode}</div>
            <p>El detalle de la reserva fue enviado a su correo y tiene 2 horas para confirmar el pago, gracias.</p>
            <button className="btn-accept" style={{width:'100%'}} onClick={handleCodeAccept}>Aceptar</button>
          </div>
        </div>
      )}
 
      {showBanner && (
        <div className="notif-banner">
          <div className="notif-icon"><IonIcon icon={businessOutline} /></div>
          <div className="notif-text">
            <h4>Multident Reserva de Cita</h4>
            <p>Tiene una cita registrada.</p>
          </div>
        </div>
      )}
    </IonPage>
  )
}
