"use client";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { toPng } from "html-to-image";
import { motion } from "framer-motion"; // We use this for DRAGGING!
import {
  Camera,
  Download,
  RefreshCcw,
  Sticker,
  Palette,
  X,
} from "lucide-react";

export default function PhotoBooth() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // EDITING STATE
  const [stickers, setStickers] = useState<
    { id: number; icon: string; x: number; y: number }[]
  >([]);
  const [filter, setFilter] = useState("none"); // none | sepia | grayscale | contrast

  const ref = useRef<HTMLDivElement>(null);

  // 1. Stickers Data
  const stickerOptions = ["🐻", "❤️", "🎀", "✨", "💋", "👑", "🔥", "🥰"];

  // 2. Camera Error Handling
  const handleCameraError = (error: string | DOMException) => {
    console.error("Camera Error:", error);
    setCameraError(
      "Camera permission denied or not available. Please allow camera access! (Note: Camera only works on HTTPS/Vercel)",
    );
  };

  // 3. Capture Logic
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
        triggerCapture();
      }
    }, 1000);
  };

  const triggerCapture = useCallback(() => {
    if (ref.current === null) return;
    setLoading(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    setTimeout(() => {
      // We capture JUST the video feed element initially
      const videoElement = ref.current?.querySelector("video");
      if (videoElement) {
        // Create a temporary canvas to grab the raw video frame
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext("2d")?.drawImage(videoElement, 0, 0);
        setImgSrc(canvas.toDataURL("image/jpeg"));
        setLoading(false);
      }
    }, 300);
  }, [ref]);

  // 4. Editor Functions
  const addSticker = (icon: string) => {
    const newSticker = {
      id: Date.now(),
      icon,
      x: 0, // Centered by default (logic handled by CSS)
      y: 0,
    };
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id: number) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  // 5. Final Download (Captures the DIV with Image + Stickers + Filters)
  const downloadFinalImage = () => {
    if (ref.current === null) return;

    setLoading(true);
    // Capture the entire Edited Div
    toPng(ref.current, { cacheBust: true, pixelRatio: 2 }) // pixelRatio 2 for high quality
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "our-valentine-date.png";
        link.href = dataUrl;
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const retake = () => {
    setImgSrc(null);
    setStickers([]);
    setFilter("none");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-love-600 mb-4 font-cute">
        {imgSrc ? "Decorate It! 🎨" : "Let's take a selfie! 📸"}
      </h2>

      {/* ERROR MESSAGE */}
      {cameraError && (
        <div className="bg-red-100 text-red-500 p-4 rounded-xl mb-4 text-sm text-center">
          {cameraError}
        </div>
      )}

      {/* --- THE BOOTH (VIEWPORT) --- */}
      <div
        ref={ref}
        className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-love-200"
      >
        {/* Flash Effect */}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300"></div>
        )}

        {/* Countdown */}
        {countdown !== null && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="text-9xl font-bold text-white animate-bounce">
              {countdown}
            </span>
          </div>
        )}

        {/* MAIN CONTENT */}
        {imgSrc ? (
          // --- EDITOR MODE ---
          <div
            className={`relative w-full h-full overflow-hidden filter-${filter}`}
          >
            {/* 1. The Captured Image */}
            <img
              src={imgSrc}
              alt="Captured"
              className={`w-full h-full object-cover ${filter === "sepia" ? "sepia-[.6]" : filter === "bw" ? "grayscale" : ""}`}
            />

            {/* 2. Draggable Stickers Layer */}
            {stickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                drag
                dragMomentum={false} // Stops it from sliding like ice
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 text-5xl cursor-move z-20 touch-none select-none"
                style={{ x: sticker.x, y: sticker.y }}
              >
                {sticker.icon}
                {/* Tiny delete button on sticker */}
                <button
                  onClick={() => removeSticker(sticker.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </motion.div>
            ))}

            {/* 3. Watermark */}
            <div className="absolute bottom-4 right-4 opacity-50 text-white text-xs font-bold drop-shadow-md pointer-events-none">
              Valentine 2026
            </div>
          </div>
        ) : (
          // --- CAMERA MODE ---
          <Webcam
            audio={false}
            onUserMediaError={handleCameraError} // Error handling
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        )}
      </div>

      {/* --- CONTROLS AREA --- */}
      <div className="mt-6 w-full px-4">
        {!imgSrc ? (
          // CAMERA CONTROLS
          <div className="flex justify-center">
            <button
              onClick={handleCaptureClick}
              disabled={loading || countdown !== null}
              className="flex items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95 disabled:bg-gray-400"
            >
              {countdown ? (
                "Ready..."
              ) : (
                <>
                  <Camera size={24} /> Snap!
                </>
              )}
            </button>
          </div>
        ) : (
          // EDITOR CONTROLS
          <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            {/* 1. Sticker Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-love-100">
              <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sticker size={12} /> Stickers (Click to Add)
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {stickerOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addSticker(emoji)}
                    className="text-2xl hover:scale-125 transition-transform p-2 bg-gray-50 rounded-lg min-w-[40px]"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Filter Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-love-100 flex justify-around">
              <button
                onClick={() => setFilter("none")}
                className={`text-sm font-bold ${filter === "none" ? "text-love-500" : "text-gray-400"}`}
              >
                Original
              </button>
              <button
                onClick={() => setFilter("sepia")}
                className={`text-sm font-bold ${filter === "sepia" ? "text-orange-400" : "text-gray-400"}`}
              >
                Vintage
              </button>
              <button
                onClick={() => setFilter("bw")}
                className={`text-sm font-bold ${filter === "bw" ? "text-gray-800" : "text-gray-400"}`}
              >
                B&W
              </button>
            </div>

            {/* 3. Action Buttons */}
            <div className="flex gap-4 justify-center mt-2">
              <button
                onClick={retake}
                className="flex-1 flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-3 rounded-xl transition-colors"
              >
                <RefreshCcw size={18} /> Retake
              </button>
              <button
                onClick={downloadFinalImage}
                className="flex-[2] flex justify-center items-center gap-2 bg-love-500 hover:bg-love-600 text-white font-bold py-3 rounded-xl shadow-lg animate-pulse"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Download size={18} /> Save Memory
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
