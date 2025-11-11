import React, { useState } from 'react';
import { CURRENT_USER, PROJECTS, FEEDBACKS } from '../constants';
import { CheckCircleIcon, ShareIcon } from '../components/icons';
import { useTranslation } from '../lib/i18n';

type Tab = 'Overview' | 'Skills' | 'Projects' | 'Feedback';

const PassportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const { t } = useTranslation();

  const completedProjects = PROJECTS.slice(0, 2); // Mock completed projects

  const TABS: Tab[] = ['Overview', 'Skills', 'Projects', 'Feedback'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <img
            className="w-32 h-32 rounded-full border-4 border-primary shadow-lg"
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
          />
          <div className="text-center md:text-left mt-4 md:mt-0">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">{CURRENT_USER.name}</h1>
              {CURRENT_USER.isVerified && <CheckCircleIcon className="w-7 h-7 text-primary" />}
            </div>
            <p className="text-gray-600 mt-1">{CURRENT_USER.major} - MSSV: {CURRENT_USER.mssv}</p>
            <p className="text-gray-500 text-sm mt-1">{t('passport.connections', { count: CURRENT_USER.connections })}</p>
          </div>
          <div className="md:ml-auto mt-4 md:mt-0">
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
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">{t('passport.timelineTitle')}</h2>
            <p className="text-gray-600">{t('passport.timelineDesc')}</p>
            <div className="mt-6 border-l-2 border-primary pl-6 space-y-8">
                {completedProjects.map((proj, index) => (
                    <div key={proj.id} className="relative">
                         <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-white"></div>
                         <p className="text-sm text-gray-500">{t('passport.completedOn', { date: new Date(Date.now() - index * 10e8).toLocaleDateString() })}</p>
                         <h3 className="font-semibold text-lg">{proj.title}</h3>
                         <p className="text-sm text-gray-600">{t('passport.skillsGained', { skills: proj.skills.join(', ') })}</p>
                    </div>
                ))}
            </div>
          </div>
        )}
        {activeTab === 'Skills' && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{t('passport.skillsTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {CURRENT_USER.skills.map((skill) => (
                <div key={skill} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'Projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('passport.projectsTitle')}</h2>
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
             <h2 className="text-2xl font-bold">{t('passport.feedbackTitle')}</h2>
             {FEEDBACKS.map((feedback, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start space-x-4">
                        <img src={feedback.mentorAvatar} alt={feedback.mentorName} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold text-gray-900">{`"${feedback.comment}"`}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                — {feedback.mentorName} on <span className="font-bold text-primary">{feedback.skill}</span>
                            </p>
                        </div>
                    </div>
                </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default PassportPage;