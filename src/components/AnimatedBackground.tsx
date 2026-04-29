"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  // Generate random "pixels" for the background
  const pixels = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 15,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[#eef2f6]">
      {/* Blueprint / Tech Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.1]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #0ea5e9 1px, transparent 1px),
            linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Floating Game Pixels */}
      {pixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 0.4, 0.8, 0.4, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: pixel.duration, 
            repeat: Infinity, 
            // Negative delay forces the animation to start midway, so they are already on screen!
            delay: -pixel.delay * 2,
            ease: "linear"
          }}
          className="absolute rounded-md"
          style={{
            left: `${pixel.x}vw`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            backgroundColor: pixel.id % 3 === 0 ? "#0ea5e9" : pixel.id % 2 === 0 ? "#a855f7" : "#cbd5e1",
            boxShadow: `0 0 10px ${pixel.id % 3 === 0 ? "rgba(14,165,233,0.5)" : "rgba(168,85,247,0.3)"}`
          }}
        />
      ))}

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
    </div>
  );
}
