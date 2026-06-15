import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonToast,
} from "@ionic/react";

import {
  mic,
  calendarOutline,
  refreshOutline,
  pause,
  play,
  checkmarkCircleOutline,
  medicalOutline,
  personOutline,
  timeOutline,
} from "ionicons/icons";

import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/index.css";
import { useTTSContext } from '../../shared/context/TTSContext';

const SPECIALTIES = [
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    aliases: ["ortodoncia", "brackets", "frenillos", "alineadores"],
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    aliases: ["endodoncia", "tratamiento de conducto", "conducto"],
  },
  {
    id: "periodoncia",
    name: "Periodoncia",
    aliases: ["periodoncia", "encías", "encias", "sangrado de encías"],
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    aliases: ["odontopediatría", "odontopediatria", "niños", "pediátrica"],
  },
  {
    id: "cirugia",
    name: "Cirugía Oral",
    aliases: ["cirugía oral", "cirugia oral", "extracción", "muela del juicio"],
  },
  {
    id: "estetica",
    name: "Estética Dental",
    aliases: [
      "estética dental",
      "estetica dental",
      "blanqueamiento",
      "carillas",
    ],
  },
  {
    id: "implantologia",
    name: "Implantología",
    aliases: ["implantología", "implantologia", "implantes"],
  },
  {
    id: "rehabilitacion",
    name: "Rehabilitación Oral",
    aliases: [
      "rehabilitación oral",
      "rehabilitacion oral",
      "prótesis",
      "protesis",
    ],
  },
];

const DOCTORS = [
  {
    id: "rojas",
    name: "Dra. Valentina Rojas",
    aliases: ["rojas", "valentina", "doctora rojas"],
    specialties: ["ortodoncia", "estetica"],
  },
  {
    id: "pena",
    name: "Dr. Andrés Peña",
    aliases: ["peña", "pena", "andrés", "andres", "doctor peña"],
    specialties: ["ortodoncia", "rehabilitacion"],
  },
  {
    id: "castillo",
    name: "Dra. Mariana Castillo",
    aliases: ["castillo", "mariana", "doctora castillo"],
    specialties: ["endodoncia", "rehabilitacion"],
  },
  {
    id: "gomez",
    name: "Dr. Felipe Gómez",
    aliases: ["gómez", "gomez", "felipe", "doctor gomez"],
    specialties: ["periodoncia", "implantologia"],
  },
  {
    id: "torres",
    name: "Dra. Laura Torres",
    aliases: ["torres", "laura", "doctora torres"],
    specialties: ["odontopediatria"],
  },
  {
    id: "salazar",
    name: "Dr. Nicolás Salazar",
    aliases: ["salazar", "nicolás", "nicolas", "doctor salazar"],
    specialties: ["cirugia", "implantologia"],
  },
];

const RAW_SLOTS = [
  {
    doctorId: "rojas",
    specialty: "ortodoncia",
    offsetDays: 1,
    time: "09:30 a. m.",
    period: "mañana",
  },
  {
    doctorId: "pena",
    specialty: "ortodoncia",
    offsetDays: 1,
    time: "11:00 a. m.",
    period: "mañana",
  },
  {
    doctorId: "rojas",
    specialty: "ortodoncia",
    offsetDays: 2,
    time: "03:00 p. m.",
    period: "tarde",
  },
  {
    doctorId: "pena",
    specialty: "ortodoncia",
    offsetDays: 4,
    time: "05:30 p. m.",
    period: "tarde",
  },

  {
    doctorId: "castillo",
    specialty: "endodoncia",
    offsetDays: 1,
    time: "08:30 a. m.",
    period: "mañana",
  },
  {
    doctorId: "castillo",
    specialty: "endodoncia",
    offsetDays: 3,
    time: "02:00 p. m.",
    period: "tarde",
  },

  {
    doctorId: "gomez",
    specialty: "periodoncia",
    offsetDays: 1,
    time: "10:00 a. m.",
    period: "mañana",
  },
  {
    doctorId: "gomez",
    specialty: "periodoncia",
    offsetDays: 5,
    time: "04:30 p. m.",
    period: "tarde",
  },

  {
    doctorId: "torres",
    specialty: "odontopediatria",
    offsetDays: 2,
    time: "09:00 a. m.",
    period: "mañana",
  },
  {
    doctorId: "torres",
    specialty: "odontopediatria",
    offsetDays: 4,
    time: "01:30 p. m.",
    period: "tarde",
  },

  {
    doctorId: "salazar",
    specialty: "cirugia",
    offsetDays: 3,
    time: "07:30 a. m.",
    period: "mañana",
  },
  {
    doctorId: "salazar",
    specialty: "cirugia",
    offsetDays: 5,
    time: "03:30 p. m.",
    period: "tarde",
  },

  {
    doctorId: "rojas",
    specialty: "estetica",
    offsetDays: 2,
    time: "12:00 p. m.",
    period: "tarde",
  },
  {
    doctorId: "rojas",
    specialty: "estetica",
    offsetDays: 6,
    time: "04:00 p. m.",
    period: "tarde",
  },

  {
    doctorId: "gomez",
    specialty: "implantologia",
    offsetDays: 2,
    time: "08:00 a. m.",
    period: "mañana",
  },
  {
    doctorId: "salazar",
    specialty: "implantologia",
    offsetDays: 4,
    time: "11:30 a. m.",
    period: "mañana",
  },

  {
    doctorId: "pena",
    specialty: "rehabilitacion",
    offsetDays: 1,
    time: "04:00 p. m.",
    period: "tarde",
  },
  {
    doctorId: "castillo",
    specialty: "rehabilitacion",
    offsetDays: 5,
    time: "09:30 a. m.",
    period: "mañana",
  },
];

const WEEKDAYS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const INITIAL_CONTEXT = {
  specialty: null,
  dateType: null,
  dateLabel: null,
  weekday: null,
  period: null,
  doctorId: null,
  suggestedSlots: [],
  selectedSlot: null,
  awaitingConfirmation: false,
};



export default function VoiceAssistant() {
  const { speak: ttsSpeak, ttsEnabled, pause, resume, stop } = useTTSContext();
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (ttsEnabled && !hasSpoken.current) {
      hasSpoken.current = true;
      ttsSpeak("Asistente de voz. Presione el micrófono para hablar."); // ✅ usa ttsSpeak directo
    }
    return () => {
      hasSpoken.current = false;
      window.speechSynthesis.cancel();
    };
  }, [ttsEnabled]);

  const [messages, setMessages] = useState([
    {
      id: createId(),
      role: "assistant",
      text: "Hola. Puedo ayudarte a agendar una cita odontológica. Puedes decir, por ejemplo: “quiero una cita de ortodoncia para mañana”.",
    },
  ]);

  const [context, setContext] = useState(INITIAL_CONTEXT);
  const [liveTranscript, setLiveTranscript] = useState(
    '"Presiona el micrófono y habla..."',
  );
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingPaused, setIsSpeakingPaused] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const chatEndRef = useRef(null);

  const contextRef = useRef(INITIAL_CONTEXT);

  const slots = useMemo(() => {
    return RAW_SLOTS.map((slot) => ({
      ...slot,
      id: `${slot.doctorId}-${slot.specialty}-${slot.offsetDays}-${slot.time}`,
      date: addDays(new Date(), slot.offsetDays),
      dayName: getDayName(addDays(new Date(), slot.offsetDays)),
      dateLabel: formatFriendlyDate(addDays(new Date(), slot.offsetDays)),
      doctor: DOCTORS.find((doctor) => doctor.id === slot.doctorId),
    }));
  }, []);

  const quickActions = buildQuickActions(context);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setupSpeechRecognition();

    return () => {
      recognitionRef.current?.stop?.();
      mediaRecorderRef.current?.stop?.();
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  function setupSpeechRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-CO";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.onstart = async () => {
      setIsListening(true);
      setLiveTranscript('"Escuchando..."');
      await startAudioCapture();
    };

    recognition.onresult = (event) => {
      let interim = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript;
        } else {
          interim += transcript;
        }
      }

      const visibleText = finalText || interim;
      if (visibleText) {
        setLiveTranscript(`"${visibleText}"`);
      }

      if (finalText.trim()) {
        processUserInput(finalText.trim());
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      stopAudioCapture();
      showToast(
        "No se pudo reconocer la voz. Intenta nuevamente o usa los botones.",
      );
    };

    recognition.onend = () => {
      setIsListening(false);
      stopAudioCapture();
    };

    recognitionRef.current = recognition;
  }

  async function startAudioCapture() {
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder)
        return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });

        // Aquí tienes el audio capturado listo para enviarlo a backend si lo necesitas:
        // console.log('Audio grabado:', audioBlob);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch {
      showToast("El micrófono necesita permiso para funcionar.");
    }
  }

  function stopAudioCapture() {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }

  function toggleMicrophone() {
    const recognition = recognitionRef.current;

    if (!recognition) {
      showToast(
        "El reconocimiento de voz no está disponible en este navegador.",
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      return;
    }

    recognition.start();
  }
  function updateAssistantContext(nextContext) {
    contextRef.current = nextContext;
    setContext(nextContext);
  }

  function processUserInput(rawText) {
    const normalizedText = normalize(rawText);
    const currentContext = contextRef.current;

    addMessage("user", rawText);

    if (isRestartIntent(normalizedText)) {
      restartConversation();
      return;
    }

    if (
      currentContext.awaitingConfirmation &&
      isConfirmIntent(normalizedText)
    ) {
      confirmAppointment(currentContext.selectedSlot);
      return;
    }

    if (currentContext.awaitingConfirmation && isChangeIntent(normalizedText)) {
      const nextContext = {
        ...currentContext,
        selectedSlot: null,
        awaitingConfirmation: false,
      };

      updateAssistantContext(nextContext);

      assistantReply(
        "Claro. Podemos cambiar la opción. Indícame otro horario, otro médico o una nueva fecha.",
      );
      return;
    }

    const extracted = extractEntities(normalizedText);
    const updatedContext = mergeContext(currentContext, extracted);

    const chosenSuggestedSlot = matchSuggestedSlot(
      normalizedText,
      currentContext.suggestedSlots,
    );

    if (chosenSuggestedSlot) {
      selectSlot(chosenSuggestedSlot, updatedContext);
      return;
    }

    if (!updatedContext.specialty) {
      updateAssistantContext(updatedContext);

      assistantReply(
        "¿Qué especialidad necesitas? Puedo ayudarte con ortodoncia, endodoncia, periodoncia, odontopediatría, cirugía oral, estética dental, implantología o rehabilitación oral.",
      );
      return;
    }

    if (!updatedContext.dateType && !updatedContext.weekday) {
      updateAssistantContext(updatedContext);

      if (updatedContext.period) {
        assistantReply(
          `Perfecto, buscas ${getSpecialtyName(updatedContext.specialty)} y prefieres horario en la ${updatedContext.period}. Ahora dime la fecha: puede ser mañana, esta semana o un día específico.`,
        );
      } else {
        assistantReply(
          `Perfecto, buscas ${getSpecialtyName(updatedContext.specialty)}. ¿La cita sería para mañana, esta semana o algún día específico?`,
        );
      }

      return;
    }

    const availableSlots = findMatchingSlots(updatedContext, slots);

    if (availableSlots.length === 0) {
      updateAssistantContext(updatedContext);

      assistantReply(
        `No encontré disponibilidad para ${getSpecialtyName(updatedContext.specialty)} con esos criterios. Puedes decir otro día, cambiar el horario o pedir disponibilidad esta semana.`,
      );
      return;
    }

    if (availableSlots.length === 1) {
      selectSlot(availableSlots[0], updatedContext);
      return;
    }

    const topSlots = availableSlots.slice(0, 3);

    const nextContext = {
      ...updatedContext,
      suggestedSlots: topSlots,
      selectedSlot: null,
      awaitingConfirmation: false,
    };

    updateAssistantContext(nextContext);

    assistantReply(buildSlotsResponse(topSlots, updatedContext.specialty));
  }

  function selectSlot(slot, baseContext) {
    const nextContext = {
      ...baseContext,
      selectedSlot: slot,
      suggestedSlots: [],
      awaitingConfirmation: true,
    };

    updateAssistantContext(nextContext);

    assistantReply(
      `Encontré esta opción: ${slot.doctor.name}, ${getSpecialtyName(slot.specialty)}, ${slot.dateLabel} a las ${slot.time}. ¿Deseas confirmar la cita?`,
    );
  }
  function confirmAppointment(slot) {
    if (!slot) return;

    const currentContext = contextRef.current;

    const nextContext = {
      ...currentContext,
      awaitingConfirmation: false,
    };

    updateAssistantContext(nextContext);

    assistantReply(
      `Listo. Tu cita de ${getSpecialtyName(slot.specialty)} quedó agendada con ${slot.doctor.name} para ${slot.dateLabel} a las ${slot.time}.`,
    );

    showToast("Cita agendada correctamente.");
  }
  function handleQuickAction(action) {
    if (action.type === "restart") {
      restartConversation();
      return;
    }

    processUserInput(action.voiceText);
  }

  function restartConversation() {
    updateAssistantContext(INITIAL_CONTEXT);
    setLiveTranscript('"Presiona el micrófono y habla..."');

    assistantReply(
      "Empecemos de nuevo. Dime qué especialidad necesitas y para cuándo deseas la cita.",
    );
  }

  function repeatAssistant() {
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");

    if (!lastAssistantMessage) return;

    speak(lastAssistantMessage.text);
    setLiveTranscript('"Repitiendo la respuesta del asistente..."');
  }

  function toggleSpeechPause() {
  if (isSpeakingPaused) {
    resume();
    setIsSpeakingPaused(false);
  } else {
    pause(); 
    setIsSpeakingPaused(true);
  }
}

  function assistantReply(text) {
    setTimeout(() => {
      addMessage("assistant", text);
      speak(text);
    }, 450);
  }

  function addMessage(role, text) {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role,
        text,
      },
    ]);
  }

  function speak(text) {
    ttsSpeak(text);
  }

  function showToast(message) {
    setToastMessage(message);
    setToastOpen(true);
  }

  return (
    <IonPage>
      <IonContent fullscreen className="voice-page">
        <section className="voice-shell">

          <div className="voice-divider" />

          <main className="voice-chat">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`voice-message-group ${message.role}`}
              >
                <span className="voice-role">
                  {message.role === "assistant" ? "Asistente" : "Tú (voz)"}
                </span>

                <div className={`voice-bubble ${message.role}`}>
                  {message.text}
                </div>
              </article>
            ))}

            <div ref={chatEndRef} />
          </main>

          <section className="voice-control-area">
            <button
              type="button"
              className={`voice-mic-button ${isListening ? "listening" : ""}`}
              onClick={toggleMicrophone}
              aria-label="Activar asistente de voz"
            >
              <IonIcon icon={mic} />
            </button>

            <p className="voice-transcription-label">
              {isListening
                ? "Escuchando tu solicitud..."
                : "Transcripción en tiempo real"}
            </p>

            <div className="voice-transcript-box">{liveTranscript}</div>
          </section>

          <section className="voice-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="voice-chip"
                onClick={() => handleQuickAction(action)}
              >
                {action.icon && <IonIcon icon={action.icon} />}
                <span>{action.label}</span>
              </button>
            ))}
          </section>

          <footer className="voice-footer-actions">
            <IonButton
              fill="clear"
              className="voice-action-button"
              onClick={toggleSpeechPause}
            >
              <IonIcon slot="start" icon={isSpeakingPaused ? play : pause} />
              {isSpeakingPaused ? "Continuar" : "Pausar"}
            </IonButton>

            <IonButton
              fill="clear"
              className="voice-action-button"
              onClick={repeatAssistant}
            >
              <IonIcon slot="start" icon={refreshOutline} />
              Repetir
            </IonButton>
          </footer>
        </section>

        <IonToast
          isOpen={toastOpen}
          message={toastMessage}
          duration={2600}
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}

function buildQuickActions(context) {
  if (context.awaitingConfirmation) {
    return [
      {
        label: "Confirmar cita",
        voiceText: "Sí, confirmar cita",
        icon: checkmarkCircleOutline,
      },
      {
        label: "Cambiar opción",
        voiceText: "Quiero cambiar la opción",
        icon: refreshOutline,
      },
    ];
  }

  if (!context.specialty) {
    return [
      {
        label: "Ortodoncia",
        voiceText: "Quiero una cita de ortodoncia",
        icon: medicalOutline,
      },
      {
        label: "Endodoncia",
        voiceText: "Necesito una cita de endodoncia",
        icon: medicalOutline,
      },
      {
        label: "Implantología",
        voiceText: "Quiero consultar implantología",
        icon: medicalOutline,
      },
      {
        label: "Cirugía oral",
        voiceText: "Necesito cirugía oral",
        icon: medicalOutline,
      },
    ];
  }

  if (!context.dateType && !context.weekday) {
    return [
      {
        label: "Mañana",
        voiceText: "La cita para mañana",
        icon: calendarOutline,
      },
      {
        label: "Esta semana",
        voiceText: "La cita esta semana",
        icon: calendarOutline,
      },
      {
        label: "Jueves",
        voiceText: "Quiero la cita el jueves",
        icon: calendarOutline,
      },
      {
        label: "Viernes",
        voiceText: "Quiero la cita el viernes",
        icon: calendarOutline,
      },
    ];
  }

  if (context.suggestedSlots.length > 0) {
    return context.suggestedSlots.map((slot) => ({
      label: slot.time,
      voiceText: `Quiero la opción de ${slot.time} con ${slot.doctor.name}`,
      icon: personOutline,
    }));
  }

  return [
    {
      label: "Reiniciar",
      type: "restart",
      icon: refreshOutline,
    },
  ];
}

function extractEntities(text) {
  return {
    specialty: detectSpecialty(text),
    doctorId: detectDoctor(text),
    dateInfo: detectDate(text),
    period: detectPeriod(text),
  };
}

function mergeContext(previous, extracted) {
  return {
    ...previous,
    specialty: extracted.specialty || previous.specialty,
    doctorId: extracted.doctorId || previous.doctorId,
    dateType: extracted.dateInfo?.dateType || previous.dateType,
    dateLabel: extracted.dateInfo?.dateLabel || previous.dateLabel,
    weekday: extracted.dateInfo?.weekday || previous.weekday,
    period: extracted.period || previous.period,
  };
}

function detectSpecialty(text) {
  const match = SPECIALTIES.find((specialty) =>
    specialty.aliases.some((alias) => text.includes(normalize(alias))),
  );

  return match?.id || null;
}

function detectDoctor(text) {
  const match = DOCTORS.find((doctor) =>
    doctor.aliases.some((alias) => text.includes(normalize(alias))),
  );

  return match?.id || null;
}

function detectDate(text) {
  const has = (...phrases) =>
    phrases.some((phrase) => text.includes(normalize(phrase)));

  if (
    has("mañana", "para mañana", "el día de mañana") &&
    !has("en la mañana", "por la mañana")
  ) {
    return {
      dateType: "tomorrow",
      dateLabel: "mañana",
      weekday: null,
    };
  }

  if (
    has(
      "esta semana",
      "durante esta semana",
      "durante la semana",
      "en la semana",
    )
  ) {
    return {
      dateType: "thisWeek",
      dateLabel: "esta semana",
      weekday: null,
    };
  }

  const weekday = WEEKDAYS.find((day) => text.includes(normalize(day)));

  if (weekday) {
    return {
      dateType: "weekday",
      dateLabel: weekday,
      weekday,
    };
  }

  return null;
}

function detectPeriod(text) {
  const has = (...phrases) =>
    phrases.some((phrase) => text.includes(normalize(phrase)));

  if (
    has("en la mañana", "por la mañana", "horario en la mañana", "temprano")
  ) {
    return "mañana";
  }

  if (
    has(
      "en la tarde",
      "por la tarde",
      "horario en la tarde",
      "después del almuerzo",
    )
  ) {
    return "tarde";
  }

  return null;
}

function findMatchingSlots(context, slots) {
  return slots.filter((slot) => {
    const matchesSpecialty = slot.specialty === context.specialty;
    const matchesDoctor = context.doctorId
      ? slot.doctorId === context.doctorId
      : true;
    const matchesPeriod = context.period
      ? slot.period === context.period
      : true;

    let matchesDate = true;

    if (context.dateType === "tomorrow") {
      matchesDate = slot.offsetDays === 1;
    }

    if (context.dateType === "thisWeek") {
      matchesDate = slot.offsetDays >= 1 && slot.offsetDays <= 6;
    }

    if (context.weekday) {
      matchesDate = normalize(slot.dayName) === normalize(context.weekday);
    }

    return matchesSpecialty && matchesDoctor && matchesPeriod && matchesDate;
  });
}

function matchSuggestedSlot(text, suggestedSlots) {
  return suggestedSlots.find((slot) => {
    const compactTime = normalize(slot.time)
      .replaceAll(".", "")
      .replaceAll(" ", "");

    const spokenCompact = text.replaceAll(".", "").replaceAll(" ", "");

    const doctorAliasMatch = slot.doctor.aliases.some((alias) =>
      text.includes(normalize(alias)),
    );

    const timeMatch =
      spokenCompact.includes(compactTime) ||
      text.includes(slot.time.split(" ")[0]);

    return doctorAliasMatch || timeMatch;
  });
}

function buildSlotsResponse(slots, specialtyId) {
  const intro = `Encontré disponibilidad para ${getSpecialtyName(specialtyId)}.`;

  const formattedOptions = slots
    .map(
      (slot, index) =>
        `${index + 1}. ${slot.doctor.name}, ${slot.dateLabel} a las ${slot.time}`,
    )
    .join(". ");

  return `${intro} ${formattedOptions}. Puedes decir el horario, el médico o seleccionar una opción.`;
}

function isConfirmIntent(text) {
  return [
    "confirmar",
    "sí",
    "si",
    "agendar",
    "reservar",
    "acepto",
    "esa cita",
    "esa opción",
  ].some((keyword) => text.includes(keyword));
}

function isChangeIntent(text) {
  return [
    "cambiar",
    "otra opción",
    "otro horario",
    "otro médico",
    "otro medico",
    "otra fecha",
  ].some((keyword) => text.includes(keyword));
}

function isRestartIntent(text) {
  return [
    "reiniciar",
    "empezar de nuevo",
    "nueva consulta",
    "volver a empezar",
  ].some((keyword) => text.includes(keyword));
}

function getSpecialtyName(id) {
  return SPECIALTIES.find((specialty) => specialty.id === id)?.name || id;
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function getDayName(date) {
  return WEEKDAYS[date.getDay()];
}

function formatFriendlyDate(date) {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  if (isSameDay(date, tomorrow)) {
    return "mañana";
  }

  return `${getDayName(date)} ${date.getDate()}`;
}

function isSameDay(dateA, dateB) {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
