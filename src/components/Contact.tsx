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
          <h2 className="font-syne text-[28px] leading-tight sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6">
            {lang === 'pt' ? 'Vamos construir algo' : "Let's build something"} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
              {lang === 'pt' ? 'Incrível Juntos.' : 'Amazing Together.'}
            </span>
          </h2>
          
          <p className="text-[14px] sm:text-base md:text-2xl text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            {lang === 'pt' 
              ? 'Seja para o desenvolvimento de um aplicativo mobile, um e-commerce escalável ou sistemas de alta performance. Estou pronto para elevar o nível do seu próximo projeto.'
              : 'Whether developing a mobile app, a scalable e-commerce platform, or high-performance systems. I am ready to elevate your next project.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-[90%] sm:w-auto px-6 md:px-12 py-3.5 md:py-6 bg-brand-500 hover:bg-brand-600 text-white rounded-[24px] md:rounded-full font-bold text-[15px] md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-500/50 flex items-center justify-center gap-2 md:gap-3 group mx-auto">
              <Send className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {lang === 'pt' ? 'Iniciar um Projeto' : 'Start a Project'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
