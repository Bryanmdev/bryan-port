"use client";

import { useState } from "react";
import { Monitor, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { MiniGame } from "@/components/MiniGame";
import { Contact } from "@/components/Contact";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [showMobileNotice, setShowMobileNotice] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence>
        {showMobileNotice && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-6 left-4 right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-[100] flex items-start gap-3"
          >
            <Monitor className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">{lang === 'pt' ? 'Melhor no Computador' : 'Better on Desktop'}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'pt' ? 'Para uma experiência suprema e testar a performance da engine gráfica, acesse pelo PC.' : 'For a supreme experience and to test the graphics engine performance, access via PC.'}
              </p>
            </div>
            <button onClick={() => setShowMobileNotice(false)} className="p-1 bg-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onOpenContact={() => setIsContactModalOpen(true)} lang={lang} setLang={setLang} />
      <div className="w-full relative mt-20">
        <Hero onOpenContact={() => setIsContactModalOpen(true)} lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <MiniGame lang={lang} />
        <Contact lang={lang} />
        
        {/* Footer */}
        <footer className="w-full py-8 text-center text-slate-500 border-t border-slate-200 bg-white/30 backdrop-blur-sm">
          <p className="font-medium text-sm">© {new Date().getFullYear()} Bryan Miranda. Let's build something great.</p>
        </footer>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} lang={lang} />
    </main>
  );
}
