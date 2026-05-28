'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { projectsData } from './data/projectsData';
import { teamData, TeamMember } from './data/teamData';
import ProjectCard from './components/ProjectCard';
import TeamCard from './components/TeamCard';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'creative' | 'tech'>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const [processTab, setProcessTab] = useState<'creative' | 'tech' | 'hybrid'>('hybrid');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Navigation show/hide visibility states
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedWing, setSelectedWing] = useState<'design' | 'tech' | 'both'>('both');
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 1. Core Section Tracking Highlight
      const sections = ['portfolio-section', 'process-section', 'team-section', 'planner-section'];
      const scrollPosition = currentScrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // 2. Intelligent Header HUD Visibility Mechanics
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      if (currentScrollY < 50) {
        // Keep visible at the very top of the landing page
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Actively scrolling down -> Hide immediately
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Actively scrolling up -> Reveal immediately
        setIsNavVisible(true);
      }

      // Reveal navigation header when user stops scrolling completely
      scrollTimeout.current = setTimeout(() => {
        setIsNavVisible(true);
      }, 150);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const availableFeatures = {
    design: ['Brand Identity & Logos', 'Graphic Design', 'UI/UX Mobile Design', 'Website Layouts'],
    tech: ['E-Commerce Stores', 'Secure Databases', 'Custom Web Apps', 'Management Dashboards'],
    both: ['Full Brand & Website Package', 'School & Office Portals', 'Booking & Tourism Platforms', 'Custom Business Tools']
  };

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.wing === filter || project.wing === 'hybrid';
  });

  const toggleFeature = (feature: string) => {
    setCustomFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setCustomFeatures([]);
    }, 5000);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-500/30 transition-colors duration-1000 overflow-x-hidden ${
      isDarkMode ? 'bg-[#0c0b0a] text-[#f4f3ef]' : 'bg-[#faf9f5] text-[#1a1918]'
    }`}>
      
      {/* Subtle background texture for character */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#1c1b18_1px,transparent_1px)] [background-size:16px_16px] z-50" />
      
      {/* --- INTELLIGENT SCROLL-REACTIVE TOP NAVIGATION BAR --- */}
      <div className={`fixed top-6 left-0 right-0 z-50 px-4 flex justify-center transition-all duration-300 transform ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}>
        <header className="w-full max-w-4xl backdrop-blur-xl border rounded-full px-6 py-3.5 flex justify-between items-center shadow-lg transition-all duration-500 bg-[#0c0b0a]/85 border-stone-800/80">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-amber-500 font-serif font-black text-xl tracking-tight">AOG<span className="text-white">.</span></span>
          </div>

          <nav className="flex items-center gap-6 md:gap-8 font-sans text-xs font-medium tracking-wider uppercase">
            {[
              { id: 'portfolio-section', label: 'Our Work' },
              { id: 'process-section', label: 'Our Process' },
              { id: 'team-section', label: 'The Studio' },
              { id: 'planner-section', label: 'Work With Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`transition-colors relative py-1 cursor-pointer ${
                  activeSection === item.id ? 'text-amber-500 font-semibold' : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-sm"
          >
            {isDarkMode ? '✦' : '⚜'}
          </button>
        </header>
      </div>

      {/* --- HERO SECTION: MODERN MAGAZINE FRONT-PAGE SPLIT --- */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 border-b border-stone-900/40 items-stretch pt-24">
        <div className="lg:col-span-7 p-8 sm:p-16 flex flex-col justify-between relative">
          <div className="text-xs font-sans tracking-widest uppercase text-amber-500 font-semibold">
            Based in Malaybalay City, Bukidnon
          </div>

          <div className="space-y-6 my-auto py-12">
            <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-tight leading-[1.05] text-balance">
              We create beautiful <span className="italic font-normal text-amber-500">brands</span> and build reliable, custom <span className="font-sans font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">software.</span>
            </h1>
            <p className="max-w-xl text-base font-light tracking-wide leading-relaxed text-stone-400">
              We are a hands-on creative studio. We combine world-class design with solid engineering to build websites, applications, and visual identities that help local businesses and institutions grow.
            </p>
          </div>

          <div className="flex gap-6 border-t border-stone-800/40 pt-8 font-sans text-xs tracking-wider text-stone-500">
            <div>EST. 2026</div>
            <div>•</div>
            <div>DIGITAL DESIGN STUDIO</div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#121110] p-8 sm:p-12 flex flex-col justify-end relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800')` }} />
          <div className="space-y-4 z-10">
            <div className="text-xl font-serif italic text-stone-200">"Tailored for your business, crafted by hand."</div>
            <div className="h-[1px] w-12 bg-amber-500" />
            <p className="text-sm font-light text-stone-400 leading-relaxed max-w-sm">
              We don't use standard website templates. Everything we build is uniquely customized to fit your goals, engage your customers, and look exceptionally professional.
            </p>
          </div>
        </div>
      </section>

      {/* --- WORKS SECTION: STAGGERED GRID SHOWCASE (FIXED ALIGNMENTS) --- */}
      <section id="portfolio-section" className="py-32 px-6 sm:px-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* FIXED SUBHEADER ROW ALIGNMENT */}
          <div className="border-b border-stone-800/40 pb-6 flex flex-col md:flex-row justify-between items-baseline gap-4">
            <div className="space-y-2">
              <span className="text-xs font-sans tracking-widest text-amber-500 font-semibold uppercase block">01 // Case Studies</span>
              <h2 className="text-3xl font-serif tracking-tight">Recent Projects We've Launched</h2>
            </div>

            <div className="flex gap-4 font-sans text-xs font-medium tracking-wide uppercase self-start md:self-auto">
              {(['all', 'creative', 'tech'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`pb-2 border-b-2 transition-all cursor-pointer ${
                    filter === t ? 'border-amber-500 text-amber-500 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-300'
                  }`}
                >
                  {t === 'all' ? 'All Work' : t === 'creative' ? 'Branding & Design' : 'Websites & Apps'}
                </button>
              ))}
            </div>
          </div>

          {/* Off-center asymmetrical card layout grid flow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={project.id} 
                  className={`w-full transition-all duration-700 ${
                    isEven ? 'md:col-span-7' : 'md:col-span-5 md:mt-24'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Fixed aspect ratios inside custom containers prevent structural layout collapsing */}
                    <div className="w-full relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900/60 border border-stone-800/60">
                      <ProjectCard project={project} isDarkMode={isDarkMode} />
                    </div>
                    <div className="flex justify-between items-center text-xs font-sans text-stone-500 px-1">
                      <span className="font-medium">Project #0{project.id}</span>
                      <span className="uppercase tracking-wider text-amber-500/90 text-[11px] font-semibold">{project.wing === 'tech' ? 'Web & Software' : 'Creative Design'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- METHOD SECTION --- */}
      <section id="process-section" className="py-32 px-6 sm:px-16 border-t border-b border-stone-900/40 bg-[#0e0d0c]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-32">
            <span className="text-xs font-sans tracking-widest text-amber-500 font-semibold block uppercase">02 // Our Framework</span>
            <h2 className="text-3xl font-serif tracking-tight leading-tight">How Your Project Gets Built</h2>
            <p className="text-sm font-light text-stone-400 leading-relaxed">
              We keep our process transparent and collaborative. Choose a lane below to see exactly how we map out your path from initial idea to live launch.
            </p>
            <div className="space-y-2 pt-2 font-sans">
              {[
                { id: 'creative', label: 'Branding & Identity Track' },
                { id: 'tech', label: 'Websites & Custom Systems' },
                { id: 'hybrid', label: 'The Full Studio Suite' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setProcessTab(b.id as any)}
                  className={`w-full text-left text-xs p-3.5 border transition-all cursor-pointer flex justify-between items-center rounded-xl ${
                    processTab === b.id ? 'border-amber-500 bg-stone-900/60 text-amber-400 font-semibold' : 'border-stone-900 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span>{b.label}</span>
                  <span className="text-[10px]">{processTab === b.id ? '●' : '○'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {[
              { id: '01', cTitle: 'Discovery & Creative Direction', tTitle: 'Planning & Project Scoping', hTitle: 'Complete Strategy Workshop', cDesc: 'We gather your team to explore your story and goals. We outline a clear visual direction that makes your business look professional and recognizable.', tDesc: 'We map out your business workflows, choose the best technical tools, and draft clear wireframes so you know exactly how the system will behave.', hDesc: 'A unified startup phase where we map out both your complete visual branding guidelines and technical feature dependencies at the same time.' },
              { id: '02', cTitle: 'Design Concepts & Refinement', tTitle: 'Development & Interactive Mockups', hTitle: 'Parallel Design & Engineering', cDesc: 'We construct beautiful typography, color systems, and custom layouts. We collaborate with you to refine the details until it fits your brand perfectly.', tDesc: 'We build responsive web screens, structure secure database layers, and connect your systems. You will be able to click around and test everything live.', hDesc: 'Our team goes to work on both lanes at once—writing clean code scripts while crafting custom tailored visuals in real-time.' },
              { id: '03', cTitle: 'Final Brand Asset Delivery', tTitle: 'Testing, Training & Going Live', hTitle: 'Full Ecosystem Launch', cDesc: 'You receive all your production-ready design files, digital media packages, and clear brand rules ready to use across your business.', tDesc: 'We thoroughly test your system, fix any issues, train your staff, and deploy your project live to the public safely.', hDesc: 'We launch your custom software system completely packed with your new signature branding, followed by long-term upkeep support.' }
            ].map((step, index) => (
              <div key={index} className="p-8 border border-stone-900/60 bg-[#0b0a09] grid grid-cols-1 md:grid-cols-12 gap-4 items-start rounded-2xl hover:border-stone-800 transition-colors">
                <div className="md:col-span-1 font-sans text-xs text-amber-500 font-bold">{step.id}</div>
                <div className="md:col-span-11 space-y-1">
                  <h4 className="text-lg font-sans font-semibold text-stone-100">
                    {processTab === 'creative' ? step.cTitle : processTab === 'tech' ? step.tTitle : step.hTitle}
                  </h4>
                  <p className="text-sm font-light text-stone-400 leading-relaxed tracking-wide">
                    {processTab === 'creative' ? step.cDesc : processTab === 'tech' ? step.tDesc : step.hDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STUDIO STAFF SHOWCASE --- */}
      <section id="team-section" className="py-32 px-6 sm:px-16 max-w-7xl mx-auto space-y-12 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-stone-800/40 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-sans tracking-widest text-stone-500 font-semibold block uppercase">03 // Who We Are</span>
            <h2 className="text-3xl font-serif tracking-tight">The Makers Collective</h2>
          </div>
          <p className="text-sm font-light text-stone-400 max-w-sm leading-relaxed">
            We are real designers and full-stack engineers working locally in Bukidnon to bring your digital vision to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.id} onClick={() => setActiveModalMember(member)} className="cursor-pointer">
              <TeamCard member={member} isDarkMode={isDarkMode} />
            </div>
          ))}
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section id="planner-section" className="py-32 px-6 sm:px-16 border-t border-stone-900/40 bg-[#0e0d0c] scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-sans tracking-widest text-amber-500 font-semibold block uppercase">04 // Get In Touch</span>
            <h2 className="text-3xl font-serif tracking-tight">Let's Discuss Your Project</h2>
            <p className="text-sm font-light text-stone-400 leading-relaxed">
              Tell us what you have in mind. Select your project needs below so we can share a tailored plan and estimate during our first meeting.
            </p>
            <div className="space-y-6 border-t border-stone-800/60 pt-6 font-sans">
              <div className="space-y-2">
                <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block">What track do you need?</span>
                <div className="flex gap-2 text-xs">
                  {(['design', 'tech', 'both'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => { setSelectedWing(w); setCustomFeatures([]); }}
                      className={`px-4 py-2.5 border transition-all cursor-pointer rounded-xl font-medium ${
                        selectedWing === w ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-stone-900 text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {w === 'design' ? 'Branding' : w === 'tech' ? 'Web Development' : 'Both (Full Package)'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block">Select items you want to include:</span>
                <div className="flex flex-wrap gap-2">
                  {availableFeatures[selectedWing].map((f) => {
                    const active = customFeatures.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        className={`text-xs px-3 py-2 border rounded-full transition-all cursor-pointer ${
                          active ? 'border-amber-500 text-amber-400 bg-amber-500/5 font-medium' : 'border-stone-900 text-stone-500 hover:border-stone-800'
                        }`}
                      >
                        {active ? '✓ ' : '+ '} {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4 font-sans text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="Your Name or Company Name" className="w-full bg-[#0b0a09] border border-stone-900 p-4 rounded-xl focus:outline-none focus:border-amber-500 text-stone-200" />
              <input type="email" required placeholder="Your Email Address" className="w-full bg-[#0b0a09] border border-stone-900 p-4 rounded-xl focus:outline-none focus:border-amber-500 text-stone-200" />
            </div>
            <input type="tel" placeholder="Mobile Number (Optional)" className="w-full bg-[#0b0a09] border border-stone-900 p-4 rounded-xl focus:outline-none focus:border-amber-500 text-stone-200" />
            <textarea required rows={5} placeholder="Tell us about your project, your timeline, or any specific requirements you have..." className="w-full bg-[#0b0a09] border border-stone-900 p-4 rounded-xl focus:outline-none focus:border-amber-500 text-stone-200 resize-none" />
            <button type="submit" disabled={isSubmitted} className={`w-full p-4 font-medium transition-all rounded-xl uppercase text-center cursor-pointer text-xs tracking-wider ${
              isSubmitted ? 'bg-emerald-700 text-white' : 'bg-amber-500 text-stone-950 hover:bg-amber-400 font-semibold'
            }`}>
              {isSubmitted ? '✓ Message Sent Successfully' : 'Send Project Details →'}
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 border-t border-stone-900/40 text-center font-sans text-xs text-stone-600 space-y-2">
        <div className="font-semibold text-stone-500">AOG STUDIO</div>
        <div className="font-light">Malaybalay City, Bukidnon, Philippines • Serving businesses globally.</div>
      </footer>

      {/* --- TEAM MEMBER INFO MODAL --- */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0a09]/95 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setActiveModalMember(null)} />
          <div className="relative w-full max-w-2xl border border-stone-900 bg-[#121110] p-8 sm:p-10 space-y-6 rounded-2xl max-h-[85vh] overflow-y-auto">
            <button onClick={() => setActiveModalMember(null)} className="absolute top-6 right-6 font-sans text-xs border border-stone-800 px-3 py-1.5 rounded-xl text-stone-400 hover:text-white cursor-pointer">✕ Close</button>
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-16 h-16 rounded-full border border-stone-800 overflow-hidden relative shrink-0 bg-stone-950">
                <Image src={activeModalMember.realPhoto} alt={activeModalMember.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-2xl font-serif text-white">{activeModalMember.name}</h3>
                <p className="text-sm font-sans text-stone-400">{activeModalMember.role}</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-400 border-t border-stone-900 pt-6 font-sans">
              <div className="space-y-1">
                <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">About</div>
                <p className="font-light leading-relaxed text-stone-300">{activeModalMember.bio}</p>
              </div>
              <div className="space-y-2 pt-2">
                <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Core Focus Areas</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalMember.specialty.map((skill, idx) => (
                    <span key={idx} className="text-xs border border-stone-800 bg-[#0b0a09] px-3 py-1 rounded-full text-amber-400/90">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}