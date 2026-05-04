"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
}

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function ContactModal({ isOpen, onClose, lang }: ContactModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h3 className="font-syne text-2xl font-bold text-slate-900 mb-2">{lang === 'pt' ? 'Vamos conversar!' : "Let's talk!"}</h3>
              <p className="text-slate-500">{lang === 'pt' ? 'Escolha o seu canal preferido para falarmos sobre o seu próximo projeto.' : 'Choose your preferred channel to discuss your next project.'}</p>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/5598985900317?text=Olá%20Bryan!%20Vim%20pelo%20seu%20portfólio."
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg">WhatsApp</span>
                  <span className="text-sm opacity-80">{lang === 'pt' ? 'Resposta rápida' : 'Fast response'}</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/bryan-miraanda"
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0A66C2] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg">LinkedIn</span>
                  <span className="text-sm opacity-80">{lang === 'pt' ? 'Conexões profissionais' : 'Professional connections'}</span>
                </div>
              </a>

              <a 
                href="mailto:bryanmiranda.dev@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand-100 text-brand-700 hover:bg-brand-200 transition-colors group"
              >
                <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg">{lang === 'pt' ? 'E-mail' : 'Email'}</span>
                  <span className="text-sm opacity-80">{lang === 'pt' ? 'Para propostas detalhadas' : 'For detailed proposals'}</span>
                </div>
              </a>

              <a 
                href="https://instagram.com/bryan__olive"
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-2xl bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg">Instagram</span>
                  <span className="text-sm opacity-80">{lang === 'pt' ? 'Acompanhe meu trabalho' : 'Follow my work'}</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
