import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { useTranslation } from '../lib/i18n';
import { ClockIcon, StarIcon } from '../components/icons';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };
  const domainColor = {
    Tech: 'border-blue-500',
    Marketing: 'border-pink-500',
    Design: 'border-purple-500',
    Business: 'border-indigo-500',
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 border-l-4 ${domainColor[project.domain]}`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${difficultyColor[project.difficulty]}`}>
              {project.difficulty}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-2">{project.title}</h3>
            <p className="text-sm text-gray-500">
              Posted by <span className="font-semibold">{project.postedBy}</span> ({project.posterType})
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 my-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill) => (
            <span key={skill} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-3 mt-3">
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <StarIcon className="w-4 h-4" />
            <span>{project.reward}</span>
          </div>
          <button className="bg-primary text-white font-semibold py-1 px-4 rounded-full hover:bg-primary-dark transition-colors">
            {t('connect.joinNow')}
          </button>
        </div>
      </div>
    </div>
  );
};


const ConnectPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    difficulty: 'All',
    domain: 'All',
  });

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.postedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = filters.type === 'All' || p.type === filters.type;
      const difficultyMatch = filters.difficulty === 'All' || p.difficulty === filters.difficulty;
      const domainMatch = filters.domain === 'All' || p.domain === filters.domain;

      return searchMatch && typeMatch && difficultyMatch && domainMatch;
    });
  }, [searchQuery, filters]);

  const microGigs = filteredProjects.filter(p => p.type === 'Micro-Gig');
  const shadowProjects = filteredProjects.filter(p => p.type === 'Shadow Project');
  
  const FilterSection: React.FC<{title: string, options: string[], selected: string, onChange: (value: string) => void}> = ({title, options, selected, onChange}) => (
    <div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="space-y-2">
            {options.map(opt => (
                <button key={opt} onClick={() => onChange(opt)} className={`w-full text-left px-3 py-2 rounded-md text-sm ${selected === opt ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-100'}`}>
                    {opt}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-28">
            <h2 className="text-2xl font-bold mb-6">{t('connect.filters')}</h2>
            <div className="space-y-6">
              <FilterSection title={t('connect.projectType')} options={['All', 'Micro-Gig', 'Shadow Project']} selected={filters.type} onChange={(v) => handleFilterChange('type', v)} />
              <FilterSection title={t('connect.difficulty')} options={['All', 'Beginner', 'Intermediate', 'Advanced']} selected={filters.difficulty} onChange={(v) => handleFilterChange('difficulty', v)} />
              <FilterSection title={t('connect.domain')} options={['All', 'Tech', 'Marketing', 'Design', 'Business']} selected={filters.domain} onChange={(v) => handleFilterChange('domain', v)} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('connect.searchPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          
          {/* AI Matchmaking Panel */}
          <div className="bg-gradient-to-r from-blue-500 to-primary text-white p-6 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-2">{t('connect.matchmakingTitle')}</h2>
            <p className="mb-4">Based on your skills in React and UI/UX, we found 3 projects that are a perfect fit for you. Let's get you connected!</p>
            <button className="bg-white text-primary font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105">View Your Matches</button>
          </div>

          {/* Micro-Gigs Marketplace */}
          <section>
            <h2 className="text-3xl font-bold mb-6">{t('connect.marketplaceTitle')}</h2>
            {microGigs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {microGigs.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold">{t('connect.noGigsFound')}</h3>
                    <p className="text-gray-600 mt-2">{t('connect.noGigsHint')}</p>
                </div>
            )}
          </section>

          {/* Shadow Projects */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">{t('connect.shadowTitle')}</h2>
             {shadowProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {shadowProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold">{t('connect.noShadowFound')}</h3>
                    <p className="text-gray-600 mt-2">{t('connect.noShadowHint')}</p>
                </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ConnectPage;
