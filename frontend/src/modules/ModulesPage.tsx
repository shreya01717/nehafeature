import { disasters } from "@/modules/data/disasters";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProgress } from "@/modules/ProgressContext";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ModulesPage() {
  const [language, setLanguage] = useState<"en" | "hi" | "pa">("en");
  const navigate = useNavigate();
  const { completedModules } = useProgress();

  const handleNavigate = (id: number) => {
    navigate(`/dashboard/modules/${id}?lang=${language}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Disaster Learning Modules</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "pa")}
          className="border rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-gray-200"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {disasters.map((module) => {
          const completed = completedModules.includes(module.id);

          return (
            <div
              key={module.id}
              className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div
                className="relative h-40 overflow-hidden"
                onClick={() => handleNavigate(module.id)}
              >
                <img
                  src={module.image}
                  alt={module.title[language]}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {completed && (
                  <CheckCircle className="absolute top-2 right-2 text-green-500 w-6 h-6" />
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{module.title[language]}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {module.description[language]}
                </p>
                <Button
                  onClick={() => handleNavigate(module.id)}
                  className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  View Module
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
