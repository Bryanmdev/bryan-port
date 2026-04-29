"use client";

import { motion } from "framer-motion";
import { Send, FileDown, ArrowRight } from "lucide-react";

export function Contact({ lang }: { lang: 'pt' | 'en' }) {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">
      {/* Decorative background for contact section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-tr from-brand-100/50 to-purple-100/50 blur-[100px] -z-10 rounded-full" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6">
            {lang === 'pt' ? 'Vamos construir algo' : "Let's build something"} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
              {lang === 'pt' ? 'Incrível Juntos.' : 'Amazing Together.'}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {lang === 'pt' 
              ? 'Seja para o desenvolvimento de um aplicativo mobile, um e-commerce escalável ou sistemas de alta performance. Estou pronto para elevar o nível do seu próximo projeto.'
              : 'Whether developing a mobile app, a scalable e-commerce, or high-performance systems. I am ready to elevate the level of your next project.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a 
              href="mailto:bryanmiranda.dev@gmail.com" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-500/20"
            >
              <Send className="w-5 h-5" />
              {lang === 'pt' ? 'Iniciar um Projeto' : 'Start a Project'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
