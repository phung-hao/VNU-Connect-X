import React from 'react';
import { Page, Activity } from '../types';
import { ACTIVITIES, USERS } from '../constants';
import { BriefcaseIcon, PassportIcon, PathwayIcon } from '../components/icons';
import { useTranslation } from '../lib/i18n';

interface HomePageProps {
  setActivePage: (page: Page) => void;
}

const PillarCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  page: Page;
  onClick: (page: Page) => void;
}> = ({ icon, title, description, page, onClick }) => (
    <div 
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 cursor-pointer"
      onClick={() => onClick(page)}
    >
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-poppins font-semibold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
    </div>
);

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg">
        <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full"/>
        <div>
            <p className="text-sm">
                <span className="font-semibold">{activity.user.name}</span>
                {' '}{activity.action}{' '}
                {activity.target && <span className="font-semibold text-primary">{activity.target}</span>}
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900">
          {t('home.title1')}
          <span className="text-primary">{t('home.titleHighlight')}</span>
          {t('home.title2')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          {t('home.subtitle')}
        </p>
        <div className="mt-8">
            <button 
              onClick={() => setActivePage(Page.Connect)}
              className="bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-primary-dark transform hover:scale-105 transition-all duration-300">
                {t('home.explore')}
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <PillarCard 
            icon={<BriefcaseIcon className="w-8 h-8"/>} 
            title={t('home.pillars.connect.title')}
            description={t('home.pillars.connect.description')}
            page={Page.Connect}
            onClick={setActivePage}
        />
        <PillarCard 
            icon={<PassportIcon className="w-8 h-8"/>} 
            title={t('home.pillars.passport.title')}
            description={t('home.pillars.passport.description')}
            page={Page.Passport}
            onClick={setActivePage}
        />
        <PillarCard 
            icon={<PathwayIcon className="w-8 h-8"/>} 
            title={t('home.pillars.pathways.title')} 
            description={t('home.pillars.pathways.description')}
            page={Page.Pathways}
            onClick={setActivePage}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-poppins font-bold mb-4">{t('home.feedTitle')}</h2>
            <div className="space-y-2">
                {ACTIVITIES.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
            </div>
        </div>
        <div className="bg-gradient-to-br from-primary to-blue-400 p-8 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-poppins font-bold mb-4">{t('home.featuredStudent')}</h2>
            <div className="flex items-center space-x-4">
                <img src={USERS[0].avatar} alt={USERS[0].name} className="w-20 h-20 rounded-full border-4 border-white"/>
                <div>
                    <h3 className="text-xl font-semibold">{USERS[0].name}</h3>
                    <p className="text-blue-100">{USERS[0].major}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {USERS[0].skills.slice(0,3).map(skill => (
                            <span key={skill} className="bg-white/20 text-xs font-semibold px-2 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
             <button 
              onClick={() => setActivePage(Page.Passport)}
              className="mt-6 bg-white text-primary font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 w-full md:w-auto">
                {t('home.viewProfile')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;