import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { disasters } from "@/modules/data/disasters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/modules/ProgressContext";

export default function ModuleDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<"en" | "hi" | "pa">(
    (searchParams.get("lang") as "en" | "hi" | "pa") || "en"
  );
  const navigate = useNavigate();

  const module = disasters.find((m) => m.id === Number(id));
  const { markComplete } = useProgress();

  const [step, setStep] = useState<"reading" | "quiz" | "summary">("reading");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);

  useEffect(() => {
    setSearchParams({ lang: language });
  }, [language, setSearchParams]);

  if (!module) return <p>Module not found</p>;

  const question = module.quiz[qIndex];

  const handleAnswer = (i: number) => {
    setAnswered(i);
    if (i === question.answerIndex) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (qIndex + 1 < module.quiz.length) {
      setQIndex(qIndex + 1);
      setAnswered(null);
      // Removed scrollTo to keep the button in place
    } else {
      setStep("summary");
      markComplete(module.id);
    }
  };

  const getSummaryText = (percent: number) => {
    const messages = {
      en: {
        completed: "Quiz Completed",
        score: "Your Score",
        100: "Excellent! You mastered this topic!",
        70: "Great job! A little more practice and you’ll be perfect!",
        50: "Good effort! Try again to improve your score.",
        0: "Don’t worry! Keep learning and you’ll get better!",
      },
      hi: {
        completed: "क्विज़ पूरा हुआ",
        score: "आपका स्कोर",
        100: "उत्कृष्ट! आपने इस विषय में महारत हासिल कर ली है!",
        70: "बहुत बढ़िया! थोड़ी और प्रैक्टिस से आप पूर्ण होंगे!",
        50: "अच्छा प्रयास! अपने स्कोर को सुधारने के लिए फिर से प्रयास करें।",
        0: "चिंता न करें! सीखते रहें और आप बेहतर होंगे!",
      },
      pa: {
        completed: "ਕਵਿਜ਼ ਪੂਰਾ ਹੋਇਆ",
        score: "ਤੁਹਾਡਾ ਸਕੋਰ",
        100: "ਉਤਕ੍ਰਿਸ਼ਟ! ਤੁਸੀਂ ਇਸ ਵਿਸ਼ੇ ਵਿੱਚ ਮਾਹਿਰ ਹੋ ਗਏ ਹੋ!",
        70: "ਸ਼ਾਨਦਾਰ! ਥੋੜ੍ਹੀ ਹੋਰ ਅਭਿਆਸ ਨਾਲ ਤੁਸੀਂ ਬਿਲਕੁਲ ਠੀਕ ਹੋ ਜਾਓਗੇ!",
        50: "ਚੰਗਾ ਪ੍ਰਯਾਸ! ਆਪਣਾ ਸਕੋਰ ਸੁਧਾਰਨ ਲਈ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        0: "ਚਿੰਤਾ ਨਾ ਕਰੋ! ਸਿੱਖਦੇ ਰਹੋ ਅਤੇ ਤੁਸੀਂ ਬਿਹਤਰ ਹੋਵੋਗੇ!",
      },
    };
    if (percent === 100) return messages[language][100];
    if (percent >= 70) return messages[language][70];
    if (percent >= 50) return messages[language][50];
    return messages[language][0];
  };

  return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 flex flex-col gap-6">
    
    {/* Back Button */}
    <button
      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-max"
      onClick={() => navigate("/dashboard/modules")} // Ensure this matches your modules list route
    >
      ← Back to Modules
    </button>

    {/* Module Heading */}
    <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-4">
      {module.title[language]}
    </h1>

    {/* Language Switcher */}
    <div className="flex justify-center gap-3 mb-6">
      {["en", "hi", "pa"].map((lang) => (
        <Button
          key={lang}
          variant={language === lang ? "default" : "outline"}
          onClick={() => setLanguage(lang as "en" | "hi" | "pa")}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
      <Card className="flex-1 shadow-2xl rounded-3xl overflow-hidden max-w-5xl mx-auto w-full">
        <CardContent className="p-8 flex flex-col gap-6">
          {/* Reading Step */}
          {step === "reading" && (
            <div className="flex flex-col gap-6">
              <div className="w-full h-[600px] overflow-y-auto p-8 bg-yellow-50 dark:bg-gray-800 shadow-xl rounded-2xl leading-relaxed text-gray-900 dark:text-gray-200 text-lg scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-300 dark:scrollbar-track-gray-700 scrollbar-thumb-rounded-full">
                <p className="whitespace-pre-line">{module.content[language]}</p>
              </div>

              <Button
                onClick={() => setStep("quiz")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-4 font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 max-w-xl mx-auto"
              >
                Start Quiz
              </Button>
            </div>
          )}

          {/* Quiz Step */}
          {step === "quiz" && (
            <div className="flex flex-col gap-6">
              <Progress
                value={((qIndex + 1) / module.quiz.length) * 100}
                className="mb-4 transition-all duration-500 ease-in-out"
              />
              <h2 className="text-2xl font-semibold mb-2">
                Question {qIndex + 1} of {module.quiz.length}
              </h2>
              <p className="text-lg mb-4 font-medium">{question.question[language]}</p>

              <div className="flex flex-col gap-3">
                {question.options[language].map((opt, i) => {
                  const isCorrect = i === question.answerIndex;
                  const isSelected = i === answered;

                  let baseClass =
                    "w-full py-3 px-4 rounded-lg text-left font-medium border transition-all cursor-pointer";

                  let colorClass =
                    "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:scale-105";
                  if (answered !== null) {
                    if (isCorrect) colorClass = "bg-green-500 border-green-600 text-white";
                    else if (isSelected && !isCorrect)
                      colorClass = "bg-red-500 border-red-600 text-white";
                    else
                      colorClass =
                        "bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={answered !== null}
                      className={`${baseClass} ${colorClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button stays below options */}
              {answered !== null && (
                <Button
                  onClick={handleNextQuestion}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-4 font-semibold rounded-xl"
                >
                  {qIndex + 1 < module.quiz.length ? "Next Question" : "See Summary"}
                </Button>
              )}
            </div>
          )}

          {/* Summary Step */}
          {step === "summary" && (
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">{getSummaryText(100)}</h2>
              <p className="text-xl font-medium">
                {getSummaryText(0)}: {score} / {module.quiz.length}
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                {getSummaryText((score / module.quiz.length) * 100)}
              </p>

              <div className="flex flex-col gap-3 mt-4 max-w-sm mx-auto">
                {score < module.quiz.length && (
                  <Button
                    onClick={() => {
                      setStep("quiz");
                      setQIndex(0);
                      setScore(0);
                      setAnswered(null);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-semibold rounded-lg"
                  >
                    Try Again
                  </Button>
                )}

               <Button
  onClick={() => navigate("/dashboard/modules")} // <-- Corrected path
  className="bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg"
>
  Back to Modules
</Button>

              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
