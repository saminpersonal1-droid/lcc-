import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    courses: "Courses",
    teachers: "Teachers",
    gallery: "Gallery",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    logout: "Logout",
    heroTitle: "Welcome to Laboratory Coaching Center",
    heroSub: "We shape the future of students through quality education and proper guidance.",
    admissionsOpen: "Admissions Open 2026-27",
    courseHeader: "Our Courses",
    galleryHeader: "Photo Gallery",
    contactHeader: "Contact & Inquiry",
    contactSub: "Have questions? Send us a message and we'll get back to you shortly.",
    fullName: "Full Name",
    emailPlaceholder: "your.email@example.com",
    phone: "Phone Number",
    selectCourse: "Select Course",
    message: "Message",
    sendInquiry: "Send Inquiry",
    successMessage: "Thank you! Your inquiry has been submitted.",
    myDashboard: "My Dashboard",
    savedCourses: "Saved Courses",
    myListings: "My Listings",
    createListing: "Create Listing",
    noSavedItems: "You haven't saved any courses yet.",
    noListings: "You haven't listed any items yet.",
    listingTitle: "Title",
    listingDesc: "Description",
    listingCategory: "Category (e.g. Note, Question)",
    saveCourse: "Save Course",
    unsaveCourse: "Unsave",
    enrollNow: "Enroll Now",
    viewAllCourses: "View All Courses",
    academicTitle: "Academic Batch",
    academicDesc: "Daily classes and coaching for regular school & college students.",
    sscTitle: "SSC Batch",
    sscDesc: "Complete preparation for Science, Humanities, and Business Studies groups.",
    hscTitle: "HSC Batch",
    hscDesc: "Exclusive lectures for Physics, Chemistry, and Biology.",
    courseDetails: "Course Details",
    duration: "Duration",
    classesIncluded: "Classes Included",
    enrollmentForm: "Enrollment Form",
    submitEnrollment: "Submit Request",
    enrollmentPending: "Pending Approval (Inactive)",
    enrollmentApproved: "Active Student (Active)",
    enrolledCourses: "My Courses",
    noEnrolledCourses: "No courses enrolled yet.",
    thankYouEnroll: "Thank you for your interest! Our team will contact you for approval.",
    months: "Months",
    academicDetails: "This batch covers all core subjects with weekly exams and interactive solving sessions.",
    sscDetails: "Intensive 2-year program covering Physics, Chemistry, Math, and Biology with board focus.",
    hscDetails: "Competitive preparation for HSC and basic engineering/medical foundation.",
    address: "Permanent Address",
  },
  bn: {
    home: "হোম",
    courses: "কোর্স",
    teachers: "শিক্ষক",
    gallery: "গ্যালারি",
    login: "লগইন",
    signup: "নিবন্ধন",
    dashboard: "ড্যাশবোর্ড",
    logout: "লগআউট",
    heroTitle: "ল্যাবরেটরি কোচিং সেন্টারে আপনাকে স্বাগতম",
    heroSub: "আমরা মানসম্মত শিক্ষা এবং সঠিক দিকনির্দেশনার মাধ্যমে শিক্ষার্থীদের ভবিষ্যৎ গড়ে তুলি।",
    admissionsOpen: "ভর্তি চলছে ২০২৬-২৭",
    courseHeader: "আমাদের কোর্সসমূহ",
    galleryHeader: "গ্যালারি",
    contactHeader: "যোগাযোগ ও অনুসন্ধান",
    contactSub: "আপনার কোন প্রশ্ন আছে? আমাদের একটি বার্তা পাঠান এবং আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    fullName: "পূর্ণ নাম",
    emailPlaceholder: "example@mail.com",
    phone: "ফোন নম্বর",
    selectCourse: "কোর্স নির্বাচন করুন",
    message: "বার্তা",
    sendInquiry: "বার্তা পাঠান",
    successMessage: "ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।",
    myDashboard: "আমার ড্যাশবোর্ড",
    savedCourses: "সংরক্ষিত কোর্স",
    myListings: "আমার লিস্টিং",
    createListing: "নতুন লিস্টিং",
    noSavedItems: "আপনি এখনো কোনো কোর্স সংরক্ষণ করেননি।",
    noListings: "আপনি এখনো কোনো লিস্টিং করেননি।",
    listingTitle: "শিরোনাম",
    listingDesc: "বিস্তারিত বর্ণনা",
    listingCategory: "ক্যাটাগরি (যেমন: নোট, প্রশ্ন)",
    saveCourse: "কোর্স সেভ করুন",
    unsaveCourse: "রিমুভ",
    enrollNow: "ভর্তি হন",
    viewAllCourses: "সব কোর্স দেখুন",
    academicTitle: "একাডেমিক ব্যাচ",
    academicDesc: "স্কুল ও কলেজ শিক্ষার্থীদের জন্য নিয়মিত ক্লাস এবং কোচিং প্রোসেস।",
    sscTitle: "এসএসসি ব্যাচ",
    sscDesc: "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের জন্য পূর্ণাঙ্গ প্রস্তুতি।",
    hscTitle: "এইচএসসি ব্যাচ",
    hscDesc: "ফিজিক্স, কেমিস্ট্রি এবং বায়োলজির জন্য এক্সক্লুসিভ লেকচার।",
    courseDetails: "কোর্সের বিস্তারিত",
    duration: "সময়কাল",
    classesIncluded: "মোট ক্লাস",
    enrollmentForm: "ভর্তি ফরম",
    submitEnrollment: "আবেদন জমা দিন",
    enrollmentPending: "অনুমোদনের অপেক্ষায় (নিষ্ক্রিয়)",
    enrollmentApproved: "অ্যাক্টিভ স্টুডেন্ট (সক্রিয়)",
    enrolledCourses: "আমার কোর্সসমূহ",
    noEnrolledCourses: "এখনো কোনো কোর্সে ভর্তি হননি।",
    thankYouEnroll: "আগ্রহের জন্য ধন্যবাদ! অনুমোদনের জন্য আমাদের টিম আপনার সাথে যোগাযোগ করবে।",
    months: "মাস",
    academicDetails: "এই ব্যাচে নিয়মিত ক্লাসের পাশাপাশি সাপ্তাহিক পরীক্ষা এবং সমস্যা সমাধানের ক্লাস নেওয়া হয়।",
    sscDetails: "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষার জন্য ২ বছরের পূর্ণাঙ্গ বোর্ড প্রস্তুতি।",
    hscDetails: "HSC পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি এবং ইঞ্জিনিয়ারিং/মেডিকেলের ফাউন্ডেশন তৈরি।",
    address: "স্থায়ী ঠিকানা",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('bn');

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
