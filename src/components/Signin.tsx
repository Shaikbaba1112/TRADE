import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log('Sign In Data:', formData);

    alert('Successfully Signed In 🚀');

    setFormData({
      fullName: '',
      email: '',
      password: '',
      phone: '',
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 py-20"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-cyan-400 uppercase tracking-[6px] font-semibold mb-4"
          >
            Welcome Back
          </motion.h2>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Sign In To
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Electro-Mart
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            Access your account and explore premium gadgets,
            smart devices, and the latest innovations with a
            futuristic shopping experience.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-5">
            {[
              'Secure Login',
              'Fast Access',
              'Smart Shopping',
              '24/7 Support',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                }}
                className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 backdrop-blur-xl"
              >
                <ShieldCheck className="text-cyan-400 mb-3" />

                <h3 className="text-white font-semibold">
                  {item}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            y: -5,
            boxShadow:
              '0px 0px 40px rgba(34,211,238,0.15)',
          }}
          className="relative overflow-hidden bg-slate-800/40 backdrop-blur-2xl border border-slate-700 rounded-[32px] p-8"
        >
          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>

          <div className="relative z-10">
            {/* Logo */}
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.05,
              }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <User className="text-white w-10 h-10" />
            </motion.div>

            <h2 className="text-4xl font-extrabold text-white text-center mb-2">
              Sign In
            </h2>

            <p className="text-gray-400 text-center mb-8">
              Enter your details to continue
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                    }}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                    }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                    }}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-cyan-400 w-5 h-5" />

                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                    }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    '0px 0px 30px rgba(34,211,238,0.4)',
                }}
                whileTap={{
                  scale: 0.95,
                }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 mt-4"
              >
                Sign In
                <ArrowRight size={22} />
              </motion.button>
            </form>

            {/* Footer */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">
                Login
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SignIn;