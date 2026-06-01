import { motion } from "framer-motion";

const SignIn = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* Bitcoin Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1641580529558-a96cf6efbc72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[150px]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#facc15_1px,transparent_1px),linear-gradient(to_bottom,#facc15_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          textShadow: [
            "0 0 20px rgba(250,204,21,0.4)",
            "0 0 60px rgba(250,204,21,0.9)",
            "0 0 20px rgba(250,204,21,0.4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="relative z-10 text-center text-5xl md:text-8xl font-black uppercase tracking-wider"
      >
        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
          SMART TRADING
        </span>
        <br />
        <span className="text-white">WITH AI</span>
      </motion.h1>

    </section>
  );
};

export default SignIn;