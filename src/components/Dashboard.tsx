import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { supabase } from '../lib/supabase';
import { 
  Heart, 
  List as ListIcon, 
  Plus, 
  Trash2, 
  Loader2, 
  Bookmark, 
  BookOpen, 
  LayoutDashboard,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface SavedItem {
  id: string;
  item_id: string;
}

interface UserListing {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
}

interface EnrolledCourse {
  id: string;
  course_id: string;
  status: 'pending' | 'approved';
  created_at: string;
}

export const Dashboard = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'saved' | 'my-listings' | 'admin'>('enrolled');
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [listings, setListings] = useState<UserListing[]>([]);
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [allEnrollments, setAllEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const [formLoading, setFormLoading] = useState(false);

  const isAdmin = userEmail === 'saminpersonal1@gmail.com';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      setUserEmail(user.user.email || null);

      const [savedRes, listingsRes, enrollRes] = await Promise.all([
        supabase.from('saved_items').select('*').eq('user_id', user.user.id),
        supabase.from('user_listings').select('*').eq('user_id', user.user.id).order('created_at', { ascending: false }),
        supabase.from('enrollments').select('*').eq('user_id', user.user.id).order('created_at', { ascending: false })
      ]);

      if (savedRes.data) setSavedItems(savedRes.data);
      if (listingsRes.data) setListings(listingsRes.data);
      if (enrollRes.data) setEnrollments(enrollRes.data);

      if (user.user.email === 'saminpersonal1@gmail.com') {
        const { data: allEnrolls } = await supabase.from('enrollments').select(`
          *,
          user:user_id ( email )
        `).order('created_at', { ascending: false });
        if (allEnrolls) setAllEnrollments(allEnrolls);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase.from('enrollments').update({ status: 'approved' }).eq('id', id);
      if (error) throw error;
      setAllEnrollments(allEnrollments.map(e => e.id === id ? { ...e, status: 'approved' } : e));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      const { error } = await supabase.from('user_listings').insert([
        { ...formData, user_id: user.user?.id }
      ]);
      if (error) throw error;
      setFormData({ title: '', description: '', category: '' });
      setShowCreateModal(false);
      fetchUserData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const { error } = await supabase.from('user_listings').delete().eq('id', id);
      if (error) throw error;
      setListings(listings.filter(l => l.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">
              {t('myDashboard')}
            </h1>
            <div className="h-1.5 w-20 bg-brand-red rounded-full mt-2"></div>
          </div>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-brand-red text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-red-200 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          {t('createListing')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-10 border-b border-slate-100 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('enrolled')}
          className={`pb-4 px-6 font-bold transition-all relative flex-shrink-0 ${
            activeTab === 'enrolled' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            {t('enrolledCourses')}
          </div>
          {activeTab === 'enrolled' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`pb-4 px-6 font-bold transition-all relative flex-shrink-0 ${
            activeTab === 'saved' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bookmark size={18} />
            {t('savedCourses')}
          </div>
          {activeTab === 'saved' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('my-listings')}
          className={`pb-4 px-6 font-bold transition-all relative flex-shrink-0 ${
            activeTab === 'my-listings' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <ListIcon size={18} />
            {t('myListings')}
          </div>
          {activeTab === 'my-listings' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-full" />}
        </button>
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`pb-4 px-6 font-bold transition-all relative flex-shrink-0 ${
              activeTab === 'admin' ? 'text-brand-red' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Admin
            </div>
            {activeTab === 'admin' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-t-full" />}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <Loader2 size={40} className="animate-spin text-brand-red" />
            <span className="font-bold text-slate-400">Loading your data...</span>
          </div>
        ) : activeTab === 'admin' ? (
          allEnrollments.length > 0 ? allEnrollments.map(enroll => {
            const parsed = (() => {
              try {
                if (enroll.address && enroll.address.startsWith('{')) {
                  return JSON.parse(enroll.address);
                }
              } catch (e) {}
              return null;
            })();

            return (
              <motion.div 
                key={enroll.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${enroll.status === 'approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                    {enroll.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(enroll.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-black text-brand-red uppercase mb-1 tracking-tighter">
                  {t(enroll.course_id === '01' ? 'academicTitle' : enroll.course_id === '02' ? 'sscTitle' : 'hscTitle')}
                </h4>
                <p className="font-bold text-slate-800 truncate mb-1">
                  {parsed ? parsed.firstName : enroll.full_name}
                </p>
                <p className="text-xs text-slate-500 mb-2">Primary Phone: {enroll.phone}</p>
                
                {parsed ? (
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-[11px] text-slate-600 space-y-1 mb-4">
                    <p><strong>Class:</strong> {parsed.studentClass}</p>
                    <p className="truncate"><strong>Institution:</strong> {parsed.institution}</p>
                    <p><strong>Father:</strong> {parsed.fatherName}</p>
                    <p><strong>Mother:</strong> {parsed.motherName}</p>
                    <p><strong>Parent Mobile:</strong> {parsed.parentPhone}</p>
                    <div className="pt-1 mt-1 border-t border-dashed border-slate-200 text-brand-red font-bold flex justify-between">
                      <span>Method: {parsed.paymentMethod}</span>
                      <span>Price: {parsed.price}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 mb-4 italic truncate">Address: {enroll.address}</p>
                )}
                
                {enroll.status === 'pending' && (
                  <button 
                    onClick={() => handleApprove(enroll.id)}
                    className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all text-xs"
                  >
                    <Plus size={16} />
                    Approve Enrollment
                  </button>
                )}
              </motion.div>
            );
          }) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">
              No pending enrollments.
            </div>
          )
        ) : activeTab === 'enrolled' ? (
          enrollments.length > 0 ? enrollments.map(enroll => {
            const parsed = (() => {
              try {
                if (enroll.address && enroll.address.startsWith('{')) {
                  return JSON.parse(enroll.address);
                }
              } catch (e) {}
              return null;
            })();

            return (
              <motion.div 
                key={enroll.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${enroll.status === 'approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                    <BookOpen size={24} />
                  </div>
                  <div className={`text-[10px] uppercase font-black px-2 py-1 rounded-md ${enroll.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                    {t(enroll.status === 'approved' ? 'enrollmentApproved' : 'enrollmentPending')}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 truncate">
                  {t(enroll.course_id === '01' ? 'academicTitle' : enroll.course_id === '02' ? 'sscTitle' : 'hscTitle')}
                </h3>
                {parsed && (
                  <p className="text-xs text-slate-500 font-semibold mb-3">
                    Class: {parsed.studentClass} | Payment Method: {parsed.paymentMethod}
                  </p>
                )}
                <p className="text-xs text-slate-400 mb-4 italic">
                  Requested on {new Date(enroll.created_at).toLocaleDateString()}
                </p>
                {enroll.status === 'approved' ? (
                  <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all text-xs">
                    Go to Classes
                  </button>
                ) : (
                  <div className="w-full bg-slate-50 text-slate-400 py-3 rounded-xl font-bold text-center border border-slate-100 text-xs">
                    Waiting for Approval
                  </div>
                )}
              </motion.div>
            );
          }) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
              {t('noEnrolledCourses')}
            </div>
          )
        ) : activeTab === 'saved' ? (
          savedItems.length > 0 ? savedItems.map(item => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-3xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-brand-red">
                  <Bookmark size={24} />
                </div>
                <div className="text-[10px] uppercase font-black text-brand-red bg-red-50 px-2 py-1 rounded-md">Course</div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">
                {t(item.item_id === '01' ? 'academicTitle' : item.item_id === '02' ? 'sscTitle' : 'hscTitle')}
              </h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                 {t(item.item_id === '01' ? 'academicDesc' : item.item_id === '02' ? 'sscDesc' : 'hscDesc')}
              </p>
              <button className="w-full bg-slate-50 text-slate-600 py-3 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2 border border-slate-100">
                <Trash2 size={18} />
                {t('unsaveCourse')}
              </button>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">
              <Heart size={48} className="mx-auto mb-4 opacity-20" />
              {t('noSavedItems')}
            </div>
          )
        ) : (
          listings.length > 0 ? listings.map(listing => (
            <motion.div 
              key={listing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-3xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                  <BookOpen size={20} />
                </div>
                <button 
                  onClick={() => handleDeleteListing(listing.id)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{listing.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{listing.description}</p>
              <div className="inline-flex px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {listing.category}
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">
              <ListIcon size={48} className="mx-auto mb-4 opacity-20" />
              {t('noListings')}
            </div>
          )
        )}
      </div>

      {/* Create Listing Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-8">{t('createListing')}</h2>
              <form onSubmit={handleCreateListing} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('listingTitle')}</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                    placeholder="Enter title..."
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('listingDesc')}</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all resize-none"
                    placeholder="Enter description..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t('listingCategory')}</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                    placeholder="e.g. Study Note, Question Bank"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold transition-all hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={formLoading}
                    type="submit"
                    className="flex-1 bg-brand-red text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    {formLoading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    {t('createListing')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
