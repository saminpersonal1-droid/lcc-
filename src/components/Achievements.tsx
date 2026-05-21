import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { 
  Trophy, 
  Target, 
  Users, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle,
  Activity,
  Award
} from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  labelEn: string;
  labelBn: string;
  descEn: string;
  descBn: string;
  colorClass: string;
  index: number;
}

const STATS: StatCardProps[] = [
  {
    icon: <Trophy size={28} />,
    value: "98.5%",
    labelEn: "Board Exam Pass Rate",
    labelBn: "বোর্ড পরীক্ষায় পাসের হার",
    descEn: "Consistently securing stellar GPA-5 scores in SSC & HSC board exams.",
    descBn: "এসএসসি ও এইচএসসি পরীক্ষায় নিয়মিত জিপিএ-৫ প্রাপ্তির গৌরবময় ইতিহাস।",
    colorClass: "from-amber-500/10 to-yellow-500/10 text-amber-600 border-amber-200",
    index: 0
  },
  {
    icon: <GraduationCap size={28} />,
    value: "450+",
    labelEn: "University Admissions",
    labelBn: "বিশ্ববিদ্যালয়ে ভর্তি সাফল্য",
    descEn: "Students admitted to top institutions like BUET, Medical Colleges, & DU.",
    descBn: "বুয়েট, মেডিকেল কলেজ ও ঢাকা বিশ্ববিদ্যালয়সহ শীর্ষ প্রতিষ্ঠানে ভর্তির সুযোগ লাভ।",
    colorClass: "from-brand-red/10 to-red-500/5 text-brand-red border-red-200",
    index: 1
  },
  {
    icon: <Users size={28} />,
    value: "5,000+",
    labelEn: "Mentored Students",
    labelBn: "সাফল্যের সাথে মেন্টরিং",
    descEn: "Trusted by thousands of active students for daily academic care.",
    descBn: "সঠিক পড়াশোনা ও দৈনিক মূল্যায়নের জন্য হাজারো শিক্ষার্থীর প্রথম পছন্দ।",
    colorClass: "from-emerald-500/10 to-teal-500/5 text-emerald-600 border-emerald-200",
    index: 2
  },
  {
    icon: <Target size={28} />,
    value: "1995",
    labelEn: "Established Since",
    labelBn: "প্রতিষ্ঠিত ১৯৯৫ সাল থেকে",
    descEn: "Providing outstanding academic guidance and shaping futures for over three decades.",
    descBn: "সুদীর্ঘ ৩ দশকেরও বেশি সময় ধরে নিখুঁত শিক্ষা ও সঠিক গাইডলাইন দিয়ে শিক্ষার্থীদের স্বপ্নপূরণ।",
    colorClass: "from-blue-500/10 to-indigo-500/5 text-blue-600 border-blue-200",
    index: 3
  }
];

const SUCCESS_STORIES = [
  {
    year: "BUET '25",
    titleEn: "Nafis Fuad - CSE (Merit: 42nd)",
    titleBn: "নাফিস ফুয়াদ - সিএসই (মেধা: ৪২তম)",
    studentsEn: "BUET",
    studentsBn: "বুয়েট",
    detailsEn: "Regular batch student, secured top positions in BUET, DU, and IUT.",
    detailsBn: "আমাদের নিয়মিত ব্যাচের ছাত্র, বুয়েট, ঢাবি এবং আইইউটি-তে প্রথম সারির স্থান।"
  },
  {
    year: "DMC '25",
    titleEn: "Sajid Hasan (DMC - Merit: 18th)",
    titleBn: "সাজিদ হাসান (ডিএমসি - মেধা: ১৮তম)",
    studentsEn: "Medical Prep",
    studentsBn: "মেডিকেল প্রিপ",
    detailsEn: "Cleared DMC admissions with solid concept clarity from our Academic Prep.",
    detailsBn: "আমাদের স্পেশাল ডক্টর গ্রুপ ব্যাচ থেকে পড়েই ঢাকা মেডিকেলে চমকপ্রদ মেধা স্থান।"
  },
  {
    year: "HSC '24",
    titleEn: "Anika Tahsin (Golden GPA 5.00)",
    titleBn: "আনিকা তাহসিন (গোল্ডেন জিপিএ ৫.০০)",
    studentsEn: "Board Topper",
    studentsBn: "বোর্ড টপার",
    detailsEn: "Scored 95+ marks in Physics and Chemistry in HSC board examinations.",
    detailsBn: "এইচএসসি বোর্ড পরীক্ষায় পদার্থবিজ্ঞান এবং রসায়নে ৯৫+ মার্কস অর্জনকারী।"
  },
  {
    year: "DU '24",
    titleEn: "Zarin Tasnim - DU Finance",
    titleBn: "জারিন তাসনিম - ঢাবি ফিন্যান্স",
    studentsEn: "DU",
    studentsBn: "ঢাবি",
    detailsEn: "Maintained a consistent preparation track in our intensive solving sessions.",
    detailsBn: "আমাদের ইনটেনসিভ সলভিং সেশন এবং মক টেস্টগুলোতে নিয়মিত অংশ নিয়ে সফল।"
  },
  {
    year: "BUET '25",
    titleEn: "Wasif Zaman - ME (Merit: 112th)",
    titleBn: "ওয়াসিফ জামান - এমই (মেধা: ১১২তম)",
    studentsEn: "BUET",
    studentsBn: "বুয়েট",
    detailsEn: "Developed fast math solving ability through our calculus series mentorship.",
    detailsBn: "আমাদের ক্যালকুলাস স্পেশাল সিরিজের মাধ্যমে গাণিতিক দক্ষতা বৃদ্ধি করেছে।"
  },
  {
    year: "SSMC '25",
    titleEn: "Farhan Ishraq - Medical Prep",
    titleBn: "ফারহান ইশরাক - মেডিকেল প্রিপ",
    studentsEn: "Medical",
    studentsBn: "মেডিকেল",
    detailsEn: "Enrolled in SSC & HSC batches, maintaining top attendance in weekly exams.",
    detailsBn: "এসএসসি ও এইচএসসি কোর্সে যুক্ত থেকে সেরা পারফর্ম করেছে।"
  },
  {
    year: "SSC '24",
    titleEn: "Rashedul Islam - Golden A+",
    titleBn: "রাশেদুল ইসলাম - গোল্ডেন এ+",
    studentsEn: "SSC Topper",
    studentsBn: "এসএসসি টপার",
    detailsEn: "Secured outstanding marks across all academic subjects with board success.",
    detailsBn: "বিজ্ঞান বিভাগের প্রতিটি বিষয়ে সর্বোচ্চ জিপিএ ৫.০০ লাভকারী।"
  },
  {
    year: "BUET '25",
    titleEn: "Mariam Sultana - CE (Merit: 156th)",
    titleBn: "মারিয়াম সুলতানা - সিই (মেধা: ১৫৬তম)",
    studentsEn: "BUET",
    studentsBn: "বুয়েট",
    detailsEn: "Achieved engineering goals with comprehensive conceptual guidebooks.",
    detailsBn: "ইঞ্জিনিয়ারিং ভর্তি পরীক্ষায় আমাদের দিকনির্দেশনায় সফল স্থান অর্জনকারী।"
  }
];

export const Achievements = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <section id="achievements" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurry backgrounds */}
      <div className="absolute left-[-10%] top-[-10%] w-[450px] h-[450px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[-10%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
          >
            <Award size={14} />
            {isEn ? "Our Milestones" : "আমাদের মাইলফলক"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight"
          >
            {isEn ? "History of Academic Excellence" : "শিক্ষায় আমাদের ধারাবাহিক সফলতা"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xl mx-auto text-base"
          >
            {isEn 
              ? "Over the years, our structured regular exams and interactive solving sessions have translated into outstanding results." 
              : "বিগত বছরগুলোতে আমাদের পরিকল্পিত পরীক্ষা পদ্ধতি ও নিবিড় তত্ত্বাবধানের মাধ্যমে শিক্ষার্থীরা অর্জন করেছে সেরা ফলাফল।"}
          </motion.p>
          <div className="h-1.5 w-16 bg-brand-red rounded-full mx-auto mt-2"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {STATS.map((stat) => (
            <motion.div
              key={stat.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: stat.index * 0.1 }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" 
              }}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-full relative group transition-all"
            >
              {/* Highlight background transition */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none bg-slate-100/30" />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br border ${stat.colorClass}`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-2 group-hover:scale-105 origin-left transition-transform duration-300">
                  {stat.value}
                </h3>
                <h4 className="text-base font-extrabold text-slate-700 mb-2">
                  {isEn ? stat.labelEn : stat.labelBn}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {isEn ? stat.descEn : stat.descBn}
                </p>
              </div>

              {/* Subdued corner element */}
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-brand-red uppercase tracking-wider relative z-10">
                <Sparkles size={12} className="animate-pulse" />
                <span>Verified Metric</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories / Timelines */}
        <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left intro text */}
            <div className="lg:w-2/5 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-brand-red/10 text-brand-red py-1 px-3 rounded-full text-xs font-black uppercase tracking-wider">
                <TrendingUp size={14} />
                {isEn ? "Hall of Fame" : "সাফল্যের খতিয়ান"}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-snug">
                {isEn ? "Recent Success Highlights" : "সাম্প্রতিক সফলতার এক ঝলক"}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {isEn 
                  ? "Every year, our coaching students make us proud by hitting double goals in board exams as well as university entry requirements." 
                  : "প্রতিটি পরীক্ষায় আমাদের শিক্ষার্থীরা কৃতিত্বের স্বাক্ষর রেখে চলেছে যা আমাদের শিক্ষক মন্ডলী ও শিক্ষার্থী উভয়ের যৌথ প্রচেষ্টার ফসল।"}
              </p>
              <div className="pt-2 hidden lg:block">
                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span>Real success numbers based on actual records</span>
                </div>
              </div>
            </div>

            {/* Right List list cards with infinite vertical marquee */}
            <div className="lg:w-3/5 w-full relative">
              <style>{`
                @keyframes marquee-scroll {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-33.33%); }
                }
                .animate-marquee-vertical {
                  animation: marquee-scroll 24s linear infinite;
                }
                .animate-marquee-vertical:hover {
                  animation-play-state: paused;
                }
              `}</style>
              
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
              
              <div className="h-[400px] overflow-hidden rounded-[2rem] border border-slate-200/50 bg-slate-50 relative p-2">
                <div className="animate-marquee-vertical space-y-4">
                  {/* Triple rendering array so we get buttery-smooth continuous looping even with height gaps */}
                  {[...SUCCESS_STORIES, ...SUCCESS_STORIES, ...SUCCESS_STORIES].map((story, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-red/25 transition-all flex gap-4 items-start duration-300"
                    >
                      <div className="bg-brand-red/10 text-brand-red font-black text-xs md:text-sm px-3.5 py-2.5 rounded-xl text-center flex-shrink-0 min-w-[75px]">
                        {story.year}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
                          <h4 className="font-extrabold text-slate-800 text-sm md:text-base truncate">
                            {isEn ? story.titleEn : story.titleBn}
                          </h4>
                          <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md w-max mt-1 sm:mt-0">
                            {isEn ? story.studentsEn : story.studentsBn}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pt-1 font-medium">
                          {isEn ? story.detailsEn : story.detailsBn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
