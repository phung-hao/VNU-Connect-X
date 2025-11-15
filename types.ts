export enum Page {
  Home = 'Home',
  Connect = 'Connect',
  Passport = 'Passport',
  Pathways = 'Pathways',
  About = 'About',
  Settings = 'Settings',
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  mssv: string;
  avatar: string;
  isVerified: boolean;
  gender: 'male' | 'female';
  skills: string[];
  major: string;
  connections: number;
  xp: number;
  bio?: string;
  university?: string;
  year?: number;
  email?: string;
  achievements?: Achievement[];
  mentorConnections?: {
    id: number;
    name: string;
    title: string;
    avatar: string;
  }[];
  interests?: string[];
}

export interface Alumni {
  id: number;
  name: string;
  avatar: string;
  gender: 'male' | 'female';
  graduationMajor: string;
  industry: string;
  company: string;
  bio: string;
  skills: string[];
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  bio: string;
  roles: string[];
  openGigs: number;
}


export interface Project {
  id: number;
  title: string;
  postedBy: string;
  posterType: 'Instructor' | 'Alumni' | 'Company';
  posterAvatar?: string;
  posterBio?: string;
  skills: string[];
  duration: string;
  reward: string;
  description: string;
  type: 'Micro-Gig' | 'Shadow Project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  domain: 'Tech' | 'Marketing' | 'Design' | 'Business';
  status: 'Open' | 'In Progress' | 'Completed';
  objectives?: string[];
  deliverables?: string[];
  deadline?: string;
}

export interface Feedback {
  mentorName: string;
  mentorAvatar: string;
  skill: string;
  comment: string;
}

export type MissionStatus = 'locked' | 'unlocked' | 'in-progress' | 'submitted' | 'completed';
export type MissionType = 'connect' | 'project' | 'learn' | 'reflect';
export type SubmissionType = 'reflection' | 'file' | 'link';

export interface Mission {
  title: string;
  description: string;
  status: MissionStatus;
  xp: number;
  type: MissionType;
  skill: string;
  
  // New detailed fields
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  deadline?: string;

  // Submission fields
  submissionType: SubmissionType[]; // Allow multiple types
  submissionContent?: string;
  submissionFile?: string; // filename
  submissionLink?: string;
  
  // Feedback
  mentorFeedback?: {
    mentorName: string;
    mentorAvatar: string;
    comment: string;
    timestamp: string;
  }[];

  isVerifiedByMentor?: boolean;
  badge?: Achievement;
}


export type PathwayCategory = 'Career' | 'Communication' | 'Critical Thinking' | 'Networking';

export interface Pathway {
  id: number;
  title: string;
  missions: Mission[];
  category: PathwayCategory;
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
  gender: 'male' | 'female';
  title: string;
  company: string;
  field: string;
  bio: string;
  skills: string[];
  averageRating: number;
}