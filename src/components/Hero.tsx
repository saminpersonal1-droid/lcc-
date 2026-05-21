import { motion } from 'motion/react';
import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, BookOpen, GraduationCap, Clock, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToCourses = () => {
    const section = document.getElementById('courses');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm"
        >
          <Sparkles size={16} />
          <span className="tracking-wide uppercase">{t('admissionsOpen')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight max-w-4xl tracking-tight"
        >
          {t('heroTitle').split(' ').map((word, i) => (
            word === 'Laboratory' || word === 'ল্যাবরেটরি' ? 
            <span key={i} className="text-brand-red">{word} </span> : 
            word + ' '
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('heroSub')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={scrollToCourses}
            className="bg-brand-red text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Explore Courses
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg border border-slate-100 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            View Success Stories
          </button>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          {[
            { icon: BookOpen, label: 'Quality Notes' },
            { icon: GraduationCap, label: 'Expert Coaches' },
            { icon: Clock, label: '24/7 Mentoring' },
            { icon: ArrowRight, label: 'Mock Tests' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-red border border-slate-50">
                <item.icon size={24} />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
};
