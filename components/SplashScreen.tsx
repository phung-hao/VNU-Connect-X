import React from 'react';

interface SplashScreenProps {
  isActive: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isActive }) => {
  return (
    <div
      className={`
        fixed inset-0 bg-white flex items-center justify-center z-[9999]
        transition-opacity duration-500 ease-in-out
        ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      aria-hidden={!isActive}
    >
      <img
        src="https://i.postimg.cc/HsPdxmb8/20251110-1713-VNU-CONNECT-X-Logo-simple-compose-01k9pm27dje2cth1tv2n8dw6eq.png"
        alt="VNU-CONNECT X Logo"
        className="w-48 md:w-64 animate-splash-logo"
      />
    </div>
  );
};

export default SplashScreen;
