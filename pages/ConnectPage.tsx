import React, { useState, useMemo, useRef } from 'react';
import { PROJECTS, CURRENT_USER } from '../constants';
import { Project } from '../types';
import { useTranslation } from '../lib/i18n';
import { ClockIcon, StarIcon, CheckCircleIcon, UploadIcon, XIcon, CalendarIcon, TargetIcon, UserIcon, BriefcaseIcon } from '../components/icons';

const LogoImage: React.FC<{ src?: string; alt: string; fallback: React.ReactNode }> = ({ src, alt, fallback }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return <>{fallback}</>;
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onError={() => setHasError(true)}
        />
    );
};


const PosterInfo: React.FC<{ project: Project; size: 'sm' | 'lg' }> = ({ project, size }) => {
  const isCompany = project.posterType === 'Company';

  const sizeClasses = {
    sm: { wrapper: 'w-16 h-16', icon: 'w-8 h-8' },
    lg: { wrapper: 'w-20 h-20', icon: 'w-10 h-10' }
  };
  const currentSize = sizeClasses[size];

  const altText = isCompany ? `Logo Công ty ${project.postedBy}` : `Avatar of ${project.postedBy}`;
  const tooltipText = isCompany ? `Official Logo – ${project.postedBy}` : project.postedBy;
  
  const fallbackIcon = isCompany 
    ? <BriefcaseIcon className={`${currentSize.icon} text-gray-400`} />
    : <UserIcon className={`${currentSize.icon} text-gray-400`} />;

  return (
    <div title={tooltipText} className={`flex-shrink-0 ${currentSize.wrapper} rounded-lg border border-gray-200 bg-white p-1 shadow-sm flex items-center justify-center overflow-hidden`}>
      <LogoImage src={project.posterAvatar} alt={altText} fallback={fallbackIcon} />
    </div>
  );
};

const StatusIndicator: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const { t } = useTranslation();
  const statusConfig = {
    Open: { text: t('connect.status.open'), color: 'bg-green-500', textColor: 'text-green-800', bgColor: 'bg-green-100' },
    'In Progress': { text: t('connect.status.inProgress'), color: 'bg-blue-500', textColor: 'text-blue-800', bgColor: 'bg-blue-100' },
    Completed: { text: t('connect.status.completed'), color: 'bg-gray-500', textColor: 'text-gray-800', bgColor: 'bg-gray-100' },
  };
  const config = statusConfig[status];

  return (
    <div className={`flex items-center space-x-2 text-xs font-bold px-2 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span>{config.text}</span>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onViewDetails: (project: Project) => void }> = ({ project, onViewDetails }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <PosterInfo project={project} size="sm" />
              <div>
                <p className="font-bold text-gray-800 leading-tight">{project.postedBy}</p>
                <p className="text-xs text-gray-500">{project.posterType}</p>
              </div>
            </div>
            <StatusIndicator status={project.status} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0,3).map((skill) => (
            <span key={skill} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5"><ClockIcon className="w-4 h-4" /><span>{project.duration}</span></div>
            <div className="flex items-center space-x-1.5"><StarIcon className="w-4 h-4" /><span>{project.reward}</span></div>
        </div>
        <button onClick={() => onViewDetails(project)} className="bg-primary text-white font-semibold py-2 px-5 rounded-full hover:bg-primary-dark transition-colors w-full sm:w-auto">
          {t('connect.viewDetails')}
        </button>
      </div>
    </div>
  );
};

const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const { t } = useTranslation();
    const [isApplying, setIsApplying] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                        <p className="text-gray-500">{t('connect.postedBy')} <span className="font-semibold text-primary">{project.postedBy}</span></p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon className="w-8 h-8" /></button>
                </div>

                {/* Main Content */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 grid md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-3">{t('connect.description')}</h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
                        
                        <h3 className="text-xl font-bold mb-3">{t('connect.objectives')}</h3>
                        <ul className="list-none space-y-2 mb-6">
                           {project.objectives?.map((obj, i) => (
                             <li key={i} className="flex items-start space-x-2 text-gray-700"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>{obj}</span></li>
                           ))}
                        </ul>
                        
                        <h3 className="text-xl font-bold mb-3">{t('connect.deliverables')}</h3>
                        <ul className="list-none space-y-2">
                           {project.deliverables?.map((del, i) => (
                             <li key={i} className="flex items-start space-x-2 text-gray-700"><TargetIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{del}</span></li>
                           ))}
                        </ul>
                    </div>
                    {/* Right Column */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-bold mb-3">{t('connect.postedBy')}</h4>
                             <div className="flex items-start space-x-4 text-left">
                                <PosterInfo project={project} size="lg" />
                                <div>
                                    <p className="font-semibold">{project.postedBy}</p>
                                    <p className="text-sm text-gray-500 mb-2">{project.posterType}</p>
                                    <p className="text-sm text-gray-600">{project.posterBio}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                             <div className="flex items-center justify-between"><span className="font-bold text-gray-600">{t('connect.status.title')}</span><StatusIndicator status={project.status} /></div>
                             <div className="flex items-center justify-between"><span className="font-bold text-gray-600">{t('connect.reward')}</span><div className="flex items-center space-x-1 font-semibold"><StarIcon className="w-4 h-4 text-yellow-500" /><span>{project.reward}</span></div></div>
                             <div className="flex items-center justify-between"><span className="font-bold text-gray-600">{t('connect.deadline')}</span><div className="flex items-center space-x-1 font-semibold"><CalendarIcon className="w-4 h-4 text-red-500" /><span>{project.deadline}</span></div></div>
                        </div>
                         {isApplying ? (
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                               <h4 className="font-bold text-center">{t('connect.apply')}</h4>
                               <textarea rows={4} placeholder={t('connect.reasonForJoining')} className="w-full text-sm"></textarea>
                               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg" />
                               <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center space-x-2 w-full p-2 border-2 border-dashed rounded-lg hover:bg-gray-100">
                                   <UploadIcon className="w-5 h-5 text-gray-500" />
                                   <span className="text-sm text-gray-700 truncate">{fileName || t('connect.uploadPortfolio')}</span>
                               </button>
                               <button onClick={onClose} className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark">{t('connect.submitApplication')}</button>
                            </div>
                        ) : (
                             <button onClick={() => setIsApplying(true)} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors" disabled={project.status !== 'Open'}>
                                {project.status === 'Open' ? t('connect.joinNow') : t(`connect.status.${project.status.toLowerCase().replace(' ','')}`)}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConnectPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState({
    type: 'All',
    difficulty: 'All',
    domain: 'All',
    status: 'All',
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
      const statusMatch = filters.status === 'All' || p.status === filters.status;

      return searchMatch && typeMatch && difficultyMatch && domainMatch && statusMatch;
    });
  }, [searchQuery, filters]);
  
  const recommendedProjects = useMemo(() => {
    return PROJECTS.filter(p => 
        p.status === 'Open' &&
        p.skills.some(skill => CURRENT_USER.skills.includes(skill))
    ).slice(0, 3);
  }, []);

  const FilterGroup: React.FC<{title: string, options: string[], selected: string, onChange: (value: string) => void}> = ({title, options, selected, onChange}) => (
    <div>
        <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {options.map(opt => (
                <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selected === opt ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    {opt}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-28 space-y-6">
                {/* AI Matchmaking Panel */}
                <div>
                    <h2 className="text-xl font-bold mb-3">{t('connect.matchmakingTitle')}</h2>
                    <div className="space-y-3">
                        {recommendedProjects.map(p => (
                             <div key={p.id} onClick={() => setSelectedProject(p)} className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 cursor-pointer">
                                <p className="font-bold text-sm text-primary">{p.title}</p>
                                <p className="text-xs text-gray-600">{p.postedBy}</p>
                            </div>
                        ))}
                    </div>
                </div>
              <div className="border-t border-gray-200" />
              <h2 className="text-xl font-bold">{t('connect.filters')}</h2>
              <FilterGroup title={t('connect.status.title')} options={['All', 'Open', 'In Progress', 'Completed']} selected={filters.status} onChange={(v) => handleFilterChange('status', v)} />
              <FilterGroup title={t('connect.projectType')} options={['All', 'Micro-Gig', 'Shadow Project']} selected={filters.type} onChange={(v) => handleFilterChange('type', v)} />
              <FilterGroup title={t('connect.difficulty')} options={['All', 'Beginner', 'Intermediate', 'Advanced']} selected={filters.difficulty} onChange={(v) => handleFilterChange('difficulty', v)} />
              <FilterGroup title={t('connect.domain')} options={['All', 'Tech', 'Marketing', 'Design', 'Business']} selected={filters.domain} onChange={(v) => handleFilterChange('domain', v)} />
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
                className="w-full"
              />
            </div>
            
            {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map(p => <ProjectCard key={p.id} project={p} onViewDetails={setSelectedProject} />)}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold">{t('connect.noProjectsFound')}</h3>
                    <p className="text-gray-600 mt-2">{t('connect.noProjectsHint')}</p>
                </div>
            )}
          </main>
        </div>
      </div>
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
};

export default ConnectPage;