'use client';

import { TeamMember } from '../data/teamData';
import Image from 'next/image';

interface TeamCardProps {
  member: TeamMember;
  isDarkMode: boolean;
}

export default function TeamCard({ member, isDarkMode }: TeamCardProps) {
  return (
    <div className={`group rounded-3xl border p-6 transition-all duration-300 flex flex-col items-center text-center space-y-5 h-full ${
      isDarkMode 
        ? 'bg-stone-900/20 border-stone-900 hover:border-amber-500/20 shadow-sm' 
        : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-md hover:shadow-stone-100/60 shadow-sm'
    }`}>
      
      {/* Dynamic Profile Avatar Bubble */}
      <div className={`w-24 h-24 rounded-full border overflow-hidden relative shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner ${
        isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'
      }`}>
        {/* Layer A: Real Profile Shot (Revealed on Container Hover) */}
        <Image 
          src={member.realPhoto} 
          alt={`${member.name} Portrait`}
          fill
          sizes="96px"
          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" 
        />
        {/* Layer B: Custom Branded Vector Minimalist Mask Placeholder */}
        <Image 
          src={member.placeholderPhoto} 
          alt={`${member.name} Graphic`}
          fill
          sizes="96px"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0" 
        />
      </div>

      {/* Metadata Text Matrix */}
      <div className="space-y-2 flex-grow flex flex-col justify-between w-full">
        <div className="space-y-1">
          {/* 🌟 Swapped name layout to a soft, inviting editorial font-serif styling */}
          <h3 className="text-xl font-serif font-normal tracking-tight transition-colors group-hover:text-amber-500">
            {member.name}
          </h3>
          <p className={`text-xs font-mono uppercase tracking-wider ${
            isDarkMode ? 'text-amber-500/80' : 'text-amber-600 font-medium'
          }`}>
            {member.role}
          </p>
        </div>

        {/* Short Summary Teaser Preview */}
        <p className={`text-xs font-light leading-relaxed line-clamp-2 pt-2 ${
          isDarkMode ? 'text-stone-400' : 'text-stone-500'
        }`}>
          {member.bio}
        </p>

        {/* Core Sub-Specialty Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-4">
          {member.specialty.slice(0, 2).map((skill, index) => (
            <span 
              key={index} 
              className={`text-[9px] font-mono tracking-wide px-2.5 py-0.5 rounded-full border uppercase ${
                isDarkMode 
                  ? 'bg-stone-950/60 border-stone-800/80 text-stone-500' 
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}