import { User, Project, Pathway, Feedback, Activity, Mentor, Alumni, Company } from './types';

export const USERS: User[] = [
  { 
    id: 1, 
    name: 'An Nguyen', 
    mssv: '20520001', 
    avatar: 'https://randomuser.me/api/portraits/women/81.jpg', 
    isVerified: true, 
    gender: 'female',
    skills: [
      'Data Analysis & Python Programming',
      'Communication & Public Speaking',
      'Project Collaboration & Team Leadership',
      'Networking in Academic Communities',
      'UI/UX Design',
      'Product Analysis',
      'Case Study Analysis'
    ], 
    major: 'Information System', 
    connections: 152,
    xp: 200, // Starting XP from pre-completed missions
    university: 'University of Information Technology – VNU-HCM',
    year: 4,
    email: '20520001@gm.uit.edu.vn',
    bio: 'A passionate learner in AI and data-driven innovation. An loves exploring how technology can connect people and solve real-world problems. She’s currently part of UIT’s Data Science Club and has participated in several hackathons and mentoring programs.',
    achievements: [
        { icon: '🏅', title: 'Team Builder', description: 'Successfully led a micro-project on VNU-CONNECT X.' },
        { icon: '💬', title: 'Active Connector', description: '10 verified collaborations through the CONNECT hub.' },
        { icon: '🎓', title: 'Learning Pathway Completed', description: 'Finished “AI for Social Impact” Pathway.' },
    ],
    mentorConnections: [
        { id: 1, name: 'Dr. Tran Quang', title: 'Lecturer, UIT', avatar: 'https://randomuser.me/api/portraits/men/81.jpg' },
        { id: 2, name: 'Linh Pham', title: 'Data Engineer at FPT Software', avatar: 'https://randomuser.me/api/portraits/women/82.jpg' },
    ],
    interests: ['AI for Social Good', 'Product Management', 'Data Visualization']
  },
  { id: 2, name: 'Binh Tran', mssv: '21520002', avatar: 'https://randomuser.me/api/portraits/men/85.jpg', isVerified: false, gender: 'male', skills: ['Data Analysis', 'Python', 'SQL', 'Tableau'], major: 'Information Systems', connections: 89, xp: 0, interests: ['Business Intelligence', 'E-commerce Trends', 'Database Optimization'] },
  { id: 3, name: 'Chi Le', mssv: '19520003', avatar: 'https://randomuser.me/api/portraits/women/84.jpg', isVerified: true, gender: 'female', skills: ['Digital Marketing', 'SEO', 'Content Creation'], major: 'E-commerce', connections: 231, xp: 0, interests: ['Growth Hacking', 'Social Media Strategy', 'Consumer Psychology'] },
  { id: 4, name: 'Dung Pham', mssv: '22520004', avatar: 'https://randomuser.me/api/portraits/women/88.jpg', isVerified: false, gender: 'female', skills: ['Figma', 'Graphic Design', 'Illustration'], major: 'Computer Science', connections: 45, xp: 0, interests: ['Mobile App Design', 'Branding', 'User Experience'] },
  { id: 5, name: 'Hoang Vu', mssv: '20520005', avatar: 'https://randomuser.me/api/portraits/men/88.jpg', isVerified: true, gender: 'male', skills: ['React', 'TypeScript', 'Node.js'], major: 'Software Engineering', connections: 112, xp: 0, interests: ['Web Development', 'DevOps', 'FinTech'] },
  { id: 6, name: 'Mai Tran', mssv: '21520006', avatar: 'https://randomuser.me/api/portraits/women/89.jpg', isVerified: false, gender: 'female', skills: ['Machine Learning', 'TensorFlow', 'Computer Vision'], major: 'Artificial Intelligence', connections: 76, xp: 0, interests: ['Deep Learning', 'Natural Language Processing', 'Healthcare Tech'] },
];

export const CURRENT_USER = USERS[0];

export const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'Analyze 3 Marketing Campaigns in 3 Hours', 
    postedBy: 'VNG Corporation', 
    posterType: 'Company', 
    posterAvatar: 'https://images.seeklogo.com/logo-png/49/1/vng-corp-logo-png_seeklogo-492551.png',
    posterBio: 'VNG is a leading technology company in Vietnam, focused on digital content, entertainment, and cloud services.',
    skills: ['Data Analysis', 'Presentation', 'Teamwork'], 
    duration: '3 Hours', 
    reward: 'Certificate', 
    description: 'Deep dive into recent successful marketing campaigns from top brands. Your team will analyze their strategies, target audiences, and outcomes, then present your findings in a concise 10-minute presentation.', 
    type: 'Micro-Project', 
    difficulty: 'Beginner', 
    domain: 'Marketing',
    status: 'Open',
    deadline: '2024-12-15',
    objectives: ['Identify key metrics of 3 successful marketing campaigns.', 'Analyze the strengths and weaknesses of each campaign.', 'Develop a compelling presentation summarizing your findings.'],
    deliverables: ['A 10-slide presentation deck (PDF or PPTX).', 'A 1-page summary document.']
  },
  { 
    id: 2, 
    title: 'Build a Responsive Landing Page', 
    postedBy: 'Dr. Hoang Anh', 
    posterType: 'Instructor', 
    posterAvatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    posterBio: 'A lecturer at UIT with a focus on web technologies and human-computer interaction.',
    skills: ['HTML', 'CSS', 'React', 'Responsive Design'], 
    duration: '1 Week', 
    reward: '500 XP', 
    description: 'Create a fully responsive landing page for a new university initiative using React. The design will be provided in Figma. The focus is on clean code, responsiveness, and component-based architecture.', 
    type: 'Micro-Project', 
    difficulty: 'Intermediate', 
    domain: 'Tech',
    status: 'Open',
    deadline: '2024-12-20',
    objectives: ['Translate a Figma design into a functional React landing page.', 'Ensure the page is perfectly responsive across mobile, tablet, and desktop.', 'Implement reusable and well-structured React components.'],
    deliverables: ['A link to a live deployment (e.g., Vercel, Netlify).', 'A link to the source code on GitHub.']
  },
  { 
    id: 3, 
    title: 'UI/UX Redesign for Student Portal', 
    postedBy: 'Alumni Network', 
    posterType: 'Alumni', 
    posterAvatar: 'https://randomuser.me/api/portraits/men/83.jpg',
    posterBio: 'A group of passionate alumni dedicated to improving the student experience at UIT.',
    skills: ['Figma', 'UI/UX', 'User Research'], 
    duration: '2 Weeks', 
    reward: 'Mentorship', 
    description: 'The current student portal is outdated. We need a fresh perspective! Propose and prototype a new, modern, and user-friendly design for the university\'s student portal. The best submission gets a mentorship session with a UX Lead at a top tech company.', 
    type: 'Micro-Project', 
    difficulty: 'Advanced', 
    domain: 'Design',
    status: 'In Progress',
    deadline: '2025-01-10',
    objectives: ['Conduct user research to identify pain points in the current portal.', 'Create wireframes and high-fidelity mockups in Figma.', 'Develop an interactive prototype.'],
    deliverables: ['A Figma link containing all research, wireframes, and prototypes.']
  },
  { 
    id: 4, 
    title: 'Database Optimization for E-commerce Site', 
    postedBy: 'Tiki', 
    posterType: 'Company', 
    posterAvatar: 'https://images.seeklogo.com/logo-png/53/1/tiki-logo-png_seeklogo-531327.png',
    posterBio: 'Tiki is one of the leading e-commerce platforms in Vietnam, known for its fast delivery and customer service.',
    skills: ['SQL', 'Database Design', 'Performance Tuning'], 
    duration: '10 Days', 
    reward: 'Internship Interview', 
    description: 'Analyze and optimize slow-performing queries for a high-traffic e-commerce platform. You will be given a sample dataset and a list of queries to improve. This is a great opportunity to showcase your SQL skills to a major company.', 
    type: 'Micro-Project', 
    difficulty: 'Advanced', 
    domain: 'Tech',
    status: 'Open',
    deadline: '2024-12-28',
    objectives: ['Analyze query execution plans to identify bottlenecks.', 'Rewrite and optimize at least 5 provided SQL queries.', 'Document the performance improvements achieved.'],
    deliverables: ['A SQL script with the optimized queries.', 'A report detailing the optimization techniques used and the performance gains.']
  },
  { 
    id: 5, 
    title: 'Shadow a Senior Developer at FPT Software', 
    postedBy: 'FPT Software', 
    posterType: 'Company', 
    posterAvatar: 'https://images.seeklogo.com/logo-png/46/1/fpt-software-logo-png_seeklogo-468048.png',
    posterBio: 'FPT Software is a global IT services provider headquartered in Vietnam.',
    skills: ['Observation', 'Professionalism'], 
    duration: '1 Day', 
    reward: 'Networking', 
    description: 'An exclusive opportunity to follow a senior developer for a day. Understand their workflow, see how they tackle challenges, and participate in a team meeting. This is a non-coding role focused on learning and professional exposure.', 
    type: 'Shadow Project', 
    difficulty: 'Beginner', 
    domain: 'Tech',
    status: 'Completed',
    deadline: '2024-11-30',
    objectives: ['Gain insight into the daily life of a software engineer.', 'Observe agile development practices in a real-world setting.'],
    deliverables: ['A one-page reflection on your experience.']
  },
  { 
    id: 6, 
    title: 'Design a Social Media Content Calendar', 
    postedBy: 'Ms. Mai Linh', 
    posterType: 'Instructor', 
    posterAvatar: 'https://randomuser.me/api/portraits/women/82.jpg',
    posterBio: 'A lecturer in the Marketing department with a passion for digital communication.',
    skills: ['Content Strategy', 'Social Media', 'Marketing'], 
    duration: '4 Hours', 
    reward: '200 XP', 
    description: 'The faculty\'s Facebook page needs a content boost! Your task is to plan one month of engaging social media content. This includes post ideas, formats (text, image, video), and suggested captions for the faculty\'s Facebook page.', 
    type: 'Micro-Project', 
    difficulty: 'Beginner', 
    domain: 'Marketing',
    status: 'In Progress',
    deadline: '2024-12-18',
    objectives: ['Develop a content strategy aligned with the faculty\'s goals.', 'Create a diverse content calendar with at least 12 post ideas.', 'Write sample captions for 3 different posts.'],
    deliverables: ['A content calendar in a spreadsheet format (Excel or Google Sheets).']
  },
];

export const PATHWAYS: Pathway[] = [
  { 
    id: 1, 
    title: 'pathways.titles.pmFresher',
    category: 'Career', 
    missions: [
      { 
        title: 'Connect with 3 Product Managers', 
        description: 'Find and network with at least three alumni or peers currently working as Product Managers. Your goal is to understand their daily responsibilities, challenges, and the skills they find most critical. Document your key takeaways from the conversations in a short reflection.', 
        status: 'completed', 
        xp: 50, 
        type: 'connect', 
        skill: 'Networking in Academic Communities', 
        submissionType: ['reflection'], 
        difficulty: 'Beginner',
        duration: 'Approx. 3 hours',
        submissionContent: 'Spoke with alumni from VNG and Tiki. Key takeaway: PMs act as the voice of the user and need strong communication skills to align teams.',
        mentorFeedback: [{
            mentorName: 'Dr. Tran Quang',
            mentorAvatar: 'https://randomuser.me/api/portraits/men/81.jpg',
            comment: 'Great initiative! The reflection shows a good understanding of the PM role. Keep building these connections.',
            timestamp: '2 days ago'
        }]
      },
      { 
        title: 'Complete a "UI/UX" micro-project', 
        description: 'Take on and successfully complete a micro-project from the CONNECT marketplace that has the "Figma" or "User Research" skill tag. This will give you hands-on experience in a core PM-related area.', 
        status: 'unlocked', 
        xp: 150, 
        type: 'project', 
        skill: 'UI/UX Design', 
        submissionType: [],
        difficulty: 'Intermediate',
        duration: 'Varies by project'
      },
      { 
        title: 'Analyze a competitor app', 
        description: 'Analyze a competitor app and identify 3 key strengths and weaknesses. Submit your findings in a short report.', 
        status: 'locked', 
        xp: 75, 
        type: 'reflect', 
        skill: 'Competitive Analysis', 
        submissionType: ['reflection', 'file'],
        difficulty: 'Beginner',
        duration: 'Approx. 4 hours',
        deadline: '2025-11-30'
      },
      { 
        title: 'Create a simple user persona', 
        description: 'Create a simple user persona for a target user segment of a product you use. Include their goals, motivations, and pain points.', 
        status: 'locked', 
        xp: 60, 
        type: 'project', 
        skill: 'User Personas', 
        submissionType: ['file'],
        difficulty: 'Beginner',
        duration: 'Approx. 3 hours',
        deadline: '2025-12-10'
      },
      { 
        title: 'Map a basic user journey', 
        description: 'Map a basic user journey for a common feature (e.g., onboarding, signing up). Visualize the steps a user takes to complete their goal.', 
        status: 'locked', 
        xp: 80, 
        type: 'project', 
        skill: 'User Journey Mapping', 
        submissionType: ['file'],
        difficulty: 'Intermediate',
        duration: 'Approx. 4 hours',
        deadline: '2025-12-20'
      },
      { 
        title: 'Write a reflection on a product you admire', 
        description: 'Choose a digital product (app or website) you use frequently. Write a 500-word analysis on its strengths, weaknesses, and a feature you would propose to improve it. Submit your analysis as a PDF.', 
        status: 'locked', 
        xp: 75, 
        type: 'reflect', 
        skill: 'Product Analysis', 
        submissionType: ['reflection', 'file'],
        difficulty: 'Intermediate',
        duration: 'Approx. 4 hours',
        deadline: '2026-01-10'
      },
      { 
        title: 'Receive mentor feedback on a case study', 
        description: 'Prepare a short presentation on a provided business case study. Then, schedule a session with a mentor from the Mentors hub to present it and receive direct feedback on your analysis and presentation skills.', 
        status: 'locked', 
        xp: 100, 
        type: 'connect',
        skill: 'Case Study Analysis',
        submissionType: [],
        difficulty: 'Advanced',
        duration: 'Approx. 5 hours',
        badge: { icon: '🏆', title: 'Product Management Ready', description: 'Completed the PM Fresher Pathway.' }
      },
  ]},
  { 
    id: 2, 
    title: 'pathways.titles.dataAnalyst', 
    category: 'Critical Thinking',
    missions: [
      { 
        title: 'Complete a "Data Analysis" project', 
        description: 'Dive into the CONNECT marketplace and complete any project with the "Data Analysis" tag. This is your first step to building a practical portfolio.', 
        status: 'completed', 
        xp: 150, 
        type: 'project', 
        skill: 'Data Analysis', 
        submissionType: [],
        difficulty: 'Beginner',
        duration: 'Varies by project'
      },
      { 
        title: 'Learn Python basics for data science', 
        description: 'Take an online course (e.g., on Coursera, edX) covering basic Python, Pandas, and Matplotlib. Submit a link to your certificate of completion and write a short summary of your key learnings.', 
        status: 'completed', 
        xp: 100, 
        type: 'learn', 
        skill: 'Python', 
        submissionType: ['reflection', 'link'],
        difficulty: 'Intermediate',
        duration: 'Approx. 10 hours',
        submissionContent: 'Completed the course, learned about data manipulation with Pandas.',
        submissionLink: 'https://coursera.org/verify/XYZ123'
      },
      { 
        title: 'Shadow an industry professional', 
        description: 'Participate in a "Shadow Project" with a data professional. After the session, write a reflection on the tools, techniques, and challenges you observed.', 
        status: 'unlocked', 
        xp: 80, 
        type: 'project', 
        skill: 'Professionalism', 
        submissionType: ['reflection'],
        difficulty: 'Beginner',
        duration: '1 Day'
      },
      { 
        title: 'Present your findings from a dataset', 
        description: 'Using a provided dataset, perform an exploratory data analysis. Record a 5-minute video presentation of your most interesting findings and upload it. Submit the link to your video (e.g., YouTube, Google Drive).', 
        status: 'locked', 
        xp: 120, 
        type: 'reflect',
        skill: 'Data Visualization',
        submissionType: ['link'],
        difficulty: 'Advanced',
        duration: 'Approx. 8 hours',
        badge: { icon: '🏆', title: 'Data Analyst Pathfinder', description: 'Completed the Data Analyst Launchpad Pathway.' }
      },
  ]},
  { 
    id: 3, 
    title: 'pathways.titles.effectiveCommunication', 
    category: 'Communication',
    missions: [
      { 
        title: 'Give feedback on 3 peer presentations', 
        description: 'Actively participate in the CONNECT forum by providing constructive, written feedback on at least three project presentations from your peers.', 
        status: 'unlocked', 
        xp: 60, 
        type: 'connect', 
        skill: 'Peer Feedback', 
        submissionType: [],
        difficulty: 'Beginner',
        duration: 'Approx. 2 hours'
      },
      { 
        title: 'Read "How to Win Friends and Influence People"', 
        description: 'Read the classic book by Dale Carnegie. Submit a written reflection summarizing three key principles and how you plan to apply them in your academic and future professional life.', 
        status: 'locked', 
        xp: 90, 
        type: 'learn', 
        skill: 'Active Listening', 
        submissionType: ['reflection'],
        difficulty: 'Beginner',
        duration: 'Approx. 6 hours'
      },
      { 
        title: 'Lead a micro-project team meeting', 
        description: 'For your next team-based micro-project, volunteer to be the meeting facilitator for at least one significant check-in. Your goal is to create an agenda, keep the discussion on track, and ensure all voices are heard. Afterwards, have a teammate verify your leadership.', 
        status: 'locked', 
        xp: 150, 
        type: 'project',
        skill: 'Team Leadership',
        submissionType: [],
        difficulty: 'Intermediate',
        duration: 'Approx. 1 hour',
        badge: { icon: '🏆', title: 'Communication Pro', description: 'Completed the Effective Communication Pathway.' }
      },
  ]}
];

export const FEEDBACKS: Feedback[] = [
    { mentorName: 'Dr. Anh Phan (Google)', mentorAvatar: 'https://randomuser.me/api/portraits/men/83.jpg', skill: 'Critical Thinking', comment: 'An demonstrated excellent problem-solving skills during the marketing analysis project. Great ability to connect disparate data points.' },
    { mentorName: 'Ms. Bao Tran (Microsoft)', mentorAvatar: 'https://randomuser.me/api/portraits/women/84.jpg', skill: 'React Development', comment: 'Very clean and efficient code on the landing page project. An is a fast learner and writes maintainable components.'}
];

export const ACTIVITIES: Activity[] = [
    { id: 1, user: USERS[0], action: 'joined project', target: 'AI-based Waste Sorting', timestamp: '1 day ago'},
    { id: 2, user: USERS[0], action: 'completed a PATHWAY level', target: 'Professional Communication Skills', timestamp: '3 days ago'},
    { id: 3, user: USERS[0], action: 'gave feedback on a peer\'s presentation in the', target: 'CONNECT forum', timestamp: '5 days ago'},
    { id: 4, user: USERS[1], action: 'connected with', target: 'Chi Le', timestamp: '6 days ago'},
    { id: 2, user: USERS[2], action: 'earned a badge', target: '"Data Analysis"', timestamp: '5 hours ago'},
    { id: 3, user: USERS[3], action: 'completed pathway', target: 'Digital Marketer Starter', timestamp: '1 day ago'},
];

export const MENTORS: Mentor[] = [
    { id: 1, name: 'Dr. Le Anh Tuan', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', gender: 'male', title: 'AI Research Lead', company: 'Google', field: 'Artificial Intelligence', bio: 'Expert in Natural Language Processing and Deep Learning, with over 10 years of experience in building large-scale AI models.', skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Python'], averageRating: 4.9 },
    { id: 2, name: 'Ms. Tran My Linh', avatar: 'https://randomuser.me/api/portraits/women/45.jpg', gender: 'female', title: 'Senior Product Manager', company: 'VNG Corporation', field: 'Product Management', bio: 'Passionate about creating user-centric products. Launched multiple successful mobile applications in the SEA market.', skills: ['Agile', 'Roadmapping', 'User Research', 'Data Analysis'], averageRating: 4.8 },
    { id: 3, name: 'Mr. Pham Hoang Nam', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', gender: 'male', title: 'Head of Engineering', company: 'Tiki', field: 'Software Engineering', bio: 'Leads a team of 50+ engineers. Specialized in microservices architecture and cloud-native technologies.', skills: ['System Design', 'Go', 'Kubernetes', 'AWS'], averageRating: 4.7 },
    { id: 4, name: 'Ms. Vu Ngoc Mai', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', gender: 'female', title: 'Lead UX Designer', company: 'FPT Software', field: 'UI/UX Design', bio: 'Designs intuitive and beautiful interfaces for enterprise software. Advocate for design thinking and accessibility.', skills: ['Figma', 'Design Systems', 'User Testing', 'Interaction Design'], averageRating: 5.0 },
    { id: 5, name: 'Mr. Dang Khoa', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', gender: 'male', title: 'Digital Marketing Director', company: 'Shopee', field: 'Marketing', bio: 'Drives growth through performance marketing and SEO strategies. Manages multi-million dollar ad budgets.', skills: ['SEO', 'SEM', 'Google Analytics', 'Content Strategy'], averageRating: 4.6 },
];

export const ALUMNI: Alumni[] = [
  { id: 1, name: 'Linh Pham', avatar: 'https://randomuser.me/api/portraits/women/82.jpg', gender: 'female', graduationMajor: 'Information Systems', industry: 'Data Engineering', company: 'FPT Software', bio: 'Recent UIT graduate passionate about big data pipelines and cloud technologies. Happy to share my journey from student to data engineer.', skills: ['Python', 'SQL', 'Spark', 'AWS'] },
  { id: 2, name: 'Tuan Nguyen', avatar: 'https://randomuser.me/api/portraits/men/82.jpg', gender: 'male', graduationMajor: 'Computer Science', industry: 'Mobile Development', company: 'Grab', bio: 'Focused on building scalable Android applications. I enjoy helping students navigate technical interviews and choose their career paths.', skills: ['Kotlin', 'Android SDK', 'Jetpack Compose'] },
  { id: 3, name: 'Quynh Anh Tran', avatar: 'https://randomuser.me/api/portraits/women/83.jpg', gender: 'female', graduationMajor: 'E-commerce', industry: 'Digital Marketing', company: 'Lazada', bio: 'Specializing in performance marketing and e-commerce strategy. I can provide insights on campaign optimization and market analysis.', skills: ['Google Ads', 'Facebook Ads', 'SEO'] },
];

export const COMPANIES: Company[] = [
  { id: 1, name: 'VNG Corporation', logo: 'https://images.seeklogo.com/logo-png/49/1/vng-corp-logo-png_seeklogo-492551.png', bio: 'A leading technology company in Vietnam, focused on digital content, entertainment, and cloud services.', roles: ['Marketing', 'Data Analysis', 'Product Management'], openGigs: PROJECTS.filter(p => p.postedBy === 'VNG Corporation').length },
  { id: 2, name: 'Tiki', logo: 'https://images.seeklogo.com/logo-png/53/1/tiki-logo-png_seeklogo-531327.png', bio: 'One of the leading e-commerce platforms in Vietnam, known for its fast delivery and customer service.', roles: ['Software Engineering', 'Database Design', 'Logistics'], openGigs: PROJECTS.filter(p => p.postedBy === 'Tiki').length },
  { id: 3, name: 'FPT Software', logo: 'https://images.seeklogo.com/logo-png/46/1/fpt-software-logo-png_seeklogo-468048.png', bio: 'A global IT services provider headquartered in Vietnam, working with top-tier clients worldwide.', roles: ['Software Development', 'Quality Assurance', 'Cloud Engineering'], openGigs: PROJECTS.filter(p => p.postedBy === 'FPT Software').length },
];