"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Delete } from "lucide-react";

interface PasscodeProps {
  onUnlock: () => void;
}

export default function Passcode({ onUnlock }: PasscodeProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  
  // 🎂 HER BIRTHDAY PASSCODE (Dec 21)
  const CORRECT_CODE = "1221"; 

  const handlePress = (num: string) => {
    if (input.length < 4) {
      const newInput = input + num;
      setInput(newInput);
      
      // Auto-submit when 4 digits are reached
      if (newInput.length === 4) {
        checkCode(newInput);
      }
    }
  };

  const checkCode = (code: string) => {
    if (code === CORRECT_CODE) {
      onUnlock(); // Success!
    } else {
      setError(true);
      setTimeout(() => {
        setInput("");
        setError(false);
      }, 500); // Clear after shake
    }
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-love-50/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
            scale: 1, 
            opacity: 1,
            x: error ? [0, -10, 10, -10, 10, 0] : 0 // Shake effect
        }}
        className="bg-white/90 shadow-2xl rounded-3xl p-8 w-full max-w-sm border-2 border-white/50"
      >
        <div className="text-center mb-8">
          <div className="mx-auto bg-love-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-love-500 animate-bounce">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-love-600 font-cute">
            Security Check 🔒
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your birthday to unlock <br/>
            输入你的生日解锁 🎂
          </p>
        </div>

        {/* DOTS DISPLAY */}
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                input.length > i 
                  ? "bg-love-500 scale-110 shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* ERROR MESSAGE */}
        <div className="h-6 text-center mb-4">
            {error && (
                <p className="text-red-400 text-xs font-bold animate-pulse">
                    Oops! Wrong Passcode! 密码不对哦 🥺
                </p>
            )}
        </div>

        {/* KEYPAD */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num.toString())}
              className="w-full aspect-square rounded-2xl bg-love-50 hover:bg-love-100 text-love-600 text-2xl font-bold transition-transform active:scale-95 shadow-sm"
            >
              {num}
            </button>
          ))}
          
          {/* Empty Space */}
          <div className="w-full aspect-square"></div>

          <button
            onClick={() => handlePress("0")}
            className="w-full aspect-square rounded-2xl bg-love-50 hover:bg-love-100 text-love-600 text-2xl font-bold transition-transform active:scale-95 shadow-sm"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="w-full aspect-square rounded-2xl bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            <Delete size={24} />
          </button>
        </div>

      </motion.div>
    </div>
  );
}