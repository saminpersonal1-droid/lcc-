import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { supabase } from '../lib/supabase';
import { jsPDF } from 'jspdf';
import { 
  ArrowLeft, 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Loader2,
  Send,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  User,
  Building2,
  Phone,
  CreditCard,
  Download
} from 'lucide-react';

interface CourseDetailsProps {
  courseId: string;
  onBack: () => void;
  userId: string | undefined;
}

const getCoursePrice = (id: string) => {
  switch (id) {
    case '01':
      return '৳ 1,200/month';
    case '02':
      return '৳ 1,500/month';
    case '03':
      return '৳ 2,000/month';
    default:
      return '৳ 1,500/month';
  }
};

const getCourseName = (id: string, t: any) => {
  switch (id) {
    case '01':
      return t('academicTitle');
    case '02':
      return t('sscTitle');
    case '03':
      return t('hscTitle');
    default:
      return 'Selected Course';
  }
};

const getCourseNameEn = (id: string) => {
  switch (id) {
    case '01':
      return 'Class 8-10 Academic Program';
    case '02':
      return 'SSC Master Class Program';
    case '03':
      return 'HSC Advanced Academic Program';
    default:
      return 'Selected Academic Program';
  }
};

const getCoursePriceEn = (id: string) => {
  switch (id) {
    case '01':
      return 'Tk. 1,200 / Month';
    case '02':
      return 'Tk. 1,500 / Month';
    case '03':
      return 'Tk. 2,000 / Month';
    default:
      return 'Tk. 1,500 / Month';
  }
};

const generatePDFReceipt = (data: any) => {
  const doc = new jsPDF();
  const courseName = getCourseNameEn(data.courseId);
  const coursePrice = getCoursePriceEn(data.courseId);

  // Add decorative document frame
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(10, 10, 190, 277);

  // Banner background (brand red)
  doc.setFillColor(220, 38, 38); // brand red #dc2626
  doc.rect(12, 12, 186, 26, 'F');

  // Banner text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('LABORATORY COACHING CENTER', 105, 21, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Quality Education & Scientific Guidance | Helpline: +880 1712-345678', 105, 27, { align: 'center' });
  doc.text('Sector 10, Uttara, Dhaka, Bangladesh | coachingvr247@gmail.com', 105, 32, { align: 'center' });

  let y = 52;

  // Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text('ADMISSION ENROLLMENT SLIP & RECEIPT', 15, y);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Reference Date: ${new Date().toLocaleDateString()}`, 195, y, { align: 'right' });

  y += 6;
  doc.setLineWidth(0.5);
  doc.setDrawColor(241, 245, 249); // slate-100
  doc.line(15, y, 195, y);

  y += 12;

  // Section header renderer
  const renderHeader = (titleEn: string, curY: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(220, 38, 38);
    doc.text(titleEn.toUpperCase(), 15, curY);
    doc.setLineWidth(0.5);
    doc.setDrawColor(254, 226, 226); // red-100
    doc.line(15, curY + 2, 195, curY + 2);
  };

  const renderRow = (label1: string, val1: string, label2: string, val2: string, rowY: number) => {
    // Left label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(label1, 15, rowY);

    // Left value
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(val1 || 'N/A', 54, rowY);

    // Right label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label2, 115, rowY);

    // Right value
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(val2 || 'N/A', 154, rowY);
  };

  // 1. STUDENT INFO
  renderHeader('Student Profile', y);
  y += 10;
  renderRow('Student Full Name:', data.firstName, 'Class / Grade:', data.studentClass, y);
  y += 8;
  renderRow('Educational Institution:', data.institution, 'Student Phone:', data.phone, y);
  y += 16;

  // 2. GUARDIAN INFO
  renderHeader('Family & Emergency Contact', y);
  y += 10;
  renderRow("Father's Name:", data.fatherName, "Mother's Name:", data.motherName, y);
  y += 8;
  renderRow('Parent Mobile Number:', data.parentPhone, 'Relationship:', 'Parents', y);
  y += 16;

  // 3. COURSE & BILLING
  renderHeader('Enrolled Course & Payment Status', y);
  y += 10;
  renderRow('Enrolled Program:', courseName, 'Tuition Fee / Monthly Rate:', coursePrice, y);
  y += 8;
  renderRow('Method of Payment:', data.paymentMethod, 'Verification Status:', 'Awaiting Verification', y);
  y += 16;

  // Advisory / Instruction box
  doc.setFillColor(254, 252, 232); // amber-50
  doc.setDrawColor(253, 230, 138); // amber-200
  doc.rect(15, y, 180, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9); // amber-700
  doc.text('IMPORTANT INSTRUCTION:', 20, y + 7);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 53, 4); // amber-900
  doc.text('1. Please download this slip and contact the office branch or helpline (+880 1712-345678) for batch details.', 20, y + 13);
  doc.text('2. Payments via bKash/Nagad/Rocket are verified within 24 hours of submission. Check student status regularly.', 20, y + 18);

  y += 42;

  // Signature Block
  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.line(20, y, 65, y);
  doc.line(145, y, 190, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Student or Guardian Signature', 42.5, y + 5, { align: 'center' });
  doc.text('Authorized Office Seal & Sign', 167.5, y + 5, { align: 'center' });

  // Seal / stamp circle accent
  doc.setDrawColor(220, 38, 38); // Red ink
  doc.circle(167.5, y - 10, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(220, 38, 38);
  doc.text('L. C. C.', 167.5, y - 11, { align: 'center' });
  doc.text('OFFC SEAL', 167.5, y - 8, { align: 'center' });

  // Footer bar
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(12, 275, 186, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a system generated registration receipt from Laboratory Coaching Center.', 105, 281, { align: 'center' });

  // Trigger Save
  const cleanName = data.firstName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Laboratory_Coaching_Admission_${cleanName}.pdf`);
};

export const CourseDetails = ({ courseId, onBack, userId }: CourseDetailsProps) => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    studentClass: '',
    institution: '',
    phone: '',
    fatherName: '',
    motherName: '',
    parentPhone: '',
    courseId: courseId, 
    paymentMethod: 'bKash'
  });

  const txt = (en: string, bn: string) => lang === 'en' ? en : bn;

  const getCourseInfo = () => {
    switch (courseId) {
      case '01':
        return {
          title: 'academicTitle',
          desc: 'academicDetails',
          duration: '12',
          classes: '150+',
          color: 'bg-blue-500',
          lightColor: 'bg-blue-50'
        };
      case '02':
        return {
          title: 'sscTitle',
          desc: 'sscDetails',
          duration: '24',
          classes: '300+',
          color: 'bg-brand-red',
          lightColor: 'bg-red-50'
        };
      case '03':
        return {
          title: 'hscTitle',
          desc: 'hscDetails',
          duration: '18',
          classes: '250+',
          color: 'bg-emerald-500',
          lightColor: 'bg-emerald-50'
        };
      default:
        return null;
    }
  };

  const info = getCourseInfo();

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      let activeUserId = userId;
      if (!activeUserId) {
        // Fallback: fetch current user active session dynamically
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          activeUserId = user.id;
        }
      }

      if (!activeUserId) {
        throw new Error('You must be logged in to enroll in a course. Please log in first.');
      }

      const addressJson = JSON.stringify({
        stepForm: true,
        firstName: formData.firstName,
        studentClass: formData.studentClass,
        institution: formData.institution,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        parentPhone: formData.parentPhone,
        price: getCoursePrice(formData.courseId),
        paymentMethod: formData.paymentMethod,
        courseName: getCourseName(formData.courseId, t)
      });

      const { error } = await supabase.from('enrollments').insert([
        {
          user_id: activeUserId,
          course_id: formData.courseId,
          full_name: formData.firstName,
          phone: formData.phone,
          address: addressJson,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      const courseName = getCourseName(formData.courseId, t);
      const coursePrice = getCoursePrice(formData.courseId);

      // 1. Generate and trigger download of the PDF Receipt
      generatePDFReceipt(formData);

      // 2. Open standard email client to coachingvr247@gmail.com with student details
      const mailSubject = `New Course Admission: ${formData.firstName} (Class: ${formData.studentClass})`;
      const mailBody = `=== LABORATORY COACHING CENTER ===\nNew Online Registration Details:\n\n` +
        `[STUDENT DETAILS]\n` +
        `- Full Name: ${formData.firstName}\n` +
        `- Enrolled Class: ${formData.studentClass}\n` +
        `- Institution Name: ${formData.institution}\n` +
        `- Student Contact: ${formData.phone}\n\n` +
        `[PARENT DETAILS]\n` +
        `- Father's Name: ${formData.fatherName}\n` +
        `- Mother's Name: ${formData.motherName}\n` +
        `- Parent/Guardian Contact: ${formData.parentPhone}\n\n` +
        `[PROGRAM & PAYMENT]\n` +
        `- Program Selected: ${courseName}\n` +
        `- Monthly Tuition Fee: ${coursePrice}\n` +
        `- Selected Payment Gateway: ${formData.paymentMethod}\n\n` +
        `Submitted on: ${new Date().toLocaleString()}\n` +
        `Note: Verification pending in admin board.\n`;
      
      const mailtoUrl = `mailto:coachingvr247@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      setSuccess(true);
      setStep(4);
    } catch (error: any) {
      alert(error.message || 'Error submitting enrollment');
    } finally {
      setLoading(false);
    }
  };

  if (!info) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-600 hover:text-brand-red transition-colors flex items-center gap-2 font-bold"
      >
        <ArrowLeft size={20} />
        {t('home')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`inline-flex p-3 ${info.lightColor} ${info.color.replace('bg-', 'text-')} rounded-2xl mb-6`}>
              <BookOpen size={24} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              {t(info.title)}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t(info.desc)}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <Clock className="text-brand-red mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('duration')}</p>
              <p className="text-xl font-bold text-slate-800">{info.duration} {t('months')}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <Calendar className="text-emerald-500 mb-3" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('classesIncluded')}</p>
              <p className="text-xl font-bold text-slate-800">{info.classes}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 sticky top-32"
          >
            {/* Header with Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-bold shrink-0">L</div>
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">{t('enrollmentForm')}</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{txt("Interactive Academy Registration", "ইন্টারেক্টিভ একাডেমি নিবন্ধন")}</p>
              </div>
            </div>

            {/* Progress indicator bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center relative">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center flex-1 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      step >= s 
                        ? 'bg-brand-red text-white ring-4 ring-red-100' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {s}
                    </div>
                    <span className={`text-[9px] font-black mt-1.5 uppercase tracking-wider text-center ${
                      step >= s ? 'text-brand-red' : 'text-slate-400'
                    }`}>
                      {s === 1 ? txt('Student', 'ছাত্র') : 
                       s === 2 ? txt('Parents', 'অভিভাবক') : 
                       s === 3 ? txt('Payment', 'পেমেন্ট') : 
                       txt('Status', 'অবস্থা')}
                    </span>
                  </div>
                ))}
                {/* Horizontal Progress line */}
                <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-100 -z-0" />
                <div 
                  className="absolute top-4 left-0 h-[2px] bg-brand-red transition-all duration-300"
                  style={{ width: `${((Math.min(step, 3) - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleEnroll} className="space-y-4">
              {/* STEP 1: Student info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("First Name / Full Name", "প্রথম নাম / পূর্ণ নাম")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="e.g. Samin"
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Class", "শ্রেণী")}
                    </label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                      value={formData.studentClass}
                      onChange={e => setFormData({...formData, studentClass: e.target.value})}
                    >
                      <option value="">{txt("Select class...", "শ্রেণী নির্বাচন করুন...")}</option>
                      <option value="Class 8">{txt("Class 8", "৮ম শ্রেণী")}</option>
                      <option value="Class 9">{txt("Class 9", "৯ম শ্রেণী")}</option>
                      <option value="Class 10">{txt("Class 10", "১০ম শ্রেণী")}</option>
                      <option value="SSC">{txt("SSC Candidate", "এসএসসি পরীক্ষার্থী")}</option>
                      <option value="HSC">{txt("HSC Candidate", "এইচএসসি পরীক্ষার্থী")}</option>
                      <option value="Admission">{txt("Admission Tracker", "ভর্তি পরীক্ষার্থী")}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Institution", "শিক্ষা প্রতিষ্ঠান")}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="e.g. Notre Dame College"
                        value={formData.institution}
                        onChange={e => setFormData({...formData, institution: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Phone Number", "ফোন নম্বর")}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        type="tel"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="+880 1XXX-XXXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    disabled={!formData.firstName || !formData.studentClass || !formData.institution || !formData.phone}
                    onClick={() => setStep(2)}
                    className="w-full bg-brand-red text-white py-4 rounded-xl font-bold shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:pointer-events-none text-sm"
                  >
                    <span>{txt("Continue to Parent Details", "অভিভাবকের তথ্যে যান")}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* STEP 2: Parents info */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Father's Name", "পিতার নাম")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="Mr. Father Name"
                        value={formData.fatherName}
                        onChange={e => setFormData({...formData, fatherName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Mother's Name", "মাতার নাম")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="Mrs. Mother Name"
                        value={formData.motherName}
                        onChange={e => setFormData({...formData, motherName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Parent Mobile Number", "অভিভাবকের মোবাইল নম্বর")}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        type="tel"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                        placeholder="+880 1XXX-XXXXXX"
                        value={formData.parentPhone}
                        onChange={e => setFormData({...formData, parentPhone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-slate-50 text-slate-500 py-3.5 border border-slate-100 rounded-xl font-bold transition-all hover:bg-slate-100 text-sm flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={16} />
                      {txt("Back", "পেছনে")}
                    </button>
                    <button 
                      type="button"
                      disabled={!formData.fatherName || !formData.motherName || !formData.parentPhone}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-brand-red text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:pointer-events-none text-sm"
                    >
                      <span>{txt("Next Step", "পরবর্তী ধাপ")}</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Choice & Payment */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Course Choice", "কোর্স নির্বাচন")}
                    </label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red text-sm transition-all text-slate-800"
                      value={formData.courseId}
                      onChange={e => setFormData({...formData, courseId: e.target.value})}
                    >
                      <option value="01">{getCourseName('01', t)}</option>
                      <option value="02">{getCourseName('02', t)}</option>
                      <option value="03">{getCourseName('03', t)}</option>
                    </select>
                  </div>

                  {/* Display Price Dynamically */}
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-brand-red flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-black tracking-widest text-brand-red/60">{txt("Course Price", "কোর্স ফি")}</span>
                    <span className="text-2xl font-black mt-1 leading-none">{getCoursePrice(formData.courseId)}</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider ml-1">
                      {txt("Payment Method", "পেমেন্ট মাধ্যম")}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'bKash', label: 'bKash', details: '01712345678' },
                        { id: 'Nagad', label: 'Nagad', details: '01712345678' },
                        { id: 'Rocket', label: 'Rocket', details: '01712345678' },
                        { id: 'Cash', label: txt('Direct/Cash', 'অফিস ক্যাশ'), details: 'Office' }
                      ].map((method) => {
                        const isSelected = formData.paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setFormData({...formData, paymentMethod: method.id})}
                            className={`p-3 border-2 rounded-2xl font-black text-xs transition-all relative overflow-hidden flex flex-col items-center justify-center text-center select-none ${
                              isSelected 
                                ? 'border-brand-red bg-red-50/20 text-brand-red' 
                                : 'border-slate-50 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <span className="font-bold text-sm">{method.label}</span>
                            <span className="text-[8px] opacity-70 font-mono mt-0.5">{method.details}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-slate-50 text-slate-500 py-3.5 border border-slate-100 rounded-xl font-bold transition-all hover:bg-slate-100 text-sm flex items-center justify-center gap-1"
                    >
                      <ChevronLeft size={16} />
                      {txt("Back", "পেছনে")}
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-brand-red text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 min-w-[130px] text-sm"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                      <span>{txt("Submit", "আবেদন দিন")}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Confirmation screen showing Awaiting Admin Approval */}
              {step === 4 && (
                <div className="py-2 space-y-5">
                  {/* Status Indicator Banner */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 animate-pulse">
                      <Clock size={24} />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase tracking-wider mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      {txt("Status: Inactive / Pending Verification", "অবস্থা: নিষ্ক্রিয় / ভেরিফিকেশন পেন্ডিং")}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight leading-snug">
                      {txt("Preview Your Registration Slip", "আপনার নিবন্ধন রসিদের প্রিভিউ")}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-xs mx-auto font-semibold">
                      {txt(
                        "Your course enrollment is successfully registered as INACTIVE. It is currently saved securely under your student dashboard.",
                        "আপনার অফিশিয়াল কোর্স আবেদনটি সফলভাবে নিষ্ক্রিয় (Inactive) অবস্থায় রেজিস্টার করা হয়েছে এবং তা ড্যাশবোর্ডে সংরক্ষিত আছে।"
                      )}
                    </p>
                  </div>

                  {/* Comprehensive Total Form Data Preview Panel */}
                  <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    {/* Header bar of receipt */}
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-[10px] font-black tracking-wider uppercase text-slate-400">
                      <span>{txt("Official Registration Slip", "অফিসিয়াল ভর্তি রসিদ")}</span>
                      <span className="font-mono text-brand-red">#LCC-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>

                    <div className="bg-white p-4 space-y-4 text-xs">
                      {/* Section 1: Student */}
                      <div>
                        <p className="text-[9px] uppercase font-black tracking-widest text-brand-red mb-1.5">{txt("1. Student Profile", "১. শিক্ষার্থীর বিবরণ")}</p>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Full Name", "শিক্ষার্থীর নাম")}</span>
                            <span className="font-extrabold text-slate-800">{formData.firstName}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Class / Grade", "শ্রেণী")}</span>
                            <span className="font-extrabold text-slate-800">{formData.studentClass}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Educational Institution", "শিক্ষা প্রতিষ্ঠান")}</span>
                            <span className="font-extrabold text-slate-800 truncate block">{formData.institution}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Contact Phone", "যোগাযোগ ফোন")}</span>
                            <span className="font-extrabold text-slate-800">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Parents */}
                      <div>
                        <p className="text-[9px] uppercase font-black tracking-widest text-emerald-600 mb-1.5">{txt("2. Family & Emergency Info", "২. অভিভাবকের বিবরণ")}</p>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Father's Name", "পিতার নাম")}</span>
                            <span className="font-extrabold text-slate-800">{formData.fatherName}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Mother's Name", "মাতার নাম")}</span>
                            <span className="font-extrabold text-slate-800">{formData.motherName}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Parent/Guardian Contact", "অভিভাবকের মোবাইল")}</span>
                            <span className="font-extrabold text-slate-800 font-mono">{formData.parentPhone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Program & Fee */}
                      <div>
                        <p className="text-[9px] uppercase font-black tracking-widest text-blue-600 mb-1.5">{txt("3. Course & Academic Fee Details", "৩. কোর্স ও পেমেন্ট বিবরণ")}</p>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                          <div className="col-span-2">
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Selected Academic Program", "নির্বাচিত কোর্স")}</span>
                            <span className="font-extrabold text-slate-800">{getCourseName(formData.courseId, t)}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Monthly Tuition Fee Price", "কোর্স ফি")}</span>
                            <span className="font-extrabold text-brand-red">{getCoursePrice(formData.courseId)}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{txt("Payment Gateway Chosen", "পেমেন্ট মাধ্যম")}</span>
                            <span className="font-extrabold text-slate-800 uppercase font-mono">{formData.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Block */}
                  <div className="space-y-2.5 pt-1">
                    <button 
                      type="button"
                      onClick={() => generatePDFReceipt(formData)}
                      className="w-full bg-brand-red text-white py-3.5 rounded-xl font-bold hover:bg-red-600 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-100 cursor-pointer"
                    >
                      <Download size={15} />
                      {txt("Download PDF Receipt Slip", "পিডিএফ ভর্তি রসিদ ডাউনলোড করুন")}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const courseName = getCourseName(formData.courseId, t);
                          const coursePrice = getCoursePrice(formData.courseId);
                          const mailSubject = `New Course Admission: ${formData.firstName} (Class: ${formData.studentClass})`;
                          const mailBody = `=== LABORATORY COACHING CENTER ===\nNew Online Registration Details:\n\n` +
                            `[STUDENT DETAILS]\n` +
                            `- Full Name: ${formData.firstName}\n` +
                            `- Enrolled Class: ${formData.studentClass}\n` +
                            `- Institution Name: ${formData.institution}\n` +
                            `- Student Contact: ${formData.phone}\n\n` +
                            `[PARENT DETAILS]\n` +
                            `- Father's Name: ${formData.fatherName}\n` +
                            `- Mother's Name: ${formData.motherName}\n` +
                            `- Parent/Guardian Contact: ${formData.parentPhone}\n\n` +
                            `[PROGRAM & PAYMENT]\n` +
                            `- Program Selected: ${courseName}\n` +
                            `- Monthly Tuition Fee: ${coursePrice}\n` +
                            `- Selected Payment Gateway: ${formData.paymentMethod}\n\n` +
                            `Submitted on: ${new Date().toLocaleString()}\n` +
                            `Note: Verification pending in admin board.\n`;
                          const mailtoUrl = `mailto:coachingvr247@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
                          window.location.href = mailtoUrl;
                        }}
                        className="bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send size={13} />
                        {txt("Email Office Contact", "অফিসে ইমেইল পাঠান")}
                      </button>

                      <button 
                        type="button"
                        onClick={onBack}
                        className="bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all text-xs flex items-center justify-center cursor-pointer"
                      >
                        {txt("Back to Courses", "কোর্স তালিকায় ফিরে যান")}
                      </button>
                    </div>

                    <p className="text-[9px] text-slate-400 italic text-center font-medium">
                      {txt("* We have stored this course in your Student Dashboard as 'Inactive'. Administrators will verify within 24 hours.", "* ভর্তি আবেদনটি আপনার ড্যাশবোর্ডে 'নিষ্ক্রিয়' হিসেবে সংরক্ষিত হয়েছে। প্রশাসন ২৪ ঘণ্টার মধ্যে এটি যাচাই ও সক্রিয় করবেন।")}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

