import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ── Types for animations (same as Hero) ───────────────────────────────────

interface TrailDot {
  x: number;
  y: number;
  life: number;
  size: number;
  isRing?: boolean;
}

interface HexNode {
  x: number;
  y: number;
  r: number;
  phase: number;
  brightness: number;
}

interface Beam {
  a: HexNode;
  b: HexNode;
  op: number;
}

interface Packet {
  beam: Beam;
  t: number;
  speed: number;
  size: number;
}

interface CoinAnim {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vy: number;
  vx: number;
  rot: number;
  rotV: number;
  phase: number;
  tilt: number;
}

interface RingAnim {
  x: number;
  y: number;
  r: number;
  maxR: number;
  speed: number;
  opacity: number;
  phase: number;
}

interface BurstCoin {
  id: number;
  x: number;
  y: number;
}

// ── TrailCanvas (golden cursor trail) ─────────────────────────────────────

function TrailCanvas({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const dotsRef = useRef<TrailDot[]>([]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      dotsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        life: 1,
        size: 3 + Math.random() * 4,
      });
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dots = dotsRef.current;

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= 0.02;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        const dx = mouseRef.current.x - d.x;
        const dy = mouseRef.current.y - d.y;
        d.x += dx * 0.08;
        d.y += dy * 0.08;

        const alpha = d.life * 0.7;
        const radius = d.size * d.life;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,224,71,${alpha})`;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 10 * d.life;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (Math.random() < 0.05 && mouseRef.current.x > 0) {
        dots.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          life: 1,
          size: 20 + Math.random() * 20,
          isRing: true,
        });
      }

      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

// ── BitcoinCanvas (floating BTC symbols, glowing rings, nodes) ────────────

function BitcoinCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let coins: CoinAnim[] = [];
    let rings: RingAnim[] = [];
    let hexNodes: HexNode[] = [];
    let beams: Beam[] = [];
    let packets: Packet[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initAll();
    };

    function initAll() {
      const W = canvas!.width;
      const H = canvas!.height;

      coins = Array.from({ length: 18 }, (_, i): CoinAnim => ({
        x: (i / 18) * W + Math.random() * 80 - 40,
        y: Math.random() * H,
        size: Math.random() * 38 + 20,
        opacity: Math.random() * 0.22 + 0.06,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.25,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.014,
        phase: Math.random() * Math.PI * 2,
        tilt: 0,
      }));

      rings = Array.from({ length: 6 }, (_, i): RingAnim => ({
        x: (0.15 + i * 0.17) * W,
        y: (0.2 + (i % 3) * 0.3) * H,
        r: Math.random() * 60 + 20,
        maxR: Math.random() * 160 + 80,
        speed: Math.random() * 0.6 + 0.3,
        opacity: 0.18,
        phase: (i / 6) * Math.PI * 2,
      }));

      hexNodes = Array.from({ length: 32 }, (): HexNode => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        phase: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.3 + 0.08,
      }));

      beams = [];
      for (let i = 0; i < 22; i++) {
        const a = hexNodes[Math.floor(Math.random() * hexNodes.length)];
        const b = hexNodes[Math.floor(Math.random() * hexNodes.length)];
        if (a !== b) beams.push({ a, b, op: Math.random() * 0.09 + 0.02 });
      }

      packets = beams.slice(0, 14).map((beam): Packet => ({
        beam,
        t: Math.random(),
        speed: Math.random() * 0.004 + 0.0015,
        size: Math.random() * 1.5 + 1,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    function drawCoin(c: CoinAnim, frame: number) {
      const { x, y, size, opacity, rot, phase } = c;
      const glow = Math.sin(phase + frame * 0.022) * 0.45 + 0.55;

      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.globalAlpha = opacity * glow;

      ctx!.beginPath();
      ctx!.arc(0, 0, size + 5 * glow, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(253,224,71,${0.35 * glow})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.88, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(250,204,21,${0.5 * glow})`;
      ctx!.lineWidth = 0.7;
      ctx!.stroke();

      const g = ctx!.createRadialGradient(-size * 0.25, -size * 0.25, size * 0.05, 0, 0, size * 0.78);
      g.addColorStop(0, "rgba(254,240,138,0.95)");
      g.addColorStop(0.35, "rgba(250,204,21,0.85)");
      g.addColorStop(0.75, "rgba(234,179,8,0.75)");
      g.addColorStop(1, "rgba(154,52,18,0.55)");
      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.78, 0, Math.PI * 2);
      ctx!.fillStyle = g;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(-size * 0.18, -size * 0.22, size * 0.42, Math.PI * 1.1, Math.PI * 1.85);
      ctx!.strokeStyle = `rgba(255,255,220,${0.45 * glow})`;
      ctx!.lineWidth = size * 0.09;
      ctx!.stroke();

      ctx!.fillStyle = `rgba(0,0,0,${0.72 * glow})`;
      ctx!.font = `900 ${size * 0.82}px Georgia,serif`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("₿", 0, size * 0.04);

      ctx!.restore();
    }

    function drawNode(nd: HexNode) {
      nd.phase += 0.018;
      const pulse = Math.sin(nd.phase) * 0.5 + 0.5;
      const br = nd.brightness;
      ctx!.beginPath();
      ctx!.arc(nd.x, nd.y, nd.r + 5 * pulse, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(250,204,21,${br * 0.28 * pulse})`;
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(250,204,21,${br + 0.15 * pulse})`;
      ctx!.fill();
    }

    function drawRing(rng: RingAnim) {
      rng.phase += 0.012;
      const t = Math.sin(rng.phase) * 0.5 + 0.5;
      const r = rng.r + (rng.maxR - rng.r) * t;
      const op = rng.opacity * (1 - t) * 0.7;
      ctx!.beginPath();
      ctx!.arc(rng.x, rng.y, r, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(250,204,21,${op})`;
      ctx!.lineWidth = 1.2;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(rng.x, rng.y, r * 0.7, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(34,211,238,${op * 0.5})`;
      ctx!.lineWidth = 0.6;
      ctx!.stroke();
    }

    const GHOSTS = [
      { rx: 0.07, ry: 0.32, size: 200, op: 0.045, phase: 0 },
      { rx: 0.86, ry: 0.15, size: 160, op: 0.038, phase: 1.5 },
      { rx: 0.52, ry: 0.74, size: 220, op: 0.032, phase: 3.0 },
      { rx: 0.22, ry: 0.72, size: 130, op: 0.028, phase: 4.5 },
      { rx: 0.75, ry: 0.55, size: 110, op: 0.022, phase: 2.1 },
    ];

    let frame = 0;
    let animId: number;

    const tick = () => {
      frame++;
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      GHOSTS.forEach((g) => {
        const pulse = Math.sin(frame * 0.009 + g.phase) * 0.35 + 0.65;
        ctx!.save();
        ctx!.globalAlpha = g.op * pulse;
        ctx!.font = `900 ${g.size}px Georgia,serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = "#eab308";
        ctx!.fillText("₿", g.rx * W, g.ry * H);
        ctx!.restore();
      });

      beams.forEach(({ a, b, op }) => {
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(a.x, b.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle = `rgba(250,204,21,${op})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      });

      packets.forEach((pkt) => {
        pkt.t += pkt.speed;
        if (pkt.t > 1) pkt.t = 0;
        const { a, b } = pkt.beam;
        let px: number, py: number;
        if (pkt.t < 0.5) {
          px = a.x;
          py = a.y + (b.y - a.y) * (pkt.t * 2);
        } else {
          px = a.x + (b.x - a.x) * ((pkt.t - 0.5) * 2);
          py = b.y;
        }
        ctx!.beginPath();
        ctx!.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(253,224,71,0.7)";
        ctx!.fill();
      });

      hexNodes.forEach((nd) => drawNode(nd));
      rings.forEach((rng) => drawRing(rng));

      coins.forEach((c) => {
        c.phase += 0.018;
        c.rot += c.rotV;
        c.x += c.vx;
        c.y += c.vy;
        if (c.y + c.size * 2 < 0) {
          c.y = H + c.size;
          c.x = Math.random() * W;
        }
        if (c.x < -c.size * 2) c.x = W + c.size;
        if (c.x > W + c.size * 2) c.x = -c.size;
        drawCoin(c, frame);
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// ── Styles (copied from Hero, adapted for SignIn) ─────────────────────────

const styles = `
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 1; transform: translateY(-60px) scale(1.3); }
  80% { opacity: 1; transform: translateY(-200px) scale(1); }
  100% { opacity: 0; transform: translateY(-250px) scale(0.5); }
}
@keyframes spin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
@keyframes rotateSpotlight {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes floatOrb1 {
  0%,100% { transform: translate(0, 0); }
  33% { transform: translate(100px, -80px); }
  66% { transform: translate(-50px, 50px); }
}
@keyframes floatOrb2 {
  0%,100% { transform: translate(0, 0); }
  33% { transform: translate(-120px, 80px); }
  66% { transform: translate(80px, -50px); }
}
@keyframes particleRise {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: 1; }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-700px); }
}
@keyframes coinFloat {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  20% { opacity: 1; transform: scale(1.3) rotate(144deg); }
  80% { opacity: 1; transform: scale(1) rotate(576deg); }
  100% { opacity: 0; transform: scale(0.5) rotate(720deg); }
}

.signin-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #050816;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}
.bg-main-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, #050816, #081221, #020617);
}
.bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
  background-size: 60px 60px;
}
.bg-spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  animation: rotateSpotlight 40s linear infinite;
}
.bg-spotlight-inner {
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg, transparent, rgba(250,204,21,0.4), transparent);
  filter: blur(40px);
}
.bg-orb1 {
  position: absolute;
  top: -80px;
  left: -80px;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: rgba(234,179,8,0.2);
  filter: blur(140px);
  animation: floatOrb1 20s linear infinite;
}
.bg-orb2 {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(6,182,212,0.2);
  filter: blur(160px);
  animation: floatOrb2 25s linear infinite;
}
.coin-wrapper {
  position: absolute;
  pointer-events: none;
  z-index: 50;
}
.coin-glow {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(250,204,21,0.3);
  filter: blur(16px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.coin-face {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde68a, #eab308, #f97316);
  border: 1px solid #fef3c7;
  box-shadow: 0 0 10px rgba(250,204,21,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  color: #000;
  animation: spin 1.5s linear infinite;
}
.signin-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #facc15;
  border-radius: 50%;
  animation: particleRise 12s linear infinite;
  pointer-events: none;
  z-index: 2;
}
@media (max-width: 768px) {
  .bg-spotlight {
    width: 700px;
    height: 700px;
  }
  .bg-orb1, .bg-orb2 {
    opacity: 0.5;
  }
  .coin-glow {
    width: 42px;
    height: 42px;
  }
  .coin-face {
    font-size: 16px;
  }
}
`;

// ── Main SignIn Component ─────────────────────────────────────────────────

const SignIn = () => {
  // Hero‑style coin burst on mouse move
  const [coins, setCoins] = useState<BurstCoin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Floating particles (same as Hero)
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 3.33 + 7) % 100}%`,
        duration: 12 + (i % 10),
        delay: (i * 0.17) % 5,
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.15) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const batch: BurstCoin[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() * 100 - 50),
      y: y + (Math.random() * 100 - 50),
    }));

    setCoins((prev) => [...prev, ...batch]);

    setTimeout(() => {
      setCoins((prev) =>
        prev.filter((coin) => !batch.some((c) => c.id === coin.id))
      );
    }, 2500);
  };

  return (
    <>
      <style>{styles}</style>
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="signin-section"
      >
        {/* Hero‑style background layers (replaces previous simple overlay) */}
        <div className="bg-main-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1641580529558-a96cf6efbc72?q=80&w=1170&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 0,
          }}
        />
        <div className="bg-grid" />
        <div className="bg-spotlight">
          <div className="bg-spotlight-inner" />
        </div>
        <div className="bg-orb1" />
        <div className="bg-orb2" />

        {/* Animated canvases */}
        <BitcoinCanvas />
        <TrailCanvas containerRef={sectionRef} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="signin-particle"
            style={{
              left: p.left,
              bottom: "-20px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Coin burst on mouse move (Hero style) */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="coin-wrapper"
            style={{
              left: coin.x,
              top: coin.y,
              animation: `coinFloat 2.5s ease-out forwards`,
            }}
          >
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="coin-glow" />
              <div className="coin-face">₿</div>
            </div>
          </div>
        ))}

        {/* Original content (animated heading with glowing text shadow) - unchanged */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            textShadow: [
              "0 0 20px rgba(250,204,21,0.4)",
              "0 0 60px rgba(250,204,21,0.9)",
              "0 0 20px rgba(250,204,21,0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative z-10 text-center text-5xl md:text-8xl font-black uppercase tracking-wider"
        >
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
            SMART TRADING
          </span>
          <br />
          <span className="text-white">WITH AI</span>
        </motion.h1>
      </section>
    </>
  );
};

export default SignIn;