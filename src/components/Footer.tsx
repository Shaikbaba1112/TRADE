import { motion } from 'framer-motion';
import { Code2, User, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-black border-t border-yellow-800/30 px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        />

        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
            }}
            className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="bg-black/40 backdrop-blur-xl border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
          >
            <motion.h3
              animate={{
                textShadow: [
                  '0px 0px 5px rgba(245,158,11,0.4)',
                  '0px 0px 20px rgba(245,158,11,0.9)',
                  '0px 0px 5px rgba(245,158,11,0.4)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="text-2xl font-bold text-white mb-3"
            >
              Shaik Baba
            </motion.h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Full-Stack Developer passionate about creating innovative
              web applications with modern technologies and AI integration.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-black/40 backdrop-blur-xl border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
          >
            <h4 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {[
                'About',
                'Experience',
                'Projects',
                'Skills',
                'Achievements',
                'Contact',
              ].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 8 }}
                    className="text-gray-400 hover:text-yellow-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-yellow-400 transition-all duration-300"></span>
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="bg-black/40 backdrop-blur-xl border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
          >
            <h4 className="text-white font-semibold mb-4 text-lg">
              Connect With Me
            </h4>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Shaikbaba1112"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  y: -5,
                }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-black overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Code2 size={22} className="relative z-10" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/shaik-baba-s1112/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  y: -5,
                }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-black overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <User size={22} className="relative z-10" />
              </motion.a>

              <motion.a
                href="mailto:shaikhbaba9539@email.com"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  y: -5,
                }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-black overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Mail size={22} className="relative z-10" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Animated Divider */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="h-[2px] rounded-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent bg-[length:200%_200%] my-8"
        ></motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-gray-400 text-sm text-center md:text-left"
          >
            © 2026 Shaik Baba. Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="inline-block text-red-400"
            >
              ♥
            </motion.span>{' '}
            using React & Tailwind CSS
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{
              scale: 1.15,
              y: -5,
              boxShadow: '0px 0px 25px rgba(245,158,11,0.7)',
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="relative overflow-hidden w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-black shadow-lg"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 border border-white/20 rounded-xl"
            />

            <ArrowUp size={22} className="relative z-10" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;