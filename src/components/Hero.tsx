import { useState, useMemo, useRef, useEffect } from "react";
import { Trophy, DollarSign, TrendingUp, Star, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

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

interface Coin {
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

interface Ring {
  x: number;
  y: number;
  r: number;
  maxR: number;
  speed: number;
  opacity: number;
  phase: number;
}

interface HeroCoin {
  id: number;
  x: number;
  y: number;
}

// ── TrailCanvas (Golden cursor trail) ─────────────────────────────────────

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
        size: 3 + Math.random() * 5,
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

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    let animId: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
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

        const alpha = d.life * 0.8;
        const radius = d.size * d.life;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,224,71,${alpha})`;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 12 * d.life;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animId);
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

// ── BitcoinCanvas (Rich animated crypto background) ──────────────────────

function BitcoinCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let coins: Coin[] = [];
    let rings: Ring[] = [];
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

      coins = Array.from({ length: 22 }, (_, i): Coin => ({
        x: (i / 22) * W + Math.random() * 100 - 50,
        y: Math.random() * H,
        size: Math.random() * 42 + 22,
        opacity: Math.random() * 0.25 + 0.08,
        vy: -(Math.random() * 0.4 + 0.1),
        vx: (Math.random() - 0.5) * 0.3,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.018,
        phase: Math.random() * Math.PI * 2,
        tilt: 0,
      }));

      rings = Array.from({ length: 8 }, (_, i): Ring => ({
        x: (0.12 + i * 0.14) * W,
        y: (0.25 + (i % 4) * 0.2) * H,
        r: Math.random() * 70 + 25,
        maxR: Math.random() * 180 + 100,
        speed: Math.random() * 0.7 + 0.4,
        opacity: 0.2,
        phase: (i / 8) * Math.PI * 2,
      }));

      hexNodes = Array.from({ length: 40 }, (): HexNode => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1.2,
        phase: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.35 + 0.1,
      }));

      beams = [];
      for (let i = 0; i < 28; i++) {
        const a = hexNodes[Math.floor(Math.random() * hexNodes.length)];
        const b = hexNodes[Math.floor(Math.random() * hexNodes.length)];
        if (a !== b) beams.push({ a, b, op: Math.random() * 0.12 + 0.03 });
      }

      packets = beams.slice(0, 18).map((beam): Packet => ({
        beam,
        t: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        size: Math.random() * 2 + 1.2,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    function drawCoin(c: Coin, frame: number) {
      const { x, y, size, opacity, rot, phase } = c;
      const glow = Math.sin(phase + frame * 0.025) * 0.5 + 0.6;

      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.globalAlpha = opacity * glow;

      ctx!.beginPath();
      ctx!.arc(0, 0, size + 6 * glow, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(253,224,71,${0.4 * glow})`;
      ctx!.lineWidth = 1.2;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.88, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(250,204,21,${0.6 * glow})`;
      ctx!.lineWidth = 0.8;
      ctx!.stroke();

      const g = ctx!.createRadialGradient(-size * 0.25, -size * 0.25, size * 0.05, 0, 0, size * 0.82);
      g.addColorStop(0, "rgba(254,240,138,0.95)");
      g.addColorStop(0.35, "rgba(250,204,21,0.9)");
      g.addColorStop(0.75, "rgba(234,179,8,0.85)");
      g.addColorStop(1, "rgba(154,52,18,0.6)");
      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.78, 0, Math.PI * 2);
      ctx!.fillStyle = g;
      ctx!.fill();

      ctx!.fillStyle = `rgba(0,0,0,${0.75 * glow})`;
      ctx!.font = `900 ${size * 0.85}px Georgia,serif`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("₿", 0, size * 0.05);

      ctx!.restore();
    }

    function drawNode(nd: HexNode) {
      nd.phase += 0.02;
      const pulse = Math.sin(nd.phase) * 0.55 + 0.55;
      const br = nd.brightness;
      ctx!.beginPath();
      ctx!.arc(nd.x, nd.y, nd.r + 6 * pulse, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(250,204,21,${br * 0.3 * pulse})`;
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(250,204,21,${br + 0.2 * pulse})`;
      ctx!.fill();
    }

    function drawRing(rng: Ring) {
      rng.phase += 0.014;
      const t = Math.sin(rng.phase) * 0.5 + 0.5;
      const r = rng.r + (rng.maxR - rng.r) * t;
      const op = rng.opacity * (1 - t) * 0.8;
      ctx!.beginPath();
      ctx!.arc(rng.x, rng.y, r, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(250,204,21,${op})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(rng.x, rng.y, r * 0.65, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(34,211,238,${op * 0.6})`;
      ctx!.lineWidth = 0.9;
      ctx!.stroke();
    }

    const GHOSTS = [
      { rx: 0.05, ry: 0.28, size: 220, op: 0.05, phase: 0 },
      { rx: 0.88, ry: 0.12, size: 180, op: 0.042, phase: 1.6 },
      { rx: 0.48, ry: 0.78, size: 240, op: 0.038, phase: 3.2 },
      { rx: 0.18, ry: 0.68, size: 150, op: 0.034, phase: 4.8 },
      { rx: 0.79, ry: 0.52, size: 130, op: 0.028, phase: 2.4 },
    ];

    let frame = 0;
    let animId: number;

    const tick = () => {
      frame++;
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      GHOSTS.forEach((g) => {
        const pulse = Math.sin(frame * 0.01 + g.phase) * 0.4 + 0.6;
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
        ctx!.lineWidth = 0.8;
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
        ctx!.fillStyle = "rgba(253,224,71,0.85)";
        ctx!.fill();
      });

      hexNodes.forEach((nd) => drawNode(nd));
      rings.forEach((rng) => drawRing(rng));

      coins.forEach((c) => {
        c.phase += 0.02;
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

/* ── Styles (fully updated: responsive, horizontal ticker, fresh hover animations) ── */
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
  33% { transform: translate(120px, -90px); }
  66% { transform: translate(-60px, 60px); }
}
@keyframes floatOrb2 {
  0%,100% { transform: translate(0, 0); }
  33% { transform: translate(-140px, 90px); }
  66% { transform: translate(100px, -60px); }
}
@keyframes floatContent {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
@keyframes particleRise {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: 1; }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-750px); }
}
@keyframes pulseText {
  0%,100% { opacity: 1; text-shadow: 0 0 10px rgba(250,204,21,0.3); }
  50% { opacity: 0.9; text-shadow: 0 0 25px rgba(250,204,21,0.6); }
}
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 150%; }
}
@keyframes coinFloat {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  20% { opacity: 1; transform: scale(1.4) rotate(144deg); }
  80% { opacity: 1; transform: scale(1) rotate(576deg); }
  100% { opacity: 0; transform: scale(0.5) rotate(720deg); }
}
/* NEW: Horizontal Ticker Animation */
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* NEW: Glow Pulse for Cards */
@keyframes cardGlowPulse {
  0% { box-shadow: 0 0 0 0 rgba(250,204,21,0.3); }
  70% { box-shadow: 0 0 0 12px rgba(250,204,21,0); }
  100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
}
/* Hover shine */
@keyframes hoverShine {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.hero-section {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #050816;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 128px 24px 80px;
  cursor: default;
}
.bg-main-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 40%, #0a0f1f, #020617);
}
.bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
  background-size: 55px 55px;
}
.bg-spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 1200px;
  transform: translate(-50%, -50%);
  opacity: 0.25;
  animation: rotateSpotlight 45s linear infinite;
}
.bg-spotlight-inner {
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg, transparent, rgba(250,204,21,0.5), transparent);
  filter: blur(45px);
}
.bg-orb1 {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(234,179,8,0.25);
  filter: blur(150px);
  animation: floatOrb1 22s ease-in-out infinite;
}
.bg-orb2 {
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 550px;
  height: 550px;
  border-radius: 50%;
  background: rgba(6,182,212,0.22);
  filter: blur(170px);
  animation: floatOrb2 28s ease-in-out infinite;
}
.coin-wrapper {
  position: absolute;
  pointer-events: none;
  z-index: 50;
}
.coin-glow {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(250,204,21,0.4);
  filter: blur(18px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.coin-face {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(145deg, #fde68a, #eab308, #f97316);
  border: 2px solid #fef3c7;
  box-shadow: 0 0 15px rgba(250,204,21,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 24px;
  color: #000;
  animation: spin 1.6s linear infinite;
}
.content-wrapper {
  position: relative;
  z-index: 15;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  animation: floatContent 6s ease-in-out infinite;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(234,179,8,0.12);
  border: 1px solid rgba(234,179,8,0.4);
  padding: 12px 28px;
  border-radius: 9999px;
  margin-bottom: 36px;
  backdrop-filter: blur(16px);
}
.badge-text {
  color: #fde68a;
  font-weight: 700;
}
.heading {
  font-size: clamp(2.8rem, 8vw, 5.2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 32px;
  text-shadow: 0 0 35px rgba(250,204,21,0.5);
}
.heading-gradient {
  display: block;
  background: linear-gradient(135deg, #fef9c3, #eab308, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulseText 3.2s ease-in-out infinite;
}
.description {
  max-width: 896px;
  margin: 0 auto 52px;
  font-size: 1.28rem;
  color: #cbd5e1;
  line-height: 1.7;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 28px;
  max-width: 1024px;
  margin: 0 auto 56px;
}
.stat-card {
  position: relative;
  overflow: hidden;
  background: rgba(20, 24, 44, 0.6);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 36px;
  padding: 34px 24px;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: default;
  will-change: transform;
}
/* NEW: Attractive hover animation for stat cards - removes previous simple translate/scale */
.stat-card:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(30, 35, 55, 0.8);
  border-color: rgba(250,204,21,0.7);
  box-shadow: 0 25px 45px -12px rgba(0,0,0,0.6), 0 0 0 2px rgba(250,204,21,0.3);
  transition: all 0.3s ease-out;
}
.stat-card:hover .stat-number {
  background: linear-gradient(135deg, #facc15, #ffb347);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
  transform: scale(1.05);
  transition: 0.2s;
}
.stat-card:hover svg {
  filter: drop-shadow(0 0 8px #facc15);
  transform: rotate(5deg) scale(1.08);
  transition: all 0.3s;
}
/* Additional shine effect on hover */
.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(250,204,21,0.15), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}
.stat-card:hover::after {
  left: 150%;
}
.stat-number {
  font-size: 3.2rem;
  font-weight: 900;
  color: #fff;
  margin: 18px 0 12px;
  transition: all 0.25s;
}
.stat-label {
  color: #a0afc7;
  font-weight: 500;
}
.sub-desc {
  max-width: 768px;
  margin: 0 auto 32px;
  font-size: 1.18rem;
  color: #cbd5e1;
}
.no-risk-text {
  color: #fde68a;
  font-weight: 700;
  font-size: 1.28rem;
  margin-bottom: 52px;
}
.cta-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(105deg, #facc15, #eab308, #f97316);
  background-size: 150% 100%;
  color: #000;
  font-weight: 900;
  padding: 20px 52px;
  border-radius: 60px;
  font-size: 1.2rem;
  box-shadow: 0 5px 25px rgba(250,204,21,0.5);
  margin-bottom: 70px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.2);
  border: none;
  cursor: pointer;
  letter-spacing: 0.5px;
}
/* NEW attractive hover for CTA: remove previous scale, more dynamic */
.cta-btn:hover {
  transform: translateY(-4px) scale(1.02);
  background-position: 100% 0;
  box-shadow: 0 15px 35px -5px rgba(250,204,21,0.7);
  gap: 18px;
}
.cta-btn:hover svg {
  transform: translateX(5px);
  transition: 0.2s;
}
.cta-btn:active {
  transform: translateY(2px);
}
.cta-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 60%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
  transform: skewX(-15deg);
  animation: shimmer 2.2s ease-in-out infinite;
}

/* TRADERS AVATAR - NEW HOVER */
.traders-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
}
.trader-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid rgba(250,204,21,0.6);
  background: linear-gradient(145deg, #facc15, #eab308);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(250,204,21,0.4);
  transition: all 0.3s ease;
  margin-left: -18px;
  cursor: pointer;
}
.trader-avatar:first-child { margin-left: 0; }
/* NEW: Attractive hover effect for avatars (removes previous transform) */
.trader-avatar:hover {
  transform: scale(1.12) rotate(4deg);
  border-color: #fff;
  box-shadow: 0 0 0 5px rgba(250,204,21,0.5), 0 15px 25px -5px rgba(0,0,0,0.5);
  filter: brightness(1.1);
  transition: all 0.25s;
}
.trust-text {
  color: #cbd5e1;
  font-size: 1.12rem;
  margin-bottom: 42px;
}
.trust-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 44px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.2s;
}
.trust-item span {
  color: #fff;
  font-weight: 700;
}
.trust-divider {
  width: 1px;
  height: 34px;
  background: #334155;
}

/* ========= HORIZONTAL MOVING COMPONENTS (Ticker + Scrolling Items) ========= */
.horizontal-ticker-section {
  width: 100%;
  margin: 24px 0 48px;
  overflow: hidden;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(250,204,21,0.3);
  border-bottom: 1px solid rgba(250,204,21,0.3);
  padding: 12px 0;
}
.ticker-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.ticker-scroll {
  display: inline-flex;
  animation: tickerScroll 28s linear infinite;
  gap: 48px;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 6px 20px;
  background: rgba(20, 24, 44, 0.6);
  border-radius: 60px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(250,204,21,0.3);
  transition: all 0.25s ease;
}
.ticker-item:hover {
  transform: scale(1.05);
  background: rgba(250,204,21,0.15);
  border-color: #facc15;
  box-shadow: 0 0 15px rgba(250,204,21,0.4);
}
.ticker-symbol {
  font-weight: 900;
  color: #facc15;
}
.ticker-change {
  font-weight: 700;
  color: #4ade80;
}
.ticker-change.negative {
  color: #f87171;
}
/* second horizontal moving row: crypto chips sliding opposite direction */
.horizontal-scroll-reverse {
  margin-top: 16px;
}
.reverse-scroll {
  display: inline-flex;
  animation: tickerScroll 22s linear reverse infinite;
  gap: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 80px 16px 56px;
  }
  .bg-spotlight {
    width: 700px;
    height: 700px;
  }
  .bg-orb1, .bg-orb2 {
    opacity: 0.5;
  }
  .coin-glow {
    width: 48px;
    height: 48px;
  }
  .coin-face {
    font-size: 18px;
  }
  .content-wrapper {
    padding: 0 6px;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 36px;
  }
  .stats-grid {
    gap: 20px;
    margin-bottom: 48px;
  }
  .stat-card {
    padding: 24px 16px;
  }
  .stat-number {
    font-size: 2.4rem;
  }
  .sub-desc {
    font-size: 0.98rem;
  }
  .no-risk-text {
    font-size: 1.1rem;
    margin-bottom: 38px;
  }
  .cta-btn {
    width: 90%;
    padding: 16px 24px;
    font-size: 1rem;
    margin-bottom: 48px;
  }
  .trader-avatar {
    width: 56px;
    height: 56px;
    margin-left: -12px;
  }
  .trust-row {
    gap: 24px;
  }
  .ticker-item {
    font-size: 0.9rem;
    padding: 4px 14px;
    gap: 8px;
  }
  .horizontal-ticker-section {
    margin: 20px 0 36px;
  }
}
@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .heading {
    font-size: 2.2rem;
  }
  .ticker-scroll {
    gap: 24px;
  }
  .ticker-item {
    font-size: 0.8rem;
    padding: 3px 10px;
  }
}
`;

// ── Hero Component ───────────────────────────────────────────────────────

export default function Hero() {
  const [coins, setCoins] = useState<HeroCoin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${(i * 3.2 + 8) % 100}%`,
        duration: 13 + (i % 12),
        delay: (i * 0.19) % 6,
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.2) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const batch: HeroCoin[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() * 110 - 55),
      y: y + (Math.random() * 100 - 50),
    }));

    setCoins((prev) => [...prev, ...batch]);

    setTimeout(() => {
      setCoins((prev) =>
        prev.filter((coin) => !batch.some((c) => c.id === coin.id))
      );
    }, 2600);
  };

  // Data for horizontal moving components
  const tickerItems = [
    { symbol: "BTC/USDT", change: "+3.42%", positive: true },
    { symbol: "ETH/USDT", change: "+2.18%", positive: true },
    { symbol: "SOL/USDT", change: "+5.67%", positive: true },
    { symbol: "BNB/USDT", change: "+1.92%", positive: true },
    { symbol: "XRP/USDT", change: "+0.87%", positive: true },
    { symbol: "ADA/USDT", change: "+2.33%", positive: true },
    { symbol: "DOGE/USDT", change: "+8.21%", positive: true },
    { symbol: "DOT/USDT", change: "-1.24%", positive: false },
  ];

  const tickerItemsReverse = [
    { symbol: "AVAX/USDT", change: "+4.15%", positive: true },
    { symbol: "MATIC/USDT", change: "+3.03%", positive: true },
    { symbol: "LINK/USDT", change: "+2.76%", positive: true },
    { symbol: "UNI/USDT", change: "+1.44%", positive: true },
    { symbol: "ATOM/USDT", change: "-0.56%", positive: false },
    { symbol: "FIL/USDT", change: "+6.32%", positive: true },
  ];

  return (
    <>
      <style>{styles}</style>
      <section
        ref={sectionRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
      >
        {/* Background layers */}
        <div className="bg-main-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1639133893916-a711d8af8c0a?q=80&w=1332&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
            zIndex: 0,
          }}
        />
        <div className="bg-grid" />
        <div className="bg-spotlight">
          <div className="bg-spotlight-inner" />
        </div>
        <div className="bg-orb1" />
        <div className="bg-orb2" />

        <BitcoinCanvas />
        <TrailCanvas containerRef={sectionRef} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              bottom: "-30px",
              width: "5px",
              height: "5px",
              background: "#facc15",
              borderRadius: "50%",
              animation: `particleRise ${p.duration}s ${p.delay}s infinite`,
              zIndex: 2,
            }}
          />
        ))}

        {/* Coins on hover effect */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="coin-wrapper"
            style={{
              left: coin.x,
              top: coin.y,
              animation: `coinFloat 2.6s ease-out forwards`,
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
            <span className="badge-text">Asia's Biggest Demo Trading Competition</span>
          </div>
          <h1 className="heading">
            Join Asia's Biggest
            <span className="heading-gradient">Demo Trading Competition</span>
          </h1>
          <p className="description">
            Trade with <strong>$10,000 virtual funds</strong>, compete for real
            cash-equivalent rewards, and prove you belong among the top traders.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <Trophy color="#facc15" size={44} style={{ margin: "0 auto" }} />
              <div className="stat-number">$2,000</div>
              <p className="stat-label">Grand Prize</p>
            </div>
            <div className="stat-card">
              <DollarSign color="#22d3ee" size={44} style={{ margin: "0 auto" }} />
              <div className="stat-number">$10,000</div>
              <p className="stat-label">Demo Balance</p>
            </div>
            <div className="stat-card">
              <TrendingUp color="#4ade80" size={44} style={{ margin: "0 auto" }} />
              <div className="stat-number">Top 20</div>
              <p className="stat-label">Win Live-Account Rewards</p>
            </div>
          </div>

          <p className="sub-desc">
            Whether you're a day trader, scalper, or swing specialist — your
            skills decide your rank.
          </p>
          <p className="no-risk-text">
            🚀 No real money required. No risk. Just pure competition.
          </p>

          {/* CTA Button */}
          <a href="#contact" className="cta-btn">
            <span className="cta-shimmer" />
            Start Trading – Free Entry
            <ArrowUpRight size={20} />
          </a>

          {/* === HORIZONTAL MOVING COMPONENTS (Two separate sliding rows) === */}
          <div className="horizontal-ticker-section">
            <div className="ticker-container">
              <div className="ticker-scroll">
                {[...tickerItems, ...tickerItems].map((item, idx) => (
                  <div key={idx} className="ticker-item">
                    <span className="ticker-symbol">{item.symbol}</span>
                    <span className={`ticker-change ${!item.positive ? 'negative' : ''}`}>
                      {item.change}
                    </span>
                    <Sparkles size={14} color="#facc15" />
                  </div>
                ))}
              </div>
            </div>
            <div className="ticker-container horizontal-scroll-reverse">
              <div className="reverse-scroll">
                {[...tickerItemsReverse, ...tickerItemsReverse].map((item, idx) => (
                  <div key={idx} className="ticker-item">
                    <span className="ticker-symbol">{item.symbol}</span>
                    <span className={`ticker-change ${!item.positive ? 'negative' : ''}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traders + Trust */}
          <div className="traders-row">
            {[
              "https://i.pravatar.cc/150?img=12",
              "https://i.pravatar.cc/150?img=32",
              "https://i.pravatar.cc/150?img=45",
              "https://i.pravatar.cc/150?img=68",
            ].map((avatar, index) => (
              <div key={index} className="trader-avatar">
                <img
                  src={avatar}
                  alt={`Trader ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}
          </div>
          <p className="trust-text">
            ⚡ Trusted by Taiwan, TJR, JM, AMAS, and 70k+ other traders
          </p>
          <div className="trust-row">
            <div className="trust-item">
              <Star color="#facc15" fill="#facc15" size={20} />
              <span>Trustpilot 4.9 ★</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <ShieldCheck color="#22d3ee" size={20} />
              <span>Powered by Capital</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}