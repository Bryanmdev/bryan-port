"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Shield, Smartphone, Activity, HeartPulse, ShoppingBag, ExternalLink, ArrowRight, X, Image as ImageIcon } from "lucide-react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  color: string;
  icon: any;
  mockup: React.ReactNode;
};

const getProjects = (lang: 'pt' | 'en'): Project[] => [
  {
    title: "Easy Life",
    category: "Personal OS",
    description: "Sistema operacional pessoal com interface nativa da Apple para finanças e hábitos. Focado em uso diário com notificações proativas e análise inteligente de despesas.",
    tags: ["React", "Framer Motion", "UX Design"],
    link: "https://easy-life-self.vercel.app",
    color: "from-blue-500 to-cyan-500",
    icon: Activity,
    mockup: (
      <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-64 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 transform group-hover:scale-105 transition-transform duration-500 scale-[0.65] sm:scale-[0.8] md:scale-100 origin-bottom-right">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-400 to-cyan-400"></div>
          <div className="flex flex-col justify-center gap-2 flex-grow">
            <div className="w-full h-2 bg-white/30 rounded-full"></div>
            <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="w-full h-16 bg-white/10 rounded-xl"></div>
          <div className="w-full h-16 bg-white/10 rounded-xl"></div>
        </div>
      </div>
    )
  },
  {
    title: "Argus One",
    category: lang === 'pt' ? "SaaS & Segurança" : "SaaS & Security",
    description: lang === 'pt' ? "Plataforma avançada de monitoramento e segurança da informação com dashboard em tempo real." : "Advanced information security and monitoring platform with real-time dashboard.",
    tags: ["React", "TypeScript", "Node.js", "Security"],
    link: "https://argus-one-one.vercel.app",
    color: "from-purple-700 to-purple-900",
    icon: Shield,
    mockup: (
      <div className="absolute -bottom-2 -right-2 md:-bottom-10 md:-right-10 w-72 h-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 flex flex-col gap-3 transform group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500 scale-[0.35] sm:scale-[0.5] md:scale-100 origin-bottom-right">
        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
          <div className="w-20 h-3 bg-slate-700 rounded-full"></div>
          <div className="w-8 h-3 bg-purple-500/50 rounded-full"></div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/3 h-24 bg-slate-700/50 rounded-lg flex items-end p-2">
            <div className="w-full h-12 bg-purple-500 rounded-md"></div>
          </div>
          <div className="w-2/3 h-24 bg-slate-700/50 rounded-lg flex flex-col gap-2 p-3">
            <div className="w-full h-2 bg-slate-600 rounded-full"></div>
            <div className="w-4/5 h-2 bg-slate-600 rounded-full"></div>
            <div className="w-full h-2 bg-slate-600 rounded-full mt-auto"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Cadin Cel",
    category: "PWA E-commerce",
    description: "Admin PWA com estética iOS e checkout de múltiplas etapas para loja de smartphones.",
    tags: ["Next.js", "Tailwind", "Mobile-First"],
    link: "https://cadincel.vercel.app",
    color: "from-red-500 to-red-700",
    icon: Smartphone,
    mockup: (
      <div className="absolute -bottom-2 -right-2 md:-bottom-12 md:-right-4 w-48 h-64 bg-slate-50 rounded-[2rem] border-[6px] border-slate-800 shadow-2xl p-3 flex flex-col gap-3 transform group-hover:-translate-y-4 transition-transform duration-500 scale-[0.35] sm:scale-[0.5] md:scale-100 origin-bottom-right">
        <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
        <div className="w-full h-24 bg-red-100 rounded-xl"></div>
        <div className="w-3/4 h-3 bg-slate-200 rounded-full"></div>
        <div className="w-1/2 h-3 bg-slate-200 rounded-full"></div>
        <div className="mt-auto w-full h-10 bg-red-600 rounded-xl"></div>
      </div>
    )
  },
  {
    title: "Brasilhosp",
    category: "Healthcare",
    description: "Plataforma de alta performance para venda de equipamentos médicos e hospitalares.",
    tags: ["Full-Stack", "E-commerce", "Performance"],
    link: "https://brasil-hosp.com",
    color: "from-green-800 to-emerald-900",
    icon: HeartPulse,
    mockup: (
      <div className="absolute -bottom-2 -right-2 md:-bottom-10 md:right-4 w-56 h-48 bg-white rounded-t-xl shadow-2xl p-4 flex flex-col gap-3 transform group-hover:-translate-y-2 transition-transform duration-500 scale-[0.35] sm:scale-[0.5] md:scale-100 origin-bottom-right">
        <div className="w-full flex justify-between">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">+</div>
          <div className="w-20 h-4 bg-slate-100 rounded-full"></div>
        </div>
        <div className="w-full h-16 bg-slate-50 rounded-lg mt-2"></div>
        <div className="w-full h-16 bg-slate-50 rounded-lg"></div>
      </div>
    )
  },
  {
    title: "SandubaFit",
    category: "Delivery",
    description: "App de delivery otimizado com carrinho inteligente e integração via WhatsApp.",
    tags: ["React", "UI/UX", "WhatsApp API"],
    link: "https://sandubafit.vercel.app",
    color: "from-emerald-400 to-green-500",
    icon: ShoppingBag,
    mockup: (
      <div className="absolute -bottom-2 -right-2 md:-bottom-16 md:-right-6 w-48 h-72 bg-[#f0fff4] rounded-[2rem] border-[6px] border-emerald-900 shadow-2xl p-3 flex flex-col transform group-hover:-translate-y-4 transition-transform duration-500 rotate-12 scale-[0.35] sm:scale-[0.5] md:scale-100 origin-bottom-right">
        <div className="w-full h-24 bg-emerald-200 rounded-xl mb-3"></div>
        <div className="w-full h-3 bg-emerald-100 rounded-full mb-2"></div>
        <div className="w-3/4 h-3 bg-emerald-100 rounded-full mb-4"></div>
        <div className="w-full h-12 bg-emerald-500 rounded-xl mt-auto shadow-lg shadow-emerald-500/40 flex items-center justify-center">
          <div className="w-1/2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    )
  }
];

export function Projects({ lang }: { lang: 'pt' | 'en' }) {
  const projects = getProjects(lang);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <section id="projects" className="py-16 md:py-24 px-4 max-w-7xl mx-auto relative">
      <div className="mb-10 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div className="max-w-2xl">
          <h2 className="font-syne text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{lang === 'pt' ? 'Engenharia de Software' : 'Software Engineering'}</h2>
          <h3 className="font-syne text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {lang === 'pt' ? 'Projetos Full-Stack.' : 'Full-Stack Projects.'}
          </h3>
          <p className="mt-3 md:mt-4 text-slate-600 text-[14px] md:text-lg leading-relaxed">
            {lang === 'pt' ? 'Aplicações reais desenvolvidas de ponta a ponta. Foco em arquitetura escalável, design emocional e performance absurda.' : 'Real applications developed end-to-end. Focused on scalable architecture, emotional design, and peak performance.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className={`group relative flex flex-col rounded-[20px] md:rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 w-full cursor-pointer col-span-1 ${idx === 0 ? 'col-span-2 md:col-span-2 lg:col-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
          >
            {/* Visual Header with Mockup */}
            <div className={`relative w-full ${idx === 0 ? 'h-40 sm:h-48' : 'h-32'} md:h-64 bg-gradient-to-br ${project.color} overflow-hidden p-3 sm:p-5 md:p-8`}>
              {/* Dynamic glowing background */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
              
              <div className={`relative z-10 text-white ${idx === 0 ? 'w-[65%] md:w-full' : 'w-[90%] md:w-full'}`}>
                <project.icon className={`w-5 h-5 md:w-10 md:h-10 mb-1 md:mb-4 opacity-80 ${idx === 0 ? 'w-6 h-6' : ''}`} />
                <h4 className={`font-syne font-bold mb-0.5 md:mb-1 leading-tight truncate ${idx === 0 ? 'text-[18px] sm:text-2xl' : 'text-[14px]'} md:text-3xl`}>{project.title}</h4>
                <p className={`text-white/80 font-medium truncate ${idx === 0 ? 'text-[11px] sm:text-[13px]' : 'text-[9px]'} md:text-sm`}>{project.category}</p>
              </div>

              {/* Injected CSS Mockup */}
              {project.mockup}
            </div>
            
            {/* Content Body */}
            <div className="flex flex-col flex-grow p-3 sm:p-4 md:p-8 bg-white z-20 relative pointer-events-none">
              <p className={`text-slate-600 mb-3 md:mb-6 leading-tight md:leading-relaxed flex-grow line-clamp-3 ${idx === 0 ? 'text-[12px] sm:text-[14px]' : 'text-[10px]'} md:text-base`}>{project.description}</p>
              
              <div className="flex items-center justify-between mt-auto gap-2 md:gap-4 pt-2">
                <div className="flex gap-1 md:gap-2 flex-wrap">
                  {project.tags.slice(0, idx === 0 ? 3 : 1).map(tag => (
                    <span key={tag} className="text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 rounded-md truncate max-w-[60px] sm:max-w-[80px] md:max-w-none">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > (idx === 0 ? 3 : 1) && (
                    <span className="text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 rounded-md">
                      +{project.tags.length - (idx === 0 ? 3 : 1)}
                    </span>
                  )}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors flex-shrink-0 ml-1 md:ml-4 group/btn shadow-sm pointer-events-auto"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover/btn:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`w-full h-48 md:h-64 bg-gradient-to-br ${selectedProject.color} relative overflow-hidden flex-shrink-0 p-6 md:p-10 flex flex-col justify-end`}>
                <div className="relative z-10 text-white">
                  <selectedProject.icon className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 opacity-80" />
                  <h3 className="font-syne text-3xl md:text-5xl font-bold mb-2">{selectedProject.title}</h3>
                  <p className="text-white/80 font-medium text-sm md:text-lg">{selectedProject.category}</p>
                </div>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto flex-grow flex flex-col gap-8">
                <div>
                  <h4 className="font-syne text-xl font-bold text-slate-800 mb-3">{lang === 'pt' ? 'Sobre o Projeto' : 'About the Project'}</h4>
                  <p className="text-slate-600 leading-relaxed text-[15px] md:text-lg">{selectedProject.description}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-[11px] md:text-sm font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interface Photos Placeholder */}
                <div>
                   <h4 className="font-syne text-xl font-bold text-slate-800 mb-4">{lang === 'pt' ? 'Interfaces' : 'Interfaces'}</h4>
                   <div className="w-full h-48 md:h-80 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                     <ImageIcon className="w-10 h-10 mb-3 opacity-50" />
                     <p className="text-sm font-medium">{lang === 'pt' ? 'Fotos da interface serão adicionadas em breve.' : 'Interface photos will be added soon.'}</p>
                   </div>
                </div>

                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-4 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-brand-600 transition-colors"
                >
                  <span>{lang === 'pt' ? 'Acessar Aplicação' : 'Visit Application'}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
