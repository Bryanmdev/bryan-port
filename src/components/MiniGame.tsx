"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Rocket, Footprints, Car, Play } from "lucide-react";
import { SpaceShooter } from "./games/SpaceShooter";
import { Platformer } from "./games/Platformer";
import { CarRacing } from "./games/CarRacing";

export function MiniGame({ lang }: { lang: 'pt' | 'en' }) {
  const [activeGame, setActiveGame] = useState<"platformer" | "shooter" | "racing">("platformer");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="arcade" className="py-24 px-4 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-sm mb-6 shadow-sm border border-slate-200">
          <Gamepad2 className="w-5 h-5" />
          Arcade Zone
        </div>
        <h3 className="font-syne text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          {lang === 'pt' ? 'Lógica na Prática.' : 'Logic in Practice.'}
        </h3>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
          {lang === 'pt' 
            ? 'Embora meu foco seja arquitetura Full-Stack, a melhor forma de dominar lógica complexa e otimização de performance é desenvolvendo motores do zero. Divirta-se!'
            : 'Although my focus is Full-Stack architecture, the best way to master complex logic and performance optimization is by developing engines from scratch. Have fun!'}
        </p>
      </motion.div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200 p-4 md:p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Game Tabs */}
        <div className="flex flex-wrap justify-center bg-slate-100 p-2 rounded-full mb-8 shadow-inner gap-2">
          <button 
            onClick={() => { setActiveGame("platformer"); setIsPlaying(false); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              activeGame === "platformer" ? "bg-white text-slate-900 shadow-md scale-105" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Footprints className="w-5 h-5" />
            Curriculum Jump
          </button>
          <button 
            onClick={() => { setActiveGame("shooter"); setIsPlaying(false); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              activeGame === "shooter" ? "bg-slate-900 text-white shadow-md scale-105" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Rocket className="w-5 h-5" />
            Space Bug Shooter
          </button>
          <button 
            onClick={() => { setActiveGame("racing"); setIsPlaying(false); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              activeGame === "racing" ? "bg-blue-600 text-white shadow-md scale-105" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Car className="w-5 h-5" />
            High Speed
          </button>
        </div>

        {/* Console Screen */}
        <div className="w-full flex justify-center items-center bg-slate-900 p-2 sm:p-4 rounded-3xl shadow-2xl overflow-hidden relative min-h-[450px]">
          {/* Mobile Warning Overlay */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6 text-center lg:hidden">
            <Gamepad2 className="w-12 h-12 text-slate-400 mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">{lang === 'pt' ? 'Experiência Desktop' : 'Desktop Experience'}</h4>
            <p className="text-slate-400 text-sm">{lang === 'pt' ? 'A engine gráfica deste minigame requer um teclado (WASD ou Setas) para jogar. Acesse pelo computador para testar a performance.' : 'The graphics engine for this minigame requires a keyboard (WASD or Arrows) to play. Access via desktop to test its performance.'}</p>
          </div>

          {!isPlaying ? (
            <div className="flex flex-col items-center justify-center text-white z-10 w-full h-full min-h-[400px]">
              <div className="bg-white/10 p-6 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                {activeGame === "platformer" && <Footprints className="w-16 h-16 text-slate-300" />}
                {activeGame === "shooter" && <Rocket className="w-16 h-16 text-slate-300" />}
                {activeGame === "racing" && <Car className="w-16 h-16 text-slate-300" />}
              </div>
              <h4 className="font-syne text-3xl font-bold mb-2">
                {activeGame === "platformer" && "Curriculum Jump"}
                {activeGame === "shooter" && "Space Bug Shooter"}
                {activeGame === "racing" && "High Speed"}
              </h4>
              <p className="text-slate-400 mb-8 max-w-sm text-center">
                {lang === 'pt' ? 'Clique abaixo para iniciar o motor gráfico e carregar o jogo.' : 'Click below to start the graphics engine and load the game.'}
              </p>
              <button 
                onClick={() => setIsPlaying(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
              >
                <Play className="w-6 h-6 fill-white" />
                <span>{lang === 'pt' ? 'INICIAR SESSÃO' : 'START SESSION'}</span>
              </button>
            </div>
          ) : (
            <>
              {activeGame === "platformer" && <Platformer />}
              {activeGame === "shooter" && <SpaceShooter />}
              {activeGame === "racing" && <CarRacing />}
            </>
          )}
        </div>
        
        <div className="mt-6 text-slate-500 text-sm font-medium flex gap-4 text-center">
          <span>{lang === 'pt' ? 'Controles:' : 'Controls:'} <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-mono shadow-sm">W A S D</kbd> {lang === 'pt' ? 'ou Setas' : 'or Arrows'}</span>
          <span>{lang === 'pt' ? 'Ações:' : 'Actions:'} <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-mono shadow-sm">{lang === 'pt' ? 'Espaço' : 'Space'}</kbd></span>
        </div>

      </div>
    </section>
  );
}
