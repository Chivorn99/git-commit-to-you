"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, MapPin, Check } from "lucide-react"; // Removed unused icons
import confetti from "canvas-confetti";

export default function DatePlanner({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    food: "",
    activity: "",
    dessert: "" // Keeping this in state just in case you want to add it later!
  });
  const [loading, setLoading] = useState(false);

  // DATA: Options for the date
  const foodOptions = [
    { id: "sushi", name: "Sushi", icon: "🍣" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "steak", name: "Steak", icon: "🥩" },
    { id: "tacos", name: "Tacos", icon: "🌮" },
  ];

  const activityOptions = [
    { id: "movie", name: "Movie", icon: "🎬" },
    { id: "arcade", name: "Arcade", icon: "👾" },
    { id: "walk", name: "Walk", icon: "🌳" },
    { id: "shopping", name: "Shop", icon: "🛍️" },
  ];

  const handleSelect = (category: string, value: string) => {
    setSelections({ ...selections, [category]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish Order
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onComplete(); 
        confetti({ spread: 100, particleCount: 200, origin: { y: 0.6 } });
      }, 2500); 
    }
  };

  return (
    // Responsive Width: w-full on mobile, max-w-2xl on desktop
    <div className="w-full max-w-md md:max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-love-200 mx-4">
      
      {/* Header Progress Bar */}
      <div className="bg-love-100 p-4 flex justify-between items-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex items-center gap-2 ${step >= i ? "text-love-600 font-bold" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= i ? "bg-love-500 text-white" : "bg-gray-200"}`}>
              {i}
            </div>
            {/* Hide text on very small screens, show on tablet/desktop */}
            <span className={`${step === i ? "inline" : "hidden"} sm:inline text-sm`}>
              {i === 1 ? "Food" : i === 2 ? "Activity" : "Review"}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8 min-h-[400px] flex flex-col justify-between">
        
        {/* STEP 1: FOOD */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl md:text-2xl font-bold text-love-600 mb-6 flex items-center gap-2">
              <Utensils className="w-6 h-6" /> What are we eating?
            </h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {foodOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect("food", opt.name)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${selections.food === opt.name 
                      ? "border-love-500 bg-love-50 shadow-md scale-105" 
                      : "border-gray-200 hover:border-love-300 hover:bg-white"}`}
                >
                  <span className="text-3xl md:text-4xl">{opt.icon}</span>
                  <span className="font-semibold text-gray-700 text-sm md:text-base">{opt.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: ACTIVITY */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl md:text-2xl font-bold text-love-600 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6" /> What to do after?
            </h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {activityOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect("activity", opt.name)}
                  className={`p-4 md:p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${selections.activity === opt.name 
                      ? "border-love-500 bg-love-50 shadow-md scale-105" 
                      : "border-gray-200 hover:border-love-300 hover:bg-white"}`}
                >
                  <span className="text-3xl md:text-4xl">{opt.icon}</span>
                  <span className="font-semibold text-gray-700 text-sm md:text-base">{opt.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
             <h2 className="text-xl md:text-2xl font-bold text-love-600 mb-8">
              Order Summary 🧾
            </h2>
            
            <div className="bg-love-50 p-6 rounded-xl mb-8 text-left space-y-4 max-w-sm mx-auto border-2 border-love-200 border-dashed">
              <div className="flex justify-between text-base md:text-lg">
                <span className="text-gray-500">Dinner:</span>
                <span className="font-bold text-gray-800">{selections.food || "Surprise Me"}</span>
              </div>
              <div className="flex justify-between text-base md:text-lg">
                <span className="text-gray-500">Activity:</span>
                <span className="font-bold text-gray-800">{selections.activity || "Whatever"}</span>
              </div>
              <div className="border-t border-love-200 pt-4 flex justify-between text-base md:text-lg font-bold text-love-600">
                <span>Total Cost:</span>
                <span>$0.00 (My Treat) 💖</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-gray-600 font-semibold px-4 text-sm md:text-base">
              Back
            </button>
          ) : ( <div></div> )}
          
          <button
            onClick={handleNext}
            disabled={!selections.food && step === 1 || !selections.activity && step === 2 || loading}
            className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-white shadow-lg transition-all flex items-center gap-2 text-sm md:text-base
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-love-500 hover:bg-love-600 hover:scale-105"}`}
          >
            {loading ? "Sending..." : step === 3 ? "Send Invitation 💌" : "Next ➡️"}
          </button>
        </div>

      </div>
    </div>
  );
}