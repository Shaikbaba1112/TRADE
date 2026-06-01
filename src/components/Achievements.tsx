import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, DollarSign } from "lucide-react";
import { useState, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Coin {
  id: number;
  x: number;
  y: number;
}

// ──────────────────────────────────────────────────────────────────────────

const Achievements = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const addCoin = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const coin: Coin = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setCoins((prev) => [...prev, coin]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => c.id !== coin.id));
    }, 800);
  };

  const stats = [
    {
      icon: Trophy,
      value: "200+",
      title: "Winners",
    },
    {
      icon: DollarSign,
      value: "$50K+",
      title: "Prize Pool",
    },
    {
      icon: Users,
      value: "5K+",
      title: "Traders",
    },
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      onMouseMove={addCoin}
      className="relative overflow-hidden py-24 px-6 bg-black"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Bitcoin Hover Effect */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{
              opacity: 1,
              scale: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1.8,
              y: -50,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              left: coin.x,
              top: coin.y,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="text-yellow-400 text-2xl font-bold"
          >
            ₿
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Contest
            <span className="block bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto">
            Thousands of traders compete every month and win exciting rewards.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.05,
              }}
              className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-yellow-500/20 p-8 text-center"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/10 to-amber-500/10" />

              <item.icon className="w-14 h-14 text-yellow-400 mx-auto mb-4" />

              <h3 className="text-5xl font-black text-white mb-2">
                {item.value}
              </h3>

              <p className="text-slate-400">{item.title}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          className="text-center mt-16"
        >
          {/* <a
            href="#register"
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold px-10 py-4 rounded-2xl shadow-2xl"
          >
            Join Contest Now
          </a> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;