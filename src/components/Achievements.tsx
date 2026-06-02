import { useState, useMemo, useRef, useEffect } from "react";
import { Trophy, Users, DollarSign} from "lucide-react";

// ── Types (same as Hero) ──────────────────────────────────────────────────

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

// ── BitcoinCanvas (same as Hero) ──────────────────────────────────────────

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

// ── Styles (with horizontal marquee animation) ────────────────────────────

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
@keyframes floatContent {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes particleRise {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: 1; }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-700px); }
}
@keyframes pulseText {
  0%,100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 150%; }
}
@keyframes coinFloat {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  20% { opacity: 1; transform: scale(1.3) rotate(144deg); }
  80% { opacity: 1; transform: scale(1) rotate(576deg); }
  100% { opacity: 0; transform: scale(0.5) rotate(720deg); }
}

/* Horizontal infinite scroll (JioHotstar style) */
@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.achievements-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #050816;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px;
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
.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  animation: floatContent 5s ease-in-out infinite;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.3);
  padding: 12px 24px;
  border-radius: 9999px;
  margin-bottom: 32px;
  backdrop-filter: blur(16px);
}
.badge-text {
  color: #fde68a;
  font-weight: 600;
}
.heading {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 32px;
  text-shadow: 0 0 30px rgba(250,204,21,0.4);
}
.heading-gradient {
  display: block;
  background: linear-gradient(to right, #fef9c3, #eab308, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulseText 3s ease-in-out infinite;
}
.description {
  max-width: 896px;
  margin: 0 auto 48px;
  font-size: 1.25rem;
  color: #cbd5e1;
  line-height: 1.7;
}

/* Horizontal stats marquee container */
.stats-marquee {
  width: 100%;
  overflow: hidden;
  margin: 0 auto 56px;
  padding: 12px 0;
}
.stats-track {
  display: flex;
  animation: marqueeScroll 25s linear infinite;
  gap: 24px;
}
.stats-track:hover {
  animation-play-state: paused;
}
.stat-card {
  flex-shrink: 0;
  width: 260px;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  padding: 32px;
  transition: all 0.5s ease;
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-15px) scale(1.04);
  border-color: rgba(250,204,21,0.5);
  box-shadow: 0 0 50px rgba(250,204,21,0.25);
}
.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  margin: 16px 0 8px;
}
.stat-label {
  color: #94a3b8;
}
.sub-desc {
  max-width: 768px;
  margin: 0 auto 32px;
  font-size: 1.125rem;
  color: #cbd5e1;
}
.cta-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, #facc15, #eab308, #f97316);
  color: #000;
  font-weight: 900;
  padding: 20px 48px;
  border-radius: 16px;
  font-size: 1.125rem;
  box-shadow: 0 0 40px rgba(250,204,21,0.4);
  margin-bottom: 64px;
  text-decoration: none;
  transition: transform 0.2s;
  border: none;
  cursor: pointer;
}
.cta-btn:hover { transform: scale(1.05); }
.cta-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 50%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
  transform: skewX(-12deg);
  animation: shimmer 2s ease-in-out infinite;
}
.traders-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}
.trader-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #050816;
  background: linear-gradient(135deg, #facc15, #eab308, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  box-shadow: 0 0 25px rgba(250,204,21,0.5);
  transition: transform 0.2s;
  margin-left: -16px;
}
.trader-avatar:first-child { margin-left: 0; }
.trader-avatar:hover { transform: scale(1.15) translateY(-5px); }
.trust-text { color: #cbd5e1; font-size: 1.125rem; margin-bottom: 40px; }
.trust-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.trust-item { display: flex; align-items: center; gap: 8px; }
.trust-item span { color: #fff; font-weight: 700; }
.trust-divider { width: 1px; height: 32px; background: #334155; }
.achievements-particle {
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
  .achievements-section {
    padding: 80px 16px;
  }
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
  .stat-card {
    width: 220px;
    padding: 24px;
  }
  .stat-number {
    font-size: 2.3rem;
  }
  .description {
    font-size: 1rem;
  }
  .cta-btn {
    width: 100%;
    padding: 16px 28px;
    font-size: 1rem;
  }
  .trader-avatar {
    width: 52px;
    height: 52px;
    margin-left: -12px;
  }
  .trust-row {
    gap: 20px;
  }
}
`;

// ── Main Achievements Component ───────────────────────────────────────────

export default function Achievements() {
  const [coins, setCoins] = useState<BurstCoin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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

  const stats = [
    { icon: Trophy, value: "200+", title: "Winners" },
    { icon: DollarSign, value: "$50K+", title: "Prize Pool" },
    { icon: Users, value: "5K+", title: "Traders" },
  ];

  // Duplicate stats for seamless looping
  const duplicatedStats = [...stats, ...stats];

  return (
    <>
      <style>{styles}</style>
      <section
        ref={sectionRef}
        className="achievements-section"
        onMouseMove={handleMouseMove}
      >
        {/* Background layers */}
        <div className="bg-main-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?w=600&auto=format&fit=crop&q=60')`,
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
            className="achievements-particle"
            style={{
              left: p.left,
              bottom: "-20px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Coin burst on hover */}
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

        {/* Content */}
        <div className="content-wrapper">
          <div className="badge">
            <Trophy color="#facc15" size={20} />
            <span className="badge-text">Contest Achievements</span>
          </div>
          <h1 className="heading">
            Contest
            <span className="heading-gradient">Achievements</span>
          </h1>
          <p className="description">
            Thousands of traders compete every month and win exciting rewards.
          </p>

          {/* HORIZONTAL MOVING STATS (JioHotstar style) */}
          <div className="stats-marquee">
            <div className="stats-track">
              {duplicatedStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="stat-card">
                    <Icon
                      color={
                        idx % 3 === 0 ? "#facc15" : idx % 3 === 1 ? "#22d3ee" : "#4ade80"
                      }
                      size={48}
                      style={{ margin: "0 auto" }}
                    />
                    <div className="stat-number">{stat.value}</div>
                    <p className="stat-label">{stat.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="sub-desc">
            Trade smart, stay disciplined, and compete against Asia's fastest-growing community of traders.
          </p>
          <a href="#register" className="cta-btn">
            <span className="cta-shimmer" />
            Join Contest Now
          </a>
        </div>
      </section>
    </>
  );
}