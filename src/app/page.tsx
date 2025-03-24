"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  // Effect to handle window size and prevent SSR issues
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Ensure this only runs on client-side
    if (typeof window !== 'undefined') {
      handleResize(); // Initial call
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Generate particles safely
  const generateParticles = () => {
    if (windowSize.width === 0 || windowSize.height === 0) return [];
    
    return [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: Math.random() * 3
    }));
  };

  // Feature icons as SVG components
  const NewsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1h2a2 2 0 012 2v9a3 3 0 01-3 3zm0-2a1 1 0 001-1v-6a1 1 0 00-1-1h-2v7h1zM5 8v10h14V8H5zm0 0V6h10v2H5z" />
    </svg>
  );

  const AnalyticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const DatabaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );

  return (
    <main className="relative bg-[#0a192f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] opacity-90"
        style={{
          transform: `translateY(${backgroundY}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Hero Section with 3D-like Parallax */}
      <section 
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden"
      >
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
          >
            BUCKz: AI-Powered Startup Ecosystem
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Revolutionizing Startup Funding with Artificial Intelligence
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/startups/register" className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
              Launch Your Startup
            </Link>
            <Link href="/investors/register" className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg">
              Invest Intelligently
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Particle Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          {generateParticles().map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: particle.x, 
                y: particle.y,
                opacity: 0
              }}
              animate={{ 
                x: [
                  particle.x, 
                  particle.x + (Math.random() * 100 - 50), 
                  particle.x + (Math.random() * 100 - 50)
                ],
                y: [
                  particle.y, 
                  particle.y + (Math.random() * 100 - 50), 
                  particle.y + (Math.random() * 100 - 50)
                ],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </section>

      {/* AI-Powered Features Section */}
      <section className="relative bg-[#112240] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              AI-Driven Startup Intelligence
            </h2>
            <p className="text-xl text-gray-300">
              Cutting-edge features powered by artificial intelligence
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <NewsIcon />, 
                title: "AI News Aggregator", 
                description: "Real-time industry insights and startup trends",
                color: "from-blue-500 to-purple-600"
              },
              { 
                icon: <AnalyticsIcon />, 
                title: "Predictive Analytics", 
                description: "Advanced startup performance forecasting",
                color: "from-green-400 to-blue-500"
              },
              { 
                icon: <SearchIcon />, 
                title: "AI-Powered Search", 
                description: "Intelligent matching of startups and investors",
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: <SearchIcon />, 
                title: "Investor Finance Management", 
                description: "Automated portfolio tracking and optimization",
                color: "from-red-500 to-yellow-500"
              },
              { 
                icon: <DatabaseIcon />, 
                title: "Funding Analysis", 
                description: "Deep insights into funding opportunities",
                color: "from-pink-500 to-red-500"
              },
              { 
                icon: <DatabaseIcon />, 
                title: "Data Aggregation", 
                description: "Comprehensive startup ecosystem intelligence",
                color: "from-yellow-400 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-[#0a192f] p-6 rounded-lg shadow-xl hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Money Animation Section */}
      <section className="relative bg-[#0a192f] py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Funding Ecosystem Reimagined
            </h2>
            <p className="text-xl text-gray-300">
              Transform your startup journey with intelligent financial tools
            </p>
          </motion.div>

          {/* Money Flow Animation Placeholder */}
          <div className="relative h-64 w-full bg-[#112240] rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {windowSize.width > 0 && [...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: -100, 
                    y: Math.random() * 300,
                    opacity: 0
                  }}
                  animate={{ 
                    x: windowSize.width + 100,
                    y: [
                      Math.random() * 300, 
                      Math.random() * 300, 
                      Math.random() * 300
                    ],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="absolute w-2 h-2 bg-green-500 rounded-full"
                />
              ))}
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold text-green-400 mb-4">
                  $500M+
                </h3>
                <p className="text-gray-300">
                  Total Funding Facilitated Through BUCKz
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
     
        {/* Final CTA */}
        <section className="bg-[#112240] py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Join the Future of Startup Funding
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Leverage AI-powered insights to transform your startup ecosystem
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="px-10 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
              Get Started
            </Link>
            <Link href="/demo" className="px-10 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg">
              Request Demo
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}