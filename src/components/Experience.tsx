import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, DollarSign, TrendingUp } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Coin {
  id: number;
  x: number;
  y: number;
}

// ──────────────────────────────────────────────────────────────────────────

const Experience = () => {
  // ---------- Bitcoin hover effect ----------
  const [coins, setCoins] = useState<Coin[]>([]);
  const coinId = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const throttleRef = useRef<boolean>(false);

  const addCoin = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    requestAnimationFrame(() => {
      throttleRef.current = false;
    });

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

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

  const rewards = [
    { rank: "1st", reward: "$2,000" },
    { rank: "2nd", reward: "$1,000" },
    { rank: "3rd", reward: "$500" },
    { rank: "4th-10th", reward: "$200 Credit Bonus" },
    { rank: "11th-20th", reward: "30% Deposit Bonus" },
  ];

  return (
    <section
      id="competition"
      ref={sectionRef}
      onMouseMove={addCoin}
      className="relative py-24 overflow-hidden bg-[#050816]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1621264448270-9ef00e88a935?q=80&w=657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      {/* Background Glow & Grid */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-yellow-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

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
              color: "#F7931A",
              pointerEvents: "none",
              zIndex: 100,
              textShadow: "0 0 12px rgba(247,147,26,0.9)",
            }}
          >
            ₿
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
            <Trophy className="text-yellow-400" size={18} />
            <span className="text-yellow-300 font-semibold">
              Competition Guide
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            How It
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-slate-300 max-w-3xl mx-auto text-xl">
            Compete 15 Days. Rank Up. Win Rewards.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8"
          >
            <Clock className="text-yellow-400 mb-5" size={40} />
            <h3 className="text-2xl font-bold text-white mb-4">
              Week 1: Build Foundation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Trade a $10,000 demo account under real MT5 market conditions.
              Focus on consistency, entries and risk management.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8"
          >
            <TrendingUp className="text-cyan-400 mb-5" size={40} />
            <h3 className="text-2xl font-bold text-white mb-4">
              Week 2: Leaderboard Battle
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Compete for ranking positions. Complete at least 10 trades.
              Accounts exceeding 60% drawdown are removed.
            </p>
          </motion.div>
        </div>

        {/* Account Conditions */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            "$10,000 Demo",
            "1:100 Leverage",
            "MT5 Platform",
            "FX • Metals • Commodities",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-slate-700 rounded-3xl p-6 text-center backdrop-blur-xl"
            >
              <h3 className="text-yellow-400 font-bold text-xl">{item}</h3>
            </motion.div>
          ))}
        </div>

        {/* Rewards */}
        <div className="mb-20">
          <h3 className="text-center text-4xl font-black text-white mb-10">
            Rewards for Top Traders
          </h3>

          <div className="grid md:grid-cols-5 gap-5">
            {rewards.map((reward) => (
              <motion.div
                key={reward.rank}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-3xl p-6 text-center backdrop-blur-xl"
              >
                <h4 className="text-yellow-400 font-bold text-xl mb-3">
                  {reward.rank}
                </h4>
                <p className="text-white font-bold">{reward.reward}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-cyan-500/10 border border-yellow-500/20 rounded-[40px] p-12 backdrop-blur-xl"
        >
          <DollarSign className="mx-auto text-yellow-400 mb-6" size={50} />
          <h3 className="text-4xl font-black text-white mb-5">
            Ready To Compete?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Join thousands of traders competing every 15 days for live-account
            rewards and leaderboard recognition.
          </p>
          {/* <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-lg shadow-2xl">
            Start Trading – Free Entry
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;