"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, MapPin, Clock, Calendar } from "lucide-react"; 
import confetti from "canvas-confetti";

export default function DatePlanner({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    food: "",
    activity: "",
  });
  const [loading, setLoading] = useState(false);

  // DATA: Lousifen and Sach Ang!
  const foodOptions = [
    { id: "lousifen", name: "Lousifen 🍜", icon: "🐌" }, 
    { id: "sach-ang", name: "Sach Ang 🥩", icon: "🍢" }, 
    { id: "sushi", name: "Sushi 🍣", icon: "🍣" },
    { id: "pizza", name: "Pizza 🍕", icon: "🍕" },
  ];

  // UPDATED DATA: Your specific activities
  const activityOptions = [
    { id: "arcade", name: "Arcade 👾", icon: "🕹️" },
    { id: "karaoke", name: "Karaoke 🎤", icon: "🎶" },
    { id: "mer-anime", name: "Mer Anime 📺", icon: "✨" }, // "Mer" (មើល) = Watch
    { id: "sweet-time", name: "Sweet Time 💖", icon: "👩‍❤️‍👨" }, // Romantic Hour
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

      // --- NEW: Send Notification ---
      fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selections),
      });
      // -----------------------------

      setTimeout(() => {
        setLoading(false);
        setStep(4); // Show Receipt
        confetti({ spread: 100, particleCount: 200, origin: { y: 0.6 } });
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-love-200 mx-4 relative">
      
      {/* Header Progress Bar (Hidden on Receipt Step) */}
      {step < 4 && (
        <div className="bg-love-100 p-4 flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex items-center gap-2 ${step >= i ? "text-love-600 font-bold" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= i ? "bg-love-500 text-white" : "bg-gray-200"}`}>
                {i}
              </div>
              <span className={`${step === i ? "inline" : "hidden"} sm:inline text-sm`}>
                {i === 1 ? "Food" : i === 2 ? "Activity" : "Review"}
              </span>
            </div>
          ))}
        </div>
      )}

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

        {/* STEP 4: CUTE RECEIPT (FINAL STEP) */}
        {step === 4 && (
            <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center pt-4"
            >
                <div className="relative bg-white p-8 rounded-sm shadow-2xl max-w-xs w-full border border-gray-200 transform rotate-1">
                    {/* Sticker Pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl filter drop-shadow-md z-20">
                        📌
                    </div>

                    <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">Receipt</h2>
                        <p className="text-xs text-gray-400">Order #14022026</p>
                    </div>

                    <div className="space-y-3 text-sm font-mono text-gray-600 mb-6">
                        <div className="flex justify-between">
                            <span>Item 1:</span>
                            <span className="font-bold">{selections.food}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Item 2:</span>
                            <span className="font-bold">{selections.activity}</span>
                        </div>
                        <div className="flex justify-between text-love-500 font-bold pt-2 border-t border-gray-100">
                            <span>Total Love:</span>
                            <span>100% ❤️</span>
                        </div>
                    </div>

                    {/* Cute Message */}
                    <div className="bg-love-50 p-3 rounded-lg text-center mb-6">
                         <p className="text-love-600 font-bold text-sm">
                            Reservation Confirmed! ✅
                         </p>
                         <p className="text-xs text-gray-500 mt-1">
                            Can&apos;t wait to see you, my little fairy. <br/>
                            不见不散哟! (See you there!) 🐻
                         </p>
                    </div>

                    {/* Barcode (Fake) */}
                    <div className="h-8 bg-gray-800 w-full mb-2 opacity-80"></div>
                    <p className="text-[10px] text-center text-gray-400">THANK YOU FOR YOUR ORDER</p>
                </div>

                <div className="mt-8">
                     <button
                        onClick={onComplete} // Go to Photo Booth
                        className="bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 animate-bounce"
                     >
                        Let&apos;s Take a Selfie! 📸
                     </button>
                </div>
            </motion.div>
        )}

        {/* Navigation Buttons (Hide on Step 4) */}
        {step < 4 && (
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-gray-600 font-semibold px-4 text-sm md:text-base">
                Back
              </button>
            ) : ( <div></div> )}
            
            <button
              onClick={handleNext}
              disabled={(!selections.food && step === 1) || (!selections.activity && step === 2) || loading}
              className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-white shadow-lg transition-all flex items-center gap-2 text-sm md:text-base
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-love-500 hover:bg-love-600 hover:scale-105"}`}
            >
              {loading ? "Printing Receipt..." : step === 3 ? "Send Invitation 💌" : "Next ➡️"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}