"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export function CarRacing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameState = useRef({
    player: { x: 180, y: 380, width: 40, height: 70, speed: 6 },
    enemies: [] as { x: number; y: number; width: number; height: number; speed: number; color: string }[],
    lines: [0, 100, 200, 300, 400], // Background road lines
    lastEnemySpawn: 0,
    keys: {} as Record<string, boolean>,
    score: 0,
    animationFrameId: 0,
    speedMultiplier: 1
  });

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    gameState.current = {
      ...gameState.current,
      player: { x: 180, y: 380, width: 40, height: 70, speed: 6 },
      enemies: [],
      lines: [-100, 0, 100, 200, 300, 400, 500],
      lastEnemySpawn: performance.now(),
      score: 0,
      speedMultiplier: 1
    };
    if (canvasRef.current) canvasRef.current.focus();
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const update = (time: number) => {
      const state = gameState.current;
      
      // Increase speed over time
      state.speedMultiplier += 0.0005;

      // Controls
      if (state.keys["ArrowLeft"] || state.keys["a"]) state.player.x -= state.player.speed;
      if (state.keys["ArrowRight"] || state.keys["d"]) state.player.x += state.player.speed;
      if (state.keys["ArrowUp"] || state.keys["w"]) state.player.y -= state.player.speed;
      if (state.keys["ArrowDown"] || state.keys["s"]) state.player.y += state.player.speed;

      // Bounds
      state.player.x = Math.max(20, Math.min(canvas.width - 20 - state.player.width, state.player.x));
      state.player.y = Math.max(20, Math.min(canvas.height - 20 - state.player.height, state.player.y));

      // Draw Grass and Road
      ctx.fillStyle = "#166534"; // grass
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#334155"; // road
      ctx.fillRect(40, 0, canvas.width - 80, canvas.height);

      // Animate lines
      ctx.fillStyle = "#facc15";
      state.lines.forEach((lineY, idx) => {
        state.lines[idx] += 5 * state.speedMultiplier;
        if (state.lines[idx] > canvas.height) state.lines[idx] = -100;
        ctx.fillRect(canvas.width / 2 - 5, state.lines[idx], 10, 50);
      });

      // Spawn Enemies
      if (time - state.lastEnemySpawn > 1000 / state.speedMultiplier) {
        const lane = Math.random() > 0.5 ? 1 : 0;
        const eWidth = 40;
        const eHeight = 70;
        const xPos = lane === 0 ? Math.random() * 100 + 50 : Math.random() * 100 + 200;
        
        state.enemies.push({
          x: xPos,
          y: -100,
          width: eWidth,
          height: eHeight,
          speed: (Math.random() * 3 + 4) * state.speedMultiplier,
          color: ["#ef4444", "#f97316", "#eab308", "#0ea5e9"][Math.floor(Math.random() * 4)]
        });
        state.lastEnemySpawn = time;
      }

      // Update and Draw Enemies
      state.enemies.forEach((en, idx) => {
        en.y += en.speed;
        
        // Draw Enemy Car
        ctx.fillStyle = en.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.fillRect(en.x, en.y, en.width, en.height);
        // Windows
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(en.x + 5, en.y + 10, en.width - 10, 15);
        ctx.fillRect(en.x + 5, en.y + en.height - 25, en.width - 10, 15);

        // Check Collision
        if (state.player.x < en.x + en.width && state.player.x + state.player.width > en.x &&
            state.player.y < en.y + en.height && state.player.y + state.player.height > en.y) {
          setIsGameOver(true);
          setIsPlaying(false);
        }

        // Remove if passed
        if (en.y > canvas.height) {
          state.enemies.splice(idx, 1);
          state.score += 10;
          setScore(state.score);
        }
      });

      // Draw Player Car
      ctx.fillStyle = "#3b82f6"; // blue player car
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#3b82f6";
      ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
      ctx.shadowBlur = 0;
      // Windows
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(state.player.x + 5, state.player.y + 10, state.player.width - 10, 15);
      ctx.fillRect(state.player.x + 5, state.player.y + state.player.height - 25, state.player.width - 10, 15);

      if (isPlaying && !isGameOver) {
        state.animationFrameId = requestAnimationFrame(update);
      }
    };

    gameState.current.animationFrameId = requestAnimationFrame(update);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      gameState.current.keys[key] = true;
      gameState.current.keys[e.key] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.current.keys[e.key.toLowerCase()] = false;
      gameState.current.keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(gameState.current.animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, isGameOver]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[400px] h-[500px] mx-auto shadow-2xl rounded-2xl">
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-bold border border-white/10">
          Score: {score}
        </div>
        <canvas 
          ref={canvasRef}
          width={400}
          height={500}
          className="w-full h-full bg-slate-900 rounded-2xl cursor-pointer outline-none"
          tabIndex={0}
        />
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="text-white font-bold text-3xl mb-2">High Speed</h4>
            <p className="text-slate-300 mb-6 max-w-sm">Desvie dos carros. A velocidade aumenta com o tempo!</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95">
              <Play className="w-5 h-5 fill-current" /> Ligar Motor
            </button>
          </div>
        )}
        {isGameOver && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="text-white font-black text-4xl mb-4">Batida!</h4>
            <p className="text-red-200 mb-6 font-medium text-xl">Pontuação: {score}</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-white text-red-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl">
              <RotateCcw className="w-5 h-5" /> Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
