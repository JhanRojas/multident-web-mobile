import React from "react";
import { IonIcon } from "@ionic/react";
import {
  playOutline,
  pauseOutline,
  stopOutline,
  volumeHighOutline,
  refreshOutline,
} from "ionicons/icons";
import { useTTSContext } from "../context/TTSContext";

export const TTSBar: React.FC = () => {
  const { ttsEnabled, isReading, rate, setRate, pause, resume, stop } =
    useTTSContext();

  if (!ttsEnabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "70px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "var(--ion-color-primary)",
        borderRadius: "24px",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        minWidth: "300px",
        maxWidth: "90vw",
      }}
    >
      <IonIcon
        icon={volumeHighOutline}
        style={{ color: "white", fontSize: "18px", flexShrink: 0 }}
      />

      <button
        onClick={pause}
        style={{
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonIcon icon={pauseOutline} style={{ fontSize: "16px" }} />
      </button>

      <button
        onClick={resume}
        style={{
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonIcon icon={refreshOutline} style={{ fontSize: "16px" }} />
      </button>

      <button
        onClick={stop}
        style={{
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonIcon icon={stopOutline} style={{ fontSize: "16px" }} />
      </button>

      <div
        style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}
      >
        <span style={{ color: "white", fontSize: "11px", flexShrink: 0 }}>
          Vel.
        </span>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ color: "white", fontSize: "11px", minWidth: "28px" }}>
          {rate.toFixed(1)}x
        </span>
      </div>
    </div>
  );
};
