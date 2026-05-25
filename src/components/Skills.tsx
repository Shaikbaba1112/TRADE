import { motion } from 'framer-motion';
import { PhoneMissed } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'When I Buy Products',
      subtitle: 'checking out the latest tech and gadgets',
      proficiency: 'Expert 🧠',
      skills: [
        'Smartphones',
        'Laptops',
        'Smart Home Devices',
        'Audio Equipment',
        'Wearables',
        'Gaming Consoles',
        'Drones',
        'Cameras',
        'TVs',
        'Accessories',
      ],
    },

    {
      category: 'When I Develop Products',
      subtitle:
        'Building innovative solutions and cutting-edge applications',
      proficiency: 'Expert ⚙️',
      skills: [
        'new product development',
        'market research',
        'product design',
        'prototyping',
        'user testing',
        'product launch',
        'AI integration',
        'IoT development',
        'energy-efficient design',
        'clothing design',
      ],
    },

    {
      category: 'When I Manage Users & Display Products',
      subtitle:
        'Ensuring seamless user experiences and reliable deployments',
      proficiency: 'Advanced 🤖',
      skills: [
        'User satisfies',
        'User Research',
        'User Testing',
        'Deployment',
        'CI/CD',
        'Cloud Services',
        'Containerization',
        'Monitoring',
        'Performance Optimization',
        'Security Best Practices',
      ],
    },

    {
      category: 'When I Integrate AI into Products',
      subtitle:
        'Leveraging AI to enhance product functionality and user experience',
      proficiency: 'Advanced 🧰',
      skills: [
        'AI-Powered Recommendations',
        'Chatbots',
        'Computer Vision',
        'Natural Language Processing',
        'Predictive Analytics',
        'AI-Driven Personalization',
        'AI Integration',
        'Machine Learning Models',
        'Data Analysis',
        'AI Ethics',
      ],
    },
  ];

  const tools = [
    'E-MART Dashboard',
    'Product Management Tools',
    'Customer Relationship Management (CRM)',
    'Analytics Platforms',
    'Collaboration Tools',
    'Project Management Software',
    'Version Control Systems',
    'CI/CD Pipelines',
    'Cloud Services',
    'Monitoring & Logging Tools',
  ];

  const webTech = [
    'Smart Product Display',
    'User Management Systems',
    'AI Integration',
    'IoT Connectivity',
    'Energy Management Systems',
    'E-commerce Platforms',
    'Mobile App Development',
    'API Development',
    'Database Management',
    'Security Best Practices',
  ];

  const learning = [
    'Latest Tech Trends',
    'Emerging Gadgets',
    'AI Innovations',
    'Sustainable Energy Solutions',
    'Smart Home Advancements',
    'Wearable Technology',
    'Health Tech Developments',
    'Automotive Tech',
    'Virtual Reality',
    'Augmented Reality',
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
          Technologies &{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Products Analysis
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '140px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-16"
        ></motion.div>

        {/* Main Skill Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 group shadow-2xl"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

              {/* Floating Light */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-2xl font-extrabold text-white mb-2"
                >
                  {category.category}
                </motion.h3>

                <p className="text-gray-400 text-sm mb-3">
                  {category.subtitle}
                </p>

                <motion.p
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="text-cyan-400 font-semibold text-sm mb-6"
                >
                  Proficiency {category.proficiency}
                </motion.p>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                        boxShadow:
                          '0px 0px 15px rgba(34,211,238,0.4)',
                      }}
                      className="px-4 py-2 bg-blue-500/10 border border-cyan-400/30 text-cyan-300 rounded-full text-sm cursor-pointer backdrop-blur-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Tools */}
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
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>

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
                <PhoneMissed className="text-cyan-400 w-8 h-8" />
              </motion.div>

              <h3 className="text-3xl font-extrabold text-white">
                Daily New Products
              </h3>
            </div>

            <p className="text-gray-400 text-sm mb-8">
              Connect to E-MART to see the latest products
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
          {/* Web Technologies */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                E-MART Technologies
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                Core technologies for managing and displaying products
              </p>

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

          {/* Continuous Learning */}
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
            className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/30 rounded-3xl p-8 backdrop-blur-xl"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
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
                Continuous Buying Products
              </motion.h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Always on the lookout for the latest products to
                enhance my shopping experience and stay ahead of
                trends.
              </p>

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
                    {tech} 📚
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