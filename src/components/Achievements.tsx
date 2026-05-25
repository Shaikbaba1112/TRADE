import { motion } from 'framer-motion';
import { Award, BookOpen, Trophy } from 'lucide-react';

const Achievements = () => {
  const certifications = [
    {
      title: 'E-MART Products',
      provider: 'AI',
      date: 'May 2026',
      type: 'New',
      featured: true,
      description:
        'Latest products integrated with AI and IoT technologies.',
    },

    {
      title: 'E-MART Customer Satisfaction',
      provider: 'Customer Reviews',
      date: 'May 2026',
      type: 'New',
      featured: true,
      description:
        'Highly rated products based on customer feedback and reviews.',
    },
  ];

  const achievements = [
    {
      icon: BookOpen,
      title: 'New Products with Affordable Price',
      desc:
        'Launched a new line of affordable products that received positive customer feedback and increased sales.',
      date: 'May 2026',
    },

    {
      icon: Trophy,
      title: 'Good Discounts',
      desc:
        'Offered attractive discounts on selected products, leading to increased sales and customer satisfaction.',
      date: 'May 2026',
    },
  ];

  const summary = [
    { label: 'Certifications', value: '2' },
    { label: 'Publications', value: '1' },
    { label: 'Achievements', value: '2' },
  ];

  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-white mb-4"
        >
          E-MART{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Achievements
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '120px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-16"
        ></motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-extrabold text-white mb-10 flex items-center gap-3"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Award className="w-10 h-10 text-cyan-400" />
            </motion.div>

            🎓 User Satisfaction
          </motion.h3>

          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow:
                    '0px 0px 30px rgba(34,211,238,0.2)',
                }}
                className={`relative overflow-hidden border rounded-3xl p-8 backdrop-blur-xl group ${
                  cert.featured
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-cyan-400/30'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

                {/* Floating Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex-1">
                      <motion.h4
                        whileHover={{ x: 5 }}
                        className="text-2xl font-extrabold text-white mb-2"
                      >
                        {cert.title}
                      </motion.h4>

                      <p
                        className={`font-semibold ${
                          cert.featured
                            ? 'text-cyan-300'
                            : 'text-gray-400'
                        }`}
                      >
                        {cert.provider}
                      </p>
                    </div>

                    {cert.featured && (
                      <motion.span
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-full text-sm font-semibold"
                      >
                        ⭐ Featured Achievement
                      </motion.span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-5">
                    <span className="text-gray-400 text-sm">
                      {cert.date}
                    </span>

                    <span className="px-3 py-1 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-full text-xs">
                      {cert.type}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm mb-5">
                    {cert.description}
                  </p>

                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      x: 5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm"
                  >
                    View Certificate →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recognition */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-extrabold text-white mb-10 flex items-center gap-3"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              <Trophy className="w-10 h-10 text-yellow-400" />
            </motion.div>

            🏆 Customer Recommendation
          </motion.h3>

          {/* Achievement Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow:
                    '0px 0px 35px rgba(59,130,246,0.2)',
                }}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 group"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                  >
                    <achievement.icon className="w-14 h-14 text-cyan-400 mb-5" />
                  </motion.div>

                  <h4 className="text-2xl font-bold text-white mb-3">
                    {achievement.title}
                  </h4>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {achievement.desc}
                  </p>

                  <p className="text-gray-400 text-xs">
                    {achievement.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {summary.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  boxShadow:
                    '0px 0px 25px rgba(34,211,238,0.2)',
                }}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 text-center group"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-5xl font-extrabold text-cyan-400 mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                '0px 0px 40px rgba(34,211,238,0.2)',
            }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-10 backdrop-blur-xl"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>

            <div className="relative z-10">
              <h4 className="text-3xl font-extrabold text-white mb-5">
                📄 E-MART View
              </h4>

              <div className="flex flex-wrap gap-6">
                <motion.a
                  href="#"
                  whileHover={{
                    scale: 1.08,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-lg"
                >
                  All Products →
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{
                    scale: 1.08,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-lg"
                >
                  Recommended Products →
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Achievements;