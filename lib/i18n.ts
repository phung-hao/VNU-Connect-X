import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';
type Translations = { [key: string]: string | Translations };

// English Translations
const enTranslations: Translations = {
  nav: {
    home: "Home",
    connect: "Connect",
    passport: "Passport",
    pathways: "Pathways",
    mentors: "Mentors",
    about: "About",
    settings: "Settings"
  },
  header: {
    notifications: "View notifications",
    openMenu: "Open main menu"
  },
  footer: {
    copy: "© {year} VNU-CONNECT X. A Demo for VNU-HCM Students.",
    tagline: "Designed as a modern academic-career ecosystem."
  },
  home: {
    title1: "Your ",
    titleHighlight: "Academic & Career",
    title2: " Ecosystem",
    subtitle: "VNU-CONNECT X bridges learning and career through micro-projects, skill verification, and guided pathways.",
    explore: "Explore Micro-Gigs",
    pillars: {
      connect: {
        title: "CONNECT",
        description: "Join real-world micro-projects from companies, instructors, and alumni."
      },
      passport: {
        title: "PASSPORT",
        description: "Build a verified skill portfolio that showcases your true capabilities."
      },
      pathways: {
        title: "PATHWAYS",
        description: "Follow gamified roadmaps to achieve your career goals, one step at a time."
      }
    },
    feedTitle: "Activity Feed",
    featuredStudent: "Featured Student",
    viewProfile: "View Profile"
  },
  connect: {
    filters: "Filters",
    projectType: "Project Type",
    difficulty: "Difficulty",
    domain: "Domain",
    searchPlaceholder: "Search by title, skill, or company...",
    noProjectsFound: "No Projects Found",
    noProjectsHint: "Try adjusting your search query or filters.",
    matchmakingTitle: "Recommended for You",
    joinNow: "Join Now",
    viewDetails: "View Details",
    postedBy: "Posted by",
    status: {
      title: "Status",
      open: "Open",
      inProgress: "In Progress",
      completed: "Completed"
    },
    description: "Description",
    objectives: "Objectives",
    deliverables: "Deliverables",
    reward: "Reward",
    deadline: "Deadline",
    apply: "Apply for this Project",
    reasonForJoining: "Briefly state why you are interested in this project...",
    uploadPortfolio: "Upload Portfolio (Optional)",
    submitApplication: "Submit Application"
  },
  passport: {
    connections: "{count} Connections",
    publicProfile: "View Public Profile",
    tabs: {
      overview: "Overview",
      skills: "Skills",
      projects: "Projects",
      feedback: "Feedback"
    },
    timelineTitle: "Career Timeline",
    timelineDesc: "A visual representation of completed projects and milestones.",
    completedOn: "Completed on {date}",
    skillsGained: "Skills gained: {skills}",
    skillsTitle: "Skill Badges",
    projectsTitle: "Completed Projects",
    feedbackTitle: "Mentor Feedback"
  },
  pathways: {
    title1: "Gamified ",
    titleHighlight: "Career Journeys",
    subtitle: "Follow structured roadmaps to build skills, gain experience, and reach your goals.",
    xpEarned: "+{xp} XP Earned",
    levelUp: "Level Up!",
    greatJob: "Great Job!",
    missionComplete: "You've completed the mission:",
    reflectionPlaceholder: "Share your thoughts and what you learned...",
    submitButton: "Submit & Complete Mission",
    completeButton: "Complete Mission",
    startButton: "Start Mission",
    totalReward: "Total Reward",
    missionsCompleted: "{completed}/{total} missions completed",
    level: "Level {level}",
    missionDetails: {
      status: {
        locked: "Not Started",
        unlocked: "In Progress",
        submitted: "Submitted",
        completed: "Completed"
      },
      tabs: {
        details: "Details",
        submission: "Submission & Feedback"
      },
      skill: "Skill Focus",
      difficulty: "Difficulty",
      duration: "Est. Duration",
      deadline: "Deadline",
      reward: "Reward",
      submitYourWork: "Submit Your Work",
      reflection: "Reflection",
      uploadFile: "Upload File",
      attachLink: "Attach Link",
      submitButton: "Submit Mission",
      saveDraftButton: "Save Draft",
      cancelButton: "Cancel",
      mentorFeedback: "Mentor Feedback",
      noFeedback: "No feedback yet. Your submission is pending review.",
      viewSubmission: "Your Submission"
    }
  },
  mentors: {
    title: "Find Your Mentor",
    subtitle: "Connect with industry experts from leading companies for guidance, feedback, and career advice.",
    spotlight: "Mentor Spotlight",
    directory: "Mentor Directory",
    searchPlaceholder: "Search by name, skill, or company...",
    allFields: "All Fields",
    requestSession: "Request Session",
    chat: "Chat",
    noMentorsFound: "No Mentors Found",
    noMentorsHint: "Try adjusting your search or filter criteria.",
    bookingTitle: "Request a session with {name}",
    bookingDesc: "Please select a preferred date and time for your 1-on-1 session.",
    date: "Date",
    time: "Time",
    notes: "Notes for the Mentor (Optional)",
    notesPlaceholder: "e.g., I'd like to discuss career paths in AI...",
    sendRequest: "Send Request"
  },
  about: {
    title: "About VNU-CONNECT X",
    subtitle: "An academic-career ecosystem designed to build social capital and practical skills for students.",
    vision: {
        title: "Vision & Philosophy",
        content1: "VNU-CONNECT X is an academic-career ecosystem developed by Vietnam National University Ho Chi Minh City.",
        content2: "The platform aims to build social capital and practical skills for students through experiential learning and valuable connections.",
        philosophy: "Core philosophy: “From passive connection to active collaboration”."
    },
    structure: {
        title: "Core Structure",
        content: "The ecosystem operates on three pillars:",
        pillars: {
            connect: "CONNECT – A collaborative space for micro-projects between students, instructors, and companies.",
            passport: "PASSPORT – A digital competency portfolio that records and verifies academic and professional achievements.",
            pathways: "PATHWAYS – Gamified development roadmaps that help students learn by doing."
        }
    },
    impact: {
        title: "Impact",
        content1: "VNU-CONNECT X helps students develop soft skills, build confidence, and create a sustainable professional network.",
        content2: "The university can track graduate outcomes, companies can access talent, and alumni can contribute back to the community."
    },
    credits: {
        title: "Credits",
        content: "Developed by a team of students from the University of Information Technology – VNU-HCM (UIT), under the guidance of faculty advisors and in collaboration with corporate partners."
    },
    learnMore: {
        title: "Learn more about how it works",
        connect: "Explore CONNECT",
        passport: "View PASSPORT",
        pathways: "Start a PATHWAY"
    }
  },
  settings: {
    title: "Account Settings",
    subtitle: "Manage your profile, notifications, and privacy preferences.",
    profile: {
      title: "Profile Information",
      changeAvatar: "Change Avatar",
      name: "Full Name",
      major: "Major",
      save: "Save Changes"
    },
    language: {
        title: "Language Preference"
    },
    notifications: {
      title: "Notifications",
      newProjects: "New Project Alerts",
      messages: "Direct Messages",
      pathways: "Pathway Updates"
    },
    privacy: {
      title: "Profile Privacy",
      description: "Control who can view your full PASSPORT profile.",
      everyone: "Everyone (Public)",
      connections: "Connections Only",
      me: "Only Me (Private)"
    },
    account: {
        logout: "Logout",
        help: "Help Center"
    }
  },
  languages: {
    en: "English (EN)",
    vi: "Vietnamese (VI)"
  }
};

// Vietnamese Translations
const viTranslations: Translations = {
  nav: {
    home: "Trang chủ",
    connect: "Kết nối",
    passport: "Hồ sơ",
    pathways: "Lộ trình",
    mentors: "Cố vấn",
    about: "Giới thiệu",
    settings: "Cài đặt"
  },
  header: {
    notifications: "Xem thông báo",
    openMenu: "Mở menu chính"
  },
  footer: {
    copy: "© {year} VNU-CONNECT X. Một bản demo cho Sinh viên ĐHQG-HCM.",
    tagline: "Được thiết kế như một hệ sinh thái học thuật - sự nghiệp hiện đại."
  },
  home: {
    title1: "Hệ sinh thái ",
    titleHighlight: "Học thuật & Sự nghiệp",
    title2: " của bạn",
    subtitle: "VNU-CONNECT X kết nối học tập và sự nghiệp thông qua các dự án nhỏ, xác minh kỹ năng và lộ trình có định hướng.",
    explore: "Khám phá dự án nhỏ",
    pillars: {
      connect: {
        title: "KẾT NỐI",
        description: "Tham gia các dự án nhỏ thực tế từ công ty, giảng viên và cựu sinh viên."
      },
      passport: {
        title: "HỒ SƠ",
        description: "Xây dựng hồ sơ kỹ năng được xác thực để thể hiện năng lực thực sự của bạn."
      },
      pathways: {
        title: "LỘ TRÌNH",
        description: "Thực hiện các lộ trình được game hóa để đạt được mục tiêu nghề nghiệp của bạn."
      }
    },
    feedTitle: "Hoạt động gần đây",
    featuredStudent: "Sinh viên nổi bật",
    viewProfile: "Xem hồ sơ"
  },
  connect: {
    filters: "Bộ lọc",
    projectType: "Loại dự án",
    difficulty: "Độ khó",
    domain: "Lĩnh vực",
    searchPlaceholder: "Tìm theo tên, kỹ năng, hoặc công ty...",
    noProjectsFound: "Không tìm thấy dự án",
    noProjectsHint: "Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc.",
    matchmakingTitle: "Gợi ý cho bạn",
    joinNow: "Tham gia ngay",
    viewDetails: "Xem chi tiết",
    postedBy: "Đăng bởi",
    status: {
      title: "Trạng thái",
      open: "Đang mở",
      inProgress: "Đang thực hiện",
      completed: "Đã hoàn thành"
    },
    description: "Mô tả",
    objectives: "Mục tiêu",
    deliverables: "Sản phẩm bàn giao",
    reward: "Phần thưởng",
    deadline: "Hạn chót",
    apply: "Ứng tuyển dự án",
    reasonForJoining: "Nêu ngắn gọn lý do bạn quan tâm đến dự án này...",
    uploadPortfolio: "Tải lên Portfolio (Không bắt buộc)",
    submitApplication: "Nộp đơn ứng tuyển"
  },
  passport: {
    connections: "{count} kết nối",
    publicProfile: "Xem hồ sơ công khai",
    tabs: {
      overview: "Tổng quan",
      skills: "Kỹ năng",
      projects: "Dự án",
      feedback: "Nhận xét"
    },
    timelineTitle: "Dòng thời gian sự nghiệp",
    timelineDesc: "Trực quan hóa các dự án và cột mốc đã hoàn thành.",
    completedOn: "Hoàn thành vào {date}",
    skillsGained: "Kỹ năng đạt được: {skills}",
    skillsTitle: "Huy hiệu kỹ năng",
    projectsTitle: "Dự án đã hoàn thành",
    feedbackTitle: "Nhận xét từ cố vấn"
  },
  pathways: {
    title1: "Hành trình sự nghiệp ",
    titleHighlight: "được game hóa",
    subtitle: "Thực hiện các lộ trình có cấu trúc để xây dựng kỹ năng, tích lũy kinh nghiệm và đạt được mục tiêu.",
    xpEarned: "+{xp} XP đã nhận",
    levelUp: "Thăng Cấp!",
    greatJob: "Tuyệt vời!",
    missionComplete: "Bạn đã hoàn thành nhiệm vụ:",
    reflectionPlaceholder: "Chia sẻ suy nghĩ và những gì bạn đã học được...",
    submitButton: "Nộp & Hoàn thành nhiệm vụ",
    completeButton: "Hoàn thành",
    startButton: "Bắt đầu",
    totalReward: "Tổng thưởng",
    missionsCompleted: "Hoàn thành {completed}/{total} nhiệm vụ",
    level: "Cấp {level}",
    missionDetails: {
      status: {
        locked: "Chưa bắt đầu",
        unlocked: "Đang thực hiện",
        submitted: "Đã nộp",
        completed: "Đã hoàn thành"
      },
      tabs: {
        details: "Mô tả",
        submission: "Nộp bài & Phản hồi"
      },
      skill: "Kỹ năng mục tiêu",
      difficulty: "Độ khó",
      duration: "Thời lượng",
      deadline: "Hạn chót",
      reward: "Phần thưởng",
      submitYourWork: "Nộp bài của bạn",
      reflection: "Nội dung phản hồi",
      uploadFile: "Tải lên tệp",
      attachLink: "Đính kèm liên kết",
      submitButton: "Nộp bài",
      saveDraftButton: "Lưu bản nháp",
      cancelButton: "Hủy",
      mentorFeedback: "Phản hồi từ Mentor",
      noFeedback: "Chưa có phản hồi. Bài nộp của bạn đang chờ được xem xét.",
      viewSubmission: "Bài đã nộp"
    }
  },
  mentors: {
    title: "Tìm kiếm Cố vấn",
    subtitle: "Kết nối với các chuyên gia đầu ngành từ các công ty hàng đầu để nhận được sự hướng dẫn và lời khuyên nghề nghiệp.",
    spotlight: "Cố vấn nổi bật",
    directory: "Danh bạ Cố vấn",
    searchPlaceholder: "Tìm theo tên, kỹ năng, hoặc công ty...",
    allFields: "Tất cả lĩnh vực",
    requestSession: "Hẹn gặp",
    chat: "Nhắn tin",
    noMentorsFound: "Không tìm thấy cố vấn",
    noMentorsHint: "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.",
    bookingTitle: "Hẹn gặp với {name}",
    bookingDesc: "Vui lòng chọn ngày và giờ bạn muốn cho buổi gặp 1-1.",
    date: "Ngày",
    time: "Thời gian",
    notes: "Ghi chú cho cố vấn (Tùy chọn)",
    notesPlaceholder: "VD: Em muốn thảo luận về con đường sự nghiệp trong ngành AI...",
    sendRequest: "Gửi yêu cầu"
  },
  about: {
    title: "Giới thiệu về VNU-CONNECT X",
    subtitle: "Hệ sinh thái kết nối học thuật – nghề nghiệp được thiết kế để kiến tạo vốn xã hội và năng lực thực chiến cho sinh viên.",
    vision: {
        title: "Tầm nhìn & Triết lý",
        content1: "VNU-CONNECT X là hệ sinh thái kết nối học thuật – nghề nghiệp được phát triển bởi Đại học Quốc gia TP.HCM.",
        content2: "Mục tiêu của nền tảng là kiến tạo vốn xã hội và năng lực thực chiến cho sinh viên thông qua học tập trải nghiệm và kết nối giá trị.",
        philosophy: "Triết lý cốt lõi: “Từ kết nối thụ động đến hợp tác chủ động”."
    },
    structure: {
        title: "Cấu trúc hệ sinh thái",
        content: "Hệ sinh thái vận hành trên ba trụ cột:",
        pillars: {
            connect: "CONNECT – Không gian hợp tác dự án vi mô giữa sinh viên, giảng viên và doanh nghiệp.",
            passport: "PASSPORT – Hồ sơ năng lực số, ghi nhận và xác thực thành tích học tập – nghề nghiệp.",
            pathways: "PATHWAYS – Lộ trình phát triển được game-hoá, giúp sinh viên học qua hành động."
        }
    },
    impact: {
        title: "Tác động",
        content1: "VNU-CONNECT X giúp sinh viên rèn luyện kỹ năng mềm, xây dựng sự tự tin và tạo dựng mạng lưới chuyên môn bền vững.",
        content2: "Nhà trường có thể theo dõi năng lực đầu ra, doanh nghiệp tiếp cận nhân tài, còn cựu sinh viên đóng góp trở lại cộng đồng."
    },
    credits: {
        title: "Đơn vị phát triển",
        content: "Được phát triển bởi nhóm sinh viên Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT), dưới sự cố vấn của giảng viên hướng dẫn và phối hợp cùng các đối tác doanh nghiệp."
    },
    learnMore: {
        title: "Tìm hiểu thêm về cách hoạt động",
        connect: "Khám phá CONNECT",
        passport: "Xem PASSPORT",
        pathways: "Bắt đầu LỘ TRÌNH"
    }
  },
  settings: {
    title: "Cài đặt tài khoản",
    subtitle: "Quản lý hồ sơ, thông báo và tùy chọn riêng tư của bạn.",
    profile: {
      title: "Thông tin hồ sơ",
      changeAvatar: "Đổi ảnh đại diện",
      name: "Họ và tên",
      major: "Chuyên ngành",
      save: "Lưu thay đổi"
    },
    language: {
      title: "Tùy chọn ngôn ngữ"
    },
    notifications: {
      title: "Thông báo",
      newProjects: "Thông báo dự án mới",
      messages: "Tin nhắn trực tiếp",
      pathways: "Cập nhật lộ trình"
    },
    privacy: {
      title: "Quyền riêng tư hồ sơ",
      description: "Kiểm soát ai có thể xem hồ sơ PASSPORT đầy đủ của bạn.",
      everyone: "Mọi người (Công khai)",
      connections: "Chỉ kết nối",
      me: "Chỉ mình tôi (Riêng tư)"
    },
    account: {
        logout: "Đăng xuất",
        help: "Trung tâm trợ giúp"
    }
  },
  languages: {
    en: "Tiếng Anh (EN)",
    vi: "Tiếng Việt (VI)"
  }
};


interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: { [key in Language]: Translations } = {
  en: enTranslations,
  vi: viTranslations,
};

const getNestedTranslation = (obj: any, key: string): string => {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('vnu-connect-x-lang');
      return (savedLang === 'vi' || savedLang === 'en') ? savedLang : 'en';
    } catch (error) {
      console.error("Could not access localStorage:", error);
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    try {
        localStorage.setItem('vnu-connect-x-lang', lang);
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
    setLanguageState(lang);
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = getNestedTranslation(translations[language], key) || key;
    if (params) {
        Object.keys(params).forEach(pKey => {
            translation = translation.replace(`{${pKey}}`, String(params[pKey]));
        });
    }
    return translation;
  };

  // Fix: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};