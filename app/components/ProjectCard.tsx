'use client';

import { Project } from '../data/projectsData';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  isDarkMode: boolean;
}

export default function ProjectCard({ project, isDarkMode }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${project.id}`}
      className={`group rounded-3xl border overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer shadow-sm hover:shadow-md ${
        isDarkMode 
          ? 'bg-stone-900/30 border-stone-900 hover:border-amber-500/30' 
          : 'bg-white border-stone-200 hover:border-stone-300 shadow-stone-100/50'
      }`}
    >
      
      {/* --- FEATURE PREVIEW FRAMING CANVAS --- */}
      <div className={`relative w-full h-48 overflow-hidden border-b shrink-0 ${
        isDarkMode ? 'border-stone-900 bg-stone-950' : 'border-stone-100 bg-stone-50'
      }`}>
        <Image 
          src={project.image} 
          alt={`${project.title} Preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        
        {/* Softer, Professional Pill Overlay Badge */}
        <span className={`absolute bottom-3 left-3 text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
          project.wing === 'tech' 
            ? 'bg-stone-950/60 text-amber-400 border-amber-500/20' 
            : project.wing === 'creative' 
              ? 'bg-stone-950/60 text-amber-400 border-amber-500/20'
              : 'bg-stone-950/60 text-amber-400 border-amber-500/20'
        }`}>
          {project.wing === 'tech' ? 'Digital Solution' : project.wing === 'creative' ? 'Creative Brand' : 'Integrated'}
        </span>
      </div>

      {/* --- INFRASTRUCTURE BODY DETAILS --- */}
      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          {/* 🌟 Changed title heading to clean serif layout to match editorial aesthetic */}
          <h3 className="text-lg font-serif font-normal tracking-tight transition-colors group-hover:text-amber-500">
            {project.title}
          </h3>
          <p className={`text-sm font-light leading-relaxed line-clamp-3 ${
            isDarkMode ? 'text-stone-400' : 'text-stone-600'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Minimalist Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                isDarkMode 
                  ? 'bg-stone-950/40 border-stone-800 text-stone-500' 
                  : 'bg-stone-50 border-stone-200/60 text-stone-500'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </Link>
  );
}