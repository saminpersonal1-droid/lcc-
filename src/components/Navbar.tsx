import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { LogIn, UserPlus, LayoutDashboard, LogOut, MoreVertical, Globe, X, GraduationCap, BookOpen, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface NavbarProps {
  isLoggedIn: boolean;
  userEmail?: string | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onDashboard: () => void;
}

export const Navbar = ({ isLoggedIn, userEmail, onLogin, onSignup, onLogout, onDashboard }: NavbarProps) => {
  const { lang, setLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      closeMenu();
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 glass-card px-4 md:px-8 py-3 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
        >
          <Logo size={42} />
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="text-sm md:text-lg font-black text-slate-800 tracking-tight uppercase">
              LABORATORY <span className="text-brand-red">COACHING CENTER</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.12em] text-slate-400 font-bold">Scientific Excellence • Since 1995</span>
          </div>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {[
          { label: t('home'), id: 'hero' },
          { label: t('courses'), id: 'courses' },
          { label: t('teachers'), id: 'teachers' },
          { label: t('gallery'), id: 'gallery' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-sm font-bold text-slate-600 hover:text-brand-red transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="hidden sm:flex items-center gap-1.5 border border-brand-red/20 text-brand-red px-3 py-1.5 rounded-lg hover:bg-brand-red/5 transition-all text-sm font-bold"
        >
          <Globe size={14} />
          {lang === 'bn' ? 'EN' : 'BN'}
        </button>
        
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <button 
              onClick={onLogin}
              className="text-slate-600 hover:text-brand-red font-bold text-sm px-4 py-2 transition-all"
            >
              {t('login')}
            </button>
            <button 
              onClick={onSignup}
              className="hidden sm:flex bg-brand-red text-white px-5 py-2.5 rounded-xl hover:shadow-xl hover:shadow-red-900/40 transition-all font-bold items-center gap-2"
            >
              <UserPlus size={18} />
              <span>{t('signup')}</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onDashboard}
              className="flex items-center gap-3 bg-white border border-slate-200 pl-2 pr-5 py-1.5 rounded-2xl hover:bg-slate-50 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 bg-brand-red rounded-xl flex items-center justify-center text-white font-bold text-sm uppercase">
                {userEmail?.split('@')[0][0]}
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-black text-brand-red uppercase tracking-widest leading-none mb-0.5">Dashboard</span>
                <span className="text-sm font-bold text-slate-700 truncate max-w-[100px]">{userEmail?.split('@')[0]}</span>
              </div>
            </button>
            <button 
              onClick={onLogout}
              className="bg-slate-50 border border-slate-100 text-slate-400 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
              title={t('logout')}
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
        
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden text-slate-600 p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          <MoreVertical size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 right-4 left-4 sm:left-auto sm:w-[400px] bg-white z-[70] shadow-2xl rounded-[2.5rem] border border-slate-100 flex flex-col p-6 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-3">
                  <Logo size={36} />
                  <span className="font-black text-slate-800 text-xs tracking-tight uppercase">Laboratory Coaching Center</span>
                </div>
                <button onClick={closeMenu} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {isLoggedIn && userEmail && (
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-red shadow-sm font-bold text-lg uppercase border border-slate-100">
                        {userEmail[0]}
                      </div>
                      <div className="max-w-[150px]">
                        <p className="text-[10px] uppercase font-black text-brand-red leading-none mb-1">User</p>
                        <p className="font-bold text-slate-800 text-sm truncate">{userEmail.split('@')[0]}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { onDashboard(); closeMenu(); }}
                      className="p-2 bg-white text-brand-red rounded-lg shadow-sm border border-slate-100 hover:bg-brand-red hover:text-white transition-all"
                    >
                      <User size={18} />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: BookOpen, label: t('home'), id: 'hero' },
                    { icon: GraduationCap, label: t('courses'), id: 'courses' },
                    { icon: User, label: t('teachers'), id: 'teachers' },
                    { icon: Globe, label: lang === 'bn' ? 'ENGLISH' : 'বাংলা', action: () => setLang(lang === 'bn' ? 'en' : 'bn') },
                  ].map((item) => (
                    <button 
                      key={item.label}
                      onClick={item.action ? () => { item.action(); closeMenu(); } : () => scrollToSection(item.id!)}
                      className="flex flex-col items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-red/30 hover:bg-red-50/30 transition-all text-left group"
                    >
                      <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-brand-red group-hover:text-white rounded-lg transition-colors">
                        <item.icon size={18} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  {!isLoggedIn ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => { onLogin(); closeMenu(); }}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 font-bold text-slate-600 hover:bg-slate-100 transition-all text-sm border border-slate-100"
                      >
                        <LogIn size={18} />
                        {t('login')}
                      </button>
                      <button 
                        onClick={() => { onSignup(); closeMenu(); }}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-brand-red text-white font-bold hover:shadow-xl hover:shadow-red-200 transition-all text-sm"
                      >
                        <UserPlus size={18} />
                        {t('signup')}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => { onDashboard(); closeMenu(); }}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500 text-white font-bold hover:shadow-xl hover:shadow-emerald-200 transition-all text-sm"
                      >
                        <LayoutDashboard size={18} />
                        {t('dashboard')}
                      </button>
                      <button 
                        onClick={() => { onLogout(); closeMenu(); }}
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-all text-sm"
                      >
                        <LogOut size={18} />
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
};

