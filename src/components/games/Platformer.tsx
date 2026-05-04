"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Trophy } from "lucide-react";

export function Platformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const gameState = useRef({
    player: { x: 50, y: 200, width: 24, height: 24, vx: 0, vy: 0, speed: 5, jumpPower: -12, grounded: false },
    gravity: 0.6,
    cameraX: 0,
    keys: {} as Record<string, boolean>,
    particles: [] as { x: number; y: number; life: number; color: string }[],
    platforms: [
      { x: 0, y: 350, w: 300, h: 150, text: "Início", color: "#334155" },
      { x: 400, y: 280, w: 150, h: 30, text: "Skills", color: "#0ea5e9" },
      { x: 650, y: 200, w: 150, h: 30, text: "React/Next", color: "#38bdf8" },
      { x: 900, y: 150, w: 200, h: 30, text: "Game Dev", color: "#a855f7" },
      { x: 1250, y: 250, w: 150, h: 30, text: "C# / .NET", color: "#22c55e" },
      { x: 1500, y: 150, w: 100, h: 30, text: "Cloud", color: "#f59e0b" },
      { x: 1750, y: 350, w: 300, h: 150, text: "OBJETIVO", color: "#10b981", isGoal: true },
    ],
    enemies: [
      { x: 400, y: 250, w: 24, h: 24, speed: 2, minX: 400, maxX: 526, color: "#ef4444" },
      { x: 900, y: 120, w: 24, h: 24, speed: 3, minX: 900, maxX: 1076, color: "#ef4444" },
    ],
    hazards: [
      { x: 300, y: 380, w: 1450, h: 120, text: "LAVA / BUGS", color: "#ef4444" }
    ],
    animationFrameId: 0
  });

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setIsWin(false);
    gameState.current.player = { x: 50, y: 200, width: 24, height: 24, vx: 0, vy: 0, speed: 5, jumpPower: -12, grounded: false };
    gameState.current.cameraX = 0;
    // reset enemies
    gameState.current.enemies[0].x = 400;
    gameState.current.enemies[1].x = 900;
    if (canvasRef.current) canvasRef.current.focus();
  };

  useEffect(() => {
    if (!isPlaying || isGameOver || isWin) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const update = () => {
      const state = gameState.current;
      const { player, platforms, enemies, hazards, keys } = state;

      // Physics
      if (keys["ArrowLeft"] || keys["a"]) player.vx = -player.speed;
      else if (keys["ArrowRight"] || keys["d"]) player.vx = player.speed;
      else player.vx = 0;

      if ((keys["ArrowUp"] || keys["w"] || keys[" "]) && player.grounded) {
        player.vy = player.jumpPower;
        player.grounded = false;
        // jump particles
        for(let i=0; i<8; i++) {
          state.particles.push({ x: player.x + player.width/2, y: player.y + player.height, life: 1, color: "white" });
        }
      }

      player.vy += state.gravity;
      player.x += player.vx;
      player.y += player.vy;

      // Screen bounds (left)
      if (player.x < 0) player.x = 0;

      // Floor death (falling off map)
      if (player.y > 600) {
        setIsGameOver(true);
        setIsPlaying(false);
      }

      // Enemy logic
      enemies.forEach(en => {
        en.x += en.speed;
        if (en.x <= en.minX || en.x + en.w >= en.maxX) en.speed *= -1;
        
        // Player enemy collision
        if (player.x < en.x + en.w && player.x + player.width > en.x &&
            player.y < en.y + en.h && player.y + player.height > en.y) {
          setIsGameOver(true);
          setIsPlaying(false);
        }
      });

      // Hazard logic (Lava)
      hazards.forEach(hz => {
        if (player.x < hz.x + hz.w && player.x + player.width > hz.x &&
            player.y < hz.y + hz.h && player.y + player.height > hz.y) {
          setIsGameOver(true);
          setIsPlaying(false);
        }
      });

      // Collision Detection (AABB) with Platforms
      player.grounded = false;
      platforms.forEach(plat => {
        if (player.x < plat.x + plat.w && player.x + player.width > plat.x &&
            player.y < plat.y + plat.h && player.y + player.height > plat.y) {
          
          const overlapX = (player.width + plat.w) / 2 - Math.abs((player.x + player.width/2) - (plat.x + plat.w/2));
          const overlapY = (player.height + plat.h) / 2 - Math.abs((player.y + player.height/2) - (plat.y + plat.h/2));

          if (overlapX >= overlapY) {
            if (player.vy > 0) { // landing
              player.y = plat.y - player.height;
              player.vy = 0;
              player.grounded = true;
              
              if (plat.isGoal) {
                setIsWin(true);
                setIsPlaying(false);
              }
            } else if (player.vy < 0) { // hitting head
              player.y = plat.y + plat.h;
              player.vy = 0;
            }
          } else {
            if (player.vx > 0) player.x = plat.x - player.width;
            else if (player.vx < 0) player.x = plat.x + plat.w;
          }
        }
      });

      // Camera Follow Player
      const targetCameraX = player.x - canvas.width / 3;
      state.cameraX += (targetCameraX - state.cameraX) * 0.1;
      if (state.cameraX < 0) state.cameraX = 0;

      // RENDER
      ctx.fillStyle = "#0f172a"; // dark sky
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-state.cameraX, 0);

      // Draw Hazards
      hazards.forEach(hz => {
        ctx.fillStyle = hz.color;
        ctx.fillRect(hz.x, hz.y, hz.w, hz.h);
        if (hz.text) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.font = "bold 20px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // tile text across hazard
          for (let tx = hz.x + 100; tx < hz.x + hz.w; tx += 200) {
            ctx.fillText(hz.text, tx, hz.y + hz.h / 2);
          }
        }
      });

      // Draw Platforms
      platforms.forEach(plat => {
        ctx.fillStyle = plat.color;
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        
        if (plat.text) {
          ctx.fillStyle = "white";
          ctx.font = "bold 16px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(plat.text, plat.x + plat.w / 2, plat.y + plat.h / 2);
        }
      });

      // Draw Enemies
      enemies.forEach(en => {
        ctx.fillStyle = en.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = en.color;
        ctx.fillRect(en.x, en.y, en.w, en.h);
        
        // draw angry eyes
        ctx.fillStyle = "white";
        ctx.shadowBlur = 0;
        ctx.fillRect(en.x + 4, en.y + 4, 4, 4);
        ctx.fillRect(en.x + 16, en.y + 4, 4, 4);
      });

      // Draw Player
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ffffff";
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.shadowBlur = 0;

      // Draw Particles
      state.particles.forEach((p, idx) => {
        p.life -= 0.05;
        p.y += 1; 
        if (p.life <= 0) state.particles.splice(idx, 1);
        else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      ctx.restore();

      // UI Instructions
      ctx.fillStyle = "white";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Chegue até o OBJETIVO. Cuidado com os Bugs e a Lava!", 10, 10);

      state.animationFrameId = requestAnimationFrame(update);
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
  }, [isPlaying, isGameOver, isWin]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[800px] h-[400px] mx-auto shadow-2xl rounded-2xl">
        <canvas 
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-full bg-slate-900 rounded-2xl cursor-pointer outline-none"
          tabIndex={0}
        />
        
        {!isPlaying && !isGameOver && !isWin && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="font-syne text-white font-bold text-3xl mb-2">Curriculum Jump</h4>
            <p className="text-slate-300 mb-6 max-w-md">Uma jornada de plataforma pela minha carreira. Desvie dos bugs (vermelhos) e não caia na lava!</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95">
              <Play className="w-5 h-5 fill-current" /> Começar Jornada
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-red-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="font-syne text-white font-black text-4xl mb-4">Você foi pego por um Bug!</h4>
            <button onClick={startGame} className="flex items-center gap-2 bg-white text-red-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl">
              <RotateCcw className="w-5 h-5" /> Tentar Novamente
            </button>
          </div>
        )}

        {isWin && (
          <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <Trophy className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-lg" />
            <h4 className="font-syne text-white font-black text-4xl mb-2">Objetivo Alcançado!</h4>
            <p className="text-emerald-200 mb-8 font-medium text-lg">Parabéns, você dominou a Lógica e a Engenharia.</p>
            <button onClick={startGame} className="flex items-center gap-2 bg-white text-emerald-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl">
              <RotateCcw className="w-5 h-5" /> Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
