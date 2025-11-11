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
    marketplaceTitle: "Micro-Gigs Marketplace",
    searchPlaceholder: "Search by title, skill, or company...",
    noGigsFound: "No Micro-Gigs Found",
    noGigsHint: "Try adjusting your search query or filters.",
    shadowTitle: "Shadow Projects",
    noShadowFound: "No Shadow Projects Found",
    noShadowHint: "Try adjusting your search query or filters.",
    matchmakingTitle: "AI Matchmaking Panel",
    joinNow: "Join Now",
    connect: "Connect"
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
    xpEarned: "{xp} XP Earned",
    continue: "Continue Journey"
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
    marketplaceTitle: "Thị trường dự án nhỏ",
    searchPlaceholder: "Tìm theo tên, kỹ năng, hoặc công ty...",
    noGigsFound: "Không tìm thấy dự án nhỏ",
    noGigsHint: "Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc.",
    shadowTitle: "Dự án quan sát",
    noShadowFound: "Không tìm thấy dự án quan sát",
    noShadowHint: "Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc.",
    matchmakingTitle: "Gợi ý kết nối AI",
    joinNow: "Tham gia ngay",
    connect: "Kết nối"
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
    xpEarned: "Đã nhận {xp} XP",
    continue: "Tiếp tục hành trình"
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
