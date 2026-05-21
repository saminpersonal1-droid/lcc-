import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { ChevronRight, Heart, Bookmark, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Courses = ({ userId, onEnroll }: { userId?: string, onEnroll: (id: string) => void }) => {
  const { t, lang } = useLanguage();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchSavedItems();
    } else {
      setSavedIds([]);
    }
  }, [userId]);

  const fetchSavedItems = async () => {
    const { data } = await supabase.from('saved_items').select('item_id').eq('user_id', userId);
    if (data) setSavedIds(data.map(d => d.item_id));
  };

  const handleToggleSave = async (courseId: string) => {
    if (!userId) {
      alert('Please login to save courses!');
      return;
    }

    setSavingId(courseId);
    try {
      const isSaved = savedIds.includes(courseId);
      if (isSaved) {
        await supabase.from('saved_items').delete().eq('user_id', userId).eq('item_id', courseId);
        setSavedIds(savedIds.filter(id => id !== courseId));
      } else {
        await supabase.from('saved_items').insert([{ user_id: userId, item_id: courseId }]);
        setSavedIds([...savedIds, courseId]);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setSavingId(null);
    }
  };

  const courses = [
    { title: 'academicTitle', desc: 'academicDesc', code: '০১', id: '01' },
    { title: 'sscTitle', desc: 'sscDesc', code: '০২', id: '02', featured: true },
    { title: 'hscTitle', desc: 'hscDesc', code: '০৩', id: '03' }
  ];

  return (
    <section id="courses" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            {t('courseHeader')}
          </h2>
          <div className="h-1.5 w-20 bg-brand-red rounded-full"></div>
        </div>
        <button className="text-brand-red font-bold flex items-center gap-1 group">
          {t('viewAllCourses')}
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 rounded-[2.5rem] relative group overflow-hidden ${
              course.featured ? 'border-b-4 border-brand-red bg-white' : ''
            }`}
          >
             {course.featured && (
              <div className="absolute top-6 right-16 bg-brand-red text-white text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
                Popular
              </div>
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSave(course.id);
              }}
              className={`absolute top-6 right-6 p-2 rounded-xl transition-all ${
                savedIds.includes(course.id) ? 'bg-brand-red text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-400 hover:text_brand-red'
              }`}
            >
              {savingId === course.id ? <Loader2 size={20} className="animate-spin" /> : <Bookmark size={20} className={savedIds.includes(course.id) ? 'fill-current' : ''} />}
            </button>
            <div className="text-brand-red mb-8 text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
              {course.code}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-brand-red transition-colors">
              {t(course.title)}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              {t(course.desc)}
            </p>
            <button 
              onClick={() => onEnroll(course.id)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-brand-red group-hover:text-white transition-all"
            >
              <span className="font-bold">{t('enrollNow')}</span>
              <ChevronRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
