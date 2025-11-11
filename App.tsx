import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import PassportPage from './pages/PassportPage';
import PathwaysPage from './pages/PathwaysPage';
import MentorsPage from './pages/MentorsPage';
import SettingsPage from './pages/SettingsPage';
import { Page } from './types';
import { I18nProvider, useTranslation } from './lib/i18n';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const { t } = useTranslation();

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomePage setActivePage={setActivePage} />;
      case Page.Connect:
        return <ConnectPage />;
      case Page.Passport:
        return <PassportPage />;
      case Page.Pathways:
        return <PathwaysPage />;
      case Page.Mentors:
        return <MentorsPage />;
      case Page.Settings:
        return <SettingsPage />;
      default:
        return <div className="p-8">Page not found: {activePage}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
       <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            <p>{t('footer.copy', { year: new Date().getFullYear() })}</p>
            <p className="mt-1">{t('footer.tagline')}</p>
        </div>
      </footer>
    </div>
  );
}


const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;
