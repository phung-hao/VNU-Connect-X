import React, { useState, useMemo } from 'react';
import { MENTORS } from '../constants';
import type { Mentor } from '../types';
import { useTranslation } from '../lib/i18n';
import { CalendarIcon, MessageSquareIcon, XIcon, StarIcon } from '../components/icons';

const StarRating: React.FC<{ rating: number, className?: string }> = ({ rating, className }) => {
    const roundedRating = Math.round(rating);
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {[...Array(5)].map((_, i) => (
                <StarIcon
                    key={i}
                    filled={i < roundedRating}
                    className={`w-5 h-5 ${i < roundedRating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
            <span className="text-gray-600 text-sm ml-2 font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

const MentorCard: React.FC<{ mentor: Mentor, onBook: (mentor: Mentor) => void }> = ({ mentor, onBook }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
            <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 border-4 border-primary/50" />
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
                <button 
                    onClick={() => onBook(mentor)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <CalendarIcon className="w-5 h-5" />
                    <span>{t('mentors.requestSession')}</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    <MessageSquareIcon className="w-5 h-5" />
                    <span>{t('mentors.chat')}</span>
                </button>
            </div>
        </div>
    );
};

const BookingModal: React.FC<{ mentor: Mentor | null, onClose: () => void }> = ({ mentor, onClose }) => {
    const { t } = useTranslation();
    if (!mentor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-2">{t('mentors.bookingTitle', { name: mentor.name })}</h2>
                <p className="text-gray-600 mb-6">{t('mentors.bookingDesc')}</p>
                <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('mentors.date')}</label>
                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('mentors.time')}</label>
                            <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('mentors.notes')}</label>
                        <textarea rows={3} placeholder={t('mentors.notesPlaceholder')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
                        {t('mentors.sendRequest')}
                    </button>
                </form>
            </div>
        </div>
    );
};

const MentorsPage: React.FC = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedField, setSelectedField] = useState('All Fields');
    const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);

    const filteredMentors = useMemo(() => {
        return MENTORS.filter(m => {
            const searchMatch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            const fieldMatch = selectedField === 'All Fields' || m.field === selectedField;
            return searchMatch && fieldMatch;
        });
    }, [searchQuery, selectedField]);

    const uniqueFields = ['All Fields', ...Array.from(new Set(MENTORS.map(m => m.field)))];

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t('mentors.title')}</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{t('mentors.subtitle')}</p>
                </div>

                {/* Mentor Spotlight */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">{t('mentors.spotlight')}</h2>
                    <div className="bg-gradient-to-br from-primary to-blue-400 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 text-white">
                       <img src={MENTORS[0].avatar} alt={MENTORS[0].name} className="w-32 h-32 rounded-full border-4 border-white flex-shrink-0" />
                       <div className="text-center md:text-left">
                           <h3 className="text-2xl font-bold">{MENTORS[0].name}</h3>
                           <p className="text-lg font-medium text-blue-100">{MENTORS[0].title} @ {MENTORS[0].company}</p>
                           <p className="mt-2 text-blue-50">{MENTORS[0].bio}</p>
                           <button onClick={() => setBookingMentor(MENTORS[0])} className="mt-4 bg-white text-primary font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105">
                               {t('mentors.requestSession')}
                           </button>
                       </div>
                    </div>
                </section>

                {/* Mentor Directory */}
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-center">{t('mentors.directory')}</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder={t('mentors.searchPlaceholder')}
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                        <select
                            value={selectedField}
                            onChange={e => setSelectedField(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary"
                        >
                            {uniqueFields.map(field => <option key={field} value={field}>{field === 'All Fields' ? t('mentors.allFields') : field}</option>)}
                        </select>
                    </div>

                    {filteredMentors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMentors.map(mentor => (
                                <MentorCard key={mentor.id} mentor={mentor} onBook={setBookingMentor} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-12 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-semibold">{t('mentors.noMentorsFound')}</h3>
                            <p className="text-gray-600 mt-2">{t('mentors.noMentorsHint')}</p>
                        </div>
                    )}
                </section>
            </div>
            <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} />
        </>
    );
};

export default MentorsPage;