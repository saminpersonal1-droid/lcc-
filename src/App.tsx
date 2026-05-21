import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Gallery } from './components/Gallery';
import { InquiryForm } from './components/InquiryForm';
import { Dashboard } from './components/Dashboard';
import { Background } from './components/Background';
import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Phone, MapPin, Mail, Facebook } from 'lucide-react';

import { CourseDetails } from './components/CourseDetails';
import { Teachers } from './components/Teachers';
import { Achievements } from './components/Achievements';
import { Logo } from './components/Logo';

function CoachingApp() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [view, setView] = useState<'home' | 'dashboard' | 'course-details'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setView('home');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEnrollClick = (courseId: string) => {
    if (!session) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedCourseId(courseId);
    setView('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen relative font-sans text-brand-dark overflow-x-hidden">
      <Background />
      <Navbar 
        isLoggedIn={!!session} 
        userEmail={session?.user?.email}
        onLogin={handleLoginClick}
        onSignup={handleSignupClick}
        onLogout={handleLogout} 
        onDashboard={() => setView('dashboard')}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero />
            <Courses userId={session?.user?.id} onEnroll={handleEnrollClick} />
            <Teachers />
            <Gallery />
            <Achievements />
          </>
        )}
        {view === 'dashboard' && (
          <Dashboard onBack={() => setView('home')} />
        )}
        {view === 'course-details' && selectedCourseId && (
          <CourseDetails 
            courseId={selectedCourseId} 
            onBack={() => setView('home')} 
            userId={session?.user?.id} 
          />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />

      <footer className="bg-slate-900 text-slate-100 font-sans mt-24">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Column 1: Logo & About */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo size={42} className="brightness-110" />
                <span className="font-black text-white tracking-tight text-lg md:text-xl">
                  LABORATORY COACHING
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                {isEn 
                  ? "Pioneering quality education and scientific excellence since 1995. Preparing future leaders in engineering, medical, and board examinations."
                  : "১৯৯৫ সাল থেকে নিখুঁত শিক্ষা ও বিজ্ঞান চর্চায় অগ্রগামী। ইঞ্জিনিয়ারিং, মেডিকেল এবং বোর্ড পরীক্ষার জন্য ভবিষ্যৎ নেতৃত্ব গঠন।"
                }
              </p>
            </div>

            {/* Column 2: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-white text-sm font-black uppercase tracking-widest border-l-4 border-brand-red pl-3">
                {isEn ? "Get In Touch" : "যোগাযোগ করুন"}
              </h4>
              <ul className="space-y-3.5 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {isEn ? "Phone:" : "ফোন নাম্বার:"} <a href="tel:01720292758" className="hover:text-white transition-colors">01720-292758</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-all">
                    {isEn ? "Email:" : "ইমেইল:"} <a href="mailto:dhakalaboratoryinstitute@gmail.com" className="hover:text-white transition-colors">dhakalaboratoryinstitute@gmail.com</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
                  <span className="font-medium leading-relaxed">
                    {isEn ? "Address:" : "ঠিকানা:"} 25/5, ahmed nagar paikpara, mirpur-1, Dhaka, Bangladesh, 1216
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect With Us */}
            <div className="space-y-4">
              <h4 className="text-white text-sm font-black uppercase tracking-widest border-l-4 border-brand-red pl-3">
                {isEn ? "Follow Our Journey" : "সোশ্যাল মিডিয়া"}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {isEn 
                  ? "Join our Facebook community for daily lesson digests, success updates, and class schedules."
                  : "দৈনিক গুরুত্বপূর্ণ লেকচার, ক্লাসের সময়সূচী ও সফলতার আপডেট জানতে আমাদের ফেসবুক পেজে যুক্ত হোন।"
                }
              </p>
              <div className="pt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61573637390567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/30 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 shadow-sm"
                >
                  <Facebook size={18} />
                  <span>{isEn ? "Visit Facebook Page" : "ফেসবুক পেজ ভিজিট করুন"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-medium">
            <p className="text-xs font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} Laboratory Coaching Center. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-black uppercase tracking-widest italic">
              <span className="text-slate-600">SINCE 1995 • SCIENTIFIC EXCELLENCE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CoachingApp />
    </LanguageProvider>
  );
}

