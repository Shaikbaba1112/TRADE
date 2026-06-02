import { useState, useEffect, useRef } from "react";
import {
  Trophy,
  DollarSign,
  TrendingUp,
  Star,
  ShieldCheck,
  Clock,
  Users,
  Gift,
  ChevronRight,
  BarChart3,
  Medal,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ── Countdown Timer Component ─────────────────────────────────────────────

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3 sm:gap-5 md:gap-6 mb-8 md:mb-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center bg-black/40 backdrop-blur-md rounded-2xl px-3 py-2 sm:px-5 sm:py-3 min-w-[60px] sm:min-w-[80px] border border-gold/20"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Horizontal Ticker Component ──────────────────────────────────────────

const HorizontalTicker = () => {
  const tickerItems = [
    { text: "🚀 No Real Money Required" },
    { text: "💰 No Deposit Needed" },
    { text: "⚡ Instant MT5 Access" },
    { text: "🏆 Win $2,000 Grand Prize" },
    { text: "📊 Trade with $10,000 Virtual Funds" },
  ];

  return (
    <div className="w-full overflow-hidden bg-gold/5 border-y border-gold/20 py-2 sm:py-3 mb-8 md:mb-12">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 mx-4 sm:mx-6 text-gold-light text-sm sm:text-base font-medium"
          >
            <span>{item.text}</span>
            <Sparkles size={14} className="text-gold" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Floating Particles Background ────────────────────────────────────────

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedX: number;
      speedY: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = 80;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.3 + 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// ── Main Hero Component ───────────────────────────────────────────────────

export default function Hero() {
  // Set target date for countdown (next competition round)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 13);
  targetDate.setHours(23, 59, 59, 0);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1639133893916-a711d8af8c0a?q=80&w=1332&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-[120px] z-0 animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-[120px] z-0 animate-pulse-slow animation-delay-1000" />
      <FloatingParticles />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        {/* Horizontal Ticker */}
        <HorizontalTicker />

        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Trophy size={18} className="text-gold" />
            <span className="text-gold-light text-sm font-medium">
              Asia's Biggest Demo Trading Competition
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Join Asia's Biggest</span>
            <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mt-2">
              Demo Trading Competition
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Trade with <span className="text-gold font-semibold">$10,000 virtual funds</span>, compete for{" "}
            <span className="text-gold font-semibold">real cash-equivalent rewards</span>, and prove you belong
            among the top traders.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
            {[
              { icon: Trophy, value: "$2,000", label: "Grand Prize", color: "from-yellow-500 to-yellow-600" },
              { icon: DollarSign, value: "$10,000", label: "Demo Balance", color: "from-blue-500 to-blue-600" },
              { icon: TrendingUp, value: "Top 20", label: "Win Live-Account Rewards", color: "from-green-500 to-green-600" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <stat.icon size={40} className="mx-auto text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Sub Description */}
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Whether you're a day trader, scalper, or swing specialist — your skills decide your rank.
          </p>

          {/* No Risk Text */}
          <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-8">
            <ShieldCheck size={18} className="text-gold" />
            <span className="text-gold-light font-medium">No real money required. No risk. Just pure competition.</span>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock size={20} className="text-gold" />
              <span className="text-gray-300 font-medium">Registration closes in</span>
            </div>
            <CountdownTimer targetDate={targetDate} />
          </div>

          {/* CTA Button */}
          <a
            href="#register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gold/30 mb-12"
          >
            Start Trading – Free Entry
            <ArrowUpRight size={20} />
          </a>

          {/* Trust Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/150?img=12",
                "https://i.pravatar.cc/150?img=32",
                "https://i.pravatar.cc/150?img=45",
                "https://i.pravatar.cc/150?img=68",
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full border-2 border-black overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10"
                >
                  <img src={avatar} alt={`Trader ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-gold fill-gold" />
              <span className="text-gray-300 text-sm">Trusted by 50k+ traders</span>
            </div>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-gold fill-gold" />
              <span className="text-gray-400 text-xs">Trustpilot 4.9 ★</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold" />
              <span className="text-gray-400 text-xs">Powered by Capital</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Custom Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .bg-gold {
          background-color: #facc15;
        }
        .bg-gold\/10 {
          background-color: rgba(250, 204, 21, 0.1);
        }
        .bg-gold\/20 {
          background-color: rgba(250, 204, 21, 0.2);
        }
        .bg-gold\/5 {
          background-color: rgba(250, 204, 21, 0.05);
        }
        .text-gold {
          color: #facc15;
        }
        .text-gold-light {
          color: #fde047;
        }
        .border-gold {
          border-color: #facc15;
        }
        .border-gold\/20 {
          border-color: rgba(250, 204, 21, 0.2);
        }
        .border-gold\/30 {
          border-color: rgba(250, 204, 21, 0.3);
        }
        .border-gold\/50 {
          border-color: rgba(250, 204, 21, 0.5);
        }
        .from-gold {
          --tw-gradient-from: #facc15;
          --tw-gradient-to: rgba(250, 204, 21, 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
        .to-gold-dark {
          --tw-gradient-to: #eab308;
        }
        .hover\\:shadow-gold\/20:hover {
          --tw-shadow-color: rgba(250, 204, 21, 0.2);
        }
        .hover\\:shadow-gold\/30:hover {
          --tw-shadow-color: rgba(250, 204, 21, 0.3);
        }
        .shadow-gold\/20 {
          --tw-shadow-color: rgba(250, 204, 21, 0.2);
        }
        .hover\\:from-gold-dark:hover {
          --tw-gradient-from: #eab308;
          --tw-gradient-to: rgba(234, 179, 8, 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
        .hover\\:to-gold:hover {
          --tw-gradient-to: #facc15;
        }
        .hover\\:shadow-lg:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        .group:hover .group-hover\\:shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}