export interface Skill {
  name: string;
  percent: number;
}

export interface ProfessionalSkill {
  name: string;
  percent: number;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  year?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "react" | "javascript" | "other";
  technologies: string[];
  liveDemo: string;
  repository: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  visibility: "Public" | "Private";
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
}

export interface ContactItem {
  icon: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  socialLinks?: {
    icon: string;
    url: string;
  }[];
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

// Profile image
const profileImage = "https://images.unsplash.com/photo-1603575449096-da705f622104?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";

export default profileImage;
