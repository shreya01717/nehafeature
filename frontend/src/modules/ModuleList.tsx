import React from "react";
import { disasters } from "./data/disasters";
import { useProgress } from "./ProgressContext";

export const ModuleList: React.FC<{ onSelect: (id: number) => void }> = ({ onSelect }) => {
  const { completedModules } = useProgress();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {disasters.map((d, idx) => {
        const unlocked = idx === 0 || completedModules.includes(idx);
        return (
          <div
            key={d.id}
            className={`p-4 border rounded-xl cursor-pointer ${unlocked ? "bg-white" : "bg-gray-200 opacity-50"}`}
            onClick={() => unlocked && onSelect(d.id)}
          >
            <img src={d.image} alt={d.title.en} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold">{d.title.en}</h2>
          </div>
        );
      })}
    </div>
  );
};
