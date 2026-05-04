"use client";

import { motion } from "framer-motion";
import { Download, Layout, Database, Server, Palette } from "lucide-react";

export function About({ lang }: { lang: 'pt' | 'en' }) {
  return (
    <section id="about" className="py-16 md:py-24 px-4 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <h2 className="font-syne text-xs md:text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">{lang === 'pt' ? 'Sobre Mim' : 'About Me'}</h2>
          <h3 className="font-syne text-[24px] leading-tight md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3 md:mb-6">
            {lang === 'pt' ? 'Engenharia de Software' : 'Software Engineering'} <br/>{lang === 'pt' ? 'Full-Stack.' : 'Full-Stack.'}
          </h3>
          <p className="text-slate-600 text-[13px] sm:text-[14px] md:text-lg leading-relaxed mb-4 md:mb-6">
            {lang === 'pt' 
              ? 'Sou estudante de Ciência da Computação e Desenvolvedor Full-Stack especializado em arquiteturas web modernas. Meu foco é resolver problemas de negócios através de código limpo, sistemas escaláveis e interfaces de alta conversão.'
              : 'I am a Computer Science student and Full-Stack Developer specializing in modern web architectures. My focus is solving business problems through clean code, scalable systems, and high-conversion interfaces.'}
          </p>
          <p className="text-slate-600 text-[14px] md:text-lg leading-relaxed mb-6 md:mb-8">
            {lang === 'pt'
              ? 'Trabalho com uma vasta stack de tecnologias, dominando desde o Frontend (React, Next.js, Tailwind) até o Backend (Node, Python, C#) e infraestrutura em nuvem, garantindo a entrega ponta-a-ponta de produtos digitais robustos.'
              : 'I work with a vast stack of technologies, mastering everything from Frontend (React, Next.js, Tailwind) to Backend (Node, Python, C#) and cloud infrastructure, ensuring end-to-end delivery of robust digital products.'}
          </p>
          
          <div className="flex gap-3 md:gap-4">
            <div className="p-3 md:p-4 glass-panel rounded-xl md:rounded-2xl flex-1 text-center">
              <span className="block text-2xl md:text-3xl font-black text-brand-500 mb-0.5 md:mb-1">+4</span>
              <span className="text-[11px] md:text-sm font-medium text-slate-500">{lang === 'pt' ? 'Anos de Código' : 'Years Coding'}</span>
            </div>
            <div className="p-3 md:p-4 glass-panel rounded-xl md:rounded-2xl flex-1 text-center">
              <span className="block text-2xl md:text-3xl font-black text-brand-500 mb-0.5 md:mb-1">100%</span>
              <span className="text-[11px] md:text-sm font-medium text-slate-500">{lang === 'pt' ? 'Foco em Entrega' : 'Delivery Focus'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
            <a 
              href="/Curriculo_PT.pdf" 
              download 
              className="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Currículo (PT)
            </a>
            <a 
              href="/Resume_EN.pdf" 
              download 
              className="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Resume (EN)
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-6 mt-4 md:mt-0"
        >
          {[
            {
              icon: Layout,
              title: lang === 'pt' ? "Frontend Avançado" : "Advanced Frontend",
              desc: lang === 'pt' ? "Next.js, React e TailwindCSS." : "Next.js, React, and TailwindCSS."
            },
            {
              icon: Database,
              title: lang === 'pt' ? "Backend & APIs" : "Backend & APIs",
              desc: lang === 'pt' ? "Node.js, C# (.NET) e Python." : "Node.js, C# (.NET), and Python."
            },
            {
              icon: Server,
              title: lang === 'pt' ? "Cloud & Infra" : "Cloud & Infra",
              desc: lang === 'pt' ? "Docker, CI/CD e Bancos (SQL/NoSQL)." : "Docker, CI/CD, and DBs (SQL/NoSQL)."
            },
            {
              icon: Palette,
              title: lang === 'pt' ? "Design UI/UX" : "UI/UX Design",
              desc: lang === 'pt' ? "Figma e design focado no usuário." : "Figma and user-centered design."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 text-brand-600 border border-slate-200">
                <item.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h4 className="font-syne text-[13px] md:text-xl font-bold text-slate-900 mb-1 md:mb-2 leading-tight">{item.title}</h4>
              <p className="text-slate-600 text-[11px] md:text-sm leading-snug">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
