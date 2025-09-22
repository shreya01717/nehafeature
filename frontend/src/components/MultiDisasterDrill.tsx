declare namespace JSX {
  interface IntrinsicElements {
    "a-scene": any;
    "a-plane": any;
    "a-box": any;
    "a-entity": any;
  }
}

import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---------------- ARScene Component ----------------
interface ARSceneProps {
  drillActive: boolean;
  smokeOpacity: number;
  waterOpacity: number;
  gasOpacity: number;
  interactive: boolean;
}

const ARScene: React.FC<ARSceneProps> = ({
  drillActive,
  smokeOpacity,
  waterOpacity,
  gasOpacity,
  interactive,
}) => {
  useEffect(() => {
    if (!interactive) return;
    const box = document.getElementById("interactive-box");
    const handleClick = () => alert("You interacted with the hazard!");
    box?.addEventListener("click", handleClick);
    return () => box?.removeEventListener("click", handleClick);
  }, [interactive]);

  if (!drillActive) return null;

  return (
    <a-scene embedded arjs={{ sourceType: "webcam", debugUIEnabled: true }}>
      {/* Markerless: Planes are placed directly in front of camera */}
      <a-plane
        position="0 0 -3"
        rotation="-90 0 0"
        width="2"
        height="2"
        color="#ff0000"
        opacity={smokeOpacity}
      ></a-plane>
      <a-plane
        position="0 0 -3"
        rotation="-90 0 0"
        width="2"
        height="2"
        color="#0000ff"
        opacity={waterOpacity}
      ></a-plane>
      <a-plane
        position="0 0 -3"
        rotation="-90 0 0"
        width="2"
        height="2"
        color="#00ff00"
        opacity={gasOpacity}
      ></a-plane>

      {interactive && (
        <a-box
          id="interactive-box"
          position="0 0.5 -2.5"
          depth={0.3}
          height={0.6}
          width={0.3}
          color="#f00"
        ></a-box>
      )}

      <a-entity camera></a-entity>
    </a-scene>
  );
};

// ---------------- MultiDisasterDrill Component ----------------
interface DrillStep {
  prompt: string;
  smokeChange?: number;
  waterChange?: number;
  gasOpacity?: number;
  mapCoordinates?: [number, number];
  interactive?: boolean;
}

const MultiDisasterDrill: React.FC = () => {
  // ---------- Scenarios ----------
  const fireScenario: DrillStep[] = [
    { prompt: "Locate the nearest fire exit.", smokeChange: 0.2, mapCoordinates: [28.6139, 77.2090] },
    { prompt: "Move towards the exit while avoiding hazards.", smokeChange: 0.3, mapCoordinates: [28.614, 77.2092], interactive: true },
    { prompt: "Assemble at the safe zone outside the building.", smokeChange: 0, mapCoordinates: [28.615, 77.21] },
  ];

  const floodScenario: DrillStep[] = [
    { prompt: "Move to higher floor.", waterChange: 0.2, mapCoordinates: [28.6135, 77.209] },
    { prompt: "Avoid electric devices in water.", waterChange: 0.3, mapCoordinates: [28.614, 77.2095], interactive: true },
    { prompt: "Assemble at safe area outside.", waterChange: 0, mapCoordinates: [28.615, 77.21] },
  ];

  const earthquakeScenario: DrillStep[] = [
    { prompt: "Drop, Cover, and Hold.", smokeChange: 0, mapCoordinates: [28.6139, 77.2088] },
    { prompt: "Choose safest exit route.", smokeChange: 0, mapCoordinates: [28.614, 77.2091], interactive: true },
    { prompt: "Assemble outside safely.", smokeChange: 0, mapCoordinates: [28.615, 77.21] },
  ];

  const gasLeakScenario: DrillStep[] = [
    { prompt: "Shut off the gas valve.", gasOpacity: 0.2, mapCoordinates: [28.6139, 77.2090] },
    { prompt: "Avoid sparks and electrical devices.", gasOpacity: 0.3, mapCoordinates: [28.614, 77.2093], interactive: true },
    { prompt: "Assemble outside and inform classmates.", gasOpacity: 0, mapCoordinates: [28.615, 77.21] },
  ];

  // ---------- States ----------
  const [currentScenario, setCurrentScenario] = useState<DrillStep[]>(fireScenario);
  const [currentStep, setCurrentStep] = useState(0);
  const [drillActive, setDrillActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [smokeOpacity, setSmokeOpacity] = useState(0.6);
  const [waterOpacity, setWaterOpacity] = useState(0);
  const [gasOpacity, setGasOpacity] = useState(0);
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  // ---------- TTS ----------
  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // ---------- Map ----------
  useEffect(() => {
    if (!drillActive || map) return;

    const newMap = L.map("mini-map", {
      center: currentScenario[0].mapCoordinates || [28.6139, 77.209],
      zoom: 18,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(newMap);
    const initialMarker = L.marker(currentScenario[0].mapCoordinates!).addTo(newMap);
    setMarker(initialMarker);
    setMap(newMap);
  }, [drillActive]);

  useEffect(() => {
    if (marker && currentScenario[currentStep].mapCoordinates) {
      marker.setLatLng(currentScenario[currentStep].mapCoordinates);
      map?.setView(currentScenario[currentStep].mapCoordinates, 18);
    }
  }, [currentStep, marker]);

  // ---------- Timer ----------
  useEffect(() => {
    if (!drillActive) return;
    if (timeLeft <= 0) return endDrill();

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, drillActive]);

  // ---------- Drill Logic ----------
  const startDisaster = (type: "fire" | "flood" | "earthquake" | "gas") => {
    let selectedScenario;
    if (type === "fire") selectedScenario = fireScenario;
    if (type === "flood") selectedScenario = floodScenario;
    if (type === "earthquake") selectedScenario = earthquakeScenario;
    if (type === "gas") selectedScenario = gasLeakScenario;

    setCurrentScenario(selectedScenario!);
    setDrillActive(true);
    setCurrentStep(0);
    setScore(0);
    setTimeLeft(30);
    setSmokeOpacity(0.6);
    setWaterOpacity(0);
    setGasOpacity(0);

    speak(selectedScenario![0].prompt);
  };

  const handleNextStep = () => {
    const step = currentScenario[currentStep];

    if (step.smokeChange) setSmokeOpacity((prev) => Math.min(1, prev + step.smokeChange));
    if (step.waterChange) setWaterOpacity((prev) => Math.min(1, prev + step.waterChange));
    if (step.gasOpacity) setGasOpacity((prev) => Math.min(1, step.gasOpacity));

    setScore((prev) => prev + 10);

    if (currentStep < currentScenario.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      speak(currentScenario[nextStepIndex].prompt);
    } else endDrill();
  };

  const endDrill = () => {
    setDrillActive(false);
    speak(`Drill complete. Your score: ${score}`);
  };

  // ---------- JSX ----------
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* AR Scene */}
      <ARScene
        drillActive={drillActive}
        smokeOpacity={smokeOpacity}
        waterOpacity={waterOpacity}
        gasOpacity={gasOpacity}
        interactive={currentScenario[currentStep]?.interactive || false}
      />

      {/* Timer & Score */}
      {drillActive && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontSize: 20,
            fontWeight: 600,
            zIndex: 10,
          }}
        >
          Time Left: {timeLeft}s | Score: {score}
        </div>
      )}

      {/* Disaster Selection */}
      {!drillActive && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 10,
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => startDisaster("fire")}>Fire Drill</button>
          <button onClick={() => startDisaster("flood")}>Flood Drill</button>
          <button onClick={() => startDisaster("earthquake")}>Earthquake Drill</button>
          <button onClick={() => startDisaster("gas")}>Gas Leak Drill</button>
        </div>
      )}

      {/* Step Instructions */}
      {drillActive && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "#fff",
              zIndex: 10,
            }}
          >
            <p style={{ fontSize: 18, marginBottom: 10 }}>
              Step {currentStep + 1}: {currentScenario[currentStep].prompt}
            </p>
            <button
              onClick={handleNextStep}
              style={{
                padding: "10px 20px",
                fontSize: 16,
                borderRadius: 8,
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
              }}
            >
              Next
            </button>
          </div>

          {/* Mini-map */}
          <div
            id="mini-map"
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 200,
              height: 200,
              zIndex: 10,
              border: "2px solid #fff",
            }}
          />
        </>
      )}
    </div>
  );
};

export default MultiDisasterDrill;
