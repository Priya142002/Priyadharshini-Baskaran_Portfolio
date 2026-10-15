import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.png';
import portfolioImg from '../assets/Portfolio.jpeg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#work' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'EDUCATION', href: '#education' },
  { name: 'CONTACT', href: '#contact' },
];

const roles = [
  'Full Stack Developer (ReactJS + .NET)',
  'ReactJS Developer',
  '.NET Developer / ASP.NET Core Developer',
  'React Native Developer',
  'SQL Developer',
];

export const HeroSection: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen min-h-screen md:h-screen overflow-x-hidden md:overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-none">
      {/* ================= 1. MINIMAL CUSTOM CURSOR ================= */}
      {cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-[1px]"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'rgba(235, 215, 195, 0.95)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* ================= 2. FIXED VIDEO LAYER ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-screen w-auto max-w-none object-contain origin-right scale-95 md:scale-[0.98] lg:scale-100"
        >
          <source src="./videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Seamless Soft Left Edge Blend */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />

        {/* ================= 3. ANIMATED WATERMARK EMBLEM ================= */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt="Insignia"
                className="w-28 h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-start md:justify-between min-h-screen md:h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-12 md:pb-8 pointer-events-none">

        {/* Navigation Bar */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto">
          <a
            href="#"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#EAD8C7] hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PRIYADHARSHINI.
          </a>

          {/* Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.28em] font-light uppercase text-[#C4B5A5] absolute left-1/2 -translate-x-1/2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group py-1 transition-colors duration-300 hover:text-[#FFF5EB]"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37]/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-2.5">
            <a
              href="#contact"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hidden md:flex group items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] font-light uppercase py-2 px-3 sm:px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] transition-all duration-300 backdrop-blur-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>LET&apos;S TALK</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                ↗
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center space-y-1 border border-[#8C6D4F]/50 bg-[#120F0C]/90 text-[#EAD8C7] hover:border-[#D4AF37] transition-colors rounded-sm cursor-pointer"
            >
              <span className={`w-3.5 h-[1.5px] bg-[#D4AF37] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
              <span className={`w-3.5 h-[1.5px] bg-[#D4AF37] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-3.5 h-[1.5px] bg-[#D4AF37] transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu (Guarded by md:hidden) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pointer-events-auto absolute top-20 left-6 right-6 z-50 rounded-sm border border-[#8C6D4F]/50 bg-[#0C0A08]/95 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.98)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <nav className="flex flex-col space-y-3 text-xs tracking-[0.25em] font-medium uppercase text-[#C4B5A5]">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 px-3 border-b border-[#8C6D4F]/20 hover:text-[#F7E7C4] hover:border-[#D4AF37]/50 transition-colors flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#D4AF37] font-mono text-[10px]">↗</span>
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full mt-6 sm:mt-7 md:mt-0 md:pt-4 pb-2 md:my-auto">

          {/* LEFT: Balanced Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[42rem] xl:max-w-[46rem] pointer-events-auto z-20"
          >
            {/* Availability Pill Badge */}
            <motion.div variants={fadeUpVariants} className="mb-3 sm:mb-5 pt-1 sm:pt-5 md:pt-0">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full border border-[#8C6D4F]/50 bg-[#14100D]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-full"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-xs md:text-[13px] font-medium text-[#EAD8C7] tracking-wide leading-tight">
                  Immediate Joiner <span className="text-[#8C6D4F] mx-1">•</span> Chennai <span className="text-[#8C6D4F] mx-1">|</span> On-site, Hybrid or Remote
                </span>
              </div>
            </motion.div>

            {/* Mobile-only Profile Image */}
            <motion.div variants={fadeUpVariants} className="md:hidden mb-4 sm:mb-5 flex justify-center">
              <div className="relative w-52 h-52 sm:w-72 sm:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37]/30 via-[#8C6D4F]/20 to-transparent blur-md" />
                <img
                  src={portfolioImg}
                  alt="Priyadharshini"
                  className="relative w-full h-full object-cover rounded-full border-2 border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3 select-none">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.9rem] xl:text-[4.4rem] font-bold tracking-tight leading-[1.12]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Hi, I&apos;m{' '}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7C4] via-[#D4AF37] to-[#A67C38] drop-shadow-[0_4px_24px_rgba(212,175,55,0.35)]">
                  Priyadharshini
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Role with Animated Changing Motion */}
            <motion.div variants={fadeUpVariants} className="mb-3 sm:mb-5">
              <div className="min-h-[2.2rem] sm:min-h-[2.5rem] md:min-h-[2.8rem] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-2xl md:text-[1.75rem] font-semibold tracking-wide flex items-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="inline-block text-[#F5E1C3] drop-shadow-[0_2px_15px_rgba(212,175,55,0.35)]">
                      {roles[currentRoleIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-normal text-[#C4B5A5] leading-[1.75] tracking-normal max-w-xl mb-4 sm:mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                Full Stack Developer with 1+ years of experience building scalable web &amp; mobile apps. Shipped 5+ production apps used by 200+ end users across ERP, Safety, and HRMS domains.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-row items-center gap-2.5 sm:gap-6 flex-wrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore My Work CTA */}
              <motion.a
                href="#work"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-1.5 sm:space-x-3 px-3.5 sm:px-7 py-2.5 sm:py-3.5 border border-[#8C6D4F] bg-[#120F0C]/80 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[9.5px] sm:text-[11px] font-medium tracking-[0.16em] sm:tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>EXPLORE MY WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href="./Priyadharshini_Baskaran_resume.pdf"
                download="Priyadharshini_Baskaran_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-1 sm:space-x-2 px-3.5 sm:px-7 py-2.5 sm:py-3.5 border border-[#8C6D4F]/40 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[9.5px] sm:text-[11px] font-medium tracking-[0.16em] sm:tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating Quote & Signature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-24 xl:pr-36 mr-4 z-20 select-none"
          >
            {/* 1. Quote Mark */}
            <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
              “
            </span>

            {/* 2. Compact Two-Line Statement */}
            <div
              className="text-[9.5px] font-medium tracking-[0.24em] uppercase text-[#E0D3C5] space-y-1 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>CODE IS MY CRAFT.</p>
              <p>IMPACT IS MY GOAL.</p>
            </div>

            {/* 3. Gold Accent Line */}
            <div className="w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-2" />


          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;