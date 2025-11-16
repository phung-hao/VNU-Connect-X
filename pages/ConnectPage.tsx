import React, { useState, useMemo, useRef } from 'react';
import { PROJECTS, CURRENT_USER, MENTORS, USERS, ALUMNI, COMPANIES } from '../constants';
import { Project, Mentor, User, Alumni, Company } from '../types';
import { useTranslation } from '../lib/i18n';
import { ClockIcon, StarIcon, CheckCircleIcon, UploadIcon, XIcon, CalendarIcon, TargetIcon, UserIcon, BriefcaseIcon, Avatar, MessageSquareIcon, UsersIcon, AcademicCapIcon } from '../components/icons';

// =================================================================================
// Shared Components
// =================================================================================

const LogoImage: React.FC<{ src?: string; alt: string; fallback: React.ReactNode }> = ({ src, alt, fallback }) => {
    const [hasError, setHasError] = useState(false);
    if (hasError || !src) return <>{fallback}</>;
    return <img src={src} alt={alt} className="w-full h-full object-contain" onError={() => setHasError(true)} />;
};

const PosterInfo: React.FC<{ project: Project; size: 'sm' | 'lg' }> = ({ project, size }) => {
  const isCompany = project.posterType === 'Company';
  const sizeClasses = { sm: { wrapper: 'w-16 h-16', icon: 'w-8 h-8' }, lg: { wrapper: 'w-20 h-20', icon: 'w-10 h-10' } };
  const currentSize = sizeClasses[size];
  const altText = isCompany ? `Logo Công ty ${project.postedBy}` : `Avatar of ${project.postedBy}`;
  const tooltipText = isCompany ? `Official Logo – ${project.postedBy}` : project.postedBy;
  const fallbackIcon = isCompany ? <BriefcaseIcon className={`${currentSize.icon} text-gray-400`} /> : <UserIcon className={`${currentSize.icon} text-gray-400`} />;
  const isPerson = project.posterType !== 'Company';

  if (isPerson) {
      const gender = project.postedBy.startsWith('Ms.') || project.postedBy.startsWith('Mrs.') ? 'female' : 'male';
      return (
          <div title={tooltipText} className={`flex-shrink-0 ${currentSize.wrapper} rounded-lg border border-gray-200 bg-white p-1 shadow-sm flex items-center justify-center overflow-hidden`}>
              <Avatar src={project.posterAvatar} alt={altText} gender={gender} className="w-full h-full object-cover rounded-md" />
          </div>
      );
  }

  return (
    <div title={tooltipText} className={`flex-shrink-0 ${currentSize.wrapper} rounded-lg border border-gray-200 bg-white p-1 shadow-sm flex items-center justify-center overflow-hidden`}>
      <LogoImage src={project.posterAvatar} alt={altText} fallback={fallbackIcon} />
    </div>
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <button onClick={onClick} className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-primary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>{t('connect.back')}</span>
        </button>
    );
}

// =================================================================================
// Micro-Projects View Components
// =================================================================================

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
                <div className="p-6 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                        <p className="text-gray-500">{t('connect.postedBy')} <span className="font-semibold text-primary">{project.postedBy}</span></p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon className="w-8 h-8" /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 md:p-8 grid md:grid-cols-3 gap-8">
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

const MicroProjectsView: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState({ type: 'All', difficulty: 'All', domain: 'All', status: 'All' });
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => setFilters(prev => ({ ...prev, [filterType]: value }));

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) || p.postedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = filters.type === 'All' || p.type === filters.type;
      const difficultyMatch = filters.difficulty === 'All' || p.difficulty === filters.difficulty;
      const domainMatch = filters.domain === 'All' || p.domain === filters.domain;
      const statusMatch = filters.status === 'All' || p.status === filters.status;
      return searchMatch && typeMatch && difficultyMatch && domainMatch && statusMatch;
    });
  }, [searchQuery, filters]);
  
  const recommendedProjects = useMemo(() => PROJECTS.filter(p => p.status === 'Open' && p.skills.some(skill => CURRENT_USER.skills.includes(skill))).slice(0, 3), []);

  const FilterGroup: React.FC<{title: string, options: string[], selected: string, onChange: (value: string) => void}> = ({title, options, selected, onChange}) => (
    <div>
        <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {options.map(opt => (
                <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selected === opt ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{t(opt)}</button>
            ))}
        </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <aside className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-28 space-y-6">
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
            <FilterGroup title={t('connect.projectType')} options={['All', 'Micro-Project', 'Shadow Project']} selected={filters.type} onChange={(v) => handleFilterChange('type', v)} />
            <FilterGroup title={t('connect.difficulty')} options={['All', 'Beginner', 'Intermediate', 'Advanced']} selected={filters.difficulty} onChange={(v) => handleFilterChange('difficulty', v)} />
            <FilterGroup title={t('connect.domain')} options={['All', 'Tech', 'Marketing', 'Design', 'Business']} selected={filters.domain} onChange={(v) => handleFilterChange('domain', v)} />
          </div>
        </aside>

        <main className="lg:w-3/4">
          <div className="mb-8">
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('connect.searchPlaceholder')} className="w-full" />
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
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
};

// =================================================================================
// Smart Matching View Components
// =================================================================================

const StarRating: React.FC<{ rating: number, className?: string }> = ({ rating, className }) => {
    const roundedRating = Math.round(rating);
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < roundedRating} className={`w-5 h-5 ${i < roundedRating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
            <span className="text-gray-600 text-sm ml-2 font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

const BookingModal: React.FC<{ mentor: Mentor | null, onClose: () => void }> = ({ mentor, onClose }) => {
    const { t } = useTranslation();
    if (!mentor) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XIcon className="w-6 h-6" /></button>
                <h2 className="text-2xl font-bold mb-2">{t('connect.mentors.bookingTitle', { name: mentor.name })}</h2>
                <p className="text-gray-600 mb-6">{t('connect.mentors.bookingDesc')}</p>
                <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('connect.mentors.date')}</label>
                            <input type="date" className="w-full" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('connect.mentors.time')}</label>
                            <input type="time" className="w-full" required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('connect.mentors.notes')}</label>
                        <textarea rows={3} placeholder={t('connect.mentors.notesPlaceholder')} className="w-full"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">{t('connect.mentors.sendRequest')}</button>
                </form>
            </div>
        </div>
    );
};

const MentorMatchCard: React.FC<{ mentor: Mentor, onBook: (mentor: Mentor) => void }> = ({ mentor, onBook }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
            <Avatar src={mentor.avatar} alt={mentor.name} gender={mentor.gender} className="w-24 h-24 rounded-full mb-4 border-4 border-primary/50" />
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-primary font-semibold">{mentor.title}</p>
            <p className="text-sm text-gray-500">{mentor.company}</p>
            <StarRating rating={mentor.averageRating} className="my-3" />
            <div className="flex flex-wrap justify-center gap-2">
                {mentor.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{skill}</span>
                ))}
            </div>
            <p className="text-sm text-gray-600 my-4 flex-grow">{mentor.bio}</p>
            <div className="flex space-x-2 mt-auto w-full">
                <button onClick={() => onBook(mentor)} className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"><CalendarIcon className="w-5 h-5" /><span>{t('connect.mentors.requestSession')}</span></button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"><MessageSquareIcon className="w-5 h-5" /><span>{t('connect.mentors.chat')}</span></button>
            </div>
        </div>
    );
};

const MentorMatchingView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedField, setSelectedField] = useState('All Fields');
    const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);

    const filteredMentors = useMemo(() => MENTORS.filter(m => {
        const searchMatch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.company.toLowerCase().includes(searchQuery.toLowerCase()) || m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const fieldMatch = selectedField === 'All Fields' || m.field === selectedField;
        return searchMatch && fieldMatch;
    }), [searchQuery, selectedField]);

    const uniqueFields = ['All Fields', ...Array.from(new Set(MENTORS.map(m => m.field)))];

    return (
        <section>
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold mb-6 text-center">{t('connect.smartMatching.mentors.title')}</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('connect.mentors.searchPlaceholder')} className="flex-grow" />
                <select value={selectedField} onChange={e => setSelectedField(e.target.value)} className="bg-white">
                    {uniqueFields.map(field => <option key={field} value={field}>{field === 'All Fields' ? t('connect.mentors.allFields') : field}</option>)}
                </select>
            </div>

            {filteredMentors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMentors.map(mentor => <MentorMatchCard key={mentor.id} mentor={mentor} onBook={setBookingMentor} />)}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold">{t('connect.mentors.noMentorsFound')}</h3>
                    <p className="text-gray-600 mt-2">{t('connect.mentors.noMentorsHint')}</p>
                </div>
            )}
            <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} />
        </section>
    );
};

const PeerCard: React.FC<{ user: User }> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Avatar src={user.avatar} alt={user.name} gender={user.gender} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200" />
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.major}</p>
            <p className="text-sm font-semibold text-primary my-3">Seeking collaborators for:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {user.interests?.slice(0,2).map(interest => (
                    <span key={interest} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{interest}</span>
                ))}
            </div>
            <button className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark">{t('connect.smartMatching.peers.connectNow')}</button>
        </div>
    );
}

const PeerMatchingView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useTranslation();
    const peers = USERS.filter(u => u.id !== CURRENT_USER.id); // Exclude current user
    return (
        <section>
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold mb-2 text-center">{t('connect.smartMatching.peers.title')}</h2>
            <p className="text-center text-gray-600 mb-8">{t('connect.smartMatching.peers.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {peers.map(peer => <PeerCard key={peer.id} user={peer} />)}
            </div>
        </section>
    );
}

const AlumniCard: React.FC<{ alumni: Alumni }> = ({ alumni }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <Avatar src={alumni.avatar} alt={alumni.name} gender={alumni.gender} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-200" />
            <h3 className="font-bold text-lg">{alumni.name}</h3>
            <p className="text-sm text-gray-500">{alumni.company}</p>
            <p className="text-sm text-primary font-semibold">{alumni.industry}</p>
            <div className="flex flex-wrap justify-center gap-2 my-4">
                {alumni.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{skill}</span>
                ))}
            </div>
            <p className="text-sm text-gray-600 flex-grow mb-4">{alumni.bio}</p>
            <button className="w-full mt-auto bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark">{t('connect.smartMatching.alumni.askForAdvice')}</button>
        </div>
    );
};

const AlumniMatchingView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useTranslation();
    return (
        <section>
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold mb-2 text-center">{t('connect.smartMatching.alumni.title')}</h2>
            <p className="text-center text-gray-600 mb-8">{t('connect.smartMatching.alumni.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALUMNI.map(alumnus => <AlumniCard key={alumnus.id} alumni={alumnus} />)}
            </div>
        </section>
    );
};

const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="h-20 w-20 flex items-center justify-center mb-4">
                 <img src={company.logo} alt={`${company.name} logo`} className="max-h-full max-w-full object-contain"/>
            </div>
            <h3 className="font-bold text-lg">{company.name}</h3>
            <p className="text-sm text-gray-500 font-semibold my-2">{t('connect.smartMatching.companies.roles')}: {company.roles.join(', ')}</p>
             <p className="text-sm bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full mb-4">
                {t('connect.smartMatching.companies.openGigs', { count: company.openGigs })}
            </p>
            <p className="text-sm text-gray-600 flex-grow mb-4">{company.bio}</p>
            <button className="w-full mt-auto bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark">{t('connect.smartMatching.companies.connect')}</button>
        </div>
    );
};

const CompanyMatchingView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useTranslation();
    return (
        <section>
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold mb-2 text-center">{t('connect.smartMatching.companies.title')}</h2>
            <p className="text-center text-gray-600 mb-8">{t('connect.smartMatching.companies.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COMPANIES.map(company => <CompanyCard key={company.id} company={company} />)}
            </div>
        </section>
    );
}

// =================================================================================
// Main Connect Page
// =================================================================================

const HubCard: React.FC<{ title: string, description: string, icon: React.ReactNode, onClick: () => void }> = ({ title, description, icon, onClick }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 flex flex-col p-6 text-center items-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-2 flex-grow">{description}</p>
            <button onClick={onClick} className="mt-6 bg-primary/10 text-primary font-bold py-2 px-6 rounded-full hover:bg-primary/20 transition-colors">{t('connect.smartMatching.viewDetails')}</button>
        </div>
    );
};

const SmartMatchingHubView: React.FC<{ onCardClick: (view: string) => void }> = ({ onCardClick }) => {
    const { t } = useTranslation();
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-8">{t('connect.smartMatching.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <HubCard 
                    title={t('connect.smartMatching.mentors.title')}
                    description={t('connect.smartMatching.mentors.desc')}
                    icon={<UserIcon className="w-10 h-10" />}
                    onClick={() => onCardClick('mentors')}
                />
                <HubCard 
                    title={t('connect.smartMatching.peers.title')}
                    description={t('connect.smartMatching.peers.desc')}
                    icon={<UsersIcon className="w-10 h-10" />}
                    onClick={() => onCardClick('peers')}
                />
                <HubCard 
                    title={t('connect.smartMatching.alumni.title')}
                    description={t('connect.smartMatching.alumni.desc')}
                    icon={<AcademicCapIcon className="w-10 h-10" />}
                    onClick={() => onCardClick('alumni')}
                />
                <HubCard 
                    title={t('connect.smartMatching.companies.title')}
                    description={t('connect.smartMatching.companies.desc')}
                    icon={<BriefcaseIcon className="w-10 h-10" />}
                    onClick={() => onCardClick('companies')}
                />
            </div>
        </div>
    );
};

const ConnectPage: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('projects');
    const [activeView, setActiveView] = useState<string | null>(null);

    const renderActiveView = () => {
        switch (activeView) {
            case 'mentors': return <MentorMatchingView onBack={() => setActiveView(null)} />;
            case 'peers': return <PeerMatchingView onBack={() => setActiveView(null)} />;
            case 'alumni': return <AlumniMatchingView onBack={() => setActiveView(null)} />;
            case 'companies': return <CompanyMatchingView onBack={() => setActiveView(null)} />;
            default: return null;
        }
    };
    
    if (activeView) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderActiveView()}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t('connect.title')}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{t('connect.subtitle')}</p>
            </div>

            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
                    >
                        {t('connect.tabs.microGigs')}
                    </button>
                    <button
                        onClick={() => setActiveTab('matching')}
                        className={`${activeTab === 'matching' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
                    >
                        {t('connect.tabs.smartMatching')}
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'projects' ? <MicroProjectsView /> : <SmartMatchingHubView onCardClick={setActiveView} />}
        </div>
    );
};

export default ConnectPage;