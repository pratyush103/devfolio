export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  metrics: string;
  tools: string[];
  points: string[];
}

export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'analytics';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'ai' | 'fullstack' | 'analytics';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  iconName: string;
  metrics?: string;
  scope?: string;
  longDescription?: string;
  architectureHighlights?: string[];
  keyOutcomes?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface AccoladeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
  fullOverview?: string;
  keyContributions?: string[];
  techOrMethodology?: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
}
