"use client";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { toPng } from "html-to-image";
import { Camera, Download, RefreshCcw, Heart } from "lucide-react";

export default function PhotoBooth() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 1. Capture Logic
  const capture = useCallback(() => {
    if (ref.current === null) return;
    setLoading(true);

    // Small delay to ensure stickers are rendered before capture
    setTimeout(() => {
        toPng(ref.current!, { cacheBust: true })
        .then((dataUrl) => {
            setImgSrc(dataUrl);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, 100);
  }, [ref]);

  // 2. Download Logic
  const downloadImage = () => {
    if (!imgSrc) return;
    const link = document.createElement("a");
    link.download = "our-valentine-date.png";
    link.href = imgSrc;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-love-600 mb-4 font-cute">
        Let&apos;s take a selfie! 📸
      </h2>

      {/* THE BOOTH (This entire div gets captured) */}
      <div 
        ref={ref} 
        className="relative w-full aspect-[3/4] bg-love-50 border-8 border-love-300 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* A. The Camera / Photo Layer */}
        {imgSrc ? (
          <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }} // Use front camera
            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
          />
        )}

        {/* B. The Stickers / Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* Top Date Stamp */}
            <div className="absolute top-4 left-0 w-full text-center">
                <span className="bg-white/80 px-4 py-1 rounded-full text-love-500 font-bold text-sm shadow-sm">
                    Feb 14, 2026 💖
                </span>
            </div>

            {/* Floating Hearts/Emojis */}
            <div className="absolute top-4 right-4 text-3xl animate-bounce">🐻</div>
            <div className="absolute bottom-16 left-4 text-4xl">🥰</div>
            
            {/* Cute Border Frame */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-2xl m-2"></div>
            
            {/* Bottom Message */}
            <div className="absolute bottom-4 w-full text-center">
                <span className="text-white font-bold text-shadow-lg text-xl drop-shadow-md">
                    She said YES!
                </span>
            </div>
        </div>
      </div>

      {/* C. Controls */}
      <div className="mt-6 flex gap-4">
        {!imgSrc ? (
            <button
            onClick={capture}
            disabled={loading}
            className="flex items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
            {loading ? "Snapping..." : <><Camera size={24} /> Snap!</>}
            </button>
        ) : (
            <>
            <button
                onClick={() => setImgSrc(null)}
                className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            >
                <RefreshCcw size={20} /> Retake
            </button>
            <button
                onClick={downloadImage}
                className="flex items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-6 rounded-full shadow-lg animate-pulse"
            >
                <Download size={20} /> Save Photo
            </button>
            </>
        )}
      </div>
    </div>
  );
}