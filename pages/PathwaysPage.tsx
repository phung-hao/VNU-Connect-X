import React from 'react';
import { PATHWAYS } from '../constants';
import type { Pathway, Level } from '../types';
import { CheckCircleIcon } from '../components/icons';
import { useTranslation } from '../lib/i18n';

const LevelNode: React.FC<{ level: Level, isLast: boolean }> = ({ level, isLast }) => (
    <div className="relative pl-8">
        {!isLast && <div className="absolute left-[10px] top-5 h-full w-0.5 bg-gray-200"></div>}
        <div className="flex items-center space-x-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${level.completed ? 'bg-primary' : 'bg-gray-300'} ring-4 ring-white`}>
                {level.completed && <CheckCircleIcon className="w-4 h-4 text-white" />}
            </div>
            <div>
                <h4 className={`font-semibold ${level.completed ? 'text-gray-800' : 'text-gray-500'}`}>{level.title}</h4>
                <p className="text-sm text-gray-500">{level.description}</p>
            </div>
        </div>
    </div>
);

const PathwayCard: React.FC<{ pathway: Pathway }> = ({ pathway }) => {
    const { t } = useTranslation();
    const completedLevels = pathway.levels.filter(l => l.completed).length;
    const totalLevels = pathway.levels.length;
    const progress = Math.round((completedLevels / totalLevels) * 100);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{pathway.title}</h3>
                        <p className="text-sm font-semibold text-accent-yellow">{t('pathways.xpEarned', { xp: pathway.xp })}</p>
                    </div>
                    <div className="relative w-16 h-16">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                className="text-gray-200"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="text-primary"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${progress}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">{progress}%</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {pathway.levels.map((level, index) => (
                        <LevelNode key={index} level={level} isLast={index === pathway.levels.length - 1} />
                    ))}
                </div>
            </div>
            <div className="bg-gray-50 p-4">
                <button className="w-full text-center font-semibold text-primary hover:text-primary-dark transition-colors">{t('pathways.continue')}</button>
            </div>
        </div>
    );
};


const PathwaysPage: React.FC = () => {
    const { t } = useTranslation();
    return (
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

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {PATHWAYS.map(pathway => (
                    <PathwayCard key={pathway.id} pathway={pathway} />
                ))}
            </div>
        </div>
    );
};

export default PathwaysPage;