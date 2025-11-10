import React, { useState } from 'react';
import { PROJECTS, USERS } from '../constants';
import type { Project } from '../types';
import { ClockIcon, StarIcon } from '../components/icons';
import { useTranslation } from '../lib/i18n';

const SearchIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const SkillTag: React.FC<{ skill: string }> = ({ skill }) => (
    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">{skill}</span>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { t } = useTranslation();
    const posterColor = {
        Company: 'text-red-500 bg-red-100',
        Instructor: 'text-green-500 bg-green-100',
        Alumni: 'text-indigo-500 bg-indigo-100'
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${posterColor[project.posterType]}`}>{project.posterType}</span>
                </div>
                <h3 className="text-lg font-poppins font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">Posted by <span className="font-semibold">{project.postedBy}</span></p>
                <div className="flex flex-wrap">
                    {project.skills.map(skill => <SkillTag key={skill} skill={skill} />)}
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-700">
                    <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{project.reward}</span>
                    </div>
                </div>
            </div>
            <button className="w-full bg-primary text-white font-semibold py-3 hover:bg-primary-dark transition-colors duration-300">{t('connect.joinNow')}</button>
        </div>
    )
};

const ProfileCard: React.FC<{ user: typeof USERS[0] }> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center flex-shrink-0 w-48">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-primary" />
            <h4 className="font-semibold text-gray-800">{user.name}</h4>
            <p className="text-xs text-gray-500 mb-3">{user.major}</p>
            <button className="bg-primary/10 text-primary text-sm font-semibold py-1 px-4 rounded-full hover:bg-primary/20 transition-colors">{t('connect.connect')}</button>
        </div>
    );
};

const FilterSidebar: React.FC = () => {
    const { t } = useTranslation();
    const filters = {
        [t('connect.projectType')]: ['Micro-Gig', 'Shadow Project'],
        [t('connect.difficulty')]: ['Beginner', 'Intermediate', 'Advanced'],
        [t('connect.domain')]: ['Tech', 'Marketing', 'Design', 'Business'],
    };

    return (
        <aside className="w-full lg:w-64 xl:w-72 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-poppins font-bold mb-4">{t('connect.filters')}</h3>
                {Object.entries(filters).map(([title, options]) => (
                    <div key={title} className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
                        <div className="space-y-2">
                            {options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="ml-3 text-sm text-gray-600">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

const ConnectPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useTranslation();

    const filteredProjects = PROJECTS.filter(project => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const titleMatch = project.title.toLowerCase().includes(query);
        const postedByMatch = project.postedBy.toLowerCase().includes(query);
        const skillsMatch = project.skills.some(skill => skill.toLowerCase().includes(query));
        
        return titleMatch || postedByMatch || skillsMatch;
    });

    const microGigs = filteredProjects.filter(p => p.type === 'Micro-Gig');
    const shadowProjects = filteredProjects.filter(p => p.type === 'Shadow Project');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <FilterSidebar />
                <div className="flex-1 mt-8 lg:mt-0">
                    <section>
                        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">{t('connect.marketplaceTitle')}</h2>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder={t('connect.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                aria-label="Search for projects"
                            />
                        </div>
                        {microGigs.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {microGigs.map(project => <ProjectCard key={project.id} project={project} />)}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700">{t('connect.noGigsFound')}</h3>
                                <p className="text-sm text-gray-500 mt-1">{t('connect.noGigsHint')}</p>
                            </div>
                        )}
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">{t('connect.shadowTitle')}</h2>
                        {shadowProjects.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {shadowProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                            </div>
                        ) : (
                             <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700">{t('connect.noShadowFound')}</h3>
                                <p className="text-sm text-gray-500 mt-1">{t('connect.noShadowHint')}</p>
                            </div>
                        )}
                    </section>
                    
                    <section className="mt-12">
                         <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">{t('connect.matchmakingTitle')}</h2>
                         <div className="relative">
                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                {USERS.map(user => <ProfileCard key={user.id} user={user} />)}
                            </div>
                         </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ConnectPage;