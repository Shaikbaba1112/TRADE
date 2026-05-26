import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Laptop,
  Smartphone,
  Headphones,
  Cpu,
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Smart Electronics',
      subtitle: 'Latest premium gadgets & devices',
      icon: Smartphone,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      skills: [
        'Smartphones',
        'Laptops',
        'Gaming Consoles',
        'Smart Watches',
        'Premium Accessories',
      ],
    },

    {
      category: 'Modern Technology',
      subtitle: 'Future-ready electronic innovations',
      icon: Cpu,
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      skills: [
        'AI Devices',
        'IoT Products',
        'Smart Home',
        'Automation',
        'Energy Efficient Tech',
      ],
    },

    {
      category: 'Audio & Entertainment',
      subtitle: 'Immersive entertainment experience',
      icon: Headphones,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      skills: [
        'Headphones',
        'Speakers',
        'Gaming Audio',
        'Music Systems',
        'Wireless Audio',
      ],
    },

    {
      category: 'Gaming & Performance',
      subtitle: 'High performance gaming products',
      icon: Laptop,
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      skills: [
        'Gaming PCs',
        'RTX Graphics',
        'Mechanical Keyboards',
        'Streaming Gear',
        'Ultra Performance',
      ],
    },
  ];

  const tools = [
    'Smart Product Display',
    'Fast Delivery',
    '24/7 Support',
    'Secure Payments',
    'Premium Brands',
    'Latest Gadgets',
  ];

  const webTech = [
    'AI Recommendations',
    'Smart Shopping',
    'Secure Checkout',
    'Cloud Integration',
    'Mobile Experience',
    'Fast Performance',
  ];

  const learning = [
    'Latest Electronics',
    'Future Gadgets',
    'AI Technology',
    'Gaming Innovations',
    'Smart Devices',
    'Luxury Accessories',
  ];

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>

      <div className="absolute bottom-40 right-40 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-white mb-4"
        >
          Smart Tech &
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {' '}
            E-MART Products
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '140px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-16"
        ></motion.div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow:
                  '0px 0px 40px rgba(34,211,238,0.25)',
              }}
              className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/40 backdrop-blur-xl shadow-2xl group"
            >
              {/* Background Image */}
              <div className="relative h-60 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={category.image}
                  alt={category.category}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Floating Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 right-5 bg-cyan-400/20 border border-cyan-300/30 backdrop-blur-xl p-4 rounded-2xl"
                >
                  <category.icon
                    className="text-cyan-300"
                    size={34}
                  />
                </motion.div>

                {/* Text */}
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-black text-white mb-2">
                    {category.category}
                  </h3>

                  <p className="text-cyan-300 text-sm">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        scale: 1.1,
                        y: -4,
                        boxShadow:
                          '0px 0px 20px rgba(34,211,238,0.4)',
                      }}
                      className="px-4 py-2 bg-blue-500/10 border border-cyan-400/30 text-cyan-300 rounded-full text-sm cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.01,
            boxShadow: '0px 0px 35px rgba(34,211,238,0.2)',
          }}
          className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 mb-12"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1728619312315-eb5c96dc8c70?q=80&w=1200&auto=format&fit=crop"
              alt="E-MART"
              className="w-full h-full object-cover opacity-20"
            />

            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <ShoppingCart className="text-cyan-400 w-8 h-8" />
              </motion.div>

              <h3 className="text-3xl font-extrabold text-white">
                Featured Electronics
              </h3>
            </div>

            <p className="text-gray-300 text-sm mb-8 max-w-2xl">
              Explore futuristic gadgets, smart devices and
              premium electronics designed for the next generation.
            </p>

            <div className="flex flex-wrap gap-3">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  className="px-4 py-2 bg-slate-700/40 border border-slate-600 text-gray-300 rounded-full text-sm cursor-pointer hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Technology Card */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/40 backdrop-blur-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200&auto=format&fit=crop"
              alt="technology"
              className="w-full h-60 object-cover"
            />

            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                E-MART Technology
              </h3>

              <div className="flex flex-wrap gap-3">
                {webTech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="px-3 py-2 bg-slate-700/40 border border-slate-600 text-gray-300 rounded-xl text-sm hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trending Products */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                '0px 0px 30px rgba(34,211,238,0.2)',
            }}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
              alt="gaming"
              className="w-full h-60 object-cover opacity-80"
            />

            <div className="p-8">
              <motion.h3
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-2xl font-extrabold text-white mb-4"
              >
                Trending Products
              </motion.h3>

              <div className="flex flex-wrap gap-3">
                {learning.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                    }}
                    className="px-4 py-2 bg-blue-500/10 border border-cyan-400/30 text-cyan-300 rounded-full text-sm backdrop-blur-sm"
                  >
                    {tech} ✨
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;