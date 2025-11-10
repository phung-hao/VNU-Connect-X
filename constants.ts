import { User, Project, Pathway, Feedback, Activity } from './types';

export const USERS: User[] = [
  { id: 1, name: 'An Nguyen', mssv: '20520001', avatar: 'https://picsum.photos/seed/user1/200', isVerified: true, skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'], major: 'Software Engineering', connections: 152 },
  { id: 2, name: 'Binh Tran', mssv: '21520002', avatar: 'https://picsum.photos/seed/user2/200', isVerified: false, skills: ['Data Analysis', 'Python', 'SQL', 'Tableau'], major: 'Information Systems', connections: 89 },
  { id: 3, name: 'Chi Le', mssv: '19520003', avatar: 'https://picsum.photos/seed/user3/200', isVerified: true, skills: ['Digital Marketing', 'SEO', 'Content Creation'], major: 'E-commerce', connections: 231 },
  { id: 4, name: 'Dung Pham', mssv: '22520004', avatar: 'https://picsum.photos/seed/user4/200', isVerified: false, skills: ['Figma', 'Graphic Design', 'Illustration'], major: 'Computer Science', connections: 45 },
];

export const CURRENT_USER = USERS[0];

export const PROJECTS: Project[] = [
  { id: 1, title: 'Analyze 3 Marketing Campaigns in 3 Hours', postedBy: 'VNG Corporation', posterType: 'Company', skills: ['Data Analysis', 'Presentation', 'Teamwork'], duration: '3 Hours', reward: 'Certificate', description: 'Deep dive into recent successful marketing campaigns and present your findings.', type: 'Micro-Gig', difficulty: 'Beginner', domain: 'Marketing'},
  { id: 2, title: 'Build a Responsive Landing Page', postedBy: 'Dr. Hoang Anh', posterType: 'Instructor', skills: ['HTML', 'CSS', 'React', 'Responsive Design'], duration: '1 Week', reward: '500 XP', description: 'Create a fully responsive landing page for a new university initiative.', type: 'Micro-Gig', difficulty: 'Intermediate', domain: 'Tech'},
  { id: 3, title: 'UI/UX Redesign for Student Portal', postedBy: 'Alumni Network', posterType: 'Alumni', skills: ['Figma', 'UI/UX', 'User Research'], duration: '2 Weeks', reward: 'Mentorship', description: 'Propose and prototype a new design for the university\'s student portal.', type: 'Micro-Gig', difficulty: 'Advanced', domain: 'Design'},
  { id: 4, title: 'Database Optimization for E-commerce Site', postedBy: 'Tiki', posterType: 'Company', skills: ['SQL', 'Database Design', 'Performance Tuning'], duration: '10 Days', reward: 'Internship Interview', description: 'Analyze and optimize queries for a high-traffic e-commerce platform.', type: 'Micro-Gig', difficulty: 'Advanced', domain: 'Tech'},
  { id: 5, title: 'Shadow a Senior Developer at FPT Software', postedBy: 'FPT Software', posterType: 'Company', skills: ['Observation', 'Professionalism'], duration: '1 Day', reward: 'Networking', description: 'Follow a senior developer for a day to understand their workflow and challenges.', type: 'Shadow Project', difficulty: 'Beginner', domain: 'Tech'},
  { id: 6, title: 'Design a Social Media Content Calendar', postedBy: 'Ms. Mai Linh', posterType: 'Instructor', skills: ['Content Strategy', 'Social Media', 'Marketing'], duration: '4 Hours', reward: '200 XP', description: 'Plan a month of social media content for the faculty\'s Facebook page.', type: 'Micro-Gig', difficulty: 'Beginner', domain: 'Marketing'},
];

export const PATHWAYS: Pathway[] = [
  { id: 1, title: 'Frontend Developer Journey', xp: 750, levels: [
    { title: 'Level 1: Join 3 professional connections', description: 'Network with alumni or peers in the tech field.', completed: true },
    { title: 'Level 2: Complete a micro-project', description: 'Finish a project tagged with "React" or "HTML".', completed: true },
    { title: 'Level 3: Present project results', description: 'Share your findings in a presentation.', completed: false },
    { title: 'Level 4: Receive mentor feedback', description: 'Get a skill verified by a mentor.', completed: false },
  ]},
  { id: 2, title: 'Data Analyst Launchpad', xp: 400, levels: [
    { title: 'Level 1: Complete a "Data Analysis" project', description: 'Show your skills with data.', completed: true },
    { title: 'Level 2: Learn Python basics', description: 'Take an online course or workshop.', completed: false },
    { title: 'Level 3: Shadow an industry professional', description: 'Join a shadow project in the data domain.', completed: false },
  ]}
];

export const FEEDBACKS: Feedback[] = [
    { mentorName: 'Mentor A (Google)', mentorAvatar: 'https://picsum.photos/seed/mentorA/100', skill: 'Critical Thinking', comment: 'An demonstrated excellent problem-solving skills during the marketing analysis project. Great ability to connect disparate data points.' },
    { mentorName: 'Mentor B (Microsoft)', mentorAvatar: 'https://picsum.photos/seed/mentorB/100', skill: 'React Development', comment: 'Very clean and efficient code on the landing page project. An is a fast learner and writes maintainable components.'}
];

export const ACTIVITIES: Activity[] = [
    { id: 1, user: USERS[1], action: 'joined project', target: 'UI/UX Redesign for Student Portal', timestamp: '2 hours ago'},
    { id: 2, user: USERS[2], action: 'earned a badge', target: '"Data Analysis"', timestamp: '5 hours ago'},
    { id: 3, user: USERS[3], action: 'completed pathway', target: 'Digital Marketer Starter', timestamp: '1 day ago'},
    { id: 4, user: USERS[0], action: 'connected with', target: 'Binh Tran', timestamp: '2 days ago'},
];
