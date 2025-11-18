import React, { useState, useRef } from 'react';
import type { Pathway, Mission, PathwayCategory, User, MissionStatus } from '../types';
import { CheckCircleIcon, LockIcon, MessageSquareIcon, TargetIcon, UserIcon, XIcon, BrainIcon, BriefcaseIcon, StarIcon, ClockIcon, CalendarIcon, UploadIcon, LinkIcon, Avatar } from '../components/icons';
import { useTranslation } from '../lib/i18n';
import Confetti from '../components/Confetti';

const MissionTypeIcon: React.FC<{ type: Mission['type'], className?: string }> = ({ type, className = "w-5 h-5" }) => {
    const icons = {
        connect: <UserIcon className={className} />,
        project: <BriefcaseIcon className={className} />,
        learn: <BrainIcon className={className} />,
        reflect: <MessageSquareIcon className={className} />,
    };
    return icons[type];
};

const MissionStep: React.FC<{
    mission: Mission;
    isCurrent: boolean;
    onViewDetails: () => void;
}> = ({ mission, isCurrent, onViewDetails }) => {
    const { t } = useTranslation();
    const statusStyles = {
        locked: { contentBg: 'bg-gray-50', text: 'text-gray-400', iconWrapper: 'bg-gray-300', icon: 'text-white' },
        unlocked: { contentBg: 'bg-white shadow-md hover:shadow-lg', text: 'text-gray-800', iconWrapper: 'bg-primary/20 ring-4 ring-primary/10', icon: 'text-primary' },
        completed: { contentBg: 'bg-green-50/70 hover:bg-green-100/80', text: 'text-gray-500 line-through', iconWrapper: 'bg-green-500', icon: 'text-white' },
    };
    
    const statusKey = mission.status === 'locked' ? 'locked' : mission.status === 'completed' ? 'completed' : 'unlocked';
    const currentStyle = statusStyles[statusKey];

    return (
        <div className="timeline-step">
             <div className={`timeline-icon-wrapper ${currentStyle.iconWrapper}`}>
                {mission.status === 'completed' ? <CheckCircleIcon className={`w-6 h-6 ${currentStyle.icon}`} /> :
                 mission.status === 'locked' ? <LockIcon className={`w-5 h-5 ${currentStyle.icon}`} /> :
                 <MissionTypeIcon type={mission.type} className={`w-5 h-5 ${currentStyle.icon}`} />}
            </div>
            <div 
                onClick={onViewDetails}
                className={`p-4 rounded-lg ml-4 transition-all duration-300 ${mission.status !== 'locked' ? 'cursor-pointer' : 'cursor-default'} ${currentStyle.contentBg}`}
            >
                 <div className="flex items-start justify-between">
                    <div>
                        <h4 className={`font-semibold ${currentStyle.text}`}>{mission.title}</h4>
                        <p className={`text-sm ${currentStyle.text}`}>{mission.description.substring(0, 75)}...</p>
                    </div>
                    <div className="flex-shrink-0 text-right ml-2">
                        <span className="text-sm font-bold text-yellow-600">{mission.xp} XP</span>
                        {isCurrent && (
                            <div className="mt-2">
                                <span className="bg-primary text-white font-semibold py-1 px-3 rounded-full text-xs">
                                    {t('pathways.startButton')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PathwayJourney: React.FC<{ 
    pathway: Pathway;
    onViewMission: (pathwayId: number, missionIndex: number) => void;
}> = ({ pathway, onViewMission }) => {
    const completedMissions = pathway.missions.filter(m => m.status === 'completed').length;
    const currentMissionIndex = pathway.missions.findIndex(m => m.status === 'unlocked' || m.status === 'in-progress');

    return (
        <div className="timeline">
            {pathway.missions.map((mission, index) => (
                <div key={index} className="relative">
                    <div className={`timeline-step-line ${index < completedMissions ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <MissionStep
                        mission={mission}
                        isCurrent={index === currentMissionIndex}
                        onViewDetails={() => mission.status !== 'locked' && onViewMission(pathway.id, index)}
                    />
                </div>
            ))}
        </div>
    );
};

const MissionDetailModal: React.FC<{
    missionInfo: { mission: Mission; pathwayId: number, missionIndex: number };
    onClose: () => void;
    onSubmit: (submission: { content: string, file?: File, link?: string }) => void;
}> = ({ missionInfo, onClose, onSubmit }) => {
    const { mission } = missionInfo;
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('details');
    
    const [reflection, setReflection] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        onSubmit({ content: reflection, file: file || undefined, link });
    };
    
    const isSubmittable = mission.status === 'unlocked' || mission.status === 'in-progress';
    const isCompleted = mission.status === 'completed' || mission.status === 'submitted';

    const statusInfo: {[key in MissionStatus]: {text: string, bg: string}} = {
        locked: { text: t('pathways.missionDetails.status.locked'), bg: 'bg-gray-400' },
        unlocked: { text: t('pathways.missionDetails.status.unlocked'), bg: 'bg-primary' },
        'in-progress': { text: t('pathways.missionDetails.status.unlocked'), bg: 'bg-primary' },
        submitted: { text: t('pathways.missionDetails.status.submitted'), bg: 'bg-yellow-500' },
        completed: { text: t('pathways.missionDetails.status.completed'), bg: 'bg-green-500' },
    };

    const difficultyColors = {
        Beginner: 'bg-green-100 text-green-800',
        Intermediate: 'bg-yellow-100 text-yellow-800',
        Advanced: 'bg-red-100 text-red-800',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full h-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-start">
                    <div>
                        <div className={`text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 ${statusInfo[mission.status].bg}`}>
                            {statusInfo[mission.status].text}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{mission.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="w-8 h-8" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-grow overflow-y-auto p-6">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg"><div className="font-bold text-gray-500 mb-1">{t('pathways.missionDetails.reward')}</div><div className="flex items-center space-x-1 font-semibold text-yellow-600"><StarIcon className="w-4 h-4"/><span>{mission.xp} XP</span></div></div>
                        <div className="bg-gray-50 p-3 rounded-lg"><div className="font-bold text-gray-500 mb-1">{t('pathways.missionDetails.skill')}</div><div className="flex items-center space-x-1 font-semibold text-primary"><TargetIcon className="w-4 h-4"/><span>{mission.skill}</span></div></div>
                        <div className="bg-gray-50 p-3 rounded-lg"><div className="font-bold text-gray-500 mb-1">{t('pathways.missionDetails.difficulty')}</div><div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${difficultyColors[mission.difficulty]}`}>{mission.difficulty}</div></div>
                        <div className="bg-gray-50 p-3 rounded-lg"><div className="font-bold text-gray-500 mb-1">{t('pathways.missionDetails.duration')}</div><div className="flex items-center space-x-1 font-semibold"><ClockIcon className="w-4 h-4"/><span>{mission.duration}</span></div></div>
                    </div>
                    {mission.deadline && <div className="flex items-center space-x-2 text-sm font-semibold text-red-600 bg-red-50 p-2 rounded-md mb-6"><CalendarIcon className="w-4 h-4"/><span>{t('pathways.missionDetails.deadline')}: {mission.deadline}</span></div>}

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('details')} className={`${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base`}>{t('pathways.missionDetails.tabs.details')}</button>
                            <button onClick={() => setActiveTab('submission')} className={`${activeTab === 'submission' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base`}>{t('pathways.missionDetails.tabs.submission')}</button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'details' && (
                            <div className="prose max-w-none text-gray-700">
                                <p>{mission.description}</p>
                            </div>
                        )}
                        {activeTab === 'submission' && (
                            <div>
                                {isSubmittable && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold">{t('pathways.missionDetails.submitYourWork')}</h3>
                                        {mission.submissionType.includes('reflection') && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('pathways.missionDetails.reflection')}</label>
                                                <textarea value={reflection} onChange={e => setReflection(e.target.value)} rows={5} className="w-full" placeholder={t('pathways.reflectionPlaceholder')} />
                                            </div>
                                        )}
                                        {mission.submissionType.includes('file') && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('pathways.missionDetails.uploadFile')}</label>
                                                <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="hidden"/>
                                                <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-2 w-full justify-center p-4 border-2 border-dashed rounded-lg hover:bg-gray-50">
                                                    <UploadIcon className="w-6 h-6 text-gray-500" />
                                                    <span className="text-gray-700">{file ? file.name : 'Click to select a file'}</span>
                                                </button>
                                            </div>
                                        )}
                                        {mission.submissionType.includes('link') && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('pathways.missionDetails.attachLink')}</label>
                                                <div className="relative">
                                                    <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                                    <input type="text" value={link} onChange={e => setLink(e.target.value)} className="w-full pl-10" placeholder="https://github.com/your-repo" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {isCompleted && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3">{t('pathways.missionDetails.viewSubmission')}</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                                                {mission.submissionContent && <p><strong className="font-semibold">Reflection:</strong> {mission.submissionContent}</p>}
                                                {mission.submissionFile && <p><strong className="font-semibold">File:</strong> <span className="text-primary underline">{mission.submissionFile}</span></p>}
                                                {mission.submissionLink && <p><strong className="font-semibold">Link:</strong> <a href={mission.submissionLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">{mission.submissionLink}</a></p>}
                                            </div>
                                        </div>
                                         <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3">{t('pathways.missionDetails.mentorFeedback')}</h3>
                                            {mission.mentorFeedback && mission.mentorFeedback.length > 0 ? (
                                                <div className="space-y-4">
                                                    {mission.mentorFeedback.map((fb, idx) => {
                                                        const gender = fb.mentorName.startsWith('Dr.') ? 'male' : 'female';
                                                        return (
                                                        <div key={idx} className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                                                            <Avatar gender={gender} src={fb.mentorAvatar} alt={fb.mentorName} className="w-10 h-10 rounded-full flex-shrink-0" />
                                                            <div>
                                                                <div className="flex items-baseline space-x-2">
                                                                    <p className="font-bold">{fb.mentorName}</p>
                                                                    <p className="text-xs text-gray-500">{fb.timestamp}</p>
                                                                </div>
                                                                <p className="text-gray-700">{fb.comment}</p>
                                                            </div>
                                                        </div>
                                                    )})}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic">{t('pathways.missionDetails.noFeedback')}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                {isSubmittable && (
                    <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
                        <button onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100">{t('pathways.missionDetails.cancelButton')}</button>
                        <button className="bg-gray-200 text-gray-500 font-bold py-2 px-6 rounded-lg cursor-not-allowed">{t('pathways.missionDetails.saveDraftButton')}</button>
                        <button onClick={handleSubmit} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark">{t('pathways.missionDetails.submitButton')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};


const CelebrationModal: React.FC<{ missionInfo: { mission: Mission, newXp: number, oldLevel: number, newLevel: number } | null, onClose: () => void }> = ({ missionInfo, onClose }) => {
    const { t } = useTranslation();
    if (!missionInfo) return null;

    const { mission, oldLevel, newLevel } = missionInfo;
    const didLevelUp = newLevel > oldLevel;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <Confetti />
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon className="w-6 h-6" />
                </button>
                <div className="text-6xl mb-4">{didLevelUp ? '🚀' : '🎉'}</div>
                <h2 className="text-2xl font-bold text-gray-900">{didLevelUp ? t('pathways.levelUp') : t('pathways.greatJob')}</h2>
                <p className="text-gray-600 mt-2 mb-4">
                    {t('pathways.completionMessage')}
                </p>
                <div className="bg-yellow-100 text-yellow-800 text-xl font-bold py-3 px-6 rounded-full inline-block mb-4">
                    {t('pathways.xpEarned', { xp: mission.xp })}
                </div>
                 {didLevelUp && (
                    <div className="bg-primary/10 text-primary text-lg font-bold py-2 px-4 rounded-full">
                       {t('pathways.level', { level: oldLevel })} → {t('pathways.level', { level: newLevel })}
                    </div>
                )}
                {mission.badge && (
                    <div className="mt-6 pt-4 border-t">
                        <p className="font-bold text-gray-700 mb-2">{t('pathways.badgeUnlocked')}</p>
                        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                            <span className="text-3xl">{mission.badge.icon}</span>
                            <div className="text-left">
                                <p className="font-semibold">{mission.badge.title}</p>
                                <p className="text-xs text-gray-600">{mission.badge.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const UserProgressHeader: React.FC<{ user: User, getLevelFromXp: (xp: number) => any }> = ({ user, getLevelFromXp }) => {
    const { t } = useTranslation();
    const { level, name, progress, nextLevel } = getLevelFromXp(user.xp);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar gender={user.gender} src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">{level}</div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{t('pathways.level', {level})} - {name}</h2>
                        <p className="text-sm text-gray-600 font-semibold">{user.xp} XP</p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex justify-between text-sm font-semibold text-gray-600 mb-1">
                        <span>{t('pathways.level', {level})}</span>
                        <span>{nextLevel ? `${progress}% to Level ${nextLevel.level}` : 'Max Level'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface PathwaysPageProps {
  pathways: Pathway[];
  currentUser: User;
  onMissionSubmit: (
    pathwayId: number,
    missionIndex: number,
    submission: { content: string, file?: File, link?: string },
    showModal: (mission: Mission, newXp: number, oldLevel: number, newLevel: number) => void
  ) => void;
  getLevelFromXp: (xp: number) => any;
}

const PathwaysPage: React.FC<PathwaysPageProps> = ({ pathways, currentUser, onMissionSubmit, getLevelFromXp }) => {
    const { t } = useTranslation();
    const [completionInfo, setCompletionInfo] = useState<{ mission: Mission, newXp: number, oldLevel: number, newLevel: number } | null>(null);
    const [selectedMission, setSelectedMission] = useState<{pathwayId: number, missionIndex: number} | null>(null);

    const handleViewMission = (pathwayId: number, missionIndex: number) => {
        setSelectedMission({ pathwayId, missionIndex });
    };

    const handleMissionSubmit = (submission: { content: string, file?: File, link?: string }) => {
        if (selectedMission) {
            onMissionSubmit(
                selectedMission.pathwayId,
                selectedMission.missionIndex,
                submission,
                (mission, newXp, oldLevel, newLevel) => {
                     setCompletionInfo({ mission, newXp, oldLevel, newLevel });
                }
            );
            setSelectedMission(null); // Close detail modal on submit
        }
    };
    
    const currentMissionInfo = selectedMission ? {
        mission: pathways.find(p => p.id === selectedMission.pathwayId)?.missions[selectedMission.missionIndex],
        pathwayId: selectedMission.pathwayId,
        missionIndex: selectedMission.missionIndex
    } : null;
    
    const categoryStyles: { [key in PathwayCategory]: { icon: React.ReactNode, bg: string, text: string } } = {
        'Career': { icon: <BriefcaseIcon className="w-4 h-4" />, bg: 'bg-blue-100', text: 'text-blue-800' },
        'Communication': { icon: <MessageSquareIcon className="w-4 h-4" />, bg: 'bg-purple-100', text: 'text-purple-800' },
        'Critical Thinking': { icon: <TargetIcon className="w-4 h-4" />, bg: 'bg-green-100', text: 'text-green-800' },
        'Networking': { icon: <UserIcon className="w-4 h-4"/>, bg: 'bg-pink-100', text: 'text-pink-800' },
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        {t('pathways.title1')}
                        <span className="text-primary">{t('pathways.titleHighlight')}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        {t('pathways.subtitle')}
                    </p>
                </div>

                <UserProgressHeader user={currentUser} getLevelFromXp={getLevelFromXp} />

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {pathways.map(pathway => {
                         const completedMissions = pathway.missions.filter(m => m.status === 'completed').length;
                         const totalMissions = pathway.missions.length;
                         const progress = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;
                         const totalXp = pathway.missions.reduce((sum, m) => sum + m.xp, 0);
                         const catStyle = categoryStyles[pathway.category];

                        return (
                             <div key={pathway.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${catStyle.bg} ${catStyle.text}`}>
                                            {catStyle.icon} {pathway.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mt-2">{t(pathway.title)}</h3>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-lg font-bold text-yellow-600">{totalXp} XP</p>
                                        <p className="text-sm text-gray-500">{t('pathways.totalReward')}</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="text-sm font-semibold text-gray-600 mb-4">{t('pathways.missionsCompleted', { completed: completedMissions, total: totalMissions })}</p>

                               <PathwayJourney pathway={pathway} onViewMission={handleViewMission} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <CelebrationModal missionInfo={completionInfo} onClose={() => setCompletionInfo(null)} />
            {currentMissionInfo && currentMissionInfo.mission && (
                <MissionDetailModal
                    missionInfo={currentMissionInfo as { mission: Mission; pathwayId: number; missionIndex: number; }}
                    onClose={() => setSelectedMission(null)}
                    onSubmit={handleMissionSubmit}
                />
            )}
        </>
    );
};

export default PathwaysPage;