import { motion } from 'framer-motion';
import { FileText, Code2, User, Mail, LogIn } from 'lucide-react';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black"
    >
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-cyan-400 text-lg mb-3 font-semibold tracking-widest uppercase"
          >
            Welcome to my Electro-Mart
          </motion.h2>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl font-extrabold text-white mb-4 leading-tight"
          >
            Electro-Mart:
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Shop Smartly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-400 mb-6"
          >
            The smartest way to shop for electronics
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 mb-8 leading-relaxed text-lg"
          >
            At Electro-Mart, we bring you the latest and greatest in
            electronics with a seamless shopping experience. From
            cutting-edge gadgets to everyday essentials, we have
            everything you need to stay connected and powered up.
            Shop smartly with us and discover a world of innovation
            at your fingertips.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            {/* SIGN IN BUTTON */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.08,
                boxShadow: '0px 0px 25px rgba(59,130,246,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition"
              />
              Contact Us
            </motion.a>

            {/* Browse Products */}
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.08,
                borderColor: '#22d3ee',
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm"
            >
              <FileText size={20} />
              Browse Products
            </motion.a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5">
            {[Code2, User, Mail].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{
                  y: -8,
                  scale: 1.15,
                  rotate: 5,
                }}
                className="p-4 bg-slate-800/70 border border-slate-700 rounded-2xl text-gray-300 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-lg"
              >
                <Icon size={26} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Hero Card */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center"
        >
          {/* Floating Glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30"
          ></motion.div>

          {/* Main Card */}
          <motion.div
            whileHover={{
              scale: 1.03,
              rotateY: 5,
            }}
            className="relative bg-slate-800/40 border border-slate-700 rounded-3xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/20"></div>

            {/* Floating Circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

            {/* Product Showcase */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative aspect-square bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl"
            >
              E-MART
            </motion.div>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <h4 className="text-cyan-400 text-xl font-bold">10K+</h4>
                <p className="text-gray-400 text-sm">Products</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <h4 className="text-cyan-400 text-xl font-bold">24/7</h4>
                <p className="text-gray-400 text-sm">Support</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;