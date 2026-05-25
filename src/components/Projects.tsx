import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
  const featuredProjects = [
    {
      title: 'Premium Smartwatches',
      image:
        'https://images.unsplash.com/photo-1666238854780-d6c19c5c119e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFByZW1pdW0lMjBTbWFydHdhdGNoZXN8ZW58MHx8MHx8fDA%3D',
      description:
        'A cutting-edge smartwatch with advanced health monitoring and seamless integration with mobile devices',
      problem:
        'Existing smartwatches lack comprehensive health tracking and intuitive user interfaces.',
      role: 'Features',
      details:
        'A feature-rich smartwatch that provides real-time health insights, fitness tracking, and seamless connectivity with smartphones.',
      technologies: [
        'Health Monitoring',
        'Fitness Tracking',
        'Mobile Integration',
        'User Interface Design',
        'Wearable Technology',
      ],
      tags: [
        'Smartwatch',
        'Health Tech',
        'Wearable',
        'Fitness',
        'Mobile Integration',
      ],
      links: { live: '#', github: '#' },
    },

    {
      title: 'Compact Smart Home Appliances',
      image:
        'https://plus.unsplash.com/premium_photo-1688686804638-fadb460edc4a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjBob21lfGVufDB8fDB8fHww',
      description:
        'A line of compact smart home appliances designed for small living spaces, offering convenience and energy efficiency.',
      problem:
        'Many smart home appliances are bulky and not suitable for small apartments or homes.',
      role: 'Features',
      details:
        'A range of space-saving smart appliances that provide convenience and energy efficiency for small living spaces.',
      technologies: [
        'IoT',
        'Energy Efficiency',
        'Space-Saving Design',
        'Automation',
        'Smart Home Integration',
      ],
      tags: [
        'Smart Home',
        'IoT',
        'Energy Efficiency',
        'Space-Saving',
        'Automation',
      ],
      links: { live: '#', github: '#' },
    },

    {
      title: 'AI-Powered Wireless Earbuds',
      image:
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46',
      description:
        'Next-generation wireless earbuds with AI noise cancellation, immersive audio quality, and ultra-long battery performance.',
      problem:
        'Traditional earbuds often suffer from poor battery life, unstable connectivity, and ineffective noise cancellation in crowded environments.',
      role: 'Features',
      details:
        'Smart AI-powered earbuds designed for crystal-clear calls, adaptive sound control, low-latency gaming mode, and all-day comfort for music lovers and professionals.',
      technologies: [
        'AI Noise Cancellation',
        'Bluetooth 5.3',
        'Spatial Audio',
        'Fast Charging',
        'Voice Assistant Integration',
      ],
      tags: [
        'Wireless Earbuds',
        'AI Audio',
        'Bluetooth',
        'Gaming',
        'Music Tech',
      ],
      links: { live: '#', github: '#' },
    },

    {
      title: 'Portable Gaming Laptop',
      image:
        'https://plus.unsplash.com/premium_photo-1723525545936-84718e4871cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9ydGFibGUlMjBHYW1pbmclMjBMYXB0b3B8ZW58MHx8MHx8fDA%3D',
      description:
        'High-performance portable gaming laptop built for esports, content creation, and ultra-fast multitasking.',
      problem:
        'Many gaming laptops are bulky, overheat quickly, and offer poor battery optimization for users on the move.',
      role: 'Features',
      details:
        'A lightweight gaming laptop featuring powerful graphics, advanced cooling systems, high refresh-rate display, and AI-enhanced performance optimization.',
      technologies: [
        'RTX Graphics',
        'AI Performance Boost',
        'Liquid Cooling',
        '144Hz Display',
        'Fast SSD Storage',
      ],
      tags: [
        'Gaming Laptop',
        'Esports',
        'Performance',
        'Portable',
        'AI Computing',
      ],
      links: { live: '#', github: '#' },
    },
  ];

  const moreProjects = [
    {
      title: 'Next-Gen Smart TVs',
      desc: 'Innovative smart TV with enhanced features',
      tags: ['Smart TV', 'Innovation', 'Entertainment'],
    },

    {
      title: 'New Smartphones',
      desc: 'Latest generation of smartphones with cutting-edge technology',
      tags: ['Smartphone', 'Technology', 'Innovation'],
    },

    {
      title: 'Remote Control for Smart Home Devices',
      desc: 'Intuitive remote control for managing smart home devices',
      tags: ['Smart Home', 'IoT', 'Automation'],
    },

    {
      title: 'Smart Expense Tracker',
      desc: 'Smart expense tracking with AI-powered categorization',
      tags: ['Finance', 'AI', 'Productivity'],
    },
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

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
          E-MART{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Product Previews
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '120px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-16"
        ></motion.div>

        {/* Featured Products */}
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
              className="relative overflow-hidden grid md:grid-cols-2 gap-10 items-center bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 group"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

              {/* Floating Glow */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl"></div>

              {/* Product Image */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  rotate: 1,
                }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl border border-slate-700 shadow-2xl"
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[420px] object-cover"
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 left-5 px-4 py-2 bg-cyan-400/20 backdrop-blur-xl border border-cyan-400/30 text-cyan-300 rounded-full text-sm font-semibold"
                >
                  Trending Product
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
                    className="px-3 py-1 bg-blue-500/20 border border-cyan-400/30 text-cyan-300 rounded-full text-xs font-semibold"
                  >
                    Featured
                  </motion.span>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Problem Box */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="bg-slate-900/40 border border-slate-700 rounded-2xl p-5 mb-5"
                >
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-cyan-400">
                      Problem Solved:
                    </strong>{' '}
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
                  className="text-cyan-400 font-bold mb-5"
                >
                  My Role: {project.role}
                </motion.p>

                {/* Technologies */}
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
                      className="px-4 py-2 bg-blue-500/10 border border-cyan-400/30 text-cyan-300 rounded-full text-sm shadow-lg cursor-pointer"
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
                      className="text-sm text-gray-400 hover:text-cyan-300 transition"
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
                      boxShadow:
                        '0px 0px 25px rgba(34,211,238,0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl"
                  >
                    <ExternalLink size={18} />
                    Buy Now
                  </motion.a>

                  <motion.a
                    href={project.links.github}
                    whileHover={{
                      scale: 1.08,
                      borderColor: '#22d3ee',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 px-6 py-3 rounded-2xl font-semibold backdrop-blur-sm"
                  >
                    <Code2 size={18} />
                    Add to Cart
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Products */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-extrabold text-white mb-10">
            More Products
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
                  boxShadow:
                    '0px 0px 30px rgba(59,130,246,0.2)',
                }}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-7 group"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

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
                        className="px-3 py-1 bg-blue-500/10 border border-cyan-400/30 text-cyan-300 rounded-full text-xs"
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
            boxShadow:
              '0px 0px 40px rgba(34,211,238,0.2)',
          }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-12 text-center backdrop-blur-xl"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>

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
              Interested in E-MART
            </motion.h3>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore our latest products and discover how we can help
              you achieve your goals.
            </p>

            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.08,
                boxShadow:
                  '0px 0px 30px rgba(34,211,238,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl"
            >
              Let's Connect
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;