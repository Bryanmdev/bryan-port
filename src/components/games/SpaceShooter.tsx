"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameState = useRef({
    player: { x: 200, y: 350, size: 15, speed: 5 },
    projectiles: [] as { x: number; y: number; speed: number; size: number }[],
    enemies: [] as { x: number; y: number; speed: number; size: number }[],
    particles: [] as { x: number; y: number; dx: number; dy: number; life: number; color: string }[],
    lastEnemySpawn: 0,
    keys: {} as Record<string, boolean>,
    score: 0,
    animationFrameId: 0
  });

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    gameState.current = {
      ...gameState.current,
      player: { x: 200, y: 350, size: 15, speed: 5 },
      projectiles: [],
      enemies: [],
      particles: [],
      lastEnemySpawn: performance.now(),
      score: 0,
    };
    if (canvasRef.current) canvasRef.current.focus();
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spawnParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        gameState.current.particles.push({
          x, y,
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
          life: 1.0,
          color
        });
      }
    };

    const update = (time: number) => {
      const state = gameState.current;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (state.keys["ArrowLeft"] || state.keys["a"]) state.player.x -= state.player.speed;
      if (state.keys["ArrowRight"] || state.keys["d"]) state.player.x += state.player.speed;
      if (state.keys["ArrowUp"] || state.keys["w"]) state.player.y -= state.player.speed;
      if (state.keys["ArrowDown"] || state.keys["s"]) state.player.y += state.player.speed;

      state.player.x = Math.max(state.player.size, Math.min(canvas.width - state.player.size, state.player.x));
      state.player.y = Math.max(state.player.size, Math.min(canvas.height - state.player.size, state.player.y));

      ctx.save();
      ctx.translate(state.player.x, state.player.y);
      ctx.fillStyle = "#38bdf8";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(0, -state.player.size);
      ctx.lineTo(state.player.size, state.player.size);
      ctx.lineTo(-state.player.size, state.player.size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      if (time % 150 < 20) {
        if (state.projectiles.length === 0 || state.projectiles[state.projectiles.length-1].y < state.player.y - 30) {
          state.projectiles.push({ x: state.player.x, y: state.player.y - 20, speed: 10, size: 3 });
        }
      }

      ctx.fillStyle = "#e879f9";
      ctx.shadowColor = "#e879f9";
      state.projectiles.forEach((p, i) => {
        p.y -= p.speed;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.y < 0) state.projectiles.splice(i, 1);
      });

      if (time - state.lastEnemySpawn > Math.max(500, 2000 - state.score * 50)) {
        state.enemies.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          speed: Math.random() * 2 + 1 + (state.score / 200),
          size: Math.random() * 10 + 15
        });
        state.lastEnemySpawn = time;
      }

      ctx.fillStyle = "#f43f5e";
      ctx.shadowColor = "#f43f5e";
      state.enemies.forEach((enemy, eIdx) => {
        enemy.y += enemy.speed;
        ctx.beginPath();
        ctx.rect(enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2);
        ctx.fill();

        state.projectiles.forEach((proj, pIdx) => {
          const dist = Math.hypot(proj.x - enemy.x, proj.y - enemy.y);
          if (dist < enemy.size + proj.size) {
            spawnParticles(enemy.x, enemy.y, "#f43f5e", 10);
            state.enemies.splice(eIdx, 1);
            state.projectiles.splice(pIdx, 1);
            state.score += 10;
            setScore(state.score);
          }
        });

        const pDist = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        if (pDist < enemy.size + state.player.size - 5) {
          spawnParticles(state.player.x, state.player.y, "#38bdf8", 30);
          setIsGameOver(true);
          setIsPlaying(false);
        }

        if (enemy.y > canvas.height + enemy.size) state.enemies.splice(eIdx, 1);
      });

      state.particles.forEach((part, i) => {
        part.x += part.dx;
        part.y += part.dy;
        part.life -= 0.05;
        if (part.life <= 0) {
          state.particles.splice(i, 1);
        } else {
          ctx.globalAlpha = part.life;
          ctx.fillStyle = part.color;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(part.x, part.y, Math.random() * 3 + 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      if (isPlaying && !isGameOver) {
        state.animationFrameId = requestAnimationFrame(update);
      }
    };

    gameState.current.animationFrameId = requestAnimationFrame(update);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      gameState.current.keys[key] = true;
      gameState.current.keys[e.key] = true; // keep original for Arrow keys
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
        <div className="absolute top-4 left-4 z-10 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-bold border border-white/10">
          Score: {score}
        </div>
        <canvas 
          ref={canvasRef}
          width={400}
          height={500}
          className="w-full h-full bg-slate-900 rounded-2xl cursor-crosshair outline-none"
          tabIndex={0}
        />
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="font-syne text-white font-bold text-2xl mb-2">Space Shooter</h4>
            <p className="text-slate-300 mb-6">Desvie e atire (Automático).</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold">
              <Play className="w-5 h-5 fill-current" /> Jogar
            </button>
          </div>
        )}
        {isGameOver && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="font-syne text-white font-black text-4xl mb-2">Destruído!</h4>
            <p className="text-red-200 mb-8 font-medium text-lg">Pontuação Final: {score}</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-white text-red-900 px-8 py-4 rounded-full font-bold">
              <RotateCcw className="w-5 h-5" /> Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
