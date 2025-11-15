import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import PassportPage from './pages/PassportPage';
import PathwaysPage from './pages/PathwaysPage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';
import { Page, Pathway, User, Mission, SubmissionType } from './types';
import { I18nProvider, useTranslation } from './lib/i18n';
import { PATHWAYS, CURRENT_USER } from './constants';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const { t } = useTranslation();
  const [pathways, setPathways] = useState<Pathway[]>(PATHWAYS);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);

  const handleMissionSubmission = (
    pathwayId: number,
    missionIndex: number,
    submission: { content: string, file?: File, link?: string },
    showCompletionModal: (mission: Mission, newXp: number, oldLevel: number, newLevel: number) => void
  ) => {
    const pathway = pathways.find(p => p.id === pathwayId);
    if (!pathway) return;

    const missionToComplete = pathway.missions[missionIndex];

    const oldLevel = getLevelFromXp(currentUser.xp).level;
    const newXp = currentUser.xp + missionToComplete.xp;
    const newLevel = getLevelFromXp(newXp).level;

    // Show completion modal before state updates
    showCompletionModal(missionToComplete, newXp, oldLevel, newLevel);
    
    // Update pathways state
    setPathways(prevPathways => {
      return prevPathways.map(p => {
        if (p.id === pathwayId) {
          const newMissions = p.missions.map((mission, index) => {
            // Complete current mission
            if (index === missionIndex) {
              return { 
                ...mission, 
                status: 'completed', 
                submissionContent: submission.content,
                submissionFile: submission.file?.name,
                submissionLink: submission.link,
              };
            }
            // Unlock next mission
            if (index === missionIndex + 1 && mission.status === 'locked') {
               return { ...mission, status: 'unlocked' };
            }
            return mission;
          });
          return { ...p, missions: newMissions };
        }
        return p;
      });
    });

    // Update user state
    setCurrentUser(prevUser => {
        const updatedUser = { ...prevUser, xp: newXp };

        // Add verified skill if not present
        const skillExists = updatedUser.skills.includes(missionToComplete.skill);
        if (!skillExists) {
            updatedUser.skills = [...updatedUser.skills, missionToComplete.skill];
        }

        // Add achievement badge if it exists
        const badge = missionToComplete.badge;
        if (badge) {
            const badgeExists = updatedUser.achievements?.some(a => a.title === badge.title);
            if (!badgeExists) {
                updatedUser.achievements = [...(updatedUser.achievements || []), badge];
            }
        }
        
        return updatedUser;
    });
  };

  const getLevelFromXp = (xp: number) => {
    const levels = [
        { level: 1, xpThreshold: 0, name: 'Newcomer' },
        { level: 2, xpThreshold: 100, name: 'Learner' },
        { level: 3, xpThreshold: 250, name: 'Collaborator' },
        { level: 4, xpThreshold: 500, name: 'Networker' },
        { level: 5, xpThreshold: 1000, name: 'Pathfinder' },
    ];
    const currentLevel = levels.slice().reverse().find(l => xp >= l.xpThreshold) || levels[0];
    const nextLevel = levels.find(l => l.level === currentLevel.level + 1);

    if (nextLevel) {
        const progress = Math.round(((xp - currentLevel.xpThreshold) / (nextLevel.xpThreshold - currentLevel.xpThreshold)) * 100);
        return { ...currentLevel, nextLevel, progress };
    }
    
    return { ...currentLevel, nextLevel: null, progress: 100 };
  };


  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomePage setActivePage={setActivePage} />;
      case Page.Connect:
        return <ConnectPage />;
      case Page.Passport:
        return <PassportPage user={currentUser} pathways={pathways} />;
      case Page.Pathways:
        return <PathwaysPage 
                  pathways={pathways} 
                  onMissionSubmit={handleMissionSubmission}
                  currentUser={currentUser}
                  getLevelFromXp={getLevelFromXp}
               />;
      case Page.About:
        return <AboutPage setActivePage={setActivePage} />;
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