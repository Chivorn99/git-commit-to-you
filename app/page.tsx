"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Camera, Calendar, Image as ImageIcon, Music } from "lucide-react";
import confetti from "canvas-confetti";
import DatePlanner from "./components/DatePlanner";
import PhotoBooth from "./components/PhotoBooth";

export default function Home() {
  const [activeTab, setActiveTab] = useState("story"); // 'story' | 'booth' | 'planner'
  const [isHappy, setIsHappy] = useState(false); // Did she say YES?
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  // --- LOGIC: The Tricky Button ---
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoBtnPosition({ x, y });
  };

  // --- LOGIC: She said YES ---
  const handleYesClick = () => {
    setIsHappy(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#ec4899', '#ffffff']
    });
    // Optional: Auto-scroll to planner or show a toast
  };

  return (
    <main className="min-h-screen bg-love-50 pb-24 relative overflow-x-hidden font-sans">
      
      {/* -----------------------------------------------------------------
          TAB 1: OUR STORY (The Scrollable Journey)
         ----------------------------------------------------------------- */}
      {activeTab === "story" && (
        <div className="flex flex-col gap-12 pt-10 px-4 max-w-md mx-auto">
          
          {/* HERO SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="inline-block p-3 rounded-full bg-white shadow-md mb-2">
              <span className="text-4xl">🐻</span>
            </div>
            <h1 className="text-4xl font-bold text-love-600 font-cute">
              Hi Beautiful!
            </h1>
            <p className="text-gray-500">
              I made this little place just for us. <br/> Scroll down... 👇
            </p>
          </motion.div>

          {/* MEMORY 1 */}
          <MemoryCard 
            date="Dec 2025"
            title="When we first met..."
            emoji="✨"
            desc="I still remember that day perfectly. You looked so cute in that outfit!"
            direction="left"
          />

          {/* MEMORY 2 (Add your own photo placeholder here) */}
          <MemoryCard 
            date="Jan 2026"
            title="Our Late Night Talks"
            emoji="🌙"
            desc="Staying up talking about everything and nothing. That's when I knew."
            direction="right"
          />

           {/* MEMORY 3 */}
           <MemoryCard 
            date="Today"
            title="Why I love you"
            emoji="💖"
            desc="Your smile, your laugh, and how you always support my coding projects."
            direction="left"
          />

          {/* THE BIG QUESTION (Visible at the bottom) */}
          <div className="py-12 pb-32">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center border-4 border-love-200"
            >
              {!isHappy ? (
                <>
                  <h2 className="text-3xl font-bold text-love-600 mb-6 font-cute">
                    So, I have a question...
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 font-medium">
                    Will you be my Valentine? 🌹
                  </p>
                  
                  <div className="flex justify-center gap-6 relative h-16">
                    <button
                      onClick={handleYesClick}
                      className="bg-love-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                    >
                      YES!
                    </button>
                    <motion.button
                      animate={noBtnPosition}
                      onHoverStart={moveNoButton}
                      onTapStart={moveNoButton}
                      className="bg-gray-200 text-gray-400 font-bold py-3 px-10 rounded-full absolute"
                    >
                      No
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Heart size={80} className="text-love-500 mx-auto animate-bounce" fill="currentColor" />
                  <h2 className="text-3xl font-bold text-love-600">Yay!!! 🎉</h2>
                  <p className="text-gray-600">You just made me the happiest guy!</p>
                  <button 
                    onClick={() => setActiveTab('planner')}
                    className="bg-love-600 text-white px-8 py-3 rounded-full font-bold shadow-lg animate-pulse"
                  >
                    Plan Our Date Now ➡️
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------
          TAB 2: PHOTO BOOTH
         ----------------------------------------------------------------- */}
      {activeTab === "booth" && (
        <div className="pt-10 px-4 h-full">
           <PhotoBooth />
        </div>
      )}

      {/* -----------------------------------------------------------------
          TAB 3: DATE PLANNER (Only if she said Yes)
         ----------------------------------------------------------------- */}
      {activeTab === "planner" && (
        <div className="pt-10 px-4 flex justify-center">
           <DatePlanner onComplete={() => setActiveTab('booth')} />
        </div>
      )}

      {/* -----------------------------------------------------------------
          BOTTOM NAVIGATION BAR
         ----------------------------------------------------------------- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-love-100 p-2 shadow-lg z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          
          <NavButton 
            active={activeTab === 'story'} 
            onClick={() => setActiveTab('story')} 
            icon={<ImageIcon size={24} />} 
            label="Our Story" 
          />

          <div className="relative -top-6">
            <button 
              onClick={() => setActiveTab('booth')}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 border-4 border-white
                ${activeTab === 'booth' ? 'bg-love-600 text-white' : 'bg-love-400 text-white'}`}
            >
              <Camera size={28} />
            </button>
          </div>

          <NavButton 
            active={activeTab === 'planner'} 
            onClick={() => isHappy ? setActiveTab('planner') : alert("You have to say YES first! 🤫")} 
            icon={<Calendar size={24} />} 
            label="Date Plan"
            locked={!isHappy}
          />
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS for Clean Code ---

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  locked?: boolean;
}

function NavButton({ active, onClick, icon, label, locked }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? 'text-love-600' : 'text-gray-400'}`}
    >
      <div className={locked ? "opacity-50" : ""}>{icon}</div>
      <span className="text-xs font-medium">{label}</span>
      {locked && <span className="absolute top-2 right-2 text-xs">🔒</span>}
    </button>
  );
}

interface MemoryCardProps {
  date: string;
  title: string;
  desc: string;
  emoji: string;
  direction: 'left' | 'right';
}

function MemoryCard({ date, title, desc, emoji, direction }: MemoryCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white p-6 rounded-2xl shadow-sm border border-love-100 flex gap-4 ${direction === 'right' ? 'flex-row-reverse text-right' : 'flex-row'}`}
    >
      <div className="text-4xl flex-shrink-0 flex items-center">{emoji}</div>
      <div>
        <span className="text-xs font-bold text-love-400 uppercase tracking-wider">{date}</span>
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}