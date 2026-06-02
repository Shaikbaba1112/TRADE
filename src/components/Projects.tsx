import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

interface Coin {
  id: number;
  x: number;
  y: number;
}

// ──────────────────────────────────────────────────────────────────────────

const Projects = () => {
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

  // ---------- Trading Contest Data ----------
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
    <motion.section
      id="projects"
      ref={sectionRef}
      onMouseMove={addCoin}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      {/* Background Glow – gold accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Bitcoin particles */}
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.span
            key={coin.id}
            initial={{ opacity: 1, scale: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.5, rotate: 360, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: coin.x,
              top: coin.y,
              fontSize: '24px',
              color: '#F59E0B',
              pointerEvents: 'none',
              zIndex: 100,
              textShadow: '0 0 15px rgba(245,158,11,0.9)',
            }}
          >
            ₿
          </motion.span>
        ))}
      </AnimatePresence>

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
              href="#register"
              whileHover={{
                scale: 1.08,
                boxShadow: '0px 0px 30px rgba(245,158,11,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-10 py-4 rounded-2xl font-bold shadow-2xl"
            >
              connect
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;