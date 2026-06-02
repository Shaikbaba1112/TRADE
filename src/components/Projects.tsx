import { motion} from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';

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

// ── Styles (copied from Hero, adapted for Projects) ───────────────────────

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

.projects-section {
  position: relative;
  overflow: hidden;
  background: #050816;
  cursor: default;
  padding: 96px 24px;
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
.projects-particle {
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
  .projects-section {
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
}
`;

// ── Main Projects Component ───────────────────────────────────────────────

const Projects = () => {
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

  // ---------- Trading Contest Data (unchanged) ----------
  const featuredProjects = [
    {
      title: '15-Day Trading Challenge',
      image:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=60',
      description:
        'Compete with traders worldwide using a $10,000 demo account on real MT5 market conditions. Rankings reset every 15 days.',
      problem:
        'Traders lack a risk-free environment to test skills, earn real rewards, and benchmark themselves against peers.',
      role: 'How It Works',
      details:
        'Trade forex, metals, and commodities. Complete at least 10 trades. Accounts exceeding 60% drawdown are disqualified.',
      technologies: [
        '$10,000 Demo',
        'MT5 Platform',
        '1:100 Leverage',
        'FX • Metals',
        'Live Leaderboard',
        'Weekly Prizes',
      ],
      tags: [
        'Trading',
        'Forex',
        'Competition',
        'Demo Account',
        'Prizes',
      ],
      links: { live: '#register', github: '#rules' },
    },
    {
      title: 'Weekly Prize Pool',
      image:
        'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Yml0Y29pbnxlbnwwfHwwfHx8MA%3D%3D',
      description:
        'Top 20 traders win cash, credits, or deposit bonuses every week. Your performance directly decides your reward.',
      problem:
        'Most contests have low rewards and high barriers. We offer real cash prizes with no entry fee.',
      role: 'Prizes',
      details:
        '1st: $2,000 | 2nd: $1,000 | 3rd: $500 | 4th-10th: $200 Credit | 11th-20th: 30% Deposit Bonus.',
      technologies: [
        'Cash Prizes',
        'Credit Bonuses',
        'Deposit Bonuses',
        'Weekly Payouts',
      ],
      tags: [
        'Prizes',
        'Cash',
        'Bonus',
        'Weekly',
      ],
      links: { live: '#prizes', github: '#terms' },
    },
    {
      title: 'Live Leaderboard',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=60',
      description:
        'Track your rank in real time. See profit, number of trades, and drawdown status — total transparency.',
      problem:
        'Opaque scoring and delays in results ruin the competition spirit.',
      role: 'Features',
      details:
        'Real-time updates, minimum 10 trades to qualify, automatic removal if drawdown exceeds 60%.',
      technologies: [
        'Real-time',
        'Rankings',
        'Trades',
        'Drawdown Protection',
      ],
      tags: [
        'Leaderboard',
        'Ranking',
        'Transparency',
      ],
      links: { live: '#leaderboard', github: '#' },
    },
    {
      title: 'How to Participate',
      image:
        'https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
      description:
        'Simple registration, no deposit required. Start trading with your demo account and climb the leaderboard.',
      problem:
        'Complex registration processes discourage talented traders from joining.',
      role: 'Steps',
      details:
        '1. Register with email. 2. Receive $10k demo. 3. Trade for 15 days. 4. Check rankings. 5. Win prizes.',
      technologies: [
        'Free Registration',
        'Demo Account',
        '15 Days',
        'No Deposit',
      ],
      tags: [
        'How to Join',
        'Free',
        'Easy',
      ],
      links: { live: '#register', github: '#' },
    },
  ];

  const moreProjects = [
    {
      title: 'Competition Rules',
      desc: 'Understand drawdown limits, trade requirements, and disqualification criteria.',
      tags: ['Rules', 'Drawdown', 'Eligibility'],
    },
    {
      title: 'Prize Breakdown',
      desc: 'Full details on cash prizes, credit bonuses, and how they are credited.',
      tags: ['Prizes', 'Cash', 'Bonus'],
    },
    {
      title: 'MT5 Platform Guide',
      desc: 'Learn how to use MetaTrader 5 for demo trading – tips and tutorials.',
      tags: ['Platform', 'MT5', 'Guide'],
    },
    {
      title: 'Past Winners',
      desc: 'See success stories and results from previous competition rounds.',
      tags: ['Winners', 'Testimonials', 'Results'],
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <motion.section
        id="projects"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="projects-section"
      >
        {/* Hero‑style background layers */}
        <div className="bg-main-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=600&auto=format&fit=crop&q=60')`,
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
            className="projects-particle"
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

        {/* Original content (with all framer‑motion hover effects preserved) */}
        <div className="relative max-w-7xl mx-auto z-10">
          {/* Heading */}
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl font-extrabold text-white mb-4"
          >
            TRADING{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              CONTEST
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            transition={{ duration: 1 }}
            className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded mb-16"
          ></motion.div>

          {/* Featured Contest Highlights */}
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.01,
                }}
                className="relative overflow-hidden grid md:grid-cols-2 gap-10 items-center bg-black/40 backdrop-blur-xl border border-yellow-800/30 rounded-3xl p-8 group"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

                {/* Floating Glow */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl"></div>

                {/* Image */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    rotate: 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl border border-yellow-800/20 shadow-2xl"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-[420px] object-cover"
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute top-5 left-5 px-4 py-2 bg-yellow-500/20 backdrop-blur-xl border border-yellow-500/30 text-yellow-300 rounded-full text-sm font-semibold"
                  >
                    Live Contest
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.h3
                      whileHover={{ x: 5 }}
                      className="text-3xl font-extrabold text-white"
                    >
                      {project.title}
                    </motion.h3>

                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-full text-xs font-semibold"
                    >
                      Featured
                    </motion.span>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Problem Box */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="bg-yellow-900/20 border border-yellow-800/30 rounded-2xl p-5 mb-5"
                  >
                    <p className="text-gray-200 leading-relaxed">
                      <strong className="text-yellow-400">Problem Solved:</strong>{' '}
                      {project.problem}
                    </p>
                  </motion.div>

                  <p className="text-gray-300 leading-relaxed mb-5">
                    {project.details}
                  </p>

                  <motion.p
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-yellow-400 font-bold mb-5"
                  >
                    Your Role: {project.role}
                  </motion.p>

                  {/* Contest Features */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{
                          scale: 1.1,
                          y: -3,
                        }}
                        className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-full text-sm shadow-lg cursor-pointer"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{
                          scale: 1.08,
                        }}
                        className="text-sm text-gray-400 hover:text-yellow-300 transition"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href={project.links.live}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: '0px 0px 25px rgba(245,158,11,0.5)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-6 py-3 rounded-2xl font-semibold shadow-xl"
                    >
                      <ExternalLink size={18} />
                    </motion.a>

                    <motion.a
                      href={project.links.github}
                      whileHover={{
                        scale: 1.08,
                        borderColor: '#f59e0b',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 border border-yellow-500 text-yellow-300 hover:bg-yellow-500/10 px-6 py-3 rounded-2xl font-semibold backdrop-blur-sm"
                    >
                      <Trophy size={18} />
                      View Prizes
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Contest Info */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-extrabold text-white mb-10">
              More Contest Details
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {moreProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: '0px 0px 30px rgba(245,158,11,0.2)',
                  }}
                  className="relative overflow-hidden bg-black/50 backdrop-blur-xl border border-yellow-800/30 rounded-3xl p-7 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h4>

                    <p className="text-gray-400 leading-relaxed mb-5">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-full text-xs"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0px 0px 40px rgba(245,158,11,0.3)',
            }}
            className="relative overflow-hidden bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-3xl p-12 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10"></div>

            <div className="relative z-10">
              <motion.h3
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-4xl font-extrabold text-white mb-4"
              >
                Ready to Compete?
              </motion.h3>

              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Join thousands of traders in the TD Trading Contest. Risk‑free demo,
                real prizes, and global leaderboard – completely free.
              </p>

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0px 0px 30px rgba(245,158,11,0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-10 py-4 rounded-2xl font-bold shadow-2xl"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Projects;