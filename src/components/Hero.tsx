import { motion } from 'framer-motion';
import {
  FileText,
  Code2,
  User,
  Mail,
  LogIn,
  ShoppingCart,
  Star,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden min-h-screen pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>

      <div className="absolute bottom-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>

      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-3 bg-slate-800/60 border border-cyan-400/20 px-5 py-3 rounded-full mb-6 backdrop-blur-xl shadow-xl"
          >
            <ShoppingCart
              className="text-cyan-400"
              size={20}
            />

            <span className="text-cyan-300 font-semibold tracking-wide">
              #1 Smart Electronics Store
            </span>
          </motion.div>

          {/* Heading */}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-400 mb-6"
          >
            The smartest way to shop for electronics
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 mb-8 leading-relaxed text-lg"
          >
            At Electro-Mart, we bring you the latest and
            greatest in electronics with a futuristic
            shopping experience. Explore premium gadgets,
            gaming accessories, laptops, smart devices and
            much more with ultra-fast delivery and trusted
            support.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            {/* Contact */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.08,
                boxShadow:
                  '0px 0px 30px rgba(34,211,238,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>

              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition"
              />

              Contact Us
            </motion.a>

            {/* Browse */}
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.08,
                borderColor: '#22d3ee',
                boxShadow:
                  '0px 0px 25px rgba(34,211,238,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm"
            >
              <FileText size={20} />
              Browse Products
            </motion.a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: ShieldCheck,
                title: 'Trusted Products',
              },
              {
                icon: Zap,
                title: 'Fast Delivery',
              },
              {
                icon: Star,
                title: 'Top Quality',
              },
              {
                icon: ShoppingCart,
                title: 'Easy Shopping',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="flex items-center gap-3 bg-slate-800/40 border border-slate-700 rounded-2xl p-4 backdrop-blur-xl shadow-lg"
              >
                <item.icon
                  className="text-cyan-400"
                  size={24}
                />

                <span className="text-gray-200 font-medium">
                  {item.title}
                </span>
              </motion.div>
            ))}
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
                  boxShadow:
                    '0px 0px 25px rgba(34,211,238,0.4)',
                }}
                className="p-4 bg-slate-800/70 border border-slate-700 rounded-2xl text-gray-300 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-lg"
              >
                <Icon size={26} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow */}
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


          {/* Main Hero Card */}
          <motion.div
            whileHover={{
              scale: 1.03,
              rotateY: 5,
            }}
            className="relative bg-slate-800/40 border border-slate-700 rounded-3xl p-5 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Border Glow */}
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/20"></div>

            {/* Floating Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

            {/* PRODUCT IMAGE */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative overflow-hidden rounded-3xl group"
            >
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-400/30 blur-3xl scale-110 animate-pulse"></div>

              {/* Image */}
              <motion.img
                src="https://plus.unsplash.com/premium_photo-1728619312315-eb5c96dc8c70?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="electronics"
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative z-10 w-full h-[420px] object-cover rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.35)]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl z-20"></div>

              {/* Floating Badge */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute top-5 right-5 z-30 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-full font-bold shadow-2xl"
              >
                50% OFF
              </motion.div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 z-30">
                <motion.h2
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-white text-4xl font-black tracking-wide"
                >
                  E-MART
                </motion.h2>

                <p className="text-cyan-300 text-lg font-medium">
                  AI and the Future Way of Shopping
                </p>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping z-20"></div>

              <div className="absolute bottom-16 right-12 w-2 h-2 bg-blue-400 rounded-full animate-bounce z-20"></div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                {
                  value: '10K+',
                  label: 'Products',
                },
                {
                  value: '24/7',
                  label: 'Support',
                },
                {
                  value: '5★',
                  label: 'Reviews',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 text-center"
                >
                  <h4 className="text-cyan-400 text-2xl font-black">
                    {item.value}
                  </h4>

                  <p className="text-gray-400 text-sm">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;