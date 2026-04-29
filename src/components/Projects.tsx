"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Smartphone, Activity, HeartPulse, ShoppingBag, ExternalLink, ArrowRight } from "lucide-react";

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
    title: "Argus One",
    category: lang === 'pt' ? "SaaS & Segurança" : "SaaS & Security",
    description: lang === 'pt' ? "Plataforma avançada de monitoramento e segurança da informação com dashboard em tempo real." : "Advanced information security and monitoring platform with real-time dashboard.",
    tags: ["React", "TypeScript", "Node.js", "Security"],
    link: "https://argus-one-one.vercel.app",
    color: "from-purple-700 to-purple-900",
    icon: Shield,
    mockup: (
      <div className="absolute -bottom-10 -right-10 w-72 h-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 flex flex-col gap-3 transform group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500">
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
    title: "Cadin Celulares",
    category: "PWA E-commerce",
    description: "Admin PWA com estética iOS e checkout de múltiplas etapas para loja de smartphones.",
    tags: ["Next.js", "Tailwind", "Mobile-First"],
    link: "https://cadincel.vercel.app",
    color: "from-red-500 to-red-700",
    icon: Smartphone,
    mockup: (
      <div className="absolute -bottom-12 -right-4 w-48 h-64 bg-slate-50 rounded-[2rem] border-[6px] border-slate-800 shadow-2xl p-3 flex flex-col gap-3 transform group-hover:-translate-y-4 transition-transform duration-500">
        <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
        <div className="w-full h-24 bg-red-100 rounded-xl"></div>
        <div className="w-3/4 h-3 bg-slate-200 rounded-full"></div>
        <div className="w-1/2 h-3 bg-slate-200 rounded-full"></div>
        <div className="mt-auto w-full h-10 bg-red-600 rounded-xl"></div>
      </div>
    )
  },
  {
    title: "Easy Life",
    category: "Personal OS",
    description: "Sistema operacional pessoal com interface nativa da Apple para finanças e hábitos.",
    tags: ["React", "Framer Motion", "UX Design"],
    link: "https://easy-life-self.vercel.app",
    color: "from-blue-500 to-cyan-500",
    icon: Activity,
    mockup: (
      <div className="absolute -bottom-8 -right-8 w-64 h-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 transform group-hover:scale-105 transition-transform duration-500">
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
    title: "Brasilhosp",
    category: "Healthcare E-commerce",
    description: "Plataforma de alta performance para venda de equipamentos médicos e hospitalares.",
    tags: ["Full-Stack", "E-commerce", "Performance"],
    link: "https://brasil-hosp.com",
    color: "from-green-800 to-emerald-900",
    icon: HeartPulse,
    mockup: (
      <div className="absolute -bottom-10 right-4 w-56 h-48 bg-white rounded-t-xl shadow-2xl p-4 flex flex-col gap-3 transform group-hover:-translate-y-2 transition-transform duration-500">
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
    category: "Delivery Platform",
    description: "App de delivery otimizado com carrinho inteligente e integração via WhatsApp.",
    tags: ["React", "UI/UX", "WhatsApp API"],
    link: "https://sandubafit.vercel.app",
    color: "from-emerald-400 to-green-500",
    icon: ShoppingBag,
    mockup: (
      <div className="absolute -bottom-16 -right-6 w-48 h-72 bg-[#f0fff4] rounded-[2rem] border-[6px] border-emerald-900 shadow-2xl p-3 flex flex-col transform group-hover:-translate-y-4 transition-transform duration-500 rotate-12">
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
  
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="font-syne text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{lang === 'pt' ? 'Engenharia de Software' : 'Software Engineering'}</h2>
          <h3 className="font-syne text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {lang === 'pt' ? 'Projetos Full-Stack.' : 'Full-Stack Projects.'}
          </h3>
          <p className="mt-4 text-slate-600 text-lg">
            {lang === 'pt' ? 'Aplicações reais desenvolvidas de ponta a ponta. Foco em arquitetura escalável, design emocional e performance absurda.' : 'Real applications developed end-to-end. Focused on scalable architecture, emotional design, and peak performance.'}
          </p>
        </div>
      </div>

      <div className="flex md:hidden items-center justify-center gap-2 mb-6 text-slate-500 font-semibold text-[13px] bg-slate-100/50 w-full px-4 py-2 rounded-xl">
        <ArrowRight className="w-4 h-4" />
        <span>{lang === 'pt' ? 'Deslize para o lado para ver mais' : 'Swipe sideways to see more'}</span>
      </div>

      <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 md:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 w-[85vw] max-w-[320px] md:max-w-none md:w-auto snap-center shrink-0 md:shrink ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}
          >
            {/* Visual Header with Mockup */}
            <div className={`relative w-full h-48 md:h-64 bg-gradient-to-br ${project.color} overflow-hidden p-6 md:p-8`}>
              {/* Dynamic glowing background */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
              
              <div className="relative z-10 text-white">
                <project.icon className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 opacity-80" />
                <h4 className="font-syne text-2xl md:text-3xl font-bold mb-1">{project.title}</h4>
                <p className="text-white/80 font-medium text-xs md:text-sm">{project.category}</p>
              </div>

              {/* Injected CSS Mockup */}
              {project.mockup}
            </div>
            
            {/* Content Body */}
            <div className="flex flex-col flex-grow p-5 md:p-8 bg-white z-20 relative">
              <p className="text-slate-600 mb-5 md:mb-6 text-[13px] md:text-base leading-relaxed flex-grow">{project.description}</p>
              
              <div className="flex items-center justify-between mt-auto gap-4">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors flex-shrink-0 ml-4 group/btn"
                >
                  <ExternalLink className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
