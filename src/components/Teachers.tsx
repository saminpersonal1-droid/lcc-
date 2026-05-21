import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  X, 
  Calendar,
  MessageCircle,
  Award,
  Clock
} from 'lucide-react';

interface Teacher {
  id: number;
  nameEn: string;
  nameBn: string;
  roleEn: string;
  roleBn: string;
  educationEn: string;
  educationBn: string;
  expEn: string;
  expBn: string;
  rating: number;
  studentsCount: number;
  initials: string;
  subjectsEn: string[];
  subjectsBn: string[];
  bioEn: string;
  bioBn: string;
  badgesEn: string[];
  badgesBn: string[];
}

const TEACHERS: Teacher[] = [
  {
    id: 1,
    nameEn: "Dr. Rafiqul Islam",
    nameBn: "ড. রফিকুল ইসলাম",
    roleEn: "Head of Physics Department",
    roleBn: "পদার্থবিজ্ঞান বিভাগীয় প্রধান",
    educationEn: "PhD in Physics, University of Dhaka",
    educationBn: "পিএইচডি (পদার্থবিজ্ঞান), ঢাকা বিশ্ববিদ্যালয়",
    expEn: "12+ Years of Classroom Teaching",
    expBn: "১২+ বছরের শিক্ষকতার অভিজ্ঞতা",
    rating: 4.9,
    studentsCount: 1500,
    initials: "RI",
    subjectsEn: ["Classical Mechanics", "Electromagnetism", "Nuclear Physics"],
    subjectsBn: ["বলবিদ্যা", "তড়িৎচৌম্বকত্ব", "নিউক্লিয়ার পদার্থবিজ্ঞান"],
    bioEn: "Dedicated physicist and author of several coaching guidebooks. He simplifies complex vector mathematics and relativity with life-like physical models.",
    bioBn: "নিবেদিতপ্রাণ পদার্থবিদ এবং বেশ কয়েকটি কোচিং গাইডবুকের লেখক। তিনি জটিল ভেক্টর গণিত এবং আপেক্ষিকতা সহজ উদাহরণের মাধ্যমে বুঝিয়ে দেন।",
    badgesEn: ["Ex-DU Faculty", "Bestselling Author"],
    badgesBn: ["প্রাক্তন ঢাবি শিক্ষক", "সেরা লেখক"]
  },
  {
    id: 2,
    nameEn: "Prof. Tasnim Rahman",
    nameBn: "অধ্যাপক তাসনিম রহমান",
    roleEn: "Senior Chemistry Specialist",
    roleBn: "সিনিয়র রসায়ন বিশেষজ্ঞ",
    educationEn: "MSc in Chemistry, BUET",
    educationBn: "এমএসসি (রসায়ন), বুয়েট",
    expEn: "10+ Years of Board Prep Experience",
    expBn: "১০+ বছরের বোর্ড পরীক্ষার অভিজ্ঞতা",
    rating: 4.85,
    studentsCount: 1200,
    initials: "TR",
    subjectsEn: ["Organic Chemistry", "Electrochemistry", "Inorganic Reactions"],
    subjectsBn: ["জৈব রসায়ন", "তড়িৎ রসায়ন", "অজৈব বিক্রিয়াসমূহ"],
    bioEn: "An expert at breaking down core organic mechanisms. Her unique structured reactions table helps student visualize organic conversion maps seamlessly.",
    bioBn: "জৈব বিক্রিয়ার কলাকৌশল সহজে শেখানোর ব্যাপারে অনন্য। তার তৈরি করা রিঅ্যাকশন চার্ট শিক্ষার্থীদের জৈব যৌগের রূপান্তর সহজে আয়ত্ত করতে সাহায্য করে।",
    badgesEn: ["BUET Gold Medalist", "Reaction Queen"],
    badgesBn: ["বুয়েট স্বর্ণপদক বিজয়ী", "বিক্রিয়া রানি"]
  },
  {
    id: 3,
    nameEn: "Engr. Mahbubul Alam",
    nameBn: "ইঞ্জি. মাহবুবুল আলম",
    roleEn: "Higher Mathematics Expert",
    roleBn: "উচ্চতর গণিত বিশেষজ্ঞ",
    educationEn: "BSc in Civil Engineering, BUET",
    educationBn: "বিএসসি ইন সিভিল ইঞ্জিনিয়ারিং, বুয়েট",
    expEn: "14+ Years of Admission Care Coaching",
    expBn: "১৪+ বছরের অ্যাডমিশন কেয়ার কোচিং",
    rating: 4.95,
    studentsCount: 2000,
    initials: "MA",
    subjectsEn: ["Calculus & Integration", "Trigonometry", "Coordinate Geometry"],
    subjectsBn: ["ক্যালকুলাস ও যোগজীকরণ", "ত্রিকোণমিতি", "স্থানাঙ্ক জ্যামিতি"],
    bioEn: "Creator of 'Visual Calculus' series. He transforms abstract equations into dynamic graphics to ensure absolute mastery over competitive engineering admission targets.",
    bioBn: "'ভিজ্যুয়াল ক্যালকুলাস' সিরিজের রূপকার। তিনি জটিল সমীকরণকে ভিজ্যুয়াল গ্রাফিক্সে রূপান্তর করে ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার প্রস্তুতি সহজ করে তোলেন।",
    badgesEn: ["Admission Guru", "BUET Alumni"],
    badgesBn: ["ভর্তি গুরু", "বুয়েট প্রাক্তন"]
  },
  {
    id: 4,
    nameEn: "Dr. Nusrat Jahan",
    nameBn: "ডা. নুসরাত জাহান",
    roleEn: "Biology & Human Anatomy Specialist",
    roleBn: "জীববিজ্ঞান ও মানব শারীরস্থান বিশেষজ্ঞ",
    educationEn: "MBBS, FCPS Part-I, Dhaka Medical College",
    educationBn: "এমবিবিএস, এফসিপিএস পার্ট-১, ঢাকা মেডিকেল কলেজ",
    expEn: "8+ Years of Medical Admission Prep",
    expBn: "৮+ বছরের মেডিকেল ভর্তি প্রস্তুতি",
    rating: 4.92,
    studentsCount: 1400,
    initials: "NJ",
    subjectsEn: ["Human Physiology", "Plant Anatomy", "Genetics & Inheritance"],
    subjectsBn: ["মানব শারীরতত্ত্ব", "উদ্ভিদ শারীরস্থান", "জিনতত্ত্ব ও বংশগতি"],
    bioEn: "Renowned doctor and passionate educator. Her vivid biological models and memorization tricks make biology class the most enjoyable hour of the week.",
    bioBn: "খ্যাতনামা চিকিৎসক এবং দারুণ শিক্ষক। তার দুর্দান্ত শারীরিক মডেল এবং মনে রাখার ট্রিকস প্রতিটি জীববিজ্ঞান ক্লাসকে অত্যন্ত আকর্ষণীয় ও সহজ করে তোলে।",
    badgesEn: ["DMC Alumni", "Premium Lecturer"],
    badgesBn: ["ডিএমসি প্রাক্তন", "সেরা লেকচারার"]
  }
];

export const Teachers = () => {
  const { lang, t } = useLanguage();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const isEn = lang === 'en';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TEACHERS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TEACHERS.length) % TEACHERS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const diff = touchStart.current - touchEnd.current;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  return (
    <section id="teachers" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background graphic elements */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
          >
            <Award size={14} />
            Our Mentors
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight"
          >
            {isEn ? "Meet Our Expert Teachers" : "আমাদের দক্ষ শিক্ষক মন্ডলী"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xl mx-auto text-base"
          >
            {isEn 
              ? "Learn from top university graduates and specialists who ensure regular support, exam-oriented tips, and outstanding guidance." 
              : "দেশের শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠানের গ্র্যাজুয়েট ও অভিজ্ঞ শিক্ষকদের কাছ থেকে নিন সেরা ক্লাস ও সঠিক গাইডলাইন।"}
          </motion.p>
          <div className="h-1.5 w-16 bg-brand-red rounded-full mx-auto mt-2"></div>
        </div>

        {/* Desktop Carousel / Sliding Panel Controls */}
        <div className="relative flex flex-col items-center">
          {/* Slider Container */}
          <div 
            className="w-full relative py-6 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Nav Arrows */}
            <div className="absolute -top-12 right-4 flex items-center gap-3 z-20">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer hover:border-brand-red/30"
                aria-label="Previous Teacher"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer hover:border-brand-red/30"
                aria-label="Next Teacher"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Teacher Cards Wrapper with Slide Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEACHERS.map((teacher, idx) => {
                // Focus styling for active carousel index on mobile
                const isCurrentOnMobile = idx === currentIndex;
                
                return (
                  <motion.div
                    key={teacher.id}
                    layoutId={`teacher-card-${teacher.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" 
                    }}
                    onClick={() => setSelectedTeacher(teacher)}
                    className={`glass-card p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:border-brand-red/3 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden h-full ${
                      isCurrentOnMobile ? 'ring-2 ring-brand-red/20 scale-100' : 'max-md:hidden'
                    }`}
                  >
                    {/* Visual Corner Ribbon */}
                    <div className="absolute -right-8 -top-8 w-16 h-16 bg-brand-red/5 group-hover:bg-brand-red/10 transition-colors rotate-45" />

                    <div>
                      {/* Avatar initials with dynamic floating shadow */}
                      <div className="w-20 h-20 bg-brand-red/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-brand-red font-black text-2xl uppercase relative shadow-inner group-hover:scale-105 transition-transform duration-300">
                        {teacher.initials}
                        {/* Floating visual indicators */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                      </div>

                      {/* Header */}
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-1.5 bg-amber-500/10 text-amber-600 py-1 px-2.5 rounded-full w-max mx-auto text-[10px] font-black tracking-wider uppercase">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span>{teacher.rating} rating</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-red transition-colors pt-2">
                          {isEn ? teacher.nameEn : teacher.nameBn}
                        </h3>
                        <p className="text-xs text-brand-red font-black uppercase tracking-wider">
                          {isEn ? teacher.roleEn : teacher.roleBn}
                        </p>
                      </div>

                      {/* Summary Info */}
                      <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-slate-500 text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <GraduationCap size={14} className="text-slate-400" />
                          <span className="truncate">{isEn ? teacher.educationEn : teacher.educationBn}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-slate-400" />
                          <span>{isEn ? teacher.expEn : teacher.expBn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Button view details */}
                    <div className="mt-8">
                      <span className="w-full text-center py-3 bg-slate-50 hover:bg-brand-red hover:text-white transition-all text-slate-600 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 border border-slate-100">
                        {isEn ? "View Profile" : "প্রোফাইল দেখুন"}
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile indicator dots */}
            <div className="md:hidden flex justify-center items-center gap-1.5 mt-8">
              {TEACHERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-brand-red' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern sliding floating details cabinet panel / tray drawer */}
      <AnimatePresence>
        {selectedTeacher && (
          <>
            {/* Absolute Back Drop blur with ease out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />

            {/* Fixed Sliding cabinet dialog drawer from right */}
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[110] shadow-2xl border-l border-slate-100 flex flex-col p-8 select-none"
            >
              {/* Drawer Title & Close controls */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-red-200">
                    L
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg leading-none uppercase tracking-wide">
                      {isEn ? "Mentor Profile" : "মেন্টরের বিবরণ"}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1 inline-block">
                      Laboratory Instructor
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable details wrapper - SOLID NO-SCROLLBAR LOOK */}
              <div className="flex-1 overflow-y-auto pt-8 space-y-8 pr-1 scrollbar-thin">
                {/* Visual Avatar Card details */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-20 h-20 bg-brand-red flex-shrink-0 text-white rounded-2xl font-black text-3xl flex items-center justify-center shadow-lg shadow-red-900/10">
                    {selectedTeacher.initials}
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h2 className="text-2xl font-black text-slate-800">
                      {isEn ? selectedTeacher.nameEn : selectedTeacher.nameBn}
                    </h2>
                    <p className="text-sm text-brand-red font-bold uppercase tracking-wider">
                      {isEn ? selectedTeacher.roleEn : selectedTeacher.roleBn}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1 p-1">
                      {(isEn ? selectedTeacher.badgesEn : selectedTeacher.badgesBn).map((badge, bIdx) => (
                        <span key={bIdx} className="text-[10px] bg-white border border-slate-200 text-slate-600 font-black px-2 py-0.5 rounded-md uppercase">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Micro Metric Blocks */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                      <Star size={20} className="fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isEn ? "RATING" : "রেটিং"}</p>
                      <p className="text-base font-black text-slate-800">{selectedTeacher.rating} / 5.0</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isEn ? "EXPERIENCE" : "অভিজ্ঞতা"}</p>
                      <p className="text-base font-black text-slate-800">{isEn ? selectedTeacher.expEn : selectedTeacher.expBn}</p>
                    </div>
                  </div>
                </div>

                {/* Qualification details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap size={16} className="text-brand-red" />
                    {isEn ? "Education & Expertise" : "যোগ্যতা ও শিক্ষা"}
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700 text-sm">
                    {isEn ? selectedTeacher.educationEn : selectedTeacher.educationBn}
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen size={16} className="text-brand-red" />
                    {isEn ? "Teaching Methodology" : "শিক্ষাদান পদ্ধতি"}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium bg-red-50/20 p-5 rounded-3xl border border-brand-red/5">
                    {isEn ? selectedTeacher.bioEn : selectedTeacher.bioBn}
                  </p>
                </div>

                {/* Subjects Handled */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={16} className="text-brand-red" />
                    {isEn ? "Primary Specialties" : "প্রধান বিষয়সমূহ"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(isEn ? selectedTeacher.subjectsEn : selectedTeacher.subjectsBn).map((sub, i) => (
                      <span 
                        key={i} 
                        className="bg-white hover:bg-brand-red/5 hover:border-brand-red/30 cursor-default border border-slate-200 font-bold text-xs text-slate-700 px-3.5 py-2 rounded-xl transition-all"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Floating Dialog Actions block */}
              <div className="pt-6 border-t border-slate-100 bg-white gap-3 flex flex-col sm:flex-row">
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-4 rounded-xl transition-colors text-xs text-center"
                >
                  {isEn ? "Close" : "বন্ধ করুন"}
                </button>
                <a 
                  href="#inquiry"
                  onClick={() => {
                    setSelectedTeacher(null);
                    const inquiryEl = document.getElementById('inquiry');
                    if (inquiryEl) {
                      inquiryEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 bg-brand-red hover:bg-red-600 text-white font-extrabold py-4 rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all text-xs text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>{isEn ? "Book Callback" : "যোগাযোগ করুন"}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
