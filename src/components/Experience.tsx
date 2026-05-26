import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'New Products',
      company: 'E-MART',
      period: 'Since – May-2026',
      location: 'Hyderabad, India',
      type: 'Buy Now',
      image:
        'https://plus.unsplash.com/premium_photo-1670462145715-c32d0c91e81b?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Responsible for identifying market opportunities and developing innovative product concepts.',
      achievements: [
        'Conducted market research and competitive analysis to identify customer needs and trends',
        'Collaborated with cross-functional teams to design and prototype new product ideas',
        'Led user testing and feedback sessions to refine product concepts and ensure market fit',
        'Successfully launched multiple new products, resulting in increased revenue and customer satisfaction',
      ],
      technologies: [
        'Market Research',
        'Product Design',
        'Prototyping',
        'User Testing',
        'Product Launch',
      ],
    },
  ];

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-950 to-black"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          Marketing & Product Development{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '120px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-14"
        ></motion.div>

        {/* Experience Cards */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  '0px 0px 40px rgba(34,211,238,0.18)',
              }}
              className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 group transition-all duration-500"
            >
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>

              {/* Floating Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

              {/* NEW IMAGE SECTION */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl mb-8"
              >
                <motion.img
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  src={exp.image}
                  alt="E-MART Products"
                  className="w-full h-[320px] object-cover rounded-3xl"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 right-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-full font-bold shadow-2xl"
                >
                  Trending Products
                </motion.div>

                {/* Bottom Content */}
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-3xl font-black">
                    E-MART
                  </h3>

                  <p className="text-cyan-300 text-lg">
                    Smart Electronics & Innovation
                  </p>
                </div>
              </motion.div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <motion.h3
                      whileHover={{ x: 5 }}
                      className="text-3xl font-extrabold text-white mb-1"
                    >
                      {exp.title}
                    </motion.h3>

                    <p className="text-cyan-400 font-semibold text-lg">
                      {exp.company}
                    </p>
                  </div>

                  <motion.span
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="px-5 py-2 bg-blue-500/20 border border-cyan-400/30 text-cyan-300 rounded-full text-sm font-semibold shadow-lg"
                  >
                    {exp.type}
                  </motion.span>
                </div>

                {/* Info */}
                <div className="flex flex-wrap gap-8 text-gray-400 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <Calendar
                      size={18}
                      className="text-cyan-400"
                    />
                    {exp.period}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <MapPin
                      size={18}
                      className="text-cyan-400"
                    />
                    {exp.location}
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-8">
                  <h4 className="font-bold text-white text-xl mb-5">
                    Key Achievements
                  </h4>

                  <ul className="space-y-4">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="text-gray-300 flex items-start gap-4 bg-slate-900/30 border border-slate-700 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
                      >
                        <span className="text-cyan-400 mt-1 text-lg">
                          ✦
                        </span>

                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3">
                  {exp.technologies.map((tech, i) => (
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            boxShadow:
              '0px 0px 40px rgba(59,130,246,0.2)',
          }}
          className="relative overflow-hidden mt-16 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-10 text-center backdrop-blur-xl"
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
              className="text-3xl font-extrabold text-white mb-4"
            >
              Looking for New Users
            </motion.h3>

            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              We are always looking for new users to join our
              community and help us improve our products.
            </p>

            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow:
                  '0px 0px 30px rgba(34,211,238,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;