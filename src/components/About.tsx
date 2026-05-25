import { motion } from 'framer-motion';
import { Code2, Brain, Users, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Electronics',
      desc: 'Expertise in designing and developing electronic devices and systems.',
    },

    {
      icon: Brain,
      title: 'AI Smart Products',
      desc: 'Specialized in integrating AI/ML solutions into web applications, including chatbots and computer vision systems.',
    },

    {
      icon: Users,
      title: 'Clothes',
      desc: 'Experience in designing and developing clothing and accessories.',
    },

    {
      icon: Zap,
      title: 'Energy Products',
      desc: 'Expertise in designing and developing energy-efficient products.',
    },
  ];

  const stats = [
    {
      label: 'Months Experience in Product Development',
      value: '6+',
    },

    {
      label: 'Products',
      value: '3000+',
    },

    {
      label: 'Customer Satisfaction',
      value: '5 Star',
    },

    {
      label: 'Daily Active Users',
      value: '1000+',
    },
  ];

  const technologies = [
    'Electronics',
    'Gadgets',
    'Smart Home',
    'Audio',
    'Accessories',
  ];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          About{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            E-MART
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-12"
        ></motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Side */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              E-MART is a cutting-edge online electronics store
              dedicated to providing customers with the latest and
              greatest in tech products. With a seamless shopping
              experience and a vast selection of gadgets, we make it
              easy to stay connected and powered up.
            </p>

            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Our mission is to make high-quality electronics
              accessible to everyone, offering competitive prices and
              exceptional customer service. Whether you're looking for
              the latest smartphone or a reliable laptop, E-MART has
              you covered.
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
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
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                  boxShadow:
                    '0px 0px 30px rgba(34,211,238,0.25)',
                }}
                className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 text-center group"
              >
                {/* Animated Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow:
                  '0px 0px 30px rgba(59,130,246,0.25)',
              }}
              className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 group transition-all duration-500"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Floating Glow Circle */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>

              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.15,
                }}
                className="relative z-10"
              >
                <skill.icon className="w-14 h-14 text-cyan-400 mb-5" />
              </motion.div>

              <h3 className="relative z-10 text-white text-xl font-bold mb-3">
                {skill.title}
              </h3>

              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;