// src/modules/ProgressContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

interface ProgressContextType {
  completedModules: number[];
  completeModule: (id: number) => void;
  markComplete: (id: number) => void; // alias
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("pp_completedModules");
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });

  const completeModule = (id: number) => {
    setCompletedModules((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // alias for backwards compat / developer preference
  const markComplete = completeModule;

  useEffect(() => {
    try {
      localStorage.setItem("pp_completedModules", JSON.stringify(completedModules));
    } catch {
      /* ignore localStorage errors */
    }
  }, [completedModules]);

  return (
    <ProgressContext.Provider value={{ completedModules, completeModule, markComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside a <ProgressProvider />");
  }
  return ctx;
};
