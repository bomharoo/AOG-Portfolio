'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { projectsData } from './data/projectsData';
import { teamData, TeamMember } from './data/teamData';
import ProjectCard from './components/ProjectCard';
import TeamCard from './components/TeamCard';

export default function Home() {
// Navigation & UI Layout States
  const [filter, setFilter] = useState<'all' | 'creative' | 'tech'>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);

  // 🌟 ADD THIS INDEPENDENT STATE FOR THE PROCESS TRACKS
  const [processTab, setProcessTab] = useState<'creative' | 'tech' | 'hybrid'>('hybrid');  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedWing, setSelectedWing] = useState<'design' | 'tech' | 'both'>('both');
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
// Dynamic Scroll Section Tracker for the Navigation Links
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['portfolio-section', 'process-section', 'team-section', 'planner-section'];
      const scrollPosition = window.scrollY + 120; // Offset to match header block boundaries

      // If we are at the top, reset highlight to none or hero
      if (window.scrollY < 300) {
        setActiveSection('hero');
        return;
      }

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('homepageScrollPosition');
    if (savedScrollPos) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScrollPos, 10), behavior: 'instant' });
        sessionStorage.removeItem('homepageScrollPosition');
      }, 100);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModalMember ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModalMember]);

  const availableFeatures = {
    design: ['Brand Identity & Logos', 'Marketing Materials', 'UI/UX Mobile Design', 'Web Design Layouts'],
    tech: ['E-Commerce & Cashier Systems', 'Secure Database Systems', 'Custom Mobile Applications', 'Operations Dashboards'],
    both: ['Complete Brand & App Ecosystem', 'School & Office Portals', 'Tourism & Booking Platforms', 'Custom Enterprise Tools']
  };

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.wing === filter || project.wing === 'hybrid';
  });

  const toggleFeature = (feature: string) => {
    setCustomFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`transition-colors duration-500 min-h-screen font-sans selection:bg-amber-200 selection:text-zinc-900 ${
      isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
    }`}>
      
      {/* --- HEADER NAVIGATION BLOCK --- */}
      {/* --- REFINED STICKY NAVIGATION BAR WITH ACTIVE SECTION HIGHLIGHTS --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors border-b px-6 sm:px-12 py-5 flex justify-between items-center ${
        isDarkMode ? 'bg-stone-950/80 border-stone-900/40' : 'bg-stone-50/80 border-stone-200'
      }`}>
        <h1 
          className="text-2xl font-serif font-bold tracking-tight cursor-pointer" 
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection('hero'); }}
        >
          AOG<span className="text-amber-500">.</span>
        </h1>
        
        {/* Navigation Core Track Items */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button 
            onClick={() => scrollToSection('portfolio-section')} 
            className={`text-sm font-medium transition-colors cursor-pointer text-xs uppercase tracking-wider relative py-1 ${
              activeSection === 'portfolio-section' 
                ? 'text-amber-500 font-semibold' 
                : isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Our Portfolio
            {activeSection === 'portfolio-section' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-fade-in" />
            )}
          </button>

          <button 
            onClick={() => scrollToSection('process-section')} 
            className={`text-sm font-medium transition-colors cursor-pointer text-xs uppercase tracking-wider relative py-1 ${
              activeSection === 'process-section' 
                ? 'text-amber-500 font-semibold' 
                : isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Our Process
            {activeSection === 'process-section' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-fade-in" />
            )}
          </button>

          <button 
            onClick={() => scrollToSection('team-section')} 
            className={`text-sm font-medium transition-colors cursor-pointer text-xs uppercase tracking-wider relative py-1 ${
              activeSection === 'team-section' 
                ? 'text-amber-500 font-semibold' 
                : isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            The Studio
          </button>

          <button 
            onClick={() => scrollToSection('planner-section')}
            className={`text-xs font-semibold tracking-wider transition-all cursor-pointer px-5 py-2 rounded-full border uppercase hidden sm:block ${
              activeSection === 'planner-section'
                ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500 hover:text-stone-950'
            }`}
          >
            Start a Project
          </button>
          
          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-9 h-9 rounded-full border transition-all cursor-pointer flex items-center justify-center text-sm ${
              isDarkMode ? 'border-stone-800 bg-stone-900 text-amber-400' : 'border-stone-200 bg-white text-stone-700 shadow-sm'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* --- HERO SPLASH LAYER --- */}
      <section className="relative min-h-[calc(100vh-77px)] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Subtle, Warm Background Glow Blur effect to remove the cold brutalist feel */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className={`text-xs font-mono tracking-[0.25em] uppercase inline-block px-4 py-1.5 rounded-full border ${
            isDarkMode ? 'border-stone-800 bg-stone-900/40 text-amber-400' : 'border-amber-200 bg-amber-50/60 text-amber-800 font-medium'
          }`}>
            Rooted Creativity // Modern Engineering
          </span>
          
          {/* Tagline preserved but rendered in an elegant, professional editorial serif layout */}
          <h2 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight leading-[1.1]">
            Beautiful <span className="italic font-serif text-amber-500">designs</span> turned into powerful, working <span className="font-sans font-bold relative inline-block">software.</span>
          </h2>
          
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed ${
            isDarkMode ? 'text-stone-400' : 'text-stone-600'
          }`}>
            Based in Malaybalay City, Bukidnon, we collaborate with forward-thinking MSMEs, local government units, academic institutions, and community organizations. We bring your unique stories to life with meaningful design and build secure, dependable systems to help your operations thrive.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => scrollToSection('portfolio-section')} className={`w-full sm:w-auto font-bold px-8 py-4 rounded-full shadow-lg transition-all tracking-wider text-xs uppercase cursor-pointer ${isDarkMode ? 'bg-amber-500 text-stone-950 shadow-amber-500/5 hover:bg-amber-400 hover:scale-[1.02]' : 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/10 hover:scale-[1.02]'}`}>
              Explore Portfolio
            </button>
            <button onClick={() => scrollToSection('planner-section')} className={`w-full sm:w-auto px-8 py-4 rounded-full font-medium border text-xs uppercase tracking-wider transition-all text-center cursor-pointer ${isDarkMode ? 'border-stone-800 hover:bg-stone-900 text-white' : 'border-stone-300 hover:bg-stone-100 text-stone-700'}`}>
              Let's Build Together
            </button>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO CASE STUDY DECK GRID --- */}
      <section id="portfolio-section" className={`py-28 px-6 sm:px-12 border-t scroll-mt-[77px] transition-colors duration-500 ${
        isDarkMode ? 'bg-stone-900/10 border-stone-900/40' : 'bg-stone-100/40 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">Stories of Impact & Progress</h2>
              <p className={`font-light max-w-xl ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                A curated look at visual brand transformations and custom platform solutions engineered for our local partners.
              </p>
            </div>
            
            <div className={`flex p-1 rounded-full border ${isDarkMode ? 'bg-stone-950/60 border-stone-900' : 'bg-white border-stone-200 shadow-sm'}`}>
              {(['all', 'creative', 'tech'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    filter === type 
                      ? isDarkMode ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-900 text-white shadow-md'
                      : isDarkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {type === 'all' ? 'All Work' : type === 'creative' ? 'Creative & Design' : 'Tech Solutions'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>
{/* --- HOW WE WORK (METHODOLOGY MATRICES) --- */}
      <section id="process-section" className={`py-28 px-6 sm:px-12 border-t scroll-mt-[77px] transition-colors duration-500 ${
        isDarkMode ? 'bg-stone-950 border-stone-900/40' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Section Introduction */}
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase block text-amber-500 font-bold">
              03 // Guided Methodologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">How We Work</h2>
            <p className={`font-light max-w-xl mx-auto text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Every project demands a unique approach. Choose a pathway below to explore our structured timeline tailored for your organization's specific goals.
            </p>
          </div>

          {/* Interactive Process Tab Selectors */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-16">
            {[
              { id: 'creative', label: '🎨 Creative & Brand Track', desc: 'For MSMEs, Tourism, and Identity Design' },
              { id: 'tech', label: '💻 Digital & Software Track', desc: 'For Portals, Databases, and Custom Apps' },
              { id: 'hybrid', label: '✨ Integrated Full Suite', desc: 'For Complete Scale-Ups & Ecosystems' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProcessTab(tab.id as any)} // 🌟 UPDATED: Uses the isolated processTab state
                className={`w-full md:w-auto text-left md:text-center px-6 py-4 rounded-2xl border transition-all cursor-pointer ${
                  processTab === tab.id // 🌟 UPDATED
                    ? isDarkMode 
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/5' 
                      : 'bg-stone-900 text-white border-stone-900 shadow-md'
                    : isDarkMode
                      ? 'bg-stone-900/40 border-stone-900 text-stone-400 hover:text-stone-200'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider">{tab.label}</div>
                <div className={`text-[10px] font-light mt-0.5 ${processTab === tab.id ? isDarkMode ? 'text-stone-900/80' : 'text-stone-300' : 'text-stone-500'}`}>{tab.desc}</div>
              </button>
            ))}
          </div>

          {/* Dynamic Step Mapping Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className={`p-8 rounded-3xl border space-y-4 transition-all duration-300 ${
              isDarkMode ? 'bg-stone-900/20 border-stone-900' : 'bg-stone-50/50 border-stone-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">Phase 01</span>
                <span className="text-2xl opacity-80">
                  {processTab === 'creative' ? '🤝' : processTab === 'tech' ? '📋' : '🔍'}
                </span>
              </div>
              <h3 className="text-xl font-serif">
                {processTab === 'creative' ? 'Discovery & Heritage' : processTab === 'tech' ? 'Requirement Scoping' : 'Strategic Audit'}
              </h3>
              <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {processTab === 'creative' && "We sit down to understand your history, values, and vision. For tourism units and local brands, we look deep into cultural nuances to discover what makes your story truly distinct."}
                {processTab === 'tech' && "We analyze your office or business workflows, pinpoint security requirements, data variables, and define exact system functionalities required to streamline your day-to-day operations."}
                {processTab === 'hybrid' && "A comprehensive discovery sprint combining both creative market alignment and technical system diagnostics to lay down a solid operational foundation."}
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-8 rounded-3xl border space-y-4 transition-all duration-300 ${
              isDarkMode ? 'bg-stone-900/20 border-stone-900' : 'bg-stone-50/50 border-stone-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">Phase 02</span>
                <span className="text-2xl opacity-80">
                  {processTab === 'creative' ? '📐' : processTab === 'tech' ? '🖼️' : '🛠️'}
                </span>
              </div>
              <h3 className="text-xl font-serif">
                {processTab === 'creative' ? 'Concept & Refining' : processTab === 'tech' ? 'Architecture & UI' : 'Parallel Development'}
              </h3>
              <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {processTab === 'creative' && "We draft high-fidelity vector assets, color systems, and typographic grids. We review drafts together, making adjustments until your brand mark fits perfectly."}
                {processTab === 'tech' && "We map database connections, layout clean interface wireframes, and design interactive templates. You get to click through the screens before we write a single line of backend logic."}
                {processTab === 'hybrid' && "Our design and engineering desks work in tandem—building identity architectures while structuring database protocols side-by-side."}
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-8 rounded-3xl border space-y-4 transition-all duration-300 ${
              isDarkMode ? 'bg-stone-900/20 border-stone-900' : 'bg-stone-50/50 border-stone-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">Phase 03</span>
                <span className="text-2xl opacity-80">
                  {processTab === 'creative' ? '📦' : processTab === 'tech' ? '🚀' : '🏁'}
                </span>
              </div>
              <h3 className="text-xl font-serif">
                {processTab === 'creative' ? 'Asset Deployment' : processTab === 'tech' ? 'Staging & Launch' : 'Ecosystem Hand-off'}
              </h3>
              <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {processTab === 'creative' && "Receive production-ready vector assets, layout kits, and clear brand usage handbooks. Everything is organized so your team can deploy your branding immediately across any platform."}
                {processTab === 'tech' && "We run optimization tests, verify end-to-end security loops, and securely launch your system. We stick around to onboard your staff and make sure everything operates smoothly."}
                {processTab === 'hybrid' && "A complete rollout of fully responsive web platforms loaded with your premium brand identity assets, followed by hands-on operational training."}
              </p>
            </div>

          </div>

        </div>
      </section>
      {/* --- MEET OUR STUDIO TEAM SECTION --- */}
      <section id="team-section" className={`py-28 px-6 sm:px-12 border-t scroll-mt-[77px] transition-colors duration-500 ${
        isDarkMode ? 'bg-stone-950 border-stone-900/40' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center lg:text-left mb-20 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">Your Collaborative Partners</h2>
            <p className={`font-light max-w-2xl ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              We are a dedicated collective of regional creators and developers who believe in direct, reliable collaboration. Click any profile to explore our experience and project involvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <div key={member.id} onClick={() => setActiveModalMember(member)} className="cursor-pointer">
                <TeamCard member={member} isDarkMode={isDarkMode} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE PROJECT PLANNER SECTION --- */}
      <section id="planner-section" className={`py-28 px-6 sm:px-12 border-t scroll-mt-[77px] transition-colors duration-500 ${
        isDarkMode ? 'bg-stone-900/10 border-stone-900/60' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">Let's Map Out Your Project</h2>
            <p className={`font-light max-w-xl mx-auto ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Whether you are expanding a business, launching a public portal, or telling a community story, let's craft the right plan for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className={`lg:col-span-5 space-y-8 p-8 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-stone-900/40 border-stone-900' : 'bg-stone-100/50 border-stone-200'}`}>
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest font-bold text-amber-500">1 // Choose Your Scope Track</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['design', 'tech', 'both'] as const).map((wing) => (
                    <button
                      key={wing}
                      type="button"
                      onClick={() => { setSelectedWing(wing); setCustomFeatures([]); }}
                      className={`py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                        selectedWing === wing ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md' : isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white' : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {wing === 'design' ? 'Design' : wing === 'tech' ? 'Digital' : 'Both'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest font-bold text-amber-500">2 // Select Core Features</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {availableFeatures[selectedWing].map((feature) => {
                    const isSelected = customFeatures.includes(feature);
                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                          isSelected ? isDarkMode ? 'bg-stone-800 border-amber-500 text-amber-400' : 'bg-amber-100 border-amber-400 text-amber-900' : isDarkMode ? 'bg-stone-950 border-stone-900 text-stone-500 hover:border-stone-800' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {feature}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`border-t pt-6 space-y-2 ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">Project Outline Summary</span>
                <div className="font-mono text-xs p-4 rounded-2xl bg-stone-950/60 border border-stone-900/60 text-emerald-400 space-y-1">
                  <div>Track // {selectedWing === 'design' ? 'Creative Direction' : selectedWing === 'tech' ? 'Digital Infrastructure' : 'Integrated System'}</div>
                  <div>Items // {customFeatures.length} selected</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Your Name / Organization</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Juan Dela Cruz" className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-stone-900 border-stone-800 focus:border-amber-500 focus:ring-amber-500 text-white' : 'bg-white border-stone-200 focus:border-stone-900 focus:ring-stone-900 text-stone-900'}`} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Email Address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-stone-900 border-stone-800 focus:border-amber-500 focus:ring-amber-500 text-white' : 'bg-white border-stone-200 focus:border-stone-900 focus:ring-stone-900 text-stone-900'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Contact Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="0917 123 4567" className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-stone-900 border-stone-800 focus:border-amber-500 focus:ring-amber-500 text-white' : 'bg-white border-zinc-200 focus:border-stone-900 focus:ring-stone-900 text-stone-900'}`} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className={`text-xs font-mono uppercase tracking-wider block ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Tell us about your goals</label>
                <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleInputChange} placeholder="What are your timelines, core ideas, or community challenges you want us to solve?" className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 resize-none ${isDarkMode ? 'bg-stone-900 border-stone-800 focus:border-amber-500 focus:ring-amber-500 text-white' : 'bg-white border-stone-200 focus:border-stone-900 focus:ring-stone-900 text-stone-900'}`} />
              </div>
              <button type="submit" disabled={isSubmitted} className={`w-full font-bold px-8 py-4 rounded-full shadow-lg transition-all uppercase tracking-wider text-xs cursor-pointer ${isSubmitted ? 'bg-emerald-600 text-white cursor-not-allowed' : isDarkMode ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>
                {isSubmitted ? '✔ Message Sent Successfully!' : 'Send Project Details →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER BLOCK --- */}
      <footer className={`py-14 px-6 sm:px-12 border-t text-center text-xs font-mono tracking-widest ${isDarkMode ? 'bg-stone-950 border-stone-900 text-stone-600' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
        <p>© AOG STUDIO. HARMONIZING DESIGN & TECHNOLOGY. MALAYBALAY CITY, BUKIDNON.</p>
      </footer>

      {/* --- TEAM PROFILE OVERLAY MODAL --- */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0" onClick={() => setActiveModalMember(null)} />
          
          <div className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-8 custom-scrollbar ${
            isDarkMode ? 'bg-stone-900 border-stone-800/80 text-white shadow-black/80' : 'bg-white border-stone-200 text-stone-900 shadow-stone-300/40'
          }`}>
            
            <button 
              onClick={() => setActiveModalMember(null)} 
              className={`absolute top-6 right-6 p-2 rounded-full border text-xs font-mono tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer z-10 ${
                isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-400 hover:text-amber-500' : 'bg-stone-100 border-stone-200 text-stone-500 hover:text-black'
              }`}
            >
              ✕ Close
            </button>

            <header className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className={`w-24 h-24 rounded-2xl border overflow-hidden relative shrink-0 group ${
                isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}>
                <Image src={activeModalMember.realPhoto} alt={activeModalMember.name} fill sizes="96px" className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                <Image src={activeModalMember.placeholderPhoto} alt={activeModalMember.name} fill sizes="96px" className="object-cover transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">Studio Core Profile</span>
                <h3 className="text-3xl font-serif tracking-tight">{activeModalMember.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>{activeModalMember.role}</p>
              </div>
            </header>

            <hr className={isDarkMode ? 'border-stone-800' : 'border-stone-200'} />

            <section className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">01 // About & Focus</h4>
              <p className={`text-base font-light leading-relaxed max-w-3xl ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
                {activeModalMember.bio}
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">02 // Areas of Practice</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalMember.specialty.map((skill, idx) => (
                  <span key={idx} className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    isDarkMode ? 'bg-stone-950 border-stone-800 text-amber-400/80' : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-4 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">03 // Associated Portfolio Project Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsData
                  .filter(p => activeModalMember.projectIds.includes(p.id))
                  .map(project => (
                    <div key={project.id} onClick={() => setActiveModalMember(null)}>
                      <ProjectCard project={project} isDarkMode={isDarkMode} />
                    </div>
                  ))}
              </div>
            </section>

          </div>
        </div>
      )}

    </div>
  );
}