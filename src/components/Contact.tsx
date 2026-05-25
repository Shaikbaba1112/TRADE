import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Mail,
  User,
  Code2,
  MapPin,
  Clock,
  Send,
} from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Contact Cards Data
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'trading@gmail.com',
      href: 'mailto:trading@gmail.com',
    },

    {
      icon: Code2,
      label: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
    },

    {
      icon: User,
      label: 'LinkedIn',
      value: 'Trading Academy',
      href: 'https://linkedin.com',
    },

    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad, India',
      href: '#',
    },
  ];

  // Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        formData
      );

      alert(response.data.message);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.log(error);

      alert('Something went wrong');
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl font-extrabold text-white mb-4"
        >
          Let's{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Connect
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '120px' }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-16"
        ></motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow:
                '0px 0px 40px rgba(59,130,246,0.15)',
            }}
            className="relative overflow-hidden bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-60"></div>

            <div className="relative z-10">
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-3xl font-extrabold text-white mb-6"
              >
                Get in Touch
              </motion.h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name *
                  </label>

                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email *
                  </label>

                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Subject *
                  </label>

                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Message *
                  </label>

                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                  ></motion.textarea>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      '0px 0px 25px rgba(34,211,238,0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3"
                >
                  <Send size={22} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Side */}
          <div className="space-y-5">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="flex items-center gap-4 bg-slate-800/40 border border-slate-700 rounded-3xl p-5 backdrop-blur-xl"
              >
                <contact.icon className="w-8 h-8 text-cyan-400" />

                <div>
                  <p className="text-white font-semibold">
                    {contact.label}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Response Card */}
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-400/30 rounded-3xl p-8 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <Clock className="w-7 h-7 text-cyan-400 mt-1" />

                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Quick Response
                  </h4>

                  <p className="text-gray-300">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;