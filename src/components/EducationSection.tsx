// src/components/EducationSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  scoreLabel: string;
  scoreValue: string;
  level: string;
}

const educationData: EducationItem[] = [
  {
    id: '01',
    degree: 'B.Tech in Information Technology',
    institution: 'Paavai Engineering College',
    location: 'Namakkal, Tamil Nadu',
    period: '2020 – 2024',
    scoreLabel: 'CUMULATIVE CGPA',
    scoreValue: '8.67',
    level: 'UNDERGRADUATE DEGREE',
  },
  {
    id: '02',
    degree: 'HSC (Higher Secondary)',
    institution: "St. Isabel’s Girls Higher Secondary School",
    location: 'Pattukkottai, Tamil Nadu',
    period: '2019 – 2020',
    scoreLabel: 'BOARD PERCENTAGE',
    scoreValue: '75.6%',
    level: 'HIGHER SECONDARY (CLASS XII)',
  },
  {
    id: '03',
    degree: 'SSLC (Secondary School)',
    institution: "St. Isabel’s Girls Higher Secondary School",
    location: 'Pattukkottai, Tamil Nadu',
    period: '2017 – 2018',
    scoreLabel: 'ACADEMIC DISTINCTION',
    scoreValue: '90%',
    level: 'SECONDARY SCHOOL (CLASS X)',
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 right-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/[0.035] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Header Row: Eyebrow + Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col lg:flex-row items-center justify-center mb-10 sm:mb-16"
        >
          {/* Eyebrow Header aligned to left on large displays */}
          <div className="flex items-center space-x-3.5 lg:absolute lg:left-0 mb-3 lg:mb-0">
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              EDUCATION
            </span>
            <div className="w-14 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </div>

          {/* Section Headline */}
          <h2
            className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.2rem] tracking-tight uppercase leading-tight select-none lg:translate-x-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mr-2.5 sm:mr-4">
              ACADEMIC
            </span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              BACKGROUND.
            </span>
          </h2>
        </motion.div>

        {/* 3-Column Educational Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-sm border border-[#8C6D4F]/35 bg-[#0C0A08]/90 p-5 sm:p-7 lg:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] hover:border-[#D4AF37]/80 hover:bg-[#120F0C] transition-all duration-500 overflow-hidden"
            >
              {/* Top Accent Horizon Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Corner Gold Accent Brackets */}
              <div className="pointer-events-none">
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
              </div>

              {/* Card Top: Index & Period */}
              <div>
                <div className="flex items-center justify-between pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-[#8C6D4F]/20">
                  <span
                    className="text-xs font-mono font-medium tracking-[0.25em] text-[#D4AF37]"
                  >
                    {item.id}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#B8A89A] px-2.5 py-1 bg-[#1A1510] border border-[#8C6D4F]/30 rounded"
                  >
                    {item.period}
                  </span>
                </div>

                {/* Level Badge */}
                <span className="block text-[9px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-1.5 sm:mb-2">
                  {item.level}
                </span>

                {/* Degree / Certificate Title */}
                <h3
                  className="text-lg sm:text-xl lg:text-[22px] font-medium text-[#F7E7C4] leading-tight mb-2 group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.degree}
                </h3>

                {/* Institution Name */}
                <p
                  className="text-xs sm:text-[13px] text-[#D5CBC0] font-light mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.institution}
                </p>

                {/* Location */}
                {item.location && (
                  <p className="text-[11px] text-[#8C6D4F] font-mono mb-4">
                    {item.location}
                  </p>
                )}
              </div>

              {/* Card Bottom: Metric */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#8C6D4F]/20">
                {/* Score / Grade Highlight Block */}
                <div className="flex items-baseline justify-between px-3 sm:px-3.5 py-2 sm:py-2.5 bg-[#14100D] border border-[#8C6D4F]/30 group-hover:border-[#D4AF37]/50 rounded-sm transition-colors">
                  <span className="text-[9px] sm:text-[9.5px] font-mono tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#8C6D4F]">
                    {item.scoreLabel}
                  </span>
                  <span
                    className="text-xl sm:text-2xl font-semibold text-[#D4AF37] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.scoreValue}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
