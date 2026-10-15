// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  period: string;
  periodShort?: string;
  location?: string;
  summary: string;
  highlights?: string[];
  technologies: string[];
  domains?: string[];
  isCurrent?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'JUNIOR SOFTWARE DEVELOPER',
    company: 'Vivify Technocrats',
    employmentType: 'Full-time',
    period: 'June 2025 – September 2026',
    periodShort: 'JUN 2025 – SEP 2026',
    location: 'Chennai, Tamil Nadu',
    summary:
      'Developed 5+ production web and mobile applications across ERP, HRMS, E-Commerce, and Safety domains.',
    highlights: [
      'Built applications using ReactJS, React Native, ASP.NET Core, and SQL Server.',
      'Designed and integrated 30+ RESTful APIs with JWT authentication and CRUD operations.',
      'Implemented RBAC and optimized database queries to improve security and performance.',
      'Collaborated with Agile teams to deliver enterprise features and production releases.',
    ],
    technologies: [
      'ReactJS',
      'React Native',
      'ASP.NET Core',
      'SQL Server',
      'Node.js',
      'REST APIs',
      'Entity Framework',
    ],
    domains: ['ERP', 'HRMS', 'E-Commerce', 'Safety'],
    isCurrent: false,
  },
  {
    id: '02',
    role: 'FRONTEND WEB DEVELOPER INTERN',
    company: 'Eesan IT Solutions',
    employmentType: 'Internship',
    period: 'January 2024 – March 2024',
    periodShort: 'JAN 2024 – MAR 2024',
    summary:
      'Developed responsive web interfaces and gained hands-on experience in frontend development, UI implementation, and website design.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'React.js',
    ],
    domains: ['Frontend Development', 'UI Implementation', 'Website Design'],
    isCurrent: false,
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-12 sm:pt-16 pb-24 px-3 sm:px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] bg-[#D4AF37]/[0.035] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">

        {/* Header Row: Eyebrow + Section Headline on the Same Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col lg:flex-row items-center justify-center mb-12 sm:mb-16"
        >
          {/* Eyebrow Header straight in line with the title */}
          <div className="flex items-center space-x-3.5 lg:absolute lg:left-0 mb-3 lg:mb-0">
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              EXPERIENCE
            </span>
            <div className="w-14 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </div>

          {/* Section Headline */}
          <h2
            className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.2rem] tracking-tight uppercase leading-tight select-none lg:translate-x-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mr-2.5 sm:mr-4">
              WORK
            </span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              EXPERIENCE.
            </span>
          </h2>
        </motion.div>

        {/* Minimalist Luxury Route / Timeline */}
        <div className="relative w-full">

          {/* Background Track Line */}
          <div className="absolute left-[7px] sm:left-[14px] md:left-[190px] lg:left-[220px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />

          {/* Animated Gold Track Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] sm:left-[14px] md:left-[190px] lg:left-[220px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10 shadow-[0_0_10px_#D4AF37] origin-top"
          />

          <div className="space-y-10 sm:space-y-16">
            {experiences.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                className="relative flex flex-col md:flex-row md:items-start group w-full"
              >
                {/* Desktop Left Meta Column (Left side of track) */}
                <div className="hidden md:flex flex-col items-end w-[190px] lg:w-[220px] shrink-0 pr-8 pt-6 text-right">
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] font-semibold mb-1.5">
                    {item.periodShort || item.period}
                  </span>

                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[#D4AF37]/10 text-[#F7E7C4] border border-[#D4AF37]/30 mb-2">
                    {item.employmentType}
                  </span>

                  {item.location && (
                    <span className="text-[11px] font-light text-[#A8988B] tracking-wide">
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Glowing Route Node on Track */}
                <div className="absolute left-[7px] sm:left-[14px] md:left-[190px] lg:left-[220px] top-6 sm:top-7 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="absolute w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 group-hover:scale-125 transition-transform duration-500" />
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#120F0C] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_14px_#D4AF37] transition-all duration-300" />
                </div>

                {/* Experience Card (Right side of track) */}
                <div className="w-full pl-6 sm:pl-8 md:pl-0 md:ml-10 lg:ml-12 flex-1">
                  <div className="relative w-full rounded-xl sm:rounded-2xl border border-[#8C6D4F]/40 bg-[#0E0C0A] p-4 sm:p-7 lg:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-[#D4AF37]/80 transition-all duration-500 overflow-hidden">

                    {/* Top Gold Border Light Flare */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                    {/* Corner Minimal L-Brackets */}
                    <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                    <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                    {/* Watermark Number */}
                    <span
                      className="absolute -bottom-4 -right-2 text-7xl sm:text-8xl font-bold text-[#EAD8C7]/[0.03] select-none pointer-events-none leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {item.id}
                    </span>

                    {/* Mobile Period Meta (Only on small screens) */}
                    <div className="md:hidden flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
                      <span className="text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.2em] text-[#D4AF37] font-semibold">
                        {item.period}
                      </span>
                      <span className="text-[#8C6D4F]">·</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[#D4AF37]/10 text-[#F7E7C4] border border-[#D4AF37]/30">
                        {item.employmentType}
                      </span>
                      {item.location && (
                        <>
                          <span className="text-[#8C6D4F]">·</span>
                          <span className="text-[10px] text-[#A8988B] tracking-wide">
                            {item.location}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Role Title */}
                    <h3
                      className="text-2xl sm:text-4xl lg:text-[2.6rem] tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-2 leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {item.role}
                    </h3>

                    {/* Company & Domain Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span
                        className="text-xs sm:text-base font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#D4AF37]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.company}
                      </span>

                      {/* Domain Badges */}
                      {item.domains && item.domains.length > 0 && (
                        <>
                          <span className="text-[#8C6D4F]/60">|</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {item.domains.map((domain) => (
                              <span
                                key={domain}
                                className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase bg-[#181410] border border-[#8C6D4F]/30 text-[#C8B8A6]"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {domain}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Summary Statement */}
                    <p
                      className="text-xs sm:text-[13.5px] font-light text-[#E8DFD8] leading-[1.8] mb-5 max-w-2xl"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.summary}
                    </p>

                    {/* Bullet Highlights (if any) */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mb-6 space-y-2.5">
                        {item.highlights.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start space-x-3">
                            <span className="text-[#D4AF37] text-xs mt-1 shrink-0">✦</span>
                            <span
                              className="text-xs sm:text-[13px] font-light text-[#BDB0A4] leading-[1.7] group-hover:text-[#E8DFD8] transition-colors"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technologies Pills */}
                    <div className="pt-4 border-t border-[#8C6D4F]/25">
                      <span
                        className="block text-[10px] font-medium tracking-[0.22em] uppercase text-[#8C6D4F] mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        CORE TECHNOLOGIES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-md text-[11px] font-mono tracking-wider border border-[#8C6D4F]/30 bg-[#14100D] text-[#D5CBC0] group-hover:border-[#D4AF37]/50 group-hover:text-[#F7E7C4] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;