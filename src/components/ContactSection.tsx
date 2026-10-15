// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const targetEmail = 'priyadharshini14022002@gmail.com';

  const fallbackCopyText = (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) {
      console.warn('Fallback copy error:', err);
    }
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(targetEmail).catch(() => {
          fallbackCopyText(targetEmail);
        });
      } else {
        fallbackCopyText(targetEmail);
      }
    } catch {
      fallbackCopyText(targetEmail);
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to dispatch transmission.');
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Transmission failed. You can send it directly via email.');
    }
  };

  const mailtoFallback = `mailto:${targetEmail}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-6 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    Let's work
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    together.
                  </span>
                </h2>
              </motion.div>



              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-md mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Actively seeking new opportunities where I can contribute, grow, and build impactful products. Available to join immediately. If you think I'd be a good fit, I'd love to hear from you.
              </p>

              {/* Connect Icons & Location */}
              <div className="pt-6 border-t border-[#8C6D4F]/20 space-y-5">
                {/* Social & Contact Icons */}
                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] mb-3">
                    CONNECT
                  </span>
                  <div className="flex items-center space-x-3">
                    {/* Email Icon with Auto-Copy */}
                    <div className="relative">
                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1510] border border-[#D4AF37] rounded text-[10px] font-mono tracking-wider text-[#F7E7C4] whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.9)] z-30 pointer-events-none"
                        >
                          COPIED!
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1A1510] border-r border-b border-[#D4AF37] rotate-45 -mt-0.5" />
                        </motion.div>
                      )}
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label="Copy Email"
                        title="Click to copy email address"
                        className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center shadow-[0_0_12px_rgba(0,0,0,0.5)] cursor-pointer ${copied
                          ? 'bg-[#D4AF37]/25 border border-[#D4AF37] text-[#F7E7C4] shadow-[0_0_16px_rgba(212,175,55,0.4)]'
                          : 'bg-[#14100D] border border-[#8C6D4F]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F7E7C4] text-[#A8988B]'
                          }`}
                      >
                        {copied ? (
                          <span className="text-sm font-bold text-[#D4AF37]">✓</span>
                        ) : (
                          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* GitHub Icon */}
                    <a
                      href="https://github.com/Priya142002"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="GitHub Profile"
                      className="w-10 h-10 rounded-lg bg-[#14100D] border border-[#8C6D4F]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F7E7C4] text-[#A8988B] flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>

                    {/* LinkedIn Icon */}
                    <a
                      href="https://www.linkedin.com/in/priya142002/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn Profile"
                      className="w-10 h-10 rounded-lg bg-[#14100D] border border-[#8C6D4F]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F7E7C4] text-[#A8988B] flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.5)] cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] mb-1">
                    LOCATION
                  </span>
                  <span className="text-xs text-[#A8988B] font-mono">
                    Chennai, Tamil Nadu | On-site, Hybrid or Remote
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Monolith Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {status === 'success' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  ✓
                </div>
                <h3
                  className="text-3xl text-white font-normal uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  PACKET DELIVERED
                </h3>
                <p
                  className="text-xs text-[#A8988B] font-light max-w-sm mx-auto leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Transmission registered and dispatched to{' '}
                  <span className="text-[#F7E7C4] font-medium">{targetEmail}</span>. I will review and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 text-[10px] font-mono tracking-widest uppercase border border-[#8C6D4F]/50 text-[#C8B8A6] hover:text-[#F7E7C4] hover:border-[#D4AF37] transition-colors rounded-sm"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {status === 'error' && (
                  <div className="p-3.5 border border-[#8C6D4F]/50 bg-[#1A120B] rounded-sm text-xs text-[#E8DFD8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-[#F7C4C4] font-mono text-[11px]">
                      {errorMessage || 'Direct send issue detected.'}
                    </span>
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center justify-center px-3 py-1.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase transition-colors shrink-0"
                    >
                      OPEN IN EMAIL APP ↗
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      SENDER
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      Enter Email
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    PAYLOAD
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter transmission payload..."
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#E8DFD8] hover:text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center space-x-2 ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                      <span>DISPATCHING TRANSMISSION...</span>
                    </>
                  ) : (
                    <>
                      <span>EXECUTE DISPATCH</span>
                      <span>↗</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </motion.div>

        </div>

        {/* Footer Bar */}
        <div className="pt-4 mt-8 border-t border-[#8C6D4F]/20 text-center">
          <p
            className="text-[11px] sm:text-xs text-[#8C6D4F] font-light tracking-normal sm:tracking-wide px-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            © {new Date().getFullYear()} Priyadharshini Baskaran. Built with{' '}
            <span className="text-[#D4AF37]">💛</span> using React &amp; Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;