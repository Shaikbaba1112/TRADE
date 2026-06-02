import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 overflow-hidden bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.5)] border-b border-yellow-300">

      {/* Shine Effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />

      {/* Floating Bitcoin */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="hidden sm:block absolute left-4 top-3 text-2xl"
      >
        ₿
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="hidden sm:block absolute right-4 top-3 text-2xl"
      >
        ₿
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-3 py-3 px-4 sm:px-6 relative z-10">

        {/* LIVE Badge */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 10px #ef4444",
              "0 0 25px #ef4444",
              "0 0 10px #ef4444",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          LIVE
        </motion.div>

        {/* Scrolling Text */}
        <div className="overflow-hidden w-full">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="whitespace-nowrap font-extrabold text-black text-lg tracking-wide"
          >
            🚀 NO REAL MONEY REQUIRED • 💰 NO DEPOSIT NEEDED • ⚡ INSTANT MT5 ACCESS • 🏆 WIN UP TO $2,000 • 🚀
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;