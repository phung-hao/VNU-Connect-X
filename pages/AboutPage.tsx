import React from 'react';
import { useTranslation } from '../lib/i18n';
import { Page } from '../types';
import { ConnectIcon, PassportBookIcon, PathwaysRoadIcon, ChevronDownIcon } from '../components/icons';

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


const InfoSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    return (
        <details className="bg-white rounded-xl shadow-md overflow-hidden open:ring-2 open:ring-primary/50 transition-shadow duration-300" open={defaultOpen}>
            <summary className="p-6 font-bold text-lg cursor-pointer flex justify-between items-center list-none">
                <span className="text-gray-900">{title}</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 chevron-rotate" />
            </summary>
            <div className="p-6 pt-0 text-gray-700 leading-relaxed space-y-4">
                {children}
            </div>
        </details>
    );
};


const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative bg-primary/5 rounded-xl p-8 md:p-12 mb-16 text-center overflow-hidden">
        <HeroIllustration />
        <div className="relative z-10">
          <div className="flex justify-center items-center space-x-4 mb-4">
              <img className="h-14 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/3/37/VNU-HCM_logo.png" alt="VNU-HCM Logo" />
              <img className="h-12 w-auto" src="https://www.uit.edu.vn/sites/vi/files/images/Logos/Logo_UIT_Web_Transparent.png" alt="UIT Logo" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t('about.title')}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <InfoSection title={t('about.vision.title')} defaultOpen={true}>
          <p>{t('about.vision.content1')}</p>
          <p>{t('about.vision.content2')}</p>
          <p className="font-semibold text-primary italic">"{t('about.vision.philosophy')}"</p>
        </InfoSection>

        <InfoSection title={t('about.structure.title')}>
          <p>{t('about.structure.content')}</p>
          <ul className="list-none space-y-4 mt-4">
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-1"><ConnectIcon className="w-4 h-4" /></div>
              <span><strong className="font-bold text-gray-800">CONNECT</strong> – {t('about.structure.pillars.connect').split('–')[1]}</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-1"><PassportBookIcon className="w-4 h-4" /></div>
              <span><strong className="font-bold text-gray-800">PASSPORT</strong> – {t('about.structure.pillars.passport').split('–')[1]}</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-1"><PathwaysRoadIcon className="w-4 h-4" /></div>
              <span><strong className="font-bold text-gray-800">PATHWAYS</strong> – {t('about.structure.pillars.pathways').split('–')[1]}</span>
            </li>
          </ul>
        </InfoSection>

        <InfoSection title={t('about.impact.title')}>
          <p>{t('about.impact.content1')}</p>
          <p>{t('about.impact.content2')}</p>
        </InfoSection>

        <InfoSection title={t('about.credits.title')}>
          <p>{t('about.credits.content')}</p>
        </InfoSection>
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