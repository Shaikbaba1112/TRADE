import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, DollarSign, BarChart3 } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";

const Skills = () => {
  // ---------- Bitcoin hover effect ----------
  const [coins, setCoins] = useState([]);
  const coinId = useRef(0);
  const sectionRef = useRef(null);
  const throttleRef = useRef(false);

  const addCoin = useCallback((e) => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    requestAnimationFrame(() => {
      throttleRef.current = false;
    });

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = coinId.current++;

    setCoins((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => c.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      coinId.current = 0;
    };
  }, []);
  // ----------------------------------------

  const cards = [
    {
      title: "15-Day Challenge",
      icon: Clock,
      desc: "Trade with a $10,000 demo account on MT5.",
    },
    {
      title: "Prize Pool",
      icon: DollarSign,
      desc: "Win up to $2,000 in cash rewards.",
    },
    {
      title: "Live Leaderboard",
      icon: BarChart3,
      desc: "Track rankings in real-time.",
    },
    {
      title: "Top Rewards",
      icon: Trophy,
      desc: "Cash prizes, bonuses, and credits.",
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={addCoin}
      className="relative py-24 px-6 bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1631384916671-3d4be55a8c92?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      {/* Bitcoin particles */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.span
            key={coin.id}
            initial={{ opacity: 1, scale: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.5, rotate: 360, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: coin.x,
              top: coin.y,
              fontSize: "24px",
              color: "#F59E0B",
              pointerEvents: "none",
              zIndex: 100,
              textShadow: "0 0 15px rgba(245,158,11,0.9)",
            }}
          >
            ₿
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white">
            SMART 
            <span className="block text-yellow-400">
              TRADING
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Trade risk-free, compete globally, and win real rewards.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="bg-white/5 border border-yellow-500/20 backdrop-blur-xl rounded-3xl p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                <card.icon
                  size={32}
                  className="text-yellow-400"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {card.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-16"
        >
          {/* <a
            href="#register"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:scale-105 transition"
          >
            Join Now 🚀
          </a> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;