import React, { useState } from 'react';
import { PROJECTS, FEEDBACKS, ACTIVITIES } from '../constants';
import { CheckCircleIcon, ShareIcon, UserIcon, MessageSquareIcon, Avatar } from '../components/icons';
import { useTranslation } from '../lib/i18n';
import type { Activity, User, Pathway } from '../types';

type Tab = 'Overview' | 'Skills' | 'Projects' | 'Feedback';

const Card: React.FC<{title: string, icon?: React.ReactNode, children: React.ReactNode, className?: string}> = ({title, icon, children, className}) => (
  <div className={`bg-white rounded-xl shadow-md ${className}`}>
    <div className="p-5 border-b border-gray-200 flex items-center space-x-3">
      {icon && <div className="text-primary">{icon}</div>}
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

const AtSymbolIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
  </svg>
);

const AcademicCapIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.914 9H3.087z" clipRule="evenodd" />
    </svg>
);

const TrophyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1011.312 0l-1.156-1.887a2.25 2.25 0 00-1.087-1.087l-1.887-1.156a2.25 2.25 0 00-2.625 0l-1.887 1.156a2.25 2.25 0 00-1.087 1.087L7.188 18.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5v5.25m0 0l-1.06.649a2.25 2.25 0 00-1.38 2.062V12m2.44-4.501l1.06.649a2.25 2.25 0 011.38 2.062V12m-5.32 0V9.188a2.25 2.25 0 011.38-2.062l1.06-.649m-2.44 4.501l.001-.001" />
    </svg>
);


const PassportActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="flex items-start space-x-3 p-2">
        <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary/50"></div>
        <div>
            <p className="text-sm text-gray-700">
                <span className="font-semibold capitalize">{activity.action}</span>
                {' '}
                {activity.target && <span className="font-bold text-primary">{activity.target}</span>}
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
        </div>
    </div>
);

interface PassportPageProps {
  user: User;
  pathways: Pathway[];
}

const PassportPage: React.FC<PassportPageProps> = ({ user, pathways }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const { t } = useTranslation();

  const completedProjects = PROJECTS.slice(0, 2); // Mock completed projects
  const userActivities = ACTIVITIES.filter(a => a.user.id === user.id);
  const totalXp = pathways.flatMap(p => p.missions).filter(m => m.status === 'completed').reduce((sum, m) => sum + m.xp, 0);

  const TABS: Tab[] = ['Overview', 'Skills', 'Projects', 'Feedback'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
          <Avatar
            gender={user.gender}
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-primary shadow-lg flex-shrink-0"
          />
          <div className="flex-grow text-center lg:text-left mt-4 lg:mt-0">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              {user.isVerified && <CheckCircleIcon className="w-7 h-7 text-primary" />}
               <div className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <TrophyIcon className="w-4 h-4" />
                <span>{totalXp} XP</span>
              </div>
            </div>
             <p className="text-lg font-semibold text-gray-700 mt-1">{user.major}</p>
            <div className="mt-2 text-gray-500 text-sm flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5"><AcademicCapIcon className="w-4 h-4" />{user.university}</span>
                <span className="inline-flex items-center gap-1.5"><UserIcon className="w-4 h-4" />Year {user.year}</span>
                <span className="inline-flex items-center gap-1.5"><AtSymbolIcon className="w-4 h-4" />{user.email}</span>
            </div>
          </div>
          <div className="lg:ml-auto mt-6 lg:mt-0 flex-shrink-0">
            <button className="flex items-center space-x-2 bg-primary/10 text-primary font-semibold py-2 px-5 rounded-full hover:bg-primary/20 transition-colors">
              <ShareIcon className="w-5 h-5" />
              <span>{t('passport.publicProfile')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {t(`passport.tabs.${tab.toLowerCase()}`)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Overview' && (
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-8">
              <Card title="About Me">
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </Card>
               <Card title="Achievements & Badges">
                 <div className="space-y-4">
                  {user.achievements?.map(ach => (
                    <div key={ach.title} className="flex items-start space-x-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                        {ach.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{ach.title}</h3>
                        <p className="text-sm text-gray-600">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                 </div>
               </Card>
            </div>
             <div className="lg:col-span-2 space-y-8">
                <Card title="Recent Activity">
                  <div className="space-y-1">
                    {userActivities.map(act => <PassportActivityItem key={act.id} activity={act} />)}
                  </div>
                </Card>
                <Card title="Mentor Connections">
                  <div className="space-y-4">
                    {user.mentorConnections?.map(mentor => {
                      const gender = mentor.name.startsWith('Dr.') ? 'male' : 'female';
                      return (
                       <div key={mentor.id} className="flex items-center space-x-3">
                         <Avatar gender={gender} src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full"/>
                         <div>
                            <p className="font-semibold text-gray-800">{mentor.name}</p>
                            <p className="text-sm text-gray-500">{mentor.title}</p>
                         </div>
                       </div>
                    )})}
                  </div>
                </Card>
             </div>
           </div>
        )}
        {activeTab === 'Skills' && (
          <Card title={t('passport.skillsTitle')}>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill) => (
                <div key={skill} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg text-center">
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        )}
        {activeTab === 'Projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-0">{t('passport.projectsTitle')}</h2>
            {completedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-xl mb-1">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Feedback' && (
           <div className="space-y-6">
             <h2 className="text-2xl font-bold mb-0">{t('passport.feedbackTitle')}</h2>
             {FEEDBACKS.map((feedback, index) => {
                const gender = feedback.mentorName.startsWith('Dr.') ? 'male' : 'female';
                return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start space-x-4">
                        <Avatar gender={gender} src={feedback.mentorAvatar} alt={feedback.mentorName} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold text-gray-900">{`"${feedback.comment}"`}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                — {feedback.mentorName} on <span className="font-bold text-primary">{feedback.skill}</span>
                            </p>
                        </div>
                    </div>
                </div>
             )})}
           </div>
        )}
      </div>
    </div>
  );
};

export default PassportPage;