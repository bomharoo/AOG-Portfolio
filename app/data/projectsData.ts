export interface Project {
  id: number;
  title: string;
  description: string;
  wing: 'creative' | 'tech' | 'hybrid';
  image: string; // 🌟 Changed from emoji: string
  tags: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce System",
    description: "A production-ready retail platform complete with secure checkout and inventory syncing.",
    wing: "tech",
    image: "/images/projects/ecommerce-preview.webp", // 🌟 Path to your project screenshot
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Corporate Brand Identity",
    description: "Complete visual themes, typography standards, and vector asset guidelines.",
    wing: "creative",
    image: "/images/projects/branding-preview.webp", // 🌟 Path to your project screenshot
    tags: ["Figma", "Illustrator", "Branding"]
  }
];