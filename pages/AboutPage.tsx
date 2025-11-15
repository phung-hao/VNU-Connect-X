import React from 'react';
import { useTranslation } from '../lib/i18n';
import { Page } from '../types';
import { ShareIcon, TargetIcon, GlobeIcon, CheckCircleIcon } from '../components/icons';

interface AboutPageProps {
  setActivePage: (page: Page) => void;
}

const HeroIllustration: React.FC = () => (
    <div className="absolute top-0 left-0 w-full h-full text-primary/20" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <circle cx="50" cy="75" r="5" fill="currentColor"/>
            <circle cx="150" cy="30" r="8" fill="currentColor"/>
            <circle cx="200" cy="120" r="6" fill="currentColor"/>
            <circle cx="300" cy="60" r="10" fill="currentColor"/>
            <circle cx="380" cy="100" r="4" fill="currentColor"/>
            <path d="M55 78 C 90 60, 120 40, 145 35" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M158 35 C 180 60, 190 90, 196 115" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M205 118 C 240 100, 270 80, 295 65" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M308 65 C 335 75, 360 90, 377 98" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 uppercase tracking-wider">{title}</h2>
        {children}
    </div>
);

const VisionPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-1">
            <CheckCircleIcon className="w-5 h-5 text-primary" />
        </div>
        <p className="text-gray-700 leading-relaxed text-base">{children}</p>
    </li>
);

const MeaningCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="text-center p-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
    </div>
);


const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative bg-primary/5 rounded-xl p-8 md:p-12 mb-16 text-center overflow-hidden">
        <HeroIllustration />
        <div className="relative z-10">
          <img
            className="h-12 md:h-16 w-auto mx-auto mb-4 animate-fade-in"
            style={{maxWidth: '180px'}}
            src="https://i.postimg.cc/HsPdxmb8/20251110-1713-VNU-CONNECT-X-Logo-simple-compose-01k9pm27dje2cth1tv2n8dw6eq.png"
            alt="Logo ứng dụng VNU-CONNECT X"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t('about.title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('about.subtitle')}
          </p>
           <div className="flex justify-center items-center space-x-4 mt-6">
              <img className="h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/3/37/VNU-HCM_logo.png" alt="VNU-HCM Logo" />
              <img className="h-10 w-auto" src="https://www.uit.edu.vn/sites/vi/files/images/Logos/Logo_UIT_Web_Transparent.png" alt="UIT Logo" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Section title={t('about.vision.title')}>
          <p className="text-center text-gray-700 mb-6 font-medium text-base leading-relaxed">{t('about.vision.intro')}</p>
          <ul className="space-y-4 text-left">
            <VisionPoint>{t('about.vision.point1')}</VisionPoint>
            <VisionPoint>{t('about.vision.point2')}</VisionPoint>
            <VisionPoint>{t('about.vision.point3')}</VisionPoint>
          </ul>
        </Section>
        
        <Section title={t('about.meaning.title')}>
          <p className="text-center text-gray-600 mb-8">{t('about.meaning.intro')}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <MeaningCard 
              icon={<TargetIcon className="w-8 h-8" />}
              title={t('about.meaning.experience.title')}
              description={t('about.meaning.experience.description')}
            />
            <MeaningCard 
              icon={<ShareIcon className="w-8 h-8" />}
              title={t('about.meaning.exchange.title')}
              description={t('about.meaning.exchange.description')}
            />
            <MeaningCard 
              icon={<GlobeIcon className="w-8 h-8" />}
              title={t('about.meaning.explore.title')}
              description={t('about.meaning.explore.description')}
            />
          </div>
        </Section>

        <Section title={t('about.team.title')}>
          <p className="text-center text-gray-700 text-lg font-semibold">{t('about.team.content')}</p>
        </Section>
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.learnMore.title')}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <button onClick={() => setActivePage(Page.Connect)} className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-md">
            {t('about.learnMore.connect')}
          </button>
          <button onClick={() => setActivePage(Page.Passport)} className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-md">
            {t('about.learnMore.passport')}
          </button>
          <button onClick={() => setActivePage(Page.Pathways)} className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-md">
            {t('about.learnMore.pathways')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
