export enum Page {
  Home = 'Home',
  Connect = 'Connect',
  Passport = 'Passport',
  Pathways = 'Pathways',
  Mentors = 'Mentors',
  Settings = 'Settings',
}

export interface User {
  id: number;
  name: string;
  mssv: string;
  avatar: string;
  isVerified: boolean;
  skills: string[];
  major: string;
  connections: number;
}

export interface Project {
  id: number;
  title: string;
  postedBy: string;
  posterType: 'Instructor' | 'Alumni' | 'Company';
  skills: string[];
  duration: string;
  reward: string;
  description: string;
  type: 'Micro-Gig' | 'Shadow Project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  domain: 'Tech' | 'Marketing' | 'Design' | 'Business';
}

export interface Feedback {
  mentorName: string;
  mentorAvatar: string;
  skill: string;
  comment: string;
}

export interface Level {
  title: string;
  description: string;
  completed: boolean;
}

export interface Pathway {
  id: number;
  title: string;
  levels: Level[];
  xp: number;
}

export interface Activity {
  id: number;
  user: User;
  action: string;
  target?: string;
  timestamp: string;
}

export interface Mentor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  company: string;
  field: string;
  bio: string;
  skills: string[];
}
