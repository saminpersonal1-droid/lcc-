import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, Phone, BookOpen, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { supabase } from '../lib/supabase';

export const InquiryForm = ({ userId }: { userId?: string }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            course: formData.course,
            message: formData.message,
            user_id: userId || null
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', course: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      alert(error.message || 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
              {t('contactHeader')}
            </h2>
            <div className="h-1.5 w-20 bg-brand-red rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md">
              {t('contactSub')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                <p className="text-lg font-bold text-slate-800">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-lg font-bold text-slate-800">info@lcc-edu.com</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-[3rem]"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Submitted!</h3>
                <p className="text-slate-600 underline-offset-4">{t('successMessage')}</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text"
                      className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="email"
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">{t('phone')}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="tel"
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                        placeholder="+880..."
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('selectCourse')}</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                      className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all appearance-none"
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value})}
                    >
                      <option value="">{t('selectCourse')}</option>
                      <option value="SSC Special Batch">SSC Special Batch</option>
                      <option value="HSC Academic">HSC Academic</option>
                      <option value="Admission Care">Admission Care</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('message')}</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 text-slate-400" size={18} />
                    <textarea 
                      rows={4}
                      className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? <Loader2 size={24} className="animate-spin" /> : (
                    <>
                      {t('sendInquiry')}
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
