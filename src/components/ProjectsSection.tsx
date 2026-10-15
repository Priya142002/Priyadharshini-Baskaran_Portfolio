import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  projectType: string;
  githubUrl?: string;
  liveUrl?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'ERP – Finance, Inventory & Business Management System',
    category: 'ENTERPRISE / ERP SYSTEM',
    description:
      'Developed ERP modules for company management, accounting, inventory, purchasing, and sales using ReactJS, .NET, and SQL Server. Implemented RESTful APIs, data validation, transaction processing, stock management, reporting, and QR code functionality to improve operational accuracy and streamline business workflows.',
    projectType: 'Private / Company Project',
    tech: [
      'ReactJS',
      '.NET',
      'SQL Server',
      'REST APIs',
      'QR Code Integration',
      'Data Validation',
      'Reporting',
    ],
    metrics: [
      { label: 'CORE MODULES', value: 'Finance, Stock, Purchasing, Sales' },
      { label: 'DATA ENGINE', value: 'SQL Server + REST APIs' },
      { label: 'WORKFLOW', value: 'QR Code & Transaction Processing' },
    ],
  },
  {
    number: '02',
    title: 'Safety App – Airport & Seaport Employees',
    category: 'MOBILE / WORKFORCE SAFETY',
    description:
      'Developed a React Native mobile application for airport and seaport employees, featuring AI-assisted attendance verification with location and incident and near-miss reporting, DRA, Kaizen, training and daily videos, and employee self-service requests for leave, advance, and attendance regularization. Integrated secure REST APIs to support real-time reporting and workforce operations.',
    projectType: 'Private / Company Project',
    tech: [
      'React Native',
      '.NET',
      'REST APIs',
      'SQL Server',
      'AI Attendance',
      'GPS Location',

    ],
    metrics: [
      { label: 'SECTOR', value: 'Airport & Seaport Operations' },
      { label: 'VERIFICATION', value: 'AI Attendance & Geo-Location' },
      { label: 'SERVICES', value: 'Self-Service & Safety Reporting' },
    ],
  },
  {
    number: '03',
    title: 'AI-Powered Employee Safety & Workforce Management App',
    category: 'AI / INDUSTRIAL SAFETY',
    description:
      'Enhanced an existing employee safety application using React Native, Python, FastAPI, and MySQL. Implemented automated attendance tracking with GPS location and photo verification, SOS alerts, PPE safety checks, daily and training videos, and modules for Incident Reporting, Near Miss, DRA, Kaizen, and Leaderboard. Integrated QR-based LOTO machine-status verification, employee leave and advance requests, attendance regularization, and reporting features through REST APIs.',
    projectType: 'Private / Company Project',
    tech: [
      'React Native',
      'Python',
      'FastAPI',
      'MySQL',
      'REST APIs',
      'GPS & Photo Verification',
      'QR LOTO Verification',
      'SOS Alerts',
    ],
    metrics: [
      { label: 'SAFETY CHECKS', value: 'PPE Verification & SOS Alerts' },
      { label: 'MACHINE STATUS', value: 'QR-Based LOTO System' },
      { label: 'TRACKING', value: 'Automated GPS & Photo Logs' },
    ],
  },
  {
    number: '04',
    title: 'HRMS – Human Resource Management System',
    category: 'ENTERPRISE / WORKFORCE MANAGEMENT',
    description:
      'Developed an HRMS application to streamline employee management, attendance tracking, payroll processing, and leave management. Implemented role-based authentication and integrated frontend and backend services to automate HR workflows and ensure efficient employee data management.',
    projectType: 'Private / Company Project',
    tech: [
      'ReactJS',
      '.NET',
      'SQL Server',
      'REST APIs',
      'Role-Based Authentication',
      'Payroll Engine',
    ],
    metrics: [
      { label: 'CAPABILITIES', value: 'Payroll, Attendance & Leaves' },
      { label: 'SECURITY', value: 'Role-Based Authentication' },
      { label: 'AUTOMATION', value: 'End-to-End HR Workflows' },
    ],
  },
  {
    number: '05',
    title: 'AI-Powered Interview Assessment Platform',
    category: 'AI / RECRUITMENT TECH',
    description:
      'Developed an AI-powered interview platform with admin-managed candidate invitations via email, AI-generated and manually curated topic-based questions, and secure authentication. Implemented screen and video recording features to support interview monitoring and candidate assessment.',
    projectType: 'Private / Company Project',
    tech: [
      'ReactJS',
      '.NET',
      'SQL Server',
      'AI Integration',
      'REST APIs',
      'Screen Recording',
      'Video Proctoring',
    ],
    metrics: [
      { label: 'ASSESSMENT', value: 'AI Topic-Based Questions' },
      { label: 'PROCTORING', value: 'Screen & Video Recording' },
      { label: 'INVITATIONS', value: 'Admin Email Dispatch System' },
    ],
  },
  {
    number: '06',
    title: 'Fire Crackers E-Commerce Website',
    category: 'E-COMMERCE / WEB PLATFORM',
    description:
      'Developed a responsive e-commerce website for browsing firecracker products, featuring product catalog management, user authentication, shopping cart, and order processing. Integrated ReactJS frontend with .NET backend and SQL Server to support secure transactions and efficient order management.',
    projectType: 'Private / Company Project',
    tech: [
      'ReactJS',
      '.NET',
      'SQL Server',
      'REST APIs',
      'E-Commerce',
      'Cart & Checkout',
      'Order Processing',
    ],
    metrics: [
      { label: 'COMMERCE FLOW', value: 'Product Catalog & Cart' },
      { label: 'TRANSACTIONS', value: 'Order Processing Pipeline' },
      { label: 'STACK', value: 'ReactJS + .NET + SQL Server' },
    ],
  },
  {
    number: '07',
    title: 'SmilAI – Dental Clinic Management SaaS Application',
    category: 'HEALTH-TECH / SAAS PLATFORM',
    description:
      'Developed a role-based dental clinic management mobile application using React Native and Python. Implemented clinic-specific access with email-based clinic code generation and secure login credentials. Designed role-based access for doctors and receptionists, displaying modules according to their roles, and integrated a chatbot to enhance user support and accessibility.',
    projectType: 'Private / Company Project',
    tech: [
      'React Native',
      'Python',
      'FastAPI',
      'MySQL',
      'REST APIs',
      'Role-Based Authentication',
      'AI Chatbot',
    ],
    metrics: [
      { label: 'TENANCY', value: 'Clinic Code Access Control' },
      { label: 'ROLES', value: 'Doctors & Receptionists RBAC' },
      { label: 'ASSISTANCE', value: 'Integrated AI Support Bot' },
    ],
  },
  {
    number: '08',
    title: 'Vivify Soft – Corporate Website Development & Performance Optimization',
    category: 'CORPORATE / WEB PLATFORM & PERFORMANCE',
    description:
      'Contributed to the development and optimization of the Vivify Soft corporate website using React, TypeScript, and Tailwind CSS. Developed responsive website sections and service pages, showcased company products and solutions, and improved SEO, image optimization, and website performance to enhance user experience and search visibility.',
    projectType: 'Private / Company Project',
    liveUrl: 'https://www.vivifysoft.com/',
    tech: [
      'ReactJS',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'SEO',
      'WebP Image Optimization',
    ],
    metrics: [
      { label: 'CORE STACK', value: 'ReactJS + TypeScript + Vite' },
      { label: 'PERFORMANCE', value: 'WebP Optimization & Fast FCP' },
      { label: 'VISIBILITY', value: 'Technical SEO & Search Ranking' },
    ],
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-8 sm:pb-10 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header Row: Eyebrow + Section Headline on the Same Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col lg:flex-row items-center justify-center mb-12 sm:mb-14"
        >
          {/* Eyebrow: moved downwards to be straight in line with the title */}
          <div className="flex items-center space-x-3.5 lg:absolute lg:left-0 mb-3 lg:mb-0">
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              FEATURED PROJECTS
            </span>
            <div className="w-14 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </div>

          {/* Section Headline */}
          <h2
            className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] tracking-tight uppercase leading-tight select-none lg:translate-x-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mr-3 sm:mr-4">
              PROFESSIONAL
            </span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              PROJECTS.
            </span>
          </h2>
        </motion.div>

        {/* Cinematic Stacking Card Deck */}
        <ScrollStack
          itemDistance={40}
          itemScale={0.018}
          itemStackDistance={16}
          stackPosition="9%"
          scaleEndPosition="5%"
          baseScale={0.90}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-6 sm:p-9 lg:p-11 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">

                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number}
                        </span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
                    <div className="space-y-3">
                      <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                        ARCHITECTURE METRICS
                      </span>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                        >
                          <span className="text-[10px] font-mono text-[#A8988B]">
                            {m.label}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-[#F7E7C4]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] group/btn"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover/btn:bg-black" />
                        <span>VISIT WEBSITE</span>
                        <span className="text-xs transform transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    ) : project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>VIEW ON GITHUB</span>
                        <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      <div
                        className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 border border-[#8C6D4F]/50 bg-[#16120E] text-[#EAD8C7] text-[11px] font-medium tracking-[0.24em] uppercase select-none shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                        <span>{project.projectType}</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};

export default ProjectsSection;