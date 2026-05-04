"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, FileText, Globe, ChevronDown } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Navbar({ onOpenContact, lang, setLang }: { onOpenContact: () => void, lang: 'pt' | 'en', setLang: (l: 'pt' | 'en') => void }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 sm:py-4" : "py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className={`flex items-center justify-between rounded-full px-3 sm:px-6 py-2 sm:py-3 transition-all duration-300 ${
          scrolled ? "bg-white/70 backdrop-blur-md shadow-lg shadow-brand-500/5 border border-white/50" : "bg-transparent"
        }`}>
          {/* Logo */}
          <a href="#" className="font-syne text-[17px] sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-md sm:rounded-lg flex items-center justify-center text-white text-xs sm:text-base">
              B
            </div>
            <span className="truncate">Bryan <span className="hidden sm:inline">Miranda</span><span className="text-pink-500">.</span></span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-brand-600 transition-colors">{lang === 'pt' ? 'Sobre' : 'About'}</a>
            <a href="#skills" className="hover:text-brand-600 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-brand-600 transition-colors">{lang === 'pt' ? 'Projetos' : 'Projects'}</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-slate-50 focus:outline-none"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {lang.toUpperCase()}
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-28 sm:w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[100]"
                  >
                    <button 
                      onClick={() => { setLang('pt'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${lang === 'pt' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      Português
                    </button>
                    <button 
                      onClick={() => { setLang('en'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${lang === 'en' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="hidden sm:flex items-center gap-3 mr-2 border-r border-slate-200 pr-4 pl-2">
              <a href="https://github.com/Bryanmdev" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/bryan-miraanda" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
            
            <button 
              onClick={onOpenContact}
              className="flex items-center gap-2 bg-slate-900 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-brand-600 transition-colors shadow-md"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{lang === 'pt' ? 'Contato' : 'Contact'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
