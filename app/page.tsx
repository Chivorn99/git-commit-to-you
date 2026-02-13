"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Camera,
  Calendar,
  Image as ImageIcon,
  Music,
} from "lucide-react";
import confetti from "canvas-confetti";
import DatePlanner from "./components/DatePlanner";
import PhotoBooth from "./components/PhotoBooth";
import Passcode from "./components/Passcode";

export default function Home() {
  const [activeTab, setActiveTab] = useState("story"); // 'story' | 'booth' | 'planner'
  const [isHappy, setIsHappy] = useState(false); // Did she say YES?
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(true);

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
      colors: ["#38bdf8", "#ec4899", "#ffffff"],
    });
    // Optional: Auto-scroll to planner or show a toast
  };

  return (
    <main className="min-h-screen bg-love-50 pb-24 relative overflow-x-hidden font-sans">
      {/* --- THE GATEKEEPER --- */}
      {isLocked ? (
        <Passcode onUnlock={() => setIsLocked(false)} />
      ) : (
        <>
          {/* -----------------------------------------------------------------
              TAB 1: OUR STORY (The Scrollable Journey)
             ----------------------------------------------------------------- */}
          {activeTab === "story" && (
        <div className="relative pt-10 px-4 max-w-md mx-auto">
          <div className="flex flex-col gap-16 relative z-10">
            {/* HERO SECTION */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 mb-8"
            >
              <div className="inline-block p-4 rounded-full bg-white shadow-xl mb-2 animate-bounce">
                <span className="text-5xl">🐻</span>
              </div>
              <h1 className="text-4xl font-bold text-love-600 font-cute drop-shadow-sm">
                Hi Beautiful!
              </h1>
              <p className="text-gray-500 italic">
                I made this little place just for us. <br /> Our 6-year journey,
                just a scroll away... 👇
              </p>
            </motion.div>

            {/* CARD 1: THE BEGINNING */}
            <MemoryCard
              date="2020 • The Beginning"
              title="First Impression 初次见面"
              emoji="🏫"
              desc="Thinking back to 6 years ago... I never thought you'd be my everything. 那时候的你，真的好可爱！"
              direction="left"
              image="/memories/first-met.jpg" // Make sure this file exists!
            />

            {/* CARD 2: THE SPARK */}
            <MemoryCard
              date="The Spark ✨"
              title="Crushing on You"
              emoji="🦋"
              desc="Every time you messaged me, my heart went 'badump'. 每次收到你的信息，我都偷偷开心好久。"
              direction="right"
              // If you don't have an image for this one, you can remove the line below
              image="/memories/crush.jpg"
            />

            {/* CARD 3: OFFICIAL */}
            <MemoryCard
              date="Dec 2025 • Official"
              title="Finally Us 终于在一起"
              emoji="💑"
              desc="The best 'Yes' I ever heard. From friends to lovers. 谢谢你愿意做我的女朋友。"
              direction="left"
              image="/memories/official1.jpg"
            />

            {/* CARD 4: LATE NIGHTS */}
            <MemoryCard
              date="Daily Life"
              title="Late Night Talks 熬夜聊天"
              emoji="🌙"
              desc="Staying up till 3 AM just to hear your voice. 哪怕什么都不说，只要你在就好。You are my safe space."
              direction="right"
              image="/memories/calls.jpg"
            />

            {/* CARD 5: SKIING */}
            <MemoryCard
              date="Snowy Adventure ❄️"
              title="Skiing Trip 滑雪日"
              emoji="⛷️"
              desc="Remember how many times we fell? 😂 But falling for you was the easiest part. 摔倒也不怕，因为有你拉着我。"
              direction="left"
              image="/memories/skiing.jpg"
            />

            {/* CARD 6: ZIPLINING */}
            <MemoryCard
              date="Adrenaline Rush"
              title="Ziplining 高空滑索"
              emoji="🌲"
              desc="Screaming our lungs out but feeling so alive! You were so brave. 哪怕尖叫也要牵着手，飞过丛林！"
              direction="right"
              image="/memories/zipline.jpg"
            />

            {/* CARD 7: BEACH */}
            <MemoryCard
              date="Relaxing"
              title="Beach Day 海边时光"
              emoji="🏖️"
              desc="Sun, sand, and you. Nothing beats chilling by the sea with my favorite person. 和你在海边吹风，就是最舒服的时候。"
              direction="left"
              image="/memories/beach.jpg"
            />

            {/* CARD 8: KAMPOT */}
            <MemoryCard
              date="Getaway"
              title="Kampot Trip 贡布之旅"
              emoji="🛶"
              desc="Slow life by the river. Eating durian and watching the sunset. 贡布的慢生活，有你在身边真好。"
              direction="right"
              image="/memories/kampot.jpg"
            />

            {/* MEMORY: Movie Night */}
            <MemoryCard
              date="Movie Nights"
              title="Our Cinema Time 🍿"
              emoji="🎬"
              desc="Honestly, I don't even remember the 电影 (movie) plot... I was too busy looking at you. You have that 氛围感 (vibe) that makes every moment feel so 浪漫 (romantic)."
              direction="left"
              image="/memories/movie-date.jpg"
            />

            {/* MEMORY: Food Time */}
            <MemoryCard
              date="Always Hungry"
              title="Our Foodie Adventures 🍜"
              emoji="🥢"
              desc="You are my favorite 干饭人 (foodie partner). Whether it's a fancy dinner or just late-night snacks, everything tastes 100x better with you. Seeing you eat happily is my definition of 幸福 (happiness). My little 吃货 (foodie), let's eat everything together forever!"
              direction="right"
              image="/memories/food-date.jpg"
            />

            {/* MEMORY: Cafe Time */}
            <MemoryCard
              date="Cafe Hopping"
              title="Coffee & You ☕"
              emoji="🍰"
              desc="Every cafe we visit becomes my favorite spot because you're there. You're the queen of 氛围感 (vibe), and I'm just your private 摄影师 (photographer). I don't need sugar in my 咖啡 (coffee) because you're already 甜度超标 (too sweet). Let's 打卡 (check-in) at every cute cafe in the city together!"
              direction="left"
              image="/memories/cafe-date.jpg"
            />

            {/* THE CHINESE MESSAGE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-love-200 text-left space-y-4 shadow-xl relative overflow-hidden"
            >
              {/* Decorative corner heart */}
              <Heart
                className="absolute -top-4 -right-4 text-love-100 w-24 h-24 rotate-12"
                fill="currentColor"
              />

              <div className="relative z-10">
                {/* Changed h-56 to aspect-[5/4] to match your 2000x1600 image ratio */}
                <div className="w-full aspect-[5/4] bg-white rounded-2xl overflow-hidden shadow-inner border-8 border-white -rotate-1 mb-6">
                  <Image
                    src="/memories/us-main.png"
                    alt="My Treasure"
                    width={2000} // Updated to your real dimensions
                    height={1600} // Updated to your real dimensions
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💌</span>
                  <span className="font-bold text-love-600 uppercase tracking-widest text-xs bg-love-50 px-3 py-1 rounded-full">
                    To My Little Fairy
                  </span>
                </div>

                <p className="text-gray-700 leading-loose font-medium font-cute text-base">
                  我的小仙女 🧚‍♀️🩵，
                  <br />
                  <br />
                  转眼认识六年了，我居然到现在才把你这颗“宝藏” 💎 挖到手！
                  这五个月以来，你简直就是我生活里的 <strong>YYDS</strong>{" "}
                  ☁️，每次看到你，我都觉得甜度爆表 🍬💙。
                  <br />
                  <br />
                  虽然我们是“老熟人”了，但在你面前，我依然是那个动不动就心跳加速的“心动男嘉宾”
                  💓🦋。 谢谢你愿意从最好的朋友变身成我的小祖宗
                  👑🧊，接下来的日子，我会一直宠着你。
                  <br />
                  <br />
                  <span className="font-bold text-love-500 block text-center text-xl mt-6 border-t border-love-100 pt-4">
                    宝贝，情人节快乐，爱你哟！ <br /> 🐻🩵✨
                  </span>
                </p>
              </div>
            </motion.div>

            {/* PROPOSAL SECTION */}
            {/* ... keep your existing 'The Big Question' logic here ... */}
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
                        className="bg-gray-200 text-gray-400 font-bold py-3 px-10 rounded-full"
                      >
                        No
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Heart
                      size={80}
                      className="text-love-500 mx-auto animate-bounce"
                      fill="currentColor"
                    />
                    <h2 className="text-3xl font-bold text-love-600">
                      Yay!!! 🎉
                    </h2>
                    <p className="text-gray-600">
                      You just made me the happiest guy!
                    </p>
                    <button
                      onClick={() => setActiveTab("planner")}
                      className="bg-love-600 text-white px-8 py-3 rounded-full font-bold shadow-lg animate-pulse"
                    >
                      Plan Our Date Now ➡️
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
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
          <DatePlanner onComplete={() => setActiveTab("booth")} />
        </div>
      )}

      {/* -----------------------------------------------------------------
          BOTTOM NAVIGATION BAR
         ----------------------------------------------------------------- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-love-100 p-2 shadow-lg z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <NavButton
            active={activeTab === "story"}
            onClick={() => setActiveTab("story")}
            icon={<ImageIcon size={24} />}
            label="Our Story"
          />

          <div className="relative -top-6">
            <button
              onClick={() => setActiveTab("booth")}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 border-4 border-white
                ${activeTab === "booth" ? "bg-love-600 text-white" : "bg-love-400 text-white"}`}
            >
              <Camera size={28} />
            </button>
          </div>

          <NavButton
            active={activeTab === "planner"}
            onClick={() =>
              isHappy
                ? setActiveTab("planner")
                : alert("You have to say YES first! 🤫")
            }
            icon={<Calendar size={24} />}
            label="Date Plan"
            locked={!isHappy}
          />
        </div>
      </div>
        </>
      )}
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
      className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? "text-love-600" : "text-gray-400"}`}
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
  direction: "left" | "right";
  image?: string; // New: Optional image path
}

function MemoryCard({
  date,
  title,
  desc,
  emoji,
  direction,
  image,
}: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col gap-4 w-full ${
        direction === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* The "Vine" Node - The little heart on the timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-4 h-4 bg-love-300 rounded-full border-4 border-white shadow-sm z-10 hidden md:block">
        <Heart
          size={8}
          className="text-white fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div
        className={`bg-white p-4 rounded-2xl shadow-sm border border-love-100 w-[90%] md:w-[80%] relative z-20`}
      >
        {/* Photo Section */}
        {image && (
          <div className="mb-4 overflow-hidden rounded-xl border-4 border-white shadow-md rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
            <Image
              src={image}
              alt={title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div
          className={`flex gap-3 ${direction === "right" ? "flex-row-reverse" : "flex-row"}`}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="text-3xl shrink-0 cursor-default"
          >
            {emoji}
          </motion.div>
          <div>
            <span className="text-[10px] font-bold text-love-400 uppercase tracking-widest bg-love-50 px-2 py-0.5 rounded-full">
              {date}
            </span>
            <h3 className="font-bold text-gray-800 text-lg mt-1">{title}</h3>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed italic">
              &quot;{desc}&quot;
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
