export interface TeamMember {
  id: number;
  name: string;
  role: string;
  // emoji: string; <-- Replace this
  placeholderPhoto: string; // Add this (e.g., '/images/silhouette-cloud.webp')
  realPhoto: string;        // Add this (e.g., '/images/clouise-actual.webp')
  bio: string;
  specialty: string[];
  projectIds: number[];
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Markie",
    role: "Lead Software Architect / Full-Stack Engineer",
    // placeholderPhoto and realPhoto paths assume files live in your '/public/images/' folder
    placeholderPhoto: '/images/placeholder-eng.webp', 
    realPhoto: '/images/clouise-headshot.webp',       
    bio: "Specializes in building robust, highly optimized Next.js environments, business dashboards, and database infrastructures.",
    specialty: ["Next.js", "TypeScript", "Database Architecture", "Turbopack Systems"],
    projectIds: [1, 3, 5] 
  },
  {
    id: 2,
    name: "Khyle",
    role: "Brand Strategist & UI/UX Designer",
    placeholderPhoto: '/images/placeholder-design.webp',
    realPhoto: '/images/aog-designer-headshot.webp',
    bio: "Transforms complex business visions into stunning corporate identities, logo schemes, and layout mockups.",
    specialty: ["UI/UX Layouts", "Brand Architecture", "Vector Illustration", "Visual Themes"],
    projectIds: [2, 4, 5] 
  },
    {
    id: 3,
    name: "Issa",
    role: "Brand Strategist & UI/UX Designer",
    placeholderPhoto: '/images/placeholder-design.webp',
    realPhoto: '/images/aog-designer-headshot.webp',
    bio: "Transforms complex business visions into stunning corporate identities, logo schemes, and layout mockups.",
    specialty: ["UI/UX Layouts", "Brand Architecture", "Vector Illustration", "Visual Themes"],
    projectIds: [2, 4, 5] 
  }


];