import { motion } from 'framer-motion';
import { Code2, Brain, Users, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Electronics',
      desc: 'Expertise in designing and developing electronic devices and systems.',
      image:
        'https://images.unsplash.com/photo-1550029402-8ea9bfe19f04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8',
    },

    {
      icon: Brain,
      title: 'AI Smart Products',
      desc: 'Specialized in integrating AI/ML solutions into smart applications and modern AI systems.',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    },

    {
      icon: Users,
      title: 'Fashion & Clothes',
      desc: 'Experience in designing premium fashion products and lifestyle accessories.',
      image:
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
    },

    {
      icon: Zap,
      title: 'Energy Products',
      desc: 'Expertise in modern energy-efficient and eco-friendly technology products.',
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const stats = [
    {
      label: 'Months Experience',
      value: '6+',
    },

    {
      label: 'Products Sold',
      value: '80k+',
    },

    {
      label: 'Customer Rating',
      value: '5 Star',
    },

    {
      label: 'Daily Active Users',
      value: '10k+',
    },
  ];

  const technologies = [
    'Electronics',
    'AI Gadgets',
    'Smart Home',
    'Audio Devices',
    'Accessories',
  ];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            animate={{
              backgroundPosition: [
                '0% 50%',
                '100% 50%',
                '0% 50%',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent mb-6"
          >
            About E-MART
          </motion.h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Premium futuristic electronics marketplace with
            cutting-edge smart devices, AI products and modern
            lifestyle technology.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '160px' }}
            transition={{ duration: 1 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mt-8"
          ></motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-14 mb-20">
          {/* Left Side */}
          <motion.div
            initial={{
              x: -80,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
            }}
            className="relative overflow-hidden rounded-[32px] border border-slate-700 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan-500/20 blur-3xl rounded-full"></div>

            {/* Image */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="overflow-hidden rounded-3xl mb-8"
            >
              <motion.img
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.7,
                }}
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                alt="about"
                className="w-full h-[320px] object-cover rounded-3xl"
              />
            </motion.div>

            <div className="relative z-10">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                E-MART is a futuristic online electronics platform
                offering premium gadgets, AI-powered smart products,
                modern accessories and innovative digital solutions.
              </p>

              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                We focus on high-quality customer experience,
                futuristic designs and advanced technologies to
                deliver the best shopping journey for every customer.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -4,
                      boxShadow:
                        '0px 0px 20px rgba(34,211,238,0.3)',
                    }}
                    className="px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-semibold cursor-pointer backdrop-blur-lg"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{
              x: 80,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  y: 40,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow:
                    '0px 0px 30px rgba(34,211,238,0.25)',
                }}
                className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/50 backdrop-blur-xl p-8 text-center group"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10">
                  <motion.h1
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
                  >
                    {stat.value}
                  </motion.h1>

                  <p className="text-gray-400 text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{
                y: 50,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-slate-700 bg-slate-900/60 backdrop-blur-xl shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{
                    scale: 1.12,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-56 object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                {/* Floating Icon */}
                <motion.div
                  whileHover={{
                    rotate: 12,
                    scale: 1.15,
                  }}
                  className="absolute bottom-5 left-5 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center"
                >
                  <skill.icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-6 z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {skill.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {skill.desc}
                </p>

                {/* Bottom Glow */}
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileHover={{
                    width: '100%',
                  }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-6"
                ></motion.div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;