"use client";

import { motion } from "framer-motion";
import { Database, Terminal, Layout, Server, Layers } from "lucide-react";

export function Skills({ lang }: { lang: 'pt' | 'en' }) {
  const skillCategories = [
    {
      title: lang === 'pt' ? "Frontend & Experiência" : "Frontend & Experience",
      icon: <Layout className="w-5 h-5 text-brand-500" />,
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Figma", "UI/UX Design"],
    },
    {
      title: lang === 'pt' ? "Backend & APIs" : "Backend & APIs",
      icon: <Server className="w-5 h-5 text-brand-500" />,
      skills: ["Node.js", "Python", "C#", ".NET Core", "RESTful APIs", "GraphQL", "WebSockets"],
    },
    {
      title: lang === 'pt' ? "Bancos de Dados & Cloud" : "Database & Cloud",
      icon: <Database className="w-5 h-5 text-brand-500" />,
      skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Firebase", "Arquitetura Serverless"],
    },
    {
      title: lang === 'pt' ? "DevOps & Arquitetura" : "DevOps & Architecture",
      icon: <Terminal className="w-5 h-5 text-brand-500" />,
      skills: ["CI/CD Pipelines", "Microserviços", "System Design", "Git/GitHub", "Testes Automatizados", "Segurança (OAuth/JWT)"],
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-16 text-center">
        <h2 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">{lang === 'pt' ? 'Arsenal Técnico' : 'Technical Arsenal'}</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'pt' ? 'O que eu domino.' : 'What I master.'}
        </h3>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          {lang === 'pt' ? 'Um panorama das tecnologias e ferramentas que uso para construir plataformas escaláveis e robustas de ponta a ponta.' : 'An overview of the technologies and tools I use to build scalable and robust end-to-end platforms.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-3xl flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
              <div className="p-3 bg-brand-50 rounded-xl shadow-sm border border-brand-100/50">
                {category.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-800">{category.title}</h4>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-4 py-2 bg-white/80 border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
