"use client";

import { motion } from "framer-motion";
import { Download, Layout, Database, Server, Palette } from "lucide-react";

export function About({ lang }: { lang: 'pt' | 'en' }) {
  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <h2 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">{lang === 'pt' ? 'Sobre Mim' : 'About Me'}</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {lang === 'pt' ? 'Engenharia de Software' : 'Software Engineering'} <br/>{lang === 'pt' ? 'Full-Stack.' : 'Full-Stack.'}
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            {lang === 'pt' 
              ? 'Sou estudante de Ciência da Computação e Desenvolvedor Full-Stack especializado em arquiteturas web modernas. Meu foco é resolver problemas de negócios através de código limpo, sistemas escaláveis e interfaces de alta conversão.'
              : 'I am a Computer Science student and Full-Stack Developer specialized in modern web architectures. My focus is solving business problems through clean code, scalable systems, and high-conversion interfaces.'}
          </p>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {lang === 'pt'
              ? 'Trabalho com uma vasta stack de tecnologias, dominando desde o Frontend (React, Next.js, Tailwind) até o Backend (Node, Python, C#) e infraestrutura em nuvem, garantindo a entrega ponta-a-ponta de produtos digitais robustos.'
              : 'I work with a vast stack of technologies, mastering everything from Frontend (React, Next.js, Tailwind) to Backend (Node, Python, C#) and cloud infrastructure, ensuring end-to-end delivery of robust digital products.'}
          </p>
          
          <div className="flex gap-4">
            <div className="p-4 glass-panel rounded-2xl flex-1 text-center">
              <span className="block text-3xl font-black text-brand-500 mb-1">+4</span>
              <span className="text-sm font-medium text-slate-500">{lang === 'pt' ? 'Anos de Código' : 'Years Coding'}</span>
            </div>
            <div className="p-4 glass-panel rounded-2xl flex-1 text-center">
              <span className="block text-3xl font-black text-brand-500 mb-1">100%</span>
              <span className="text-sm font-medium text-slate-500">{lang === 'pt' ? 'Foco em Entrega' : 'Delivery Focus'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a 
              href="/Curriculo_PT.pdf" 
              download 
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            >
              <Download className="w-5 h-5" />
              Currículo (PT)
            </a>
            <a 
              href="/Resume_EN.pdf" 
              download 
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Resume (EN)
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            {
              icon: Layout,
              title: lang === 'pt' ? "Frontend Avançado" : "Advanced Frontend",
              desc: lang === 'pt' ? "Next.js, React e TailwindCSS para interfaces fluidas e performáticas." : "Next.js, React, and TailwindCSS for fluid and performant interfaces."
            },
            {
              icon: Database,
              title: lang === 'pt' ? "Backend & APIs" : "Backend & APIs",
              desc: lang === 'pt' ? "Node.js, C# (.NET) e Python para regras de negócio seguras e escaláveis." : "Node.js, C# (.NET), and Python for secure and scalable business logic."
            },
            {
              icon: Server,
              title: lang === 'pt' ? "Cloud & Infra" : "Cloud & Infra",
              desc: lang === 'pt' ? "Docker, CI/CD e Bancos de Dados otimizados (PostgreSQL, MongoDB)." : "Docker, CI/CD, and optimized Databases (PostgreSQL, MongoDB)."
            },
            {
              icon: Palette,
              title: lang === 'pt' ? "Design UI/UX" : "UI/UX Design",
              desc: lang === 'pt' ? "Criação de mockups, prototipagem no Figma e design centrado no usuário." : "Mockup creation, Figma prototyping, and user-centered design."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-brand-600 border border-slate-200">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
