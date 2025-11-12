import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { MenuIcon, XIcon, GlobeIcon } from './icons';
import { useTranslation } from '../lib/i18n';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  activePage: Page;
  onClick: (page: Page) => void;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ page, activePage, onClick, children, isMobile = false }) => {
  const isActive = activePage === page;
  const baseClasses = isMobile
    ? 'block px-3 py-2 rounded-md text-base font-medium'
    : 'px-3 py-2 rounded-md text-sm font-semibold';
  const activeClasses = isMobile
    ? 'bg-primary/10 text-primary'
    : 'text-primary border-b-2 border-primary';
  const inactiveClasses = 'text-gray-600 hover:text-primary hover:bg-primary/5';

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(page);
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} transition-colors duration-200`}
    >
      {children}
    </a>
  );
};


const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
    const { t, language, setLanguage } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const navItems = [Page.Home, Page.Connect, Page.Passport, Page.Pathways, Page.Mentors, Page.About, Page.Settings];

    const handleNavClick = (page: Page) => {
        setActivePage(page);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [langRef]);
    
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-3">
                <img className="h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/3/37/VNU-HCM_logo.png" alt="VNU-HCM Logo" />
                <img className="h-10 w-auto" src="https://www.uit.edu.vn/sites/vi/files/images/Logos/Logo_UIT_Web_Transparent.png" alt="UIT Logo" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              VNU-CONNECT <span className="text-primary">X</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
             {navItems.map((page) => (
                <NavLink key={page} page={page} activePage={activePage} onClick={handleNavClick}>
                    {t(`nav.${page.toLowerCase()}`)}
                </NavLink>
             ))}
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <span className="sr-only">{t('header.notifications')}</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
               <div className="relative" ref={langRef}>
                  <button onClick={() => setIsLangOpen(!isLangOpen)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <GlobeIcon />
                  </button>
                  {isLangOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                          <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('en'); setIsLangOpen(false); }} className={`block px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>🇻🇳 {t('languages.en')}</a>
                          <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('vi'); setIsLangOpen(false); }} className={`block px-4 py-2 text-sm ${language === 'vi' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>🇬🇧 {t('languages.vi')}</a>
                      </div>
                  )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">{t('header.openMenu')}</span>
              {isMenuOpen ? <XIcon/> : <MenuIcon/>}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((page) => (
                <NavLink key={page} page={page} activePage={activePage} onClick={handleNavClick} isMobile>
                    {t(`nav.${page.toLowerCase()}`)}
                </NavLink>
             ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;