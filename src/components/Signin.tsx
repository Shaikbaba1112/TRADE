import { motion } from 'framer-motion';
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Cpu,
  Zap,
  Star,
} from 'lucide-react';

const SignIn = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 py-20"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Floating Particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute top-32 left-20 w-5 h-5 rounded-full bg-cyan-400 blur-sm"
      ></motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-40 right-32 w-6 h-6 rounded-full bg-blue-400 blur-sm"
      ></motion.div>

      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Badge */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 px-5 py-3 rounded-full mb-6 backdrop-blur-xl"
          >
            <Sparkles className="text-cyan-400 w-5 h-5" />

            <span className="text-cyan-300 font-semibold tracking-wide">
              FUTURE OF ONLINE SHOPPING
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-6">
            Explore The
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Smart Marketplace
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
            Experience futuristic shopping with premium gadgets,
            AI-powered products, smart electronics, and modern
            technology built for the next generation.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-5 mb-10">
            {[
              {
                title: 'AI Gadgets',
                icon: Cpu,
              },
              {
                title: 'Safe Payments',
                icon: ShieldCheck,
              },
              {
                title: 'Fast Delivery',
                icon: Zap,
              },
              {
                title: 'Premium Quality',
                icon: Star,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  boxShadow:
                    '0px 0px 30px rgba(34,211,238,0.2)',
                }}
                className="relative overflow-hidden bg-slate-800/40 border border-slate-700 rounded-3xl p-5 backdrop-blur-xl group"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-xl"
                >
                  <item.icon className="text-white w-7 h-7" />
                </motion.div>

                <h3 className="text-white font-bold text-lg relative z-10">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Main Image */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="relative"
          >
            <motion.img
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
              alt="Smart Shopping"
              className="w-full h-[340px] object-cover rounded-[32px] border border-cyan-400/20 shadow-2xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-[32px]"></div>

            {/* Floating Glass Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute bottom-6 left-6 right-6 bg-slate-900/70 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                  <ShoppingBag className="text-white w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-2xl">
                    Smart Electronics
                  </h3>

                  <p className="text-cyan-300 text-sm">
                    AI Devices • Gaming • Premium Tech
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE IMAGE SECTION */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
          }}
          className="relative"
        >
          {/* Neon Glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

          {/* Image Card */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="relative overflow-hidden rounded-[40px] border border-cyan-400/20 shadow-[0_0_80px_rgba(34,211,238,0.2)]"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Future Technology"
              className="w-full h-[700px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Floating Content */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute bottom-8 left-8 right-8 bg-slate-900/70 border border-cyan-400/20 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="text-white w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-white text-3xl font-extrabold">
                    Future Shopping
                  </h2>

                  <p className="text-cyan-300">
                    Innovation • Technology • Experience
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Discover a futuristic world of electronics,
                smart gadgets, gaming accessories, AI-powered
                products, and premium technology experiences.
              </p>
            </motion.div>

            {/* Animated Border */}
            <motion.div
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute inset-0 border border-cyan-400/30 rounded-[40px]"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SignIn;