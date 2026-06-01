import { useState, useRef } from 'react';
import {
  Trophy,
  DollarSign,
  Award,
  Calendar,
  type LucideIcon,
} from 'lucide-react';

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

/* ── background ── */
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
  background: yellow;
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
`;

// ── Types ──
interface StatItem {
  icon: LucideIcon;
  value: string;
  title: string;
  iconColor: string;
}

interface Coin {
  id: number;
  x: number;
  y: number;
}

// ── Stat card ──
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

// ── About ──
const About = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.15) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const batch: Coin[] = Array.from({ length: 3 }, (_, i) => ({
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
        {/* ── Background image ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1707075891558-ec2b81527409?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.22,
            filter: 'brightness(0.7)',
          }}
        />

        {/* ── background layers ──
        <div className="about-bg-gradient" />
        <div className="about-bg-grid" />
        <div className="about-spotlight">
          <div className="about-spotlight-inner" />
        </div>
        <div className="about-orb1" />
        <div className="about-orb2" /> */}

        {/* ── coin burst — section-wide ── */}
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

        {/* ── content ── */}
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
};

export default About;