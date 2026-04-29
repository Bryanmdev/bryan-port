"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, ShieldCheck, Palette, Sparkles, Layout } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Hero({ onOpenContact, lang }: { onOpenContact: () => void, lang: 'pt' | 'en' }) {
  const [hoverState, setHoverState] = useState<"none" | "left" | "right">("none");

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only apply hover split logic on desktop
    if (window.innerWidth < 768) return;
    
    const { clientX } = e;
    const width = window.innerWidth;
    if (clientX < width / 2) {
      setHoverState("left");
    } else {
      setHoverState("right");
    }
  };

  return (
    <section 
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc] px-4 pt-20 pb-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverState("none")}
    >
      
      {/* Background container split */}
      <div className="absolute inset-0 flex w-full h-full -z-20 pointer-events-none">
        <div className={`w-1/2 h-full transition-colors duration-700 ${hoverState === 'left' ? 'bg-slate-200' : 'bg-[#f1f5f9]'}`}></div>
        <div className={`w-1/2 h-full transition-colors duration-700 ${hoverState === 'right' ? 'bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#fce7f3]' : 'bg-[#f8fafc]'}`}></div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center z-10 relative">
        
        {/* Left Side: The Logical Engineer */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-end text-center md:text-right pr-0 md:pr-8 cursor-default pointer-events-none md:pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className={`font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${hoverState === 'left' ? 'text-slate-900' : 'text-slate-400'}`}>
              {lang === 'pt' ? 'O Engenheiro' : 'The Engineer'}
            </h2>
            <p className="text-slate-600 max-w-sm mb-8 text-lg font-mono">
              {lang === 'pt' ? 'Lógica, arquitetura, e sistemas escaláveis. Código limpo e performance absurda.' : 'Logic, architecture, and scalable systems. Clean code and peak performance.'}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full mt-4">
              {[
                { icon: Code2, label: "Full-Stack" },
                { icon: Database, label: lang === 'pt' ? "Arquitetura" : "Architecture" },
                { icon: ShieldCheck, label: lang === 'pt' ? "Segurança" : "Security" }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-1.5 border px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm backdrop-blur-md transition-all duration-300 ${hoverState === 'left' ? 'bg-white/90 border-slate-300 scale-105' : 'bg-white/50 border-slate-100'}`}>
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500" />
                  <span className="font-semibold text-slate-700 text-[11px] md:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center: The Split Portrait */}
        <div className="order-1 md:order-2 flex justify-center items-center relative h-[400px] sm:h-[500px] md:h-[600px] w-full max-w-[400px] mx-auto pointer-events-none md:pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 bg-slate-100"
          >
            {/* Base normal image */}
            <img 
              src="/base_portrait.png" 
              alt="Bryan Miranda" 
              className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500" 
            />
            
            {/* Left side robotic (Perfect alignment via CSS + Overlays) */}
            <div 
              className="absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none group overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 46% 0, 46% 100%, 0 100%)',
                opacity: hoverState === 'left' ? 1 : 0
              }}
            >
              {/* Base image with metallic blue filter */}
              <img 
                src="/base_portrait.png" 
                alt="Bryan Miranda Engineer" 
                className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.8] sepia-[0.4] hue-rotate-[190deg] saturate-[2]" 
              />
              
              {/* Cybernetic Tech Grid Overlay */}
              <div 
                className="absolute inset-0 mix-blend-color-dodge opacity-60"
                style={{
                  backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              ></div>

              {/* Glowing Scanner Line via Framer Motion */}
              <motion.div 
                animate={{ y: [0, 600, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_15px_3px_rgba(56,189,248,0.8)] mix-blend-screen opacity-80"
              />
              
              {/* Cybernetic code overlay text */}
              <div className="absolute left-4 top-1/4 text-sky-400 font-mono text-xs opacity-50 tracking-widest leading-loose mix-blend-screen">
                <p>SYS.INIT_</p>
                <p>NEURAL_LINK: OK</p>
                <p>OVERRIDE_AUTH</p>
                <p>_LOGIC_CORE_01</p>
              </div>
            </div>
            
            {/* Right side painted image (Enhanced with motion & glow) */}
            <div 
              className="absolute inset-0 z-20 transition-opacity duration-500 pointer-events-none overflow-hidden"
              style={{
                clipPath: 'polygon(46% 0, 100% 0, 100% 100%, 46% 100%)',
                opacity: hoverState === 'right' ? 1 : 0
              }}
            >
              <img 
                src="/painted_portrait.png" 
                alt="Bryan Miranda Artist" 
                className="w-full h-full object-cover filter contrast-[1.05]" 
              />
              
              {/* Floating abstract glowing orbs */}
              <motion.div 
                animate={{ 
                  x: [0, 20, 0, -20, 0],
                  y: [0, -30, 0, 20, 0],
                  scale: [1, 1.1, 1, 0.9, 1] 
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute -right-20 top-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px] mix-blend-screen"
              />
              <motion.div 
                animate={{ 
                  x: [0, -30, 0, 20, 0],
                  y: [0, 40, 0, -20, 0],
                  scale: [1, 1.2, 1, 0.8, 1] 
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute right-20 bottom-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-[80px] mix-blend-screen"
              />

              {/* Creative typography overlay */}
              <div className="absolute right-6 bottom-10 text-right font-syne text-white/60 tracking-widest leading-loose mix-blend-overlay">
                <p className="text-xl font-bold">VIBRANT</p>
                <p className="text-sm">EMOTIONAL_DESIGN</p>
                <p className="text-xs opacity-50">ABSTRACT_CORE</p>
              </div>
            </div>
            
            {/* Center Line that only appears on hover */}
            <div className={`absolute top-0 bottom-0 left-[46%] w-[2px] bg-white/50 -translate-x-1/2 z-30 transition-opacity duration-500 ${hoverState !== 'none' ? 'opacity-100' : 'opacity-0'}`}></div>
          </motion.div>
        </div>

        {/* Right Side: The Creative Artist */}
        <div className="order-3 md:order-3 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-8 cursor-default pointer-events-none md:pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className={`font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-300 ${hoverState === 'right' ? 'gradient-text-art' : 'text-slate-400'}`}>
              {lang === 'pt' ? 'O Artista' : 'The Artist'}
            </h2>
            <p className="text-slate-600 max-w-sm mb-8 text-lg">
              {lang === 'pt' ? 'Design emocional, micro-interações e interfaces que conectam com os usuários.' : 'Emotional design, micro-interactions and interfaces that connect with users.'}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full mt-4">
              {[
                { icon: Palette, label: "UI/UX", color: "text-pink-500" },
                { icon: Layout, label: "Motion", color: "text-purple-500" },
                { icon: Sparkles, label: "Design", color: "text-blue-500" }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-1.5 border px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm backdrop-blur-md transition-all duration-300 ${hoverState === 'right' ? 'bg-white/90 border-slate-300 scale-105' : 'bg-white/50 border-slate-100'}`}>
                  <item.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${item.color}`} />
                  <span className="font-semibold text-slate-700 text-[11px] md:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative md:absolute mt-12 md:mt-0 bottom-auto md:bottom-8 left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-40 w-full px-4 md:px-0"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto">
          <a href="#projects" className="w-full sm:w-auto font-syne flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3.5 sm:py-3 rounded-full font-bold text-[15px] sm:text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20">
            {lang === 'pt' ? 'Ver Projetos' : 'View Projects'}
            <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={onOpenContact} className="w-full sm:w-auto font-syne flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-slate-100 text-slate-900 px-6 sm:px-8 py-3.5 sm:py-3 rounded-full font-bold text-[15px] sm:text-base transition-all transform hover:scale-105 active:scale-95 shadow-sm border border-slate-200">
            {lang === 'pt' ? 'Vamos Conversar' : "Let's Talk"}
          </button>
        </div>
      </motion.div>

    </section>
  );
}

