import { useState, useRef, useEffect } from 'react';
import {
  Trophy,
  DollarSign,
  Award,
  Calendar,
  type LucideIcon,
} from 'lucide-react';

// ── Types for animations ──────────────────────────────────────────────────
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

// ── Styles (copy from Hero and adapt for About) ───────────────────────────
const aboutStyles = `
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 1; transform: translateY(-60px) scale(1.3); }
  80% { opacity: 1; transform: translateY(-200px) scale(1); }
  100% { opacity: 0; transform: translateY(-250px) scale(0.5); }
}
@keyframes aboutCoinSpin {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
@keyframes aboutFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes aboutPulseRing {
  0%   { transform: translate(-50%,-50%) scale(0.8); opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
}
@keyframes aboutOrb1 {
  0%,100% { transform: translate(0,0); }
  33%     { transform: translate(80px,-50px); }
  66%     { transform: translate(-50px,30px); }
}
@keyframes aboutOrb2 {
  0%,100% { transform: translate(0,0); }
  33%     { transform: translate(-80px,50px); }
  66%     { transform: translate(50px,-30px); }
}
@keyframes aboutCountdown {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes aboutPulseText {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
@keyframes rotateSpotlight {
  0%   { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes particleRise {
  0%   { opacity: 0; transform: translateY(0); }
  20%  { opacity: 1; }
  80%  { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-700px); }
}

/* ── section ── */
.about-section {
  position: relative;
  overflow: hidden;
  padding: 112px 24px;
  background: #050816;
  cursor: default;
}
/* ── background layers ── */
.about-bg-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, #050816, #081221, #020617);
}
.about-bg-grid {
  position: absolute; inset: 0; opacity: 0.05;
  background-image:
    linear-gradient(to right,  #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
  background-size: 60px 60px;
}
.about-spotlight {
  position: absolute;
  top: 50%; left: 50%;
  width: 900px; height: 900px;
  opacity: 0.12;
  animation: rotateSpotlight 40s linear infinite;
}
.about-spotlight-inner {
  position: absolute; inset: 0;
  background: conic-gradient(from 0deg, transparent, rgba(250,204,21,0.4), transparent);
  filter: blur(40px);
}
.about-orb1 {
  position: absolute; top: -160px; left: -160px;
  width: 500px; height: 500px; border-radius: 50%;
  background: rgba(234,179,8,0.15); filter: blur(120px);
  animation: aboutOrb1 12s ease-in-out infinite;
}
.about-orb2 {
  position: absolute; bottom: 0; right: 0;
  width: 500px; height: 500px; border-radius: 50%;
  background: rgba(6,182,212,0.15); filter: blur(140px);
  animation: aboutOrb2 14s ease-in-out infinite;
}

/* ── countdown ── */
.about-countdown {
  display: flex; justify-content: center; margin-bottom: 40px;
}
.about-countdown-inner {
  background: linear-gradient(to right, #facc15, #eab308, #f97316);
  border: 1px solid rgba(234,179,8,0.3);
  backdrop-filter: blur(16px);
  border-radius: 9999px;
  padding: 16px 32px;
  animation: aboutCountdown 3s ease-in-out infinite;
}
.about-countdown-text { color: black; font-weight: 700; font-size: 1.125rem; }

/* ── headings ── */
.about-heading {
  text-align: center;
  font-size: clamp(2.5rem,7vw,4.5rem);
  font-weight: 900; color: #fff;
  margin-bottom: 24px; line-height: 1.1;
}
.about-heading-gradient {
  display: block;
  background: linear-gradient(to right, #fde68a, #eab308, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: aboutPulseText 3s ease-in-out infinite;
}
.about-sub {
  max-width: 768px; margin: 0 auto 80px;
  text-align: center; color: #cbd5e1;
  font-size: 1.25rem; line-height: 1.7;
}

/* ── grid ── */
.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
}

/* ── stat card ── */
.about-card {
  position: relative;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 28px;
  padding: 32px;
  text-align: center;
  cursor: default;
  transition: transform 0.4s cubic-bezier(.22,1,.36,1),
              border-color 0.4s ease,
              box-shadow 0.4s ease;
}
.about-card:hover {
  transform: translateY(-14px) scale(1.04);
  border-color: rgba(250,204,21,0.45);
  box-shadow: 0 0 55px rgba(250,204,21,0.22),
              0 0 20px rgba(250,204,21,0.1) inset;
}
.about-card-glow {
  position: absolute; inset: 0; opacity: 0;
  background: linear-gradient(135deg, rgba(250,204,21,0.08), rgba(34,211,238,0.06));
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.about-card:hover .about-card-glow { opacity: 1; }
.about-card-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, #facc15, #22d3ee, #facc15);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}
.about-card:hover .about-card-bar { transform: scaleX(1); }

/* ── icon ── */
.about-icon-wrap {
  animation: aboutFloat 4s ease-in-out infinite;
  position: relative; z-index: 10;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.about-icon-ring {
  position: absolute;
  top: 50%; left: 50%;
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 1.5px solid rgba(250,204,21,0.5);
  transform: translate(-50%,-50%) scale(0.8);
  opacity: 0;
}
.about-card:hover .about-icon-ring {
  animation: aboutPulseRing 1s ease-out infinite;
}

/* ── value & label ── */
.about-value {
  position: relative; z-index: 10;
  font-size: clamp(2rem,4vw,3rem);
  font-weight: 900; color: #fff; margin-bottom: 12px;
}
.about-label {
  position: relative; z-index: 10;
  color: #94a3b8; font-size: 0.95rem;
}

/* ── coin burst (section-level) ── */
.about-coin-wrap {
  position: absolute;
  pointer-events: none;
  z-index: 100;
  animation: floatUp 2.5s ease-out forwards;
}
.about-coin-glow {
  position: absolute;
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(250,204,21,0.3); filter: blur(14px);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
}
.about-coin-face {
  width: 17px; height: 17px; border-radius: 50%;
  background: linear-gradient(135deg, #fde68a, #eab308, #f97316);
  border: 1px solid #fef3c7;
  box-shadow: 0 0 28px rgba(250,204,21,0.8);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 18px; color: #000;
  animation: aboutCoinSpin 1.5s linear infinite;
}

/* ── bottom info ── */
.about-info-box { margin-top: 80px; text-align: center; }
.about-info-inner {
  display: inline-flex; align-items: center; gap: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(250,204,21,0.2);
  border-radius: 24px; padding: 24px 32px;
  backdrop-filter: blur(16px);
  transition: border-color 0.4s, box-shadow 0.4s;
}
.about-info-inner:hover {
  border-color: rgba(250,204,21,0.45);
  box-shadow: 0 0 40px rgba(250,204,21,0.15);
}
.about-info-text {
  font-size: 1.1rem; color: #cbd5e1;
  max-width: 480px; line-height: 1.6;
}

/* floating particles */
.about-particle {
  position: absolute;
  width: 4px; height: 4px;
  background: #facc15;
  border-radius: 50%;
  animation: particleRise 12s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@media (max-width: 768px) {
  .about-section {
    padding: 80px 16px;
  }
  .about-countdown-inner {
    padding: 12px 24px;
  }
  .about-countdown-text {
    font-size: 1rem;
  }
  .about-sub {
    font-size: 1rem;
    margin-bottom: 48px;
  }
  .about-grid {
    gap: 20px;
  }
  .about-card {
    padding: 24px;
  }
  .about-info-inner {
    padding: 20px 24px;
  }
  .about-info-text {
    font-size: 0.95rem;
  }
}
`;

// ── Stat card component ──
interface StatItem {
  icon: LucideIcon;
  value: string;
  title: string;
  iconColor: string;
}

function StatCard({ item, index }: { item: StatItem; index: number }) {
  return (
    <div className="about-card">
      <div className="about-card-glow" />
      <div className="about-card-bar" />
      <div className="about-icon-wrap" style={{ animationDelay: `${index * 0.4}s` }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div className="about-icon-ring" />
          <item.icon size={48} style={{ color: item.iconColor, display: 'block' }} />
        </div>
      </div>
      <div className="about-value">{item.value}</div>
      <p className="about-label">{item.title}</p>
    </div>
  );
}

// ── Main About component ──
export default function About() {
  const [coins, setCoins] = useState<BurstCoin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Floating particles (static, not canvas)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 3.33 + 7) % 100}%`,
    duration: 12 + (i % 10),
    delay: (i * 0.17) % 5,
  }));

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
      setCoins((prev) => prev.filter((c) => !batch.some((b) => b.id === c.id)));
    }, 2500);
  };

  const stats: StatItem[] = [
    { icon: DollarSign, value: '$4,500',          title: 'Total Reward Value',     iconColor: '#facc15' },
    { icon: Award,      value: '20',              title: 'Traders Rewarded',       iconColor: '#22d3ee' },
    { icon: Trophy,     value: '$2,000',          title: 'Top Prize',              iconColor: '#4ade80' },
    { icon: Calendar,   value: '2 Rounds / Month', title: 'Compete Every 15 Days', iconColor: '#c084fc' },
  ];

  return (
    <>
      <style>{aboutStyles}</style>
      <section
        id="about"
        ref={sectionRef}
        className="about-section"
        onMouseMove={handleMouseMove}
      >
        {/* Background layers (same as Hero) */}
        <div className="about-bg-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1707075891558-ec2b81527409?q=80&w=1113&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.22,
            zIndex: 0,
          }}
        />
        <div className="about-bg-grid" />
        <div className="about-spotlight">
          <div className="about-spotlight-inner" />
        </div>
        <div className="about-orb1" />
        <div className="about-orb2" />

        {/* Animated canvases */}
        <BitcoinCanvas />
        <TrailCanvas containerRef={sectionRef} />

        {/* Floating particles (HTML divs) */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="about-particle"
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
            className="about-coin-wrap"
            style={{ left: coin.x - 22, top: coin.y - 22 }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="about-coin-glow" />
              <div className="about-coin-face">₿</div>
            </div>
          </div>
        ))}

        {/* Content (unchanged layout) */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto' }}>
          {/* Countdown */}
          <div className="about-countdown">
            <div className="about-countdown-inner">
              <span className="about-countdown-text">Registration closes in - 15 days</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="about-heading">
            Competition
            <span className="about-heading-gradient">Rewards & Rules</span>
          </h2>

          <p className="about-sub">
            Every trader competes under equal conditions
            with transparent scoring and strict fair-play rules.
          </p>

          {/* Stats */}
          <div className="about-grid">
            {stats.map((item, index) => (
              <StatCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Bottom info */}
          <div className="about-info-box">
            <div className="about-info-inner">
              <Trophy style={{ color: '#facc15', flexShrink: 0 }} size={32} />
              <p className="about-info-text">
                Trade smart, stay disciplined, and compete
                against Asia's fastest-growing community of traders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}