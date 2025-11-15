import React, { useState, ReactNode } from 'react';
import { CURRENT_USER } from '../constants';
import { useTranslation } from '../lib/i18n';
import { UserIcon, BellIcon, LockIcon, LogOutIcon, HelpCircleIcon, GlobeIcon, Avatar } from '../components/icons';

const SettingsCard: React.FC<{ title: string, children: ReactNode, icon: ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <div className="text-primary">{icon}</div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; setEnabled: (enabled: boolean) => void; }> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-700">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? 'bg-primary' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);


const SettingsPage: React.FC = () => {
    const { t, language, setLanguage } = useTranslation();
    const [profile, setProfile] = useState({ name: CURRENT_USER.name, major: CURRENT_USER.major });
    const [notifications, setNotifications] = useState({ newProjects: true, messages: true, pathways: false });
    const [privacy, setPrivacy] = useState('connections');

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{t('settings.title')}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('settings.subtitle')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Information */}
                    <SettingsCard title={t('settings.profile.title')} icon={<UserIcon />}>
                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                            <div className="flex items-center space-x-4">
                                <Avatar src={CURRENT_USER.avatar} alt="avatar" gender={CURRENT_USER.gender} className="w-16 h-16 rounded-full" />
                                <button className="text-sm font-semibold text-primary hover:underline">{t('settings.profile.changeAvatar')}</button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.profile.name')}</label>
                                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings.profile.major')}</label>
                                <input type="text" name="major" value={profile.major} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">{t('settings.profile.save')}</button>
                            </div>
                        </form>
                    </SettingsCard>
                     {/* Language */}
                    <SettingsCard title={t('settings.language.title')} icon={<GlobeIcon />}>
                        <div className="flex space-x-2">
                           <button onClick={() => setLanguage('en')} className={`flex-1 py-2 rounded-md ${language === 'en' ? 'bg-primary text-white font-bold' : 'bg-gray-100'}`}>
                            {t('languages.en')}
                           </button>
                            <button onClick={() => setLanguage('vi')} className={`flex-1 py-2 rounded-md ${language === 'vi' ? 'bg-primary text-white font-bold' : 'bg-gray-100'}`}>
                            {t('languages.vi')}
                           </button>
                        </div>
                    </SettingsCard>
                    {/* Notifications */}
                    <SettingsCard title={t('settings.notifications.title')} icon={<BellIcon />}>
                        <div className="space-y-4">
                            <ToggleSwitch label={t('settings.notifications.newProjects')} enabled={notifications.newProjects} setEnabled={val => setNotifications({...notifications, newProjects: val})} />
                            <ToggleSwitch label={t('settings.notifications.messages')} enabled={notifications.messages} setEnabled={val => setNotifications({...notifications, messages: val})} />
                            <ToggleSwitch label={t('settings.notifications.pathways')} enabled={notifications.pathways} setEnabled={val => setNotifications({...notifications, pathways: val})} />
                        </div>
                    </SettingsCard>

                    {/* Profile Privacy */}
                    <SettingsCard title={t('settings.privacy.title')} icon={<LockIcon />}>
                         <p className="text-sm text-gray-600 mb-4">{t('settings.privacy.description')}</p>
                         <div className="space-y-3">
                            {['everyone', 'connections', 'me'].map(p => (
                                <label key={p} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                                    <input type="radio" name="privacy" value={p} checked={privacy === p} onChange={e => setPrivacy(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/>
                                    <span className="text-gray-800 font-medium">{t(`settings.privacy.${p}`)}</span>
                                </label>
                            ))}
                         </div>
                    </SettingsCard>
                </div>
                {/* Account Actions */}
                <div className="lg:col-span-1 space-y-4 sticky top-28">
                     <SettingsCard title="Account" icon={<UserIcon className="w-5 h-5"/>}>
                         <div className="space-y-2">
                            <a href="#" className="flex items-center space-x-3 p-3 rounded-md text-gray-700 hover:bg-gray-100">
                                <HelpCircleIcon className="w-5 h-5"/>
                                <span>{t('settings.account.help')}</span>
                            </a>
                             <a href="#" className="flex items-center space-x-3 p-3 rounded-md text-red-600 hover:bg-red-50">
                                <LogOutIcon className="w-5 h-5"/>
                                <span>{t('settings.account.logout')}</span>
                            </a>
                         </div>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;