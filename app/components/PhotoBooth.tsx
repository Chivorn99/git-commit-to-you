"use client";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { toPng } from "html-to-image";
import { Camera, Download, RefreshCcw } from "lucide-react";

export default function PhotoBooth() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null); // 3, 2, 1...
  const [flash, setFlash] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // 1. Capture Logic with Countdown
  const handleCaptureClick = () => {
    setCountdown(3);
    let count = 3;

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        triggerCapture(); // Take the photo!
      }
    }, 1000);
  };

  const triggerCapture = useCallback(() => {
    if (ref.current === null) return;
    setLoading(true);
    setFlash(true); // Trigger white flash

    // Remove flash class after animation
    setTimeout(() => setFlash(false), 200);

    // Small delay to let flash fade before grabbing image
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
    }, 300);
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

      {/* THE BOOTH CONTAINER */}
      <div
        ref={ref}
        className="relative w-full aspect-[3/4] bg-love-50 border-8 border-love-300 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* FLASH OVERLAY */}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300 pointer-events-none"></div>
        )}

        {/* COUNTDOWN OVERLAY */}
        {countdown !== null && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <span className="text-9xl font-bold text-white drop-shadow-lg animate-bounce">
              {countdown}
            </span>
          </div>
        )}

        {/* A. The Camera / Photo Layer */}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        ) : (
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        )}

        {/* B. The Stickers / Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top Date Stamp */}
          <div className="absolute top-4 left-0 w-full text-center">
            <span className="bg-white/80 px-4 py-1 rounded-full text-love-500 font-bold text-sm shadow-sm border border-love-200">
              Feb 14, 2026 💖
            </span>
          </div>

          {/* Floating Stickers */}
          <div className="absolute top-4 right-4 text-4xl animate-pulse">
            🐻
          </div>
          <div className="absolute bottom-20 left-4 text-4xl">🥰</div>
          <div className="absolute top-1/2 right-2 text-2xl rotate-12">✨</div>

          {/* Cute Border Frame */}
          <div className="absolute inset-0 border-[6px] border-white/40 rounded-2xl m-3 pointer-events-none"></div>

          {/* Bottom Message */}
          <div className="absolute bottom-5 w-full text-center">
            <span className="text-white font-bold text-shadow-lg text-2xl drop-shadow-md font-cute">
              She said YES!
            </span>
          </div>
        </div>
      </div>

      {/* C. Controls */}
      <div className="mt-6 flex gap-4">
        {!imgSrc ? (
          <button
            onClick={handleCaptureClick} // Uses the new countdown logic
            disabled={loading || countdown !== null}
            className="flex items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-10 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 disabled:bg-gray-400"
          >
            {countdown !== null ? (
              "Get Ready..."
            ) : loading ? (
              "Processing..."
            ) : (
              <>
                <Camera size={24} /> Snap!
              </>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={() => setImgSrc(null)}
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <RefreshCcw size={20} /> Retake
            </button>
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-3 px-6 rounded-full shadow-lg animate-pulse transition-transform hover:scale-105"
            >
              <Download size={20} /> Save Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
