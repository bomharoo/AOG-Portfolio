'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '../../data/projectsData'; // Fixed path: backed out 2 levels to find data
import ProjectCard from '../../components/ProjectCard'; // Fixed path: backed out 2 levels to find components

export default function ProjectPresentation() {
  const params = useParams();
  const router = useRouter();
  
  // Find the unique project based on the dynamic ID route
  const projectId = parseInt(params.id as string, 10);
  const project = projectsData.find((p) => p.id === projectId);

  // Fallback if someone inputs an invalid URL id
  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p className="text-zinc-400 mt-2 text-sm max-w-xs">We couldn't locate the specific project milestone you're looking for.</p>
        <Link href="/" className="mt-6 text-xs font-mono uppercase bg-zinc-900 border border-zinc-800 text-amber-400 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-all">
          ← Return Home
        </Link>
      </div>
    );
  }

  // Find related milestone recommendations from the same service wing group
  const relatedProjects = projectsData
    .filter((p) => p.wing === project.wing && p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Dynamic Header Frame Navigation */}
<header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900/50 px-6 sm:px-12 py-4 flex justify-between items-center">
  
  {/* Left Section Container: Groups the Logo and the Back Button together */}
  <div className="flex items-center gap-6">
  
    
    {/* 🌟 MOVED TO LEFT: Positioned right next to the brand stamp */}
    <Link 
      href="/" 
      className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-zinc-900/50 border border-zinc-800 hover:border-amber-400/30 hover:bg-zinc-900 px-4 py-2 rounded-xl transition-all"
    >
      ← Back to Hub
    </Link>
  </div>

  {/* Right Section: Left empty for structural symmetry, keeping the header balanced */}
  <div className="hidden sm:block text-xs font-mono text-zinc-600">
    PROJECT OVERVIEW
  </div>

</header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">


        {/* Showcase Presentation Canvas Banner */}
        <div className="relative w-full h-[32rem] sm:h-[36rem] rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-900/40 shadow-2xl">
          <Image 
            src={project.image} 
            alt={`${project.title} Presentation`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          {/* Internal Metadata Card Tag Overlay Group */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-amber-400 text-black font-bold px-2.5 py-1 rounded-md shadow-lg">
              {project.wing === 'tech' ? 'Digital Solution' : project.wing === 'creative' ? 'Creative Branding' : 'Hybrid Work'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl drop-shadow-md">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Presentation Context Split Column Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">01 // Scope Overview</h2>
            <p className="text-lg font-light leading-relaxed text-zinc-300">
              {project.description}
            </p>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              This deployment represents a tailored partnership structured around community transparency, user accessibility, and long-term operating reliability. Built entirely from scratch to integrate cleanly into public workflows.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-6 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900/80">
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">02 // Technical Core</h4>
              <span className="text-[10px] font-mono text-amber-400/70 block">Functional Ecosystem Assets</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Context Related Cross-Linking Grid */}
        {relatedProjects.length > 0 && (
          <section className="pt-16 border-t border-zinc-900 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">03 // More Solutions on this Track</h3>
              <p className="text-sm text-zinc-400 font-light">Explore similar initiatives developed to empower regional operational standards.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((related) => (
                <ProjectCard key={related.id} project={related} isDarkMode={true} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="py-12 border-t border-zinc-900 text-center text-xs font-mono tracking-wider text-zinc-700">
        <p>© AOG STUDIO. COOPERATIVE PROGRESS THROUGH DIGITAL INFRASTRUCTURE.</p>
      </footer>

    </div>
  );
}