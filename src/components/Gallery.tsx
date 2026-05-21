import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    src: "/src/assets/images/party.jpg",
    titleEn: "Class Party Celebration",
    titleBn: "ক্লাস পার্টি উৎসব",
    descEn: "Joyful celebration of student achievements with classroom decorations & dynamic peer bonding.",
    descBn: "শ্রেণীকক্ষে সাজসজ্জা এবং সহপাঠীদের সাথে আনন্দঘন পরিবেশে শিক্ষার্থীদের অর্জন উদযাপন।"
  },
  {
    src: "/src/assets/images/pitha.jpg",
    titleEn: "Traditional Pitha Festival",
    titleBn: "ঐতিহ্যবাহী পিঠা উৎসব",
    descEn: "Our campus coming together to celebrate culture and heritage through culinary events.",
    descBn: "সাংস্কৃতিক বন্ধন দৃঢ় করতে আমাদের ক্যাম্পাসে ঐতিহ্যবাহী পিঠা উৎসবের আয়োজন।"
  },
  {
    src: "/src/assets/images/farewell.jpg",
    titleEn: "HSC Farewell Ceremony",
    titleBn: "এইচএসসি বিদায় সংবর্ধনা",
    descEn: "Celebrating the journey of our senior HSC batches as they embark on collegiate success.",
    descBn: "উচ্চতর সাফল্যের সিঁড়িতে পা দিতে যাওয়া এইচএসসি ব্যাচের বিদায় সংবর্ধনা ও দোয়া অনুষ্ঠান।"
  },
  {
    src: "/src/assets/images/classroom.jpg",
    titleEn: "Academic Batch Milestones",
    titleBn: "একাডেমিক ব্যাচ ও উৎসব",
    descEn: "Large gathering of our regular students celebrating academic completion and outstanding board marks.",
    descBn: "উৎফুল্ল ছাত্র-ছাত্রীদের সাথে শিক্ষকগণের সমন্বয়ে ক্লাস সমাপনী ও প্রীতিকর মুহূর্তের স্মৃতি।"
  }
];

export const Gallery = () => {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 py-24 relative">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
          {t('galleryHeader')}
        </h2>
        <div className="h-1.5 w-20 bg-brand-red rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALLERY_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onClick={() => setActiveIdx(i)}
            className="aspect-square bg-slate-100 rounded-[2rem] border border-slate-200/50 flex items-center justify-center text-slate-400 group overflow-hidden relative cursor-pointer shadow-sm hover:shadow-xl hover:border-brand-red/30 transition-all duration-300"
          >
            <img
              src={item.src}
              alt={isEn ? item.titleEn : item.titleBn}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Soft dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            
            {/* Floating Top icon indicator on hover */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 shadow-lg text-slate-700 hover:bg-brand-red hover:text-white">
              <ZoomIn size={16} />
            </div>

            {/* Bottom textual description */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 text-white flex flex-col justify-end">
              <span className="flex items-center gap-1.5 mb-1.5 text-brand-red font-black uppercase text-[10px] tracking-widest bg-rose-50/10 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
                <ImageIcon size={10} />
                {isEn ? "Event Snap" : "ইভেন্ট ছবি"}
              </span>
              <h4 className="font-extrabold text-sm md:text-base leading-snug">
                {isEn ? item.titleEn : item.titleBn}
              </h4>
              <p className="text-[11px] text-slate-200 line-clamp-2 mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                {isEn ? item.descEn : item.descBn}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md"
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 inset-x-4 flex justify-between items-center text-white/80 z-50">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/30">
                {activeIdx + 1} / {GALLERY_ITEMS.length}
              </span>
              <button 
                onClick={() => setActiveIdx(null)}
                className="bg-slate-800/60 hover:bg-brand-red hover:scale-105 border border-slate-700/30 text-white p-3 rounded-full transition-all focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Slider Content */}
            <div className="relative max-w-4xl w-full h-[60vh] md:h-[75vh] flex items-center justify-center select-none">
              <motion.img
                key={activeIdx}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                src={GALLERY_ITEMS[activeIdx].src}
                alt="Selected Event Snap"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full rounded-[2rem] object-contain shadow-2xl border border-slate-800"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-[-3rem] top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-brand-red hover:scale-105 text-white p-3.5 rounded-full border border-slate-700/30 transition-all focus:outline-none"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-[-3rem] top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-brand-red hover:scale-105 text-white p-3.5 rounded-full border border-slate-700/30 transition-all focus:outline-none"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Live Caption Info */}
            <div 
              className="mt-6 text-center max-w-xl px-4 select-text"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-black text-lg md:text-xl tracking-tight mb-2">
                {isEn ? GALLERY_ITEMS[activeIdx].titleEn : GALLERY_ITEMS[activeIdx].titleBn}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                {isEn ? GALLERY_ITEMS[activeIdx].descEn : GALLERY_ITEMS[activeIdx].descBn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
            {isEn ? "Start your journey today" : "আপনার উজ্জ্বল ভবিষ্যতের প্রস্তুতি শুরু হোক আজই"}
          </h3>
          <p className="text-slate-400 max-w-lg text-sm leading-relaxed font-medium">
            {isEn 
              ? "Join over 1000+ students who have successfully built their careers with Laboratory Coaching."
              : "১৯৯৫ সাল থেকে হাজারো শিক্ষার্থীর পছন্দের শিক্ষা প্রতিষ্ঠান — সঠিক গাইডলাইন ও অভিজ্ঞ মেন্টরদের সাহায্যে গড়ে তুলুন স্বপ্নের ক্যারিয়ার।"
            }
          </p>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10 w-full md:w-auto">
          <a
            href="#courses"
            className="flex-1 md:flex-none text-center bg-brand-red px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-red-950/20 hover:scale-105 transition-all text-white"
          >
            {isEn ? "Get Started" : "ভর্তি কার্যক্রম দেখুন"}
          </a>
          <a
            href="tel:01720292758"
            className="flex-1 md:flex-none text-center border border-slate-700 px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all"
          >
            {isEn ? "Contact Us" : "সরাসরি কল করুন"}
          </a>
        </div>
      </div>
    </section>
  );
};
