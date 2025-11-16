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
    explore: "Explore Micro-Projects",
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
    title: "CONNECT — Micro-Projects & Smart Matching",
    subtitle: "Connect through action. Build real skills, real networks, real impact.",
    back: "Back to Connect Hub",
    tabs: {
      microGigs: "Micro-Projects",
      smartMatching: "Smart Matching Hub"
    },
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
    submitApplication: "Submit Application",
    smartMatching: {
      title: "Smart Matching Hub",
      viewDetails: "View Details",
      mentors: {
        title: "Mentor Matching",
        desc: "Connect with instructors, alumni, and professionals for guidance."
      },
      peers: {
        title: "Peer Collaboration",
        desc: "Find students with similar goals or complementary skills to team up.",
        // FIX: Added missing translation keys to match `vi.ts` and component usage.
        subtitle: "AI suggests students with similar goals or complementary skills for you to collaborate with.",
        connectNow: "Connect Now"
      },
      alumni: {
        title: "Alumni Network",
        desc: "Get project feedback and career tips from recent graduates.",
        // FIX: Added missing translation keys to match `vi.ts` and component usage.
        subtitle: "Connect with successful alumni to learn from their experience.",
        askForAdvice: "Ask for Advice"
      },
      companies: {
        title: "Company Matching",
        desc: "Link up with partner companies based on your skills and interests.",
        // FIX: Added missing translation keys to match `vi.ts` and component usage.
        subtitle: "Discover opportunities from the university's top partners.",
        roles: "Hiring Roles",
        openGigs: "{count} open gigs",
        connect: "Connect"
      }
    },
    mentors: {
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
    All: "All",
    Open: "Open",
    'In Progress': "In Progress",
    Completed: "Completed",
    'Micro-Project': "Micro-Project",
    'Shadow Project': "Shadow Project",
    Beginner: "Beginner",
    Intermediate: "Intermediate",
    Advanced: "Advanced",
    Tech: "Tech",
    Marketing: "Marketing",
    Design: "Design",
    Business: "Business",
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
    titles: {
        pmFresher: "7 foundational tasks to get familiar with the role of a Product Manager Fresher",
        dataAnalyst: "Data Analyst Launchpad",
        effectiveCommunication: "Effective Communication"
    },
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
  about: {
    title: "About VNU-CONNECT X",
    subtitle: "An academic-career ecosystem designed to build social capital and practical skills for students.",
    vision: {
      title: "VISION & DESIGN PHILOSOPHY",
      intro: "VNU-CONNECT X is not a standalone application but a career–academic connection ecosystem designed to:",
      point1: "Redefine networking: shifting from “finding people” to “creating value together through action.”",
      point2: "Transform connection into learning: every interaction becomes an opportunity to develop soft skills and professional competencies.",
      point3: "Build intrinsic motivation: students grow through real-world experiences, rewarded and reflected in their verified competency portfolio."
    },
    meaning: {
      title: "MEANING BEHIND THE NAME “VNU-CONNECT X”",
      intro: "The “X” symbolizes three core developmental dimensions:",
      experience: {
        title: "eXperience",
        description: "Learning through real-world action."
      },
      exchange: {
        title: "eXchange",
        description: "Sharing knowledge, skills, and opportunities across students, mentors, and industry partners."
      },
      explore: {
        title: "eXplore",
        description: "Discovering oneself and exploring new professional pathways."
      }
    },
    team: {
      title: "DEVELOPMENT TEAM",
      content: "Team ISeven of University of Information Technology"
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
    title: "CONNECT — Dự án nhỏ & Kết nối thông minh",
    subtitle: "Kết nối qua hành động. Xây dựng kỹ năng thật, mạng lưới thật, tạo ảnh hưởng thật.",
    back: "Quay lại Trung tâm Kết nối",
    tabs: {
      microGigs: "Dự án nhỏ",
      smartMatching: "Kết nối thông minh"
    },
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
    submitApplication: "Nộp đơn ứng tuyển",
    smartMatching: {
      title: "Trung tâm Kết nối thông minh",
      viewDetails: "Xem chi tiết",
      mentors: {
        title: "Kết nối Cố vấn",
        desc: "Kết nối với giảng viên, cựu sinh viên, và chuyên gia để nhận định hướng."
      },
      // FIX: Merged misplaced translation keys for peers, alumni, and companies into the correct `smartMatching` object.
      peers: {
          title: "Hợp tác cùng bạn bè",
          desc: "Tìm sinh viên có cùng mục tiêu hoặc kỹ năng bổ trợ để lập nhóm.",
          subtitle: "AI gợi ý các sinh viên có cùng mục tiêu hoặc kỹ năng bổ trợ để bạn hợp tác.",
          connectNow: "Kết nối ngay"
      },
      alumni: {
          title: "Mạng lưới Cựu sinh viên",
          desc: "Nhận phản hồi dự án và lời khuyên nghề nghiệp từ người đi trước.",
          subtitle: "Kết nối với các cựu sinh viên thành công để học hỏi kinh nghiệm.",
          askForAdvice: "Xin lời khuyên"
      },
      companies: {
          title: "Kết nối Doanh nghiệp",
          desc: "Liên kết với các công ty đối tác dựa trên kỹ năng và sở thích của bạn.",
          subtitle: "Khám phá các cơ hội từ những đối tác hàng đầu của trường.",
          roles: "Vị trí tuyển dụng",
          openGigs: "{count} dự án đang mở",
          connect: "Kết nối"
      }
    },
    mentors: {
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
    All: "Tất cả",
    Open: "Đang mở",
    'In Progress': "Đang thực hiện",
    Completed: "Đã hoàn thành",
    'Micro-Project': "Dự án nhỏ",
    'Shadow Project': "Dự án thực tập",
    Beginner: "Cơ bản",
    Intermediate: "Trung bình",
    Advanced: "Nâng cao",
    Tech: "Công nghệ",
    Marketing: "Marketing",
    Design: "Thiết kế",
    Business: "Kinh doanh",
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
    titles: {
        pmFresher: "7 nhiệm vụ nền tảng để làm quen với vai trò Product Manager Fresher",
        dataAnalyst: "Lộ trình cho Chuyên viên Phân tích Dữ liệu",
        effectiveCommunication: "Giao tiếp Hiệu quả"
    },
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
  about: {
    title: "Giới thiệu về VNU-CONNECT X",
    subtitle: "Hệ sinh thái kết nối học thuật – nghề nghiệp được thiết kế để kiến tạo vốn xã hội và năng lực thực chiến cho sinh viên.",
    vision: {
      title: "TẦM NHÌN VÀ TRIẾT LÝ THIẾT KẾ",
      intro: "VNU-CONNECT X không phải là một ứng dụng đơn lẻ, mà là một hệ sinh thái kết nối học thuật – nghề nghiệp, được xây dựng nhằm:",
      point1: "Tái định nghĩa networking: từ việc “tìm người quen biết” sang “tạo giá trị cùng nhau thông qua hành động”.",
      point2: "Biến kết nối thành học tập: mỗi tương tác đều là một cơ hội rèn luyện kỹ năng mềm và năng lực chuyên môn.",
      point3: "Tạo động lực nội tại: sinh viên phát triển năng lực qua trải nghiệm thực tế và được ghi nhận bằng thành tích hiển thị trong hồ sơ năng lực."
    },
    meaning: {
      title: "Ý NGHĨA TÊN GỌI “VNU-CONNECT X”",
      intro: "Ba tầng ý nghĩa của chữ “X” thể hiện định hướng phát triển của hệ sinh thái:",
      experience: {
        title: "eXperience",
        description: "Trải nghiệm thực tế, học bằng hành động."
      },
      exchange: {
        title: "eXchange",
        description: "Trao đổi tri thức, kỹ năng và cơ hội giữa sinh viên – giảng viên – doanh nghiệp."
      },
      explore: {
        title: "eXplore",
        description: "Khám phá bản thân và mở rộng các lĩnh vực nghề nghiệp mới."
      }
    },
    team: {
      title: "ĐỘI NGŨ PHÁT TRIỂN",
      content: "Nhóm ISeven thuộc Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM"
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
    let translation = getNestedTranslation(translations[language], `connect.${key}`) 
                   || getNestedTranslation(translations[language], key) 
                   || key;
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