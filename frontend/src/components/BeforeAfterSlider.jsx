import React, { useState } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

export const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientPosition, rect) => {
    const x = clientPosition - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-300 font-semibold px-1">
        <span className="flex items-center gap-1.5 text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          Before (Initial Damage)
        </span>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          After (Verified Resolution)
        </span>
      </div>

      <div 
        className="relative w-full h-80 rounded-2xl overflow-hidden select-none border border-slate-700 shadow-2xl cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage || beforeImage} 
          alt="Resolved Issue" 
          className="absolute inset-0 w-full h-full object-cover" 
        />

        {/* Before Image (Clipped Foreground) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl transition-all duration-75"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Reported Issue" 
            className="absolute inset-0 w-full h-full object-cover max-w-none" 
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Center Divider Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Sliders className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-rose-300 font-medium border border-rose-500/30">
          BEFORE
        </div>
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-emerald-300 font-medium border border-emerald-500/30">
          AFTER (FIXED)
        </div>
      </div>
    </div>
  );
};

