'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookMarked, GraduationCap, Users, AlertCircle, ArrowRight,
  Loader2, Shield, Info, MapPin, Eye, Building, Sparkles,
  CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  useUser,
  loginStudentDetailedAsync,
  loginParentDetailedAsync
} from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { StudentAvatar } from '@/components/ui/student-avatar';
import { CampusPhotoModal } from '@/components/ui/campus-photo-modal';

type Panel = 'student' | 'parent';

interface LoginErrorNotice {
  type: 'no_ilm' | 'not_found' | 'general';
  title?: string;
  message: string;
  studentName?: string;
  className?: string;
  admissionNo?: string;
  photoUrl?: string;
}

export default function LoginPage() {
  const [panel, setPanel] = useState<Panel>('student');
  const [admissionNo, setAdmissionNo] = useState('');
  const [errorNotice, setErrorNotice] = useState<LoginErrorNotice | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { setUser } = useUser();
  const router = useRouter();

  // Scroll listener to drive the scroll-down disappearance of the text & card
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Distance in px after which text is completely gone (approx 10-12 mouse wheel scrolls)
  const scrollRange = 1400;
  const progress = Math.min(1, Math.max(0, scrollY / scrollRange));
  const isScrolledDown = progress > 0.85;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    const trimmed = admissionNo.trim();
    if (!trimmed) {
      setErrorNotice({ type: 'general', message: 'Please enter your admission number.' });
      return;
    }
    setLoading(true);
    try {
      if (panel === 'student') {
        const res = await loginStudentDetailedAsync(trimmed);
        if (!res.success) {
          if (res.reason === 'no_ilm') {
            setErrorNotice({
              type: 'no_ilm',
              title: 'You are not part of the ILM program',
              message: `Admission No. ${res.admissionNo} (${res.studentName}) belongs to Class ${res.className}. The ILM Leadership & Mentorship program is active for classes SA'DA, SIDRA, SUFFA, VAHDA, and ALFA.`,
              studentName: res.studentName,
              className: res.className,
              admissionNo: res.admissionNo,
              photoUrl: res.photoUrl,
            });
          } else {
            setErrorNotice({
              type: 'not_found',
              message: `No student found with admission number "${trimmed}". Please check your admission number and try again.`,
            });
          }
          setLoading(false);
          return;
        }
        setUser(res.user);
        router.push('/student');
      } else {
        const res = await loginParentDetailedAsync(trimmed);
        if (!res.success) {
          if (res.reason === 'no_ilm') {
            setErrorNotice({
              type: 'no_ilm',
              title: 'Not part of the ILM program',
              message: `Admission No. ${res.admissionNo} (${res.studentName}) is enrolled in Class ${res.className}. ILM portal access is available for students and parents of classes SA'DA, SIDRA, SUFFA, VAHDA, and ALFA.`,
              studentName: res.studentName,
              className: res.className,
              admissionNo: res.admissionNo,
              photoUrl: res.photoUrl,
            });
          } else {
            setErrorNotice({
              type: 'not_found',
              message: `No student found with admission number "${trimmed}". Please check your child's admission number and try again.`,
            });
          }
          setLoading(false);
          return;
        }
        setUser(res.user);
        router.push('/parent');
      }
    } catch {
      setErrorNotice({ type: 'general', message: 'Authentication error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const switchPanel = (p: Panel) => {
    setPanel(p);
    setAdmissionNo('');
    setErrorNotice(null);
  };

  const scrollToRevealPhoto = () => {
    window.scrollTo({ top: scrollRange + 100, behavior: 'smooth' });
  };

  const scrollToSignIn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[350vh] text-white">

      {/* ── FIXED BACKGROUND: Fullscreen Campus Photo ── */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <img
          src="/campus.jpg"
          alt="Malik Deenar Islamic Academy Campus"
          className="w-full h-full object-cover object-center scale-100"
          draggable={false}
        />
        {/* Dynamic dark vignette overlay: clean neutral dark tone for text contrast, slowly fades to 0% as user scrolls down */}
        <div
          className="absolute inset-0 bg-black/60 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 0.7 * (1 - progress)) }}
        />
        {/* Directional left-side dark gradient to guarantee high contrast behind text */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 0.85 * (1 - progress)) }}
        />
        {/* Gradient shadow at bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"
          style={{ opacity: Math.max(0, 0.75 * (1 - progress)) }}
        />
      </div>

      {/* ── FIXED FOREGROUND: Header, Content, & Login Form ── */}
      {/* Moves DOWN (translateY increases) and fades to 0 as user scrolls */}
      <div
        className="fixed inset-0 w-full h-screen z-10 flex flex-col justify-between overflow-y-auto lg:overflow-hidden px-4 sm:px-8 lg:px-12 py-5 sm:py-6"
        style={{
          transform: `translate3d(0, ${progress * 300}px, 0)`,
          opacity: Math.max(0, 1 - Math.pow(progress, 1.15)),
          pointerEvents: isScrolledDown ? 'none' : 'auto',
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top Navbar — clean monochromatic frosted header */}
        <header className="flex items-center justify-between gap-3 flex-shrink-0 mb-4">
          {/* Academy Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg flex-shrink-0">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow">
                  MALIK DEENAR ISLAMIC ACADEMY
                </span>
                <span className="hidden sm:inline-block text-[10px] font-medium text-white/80 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-md">
                  Estd. 1973
                </span>
              </div>
              <p className="text-xs text-white/70 drop-shadow">
                Thalangara, Kasaragod · Jamia Nooriya Affiliation
              </p>
            </div>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCampusModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all cursor-pointer shadow"
            >
              <Eye className="w-3.5 h-3.5 text-white/90" />
              <span className="hidden sm:inline">Inspect Campus</span>
            </button>
            <Link
              href="/admin-login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow"
            >
              <Shield className="w-3.5 h-3.5 text-white/90" />
              <span>Staff Login</span>
            </Link>
          </div>
        </header>

        {/* Center Stage: Clean Hero Typography on Left, Frosted Sign In Card on Right */}
        <main className="my-auto py-2 sm:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Academy & Program Showcase (Monochrome & Elegant like reference) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 shadow">
                <Sparkles className="w-3.5 h-3.5 text-white/90" />
                <span>Integrated Learning &amp; Mentorship Program</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-xl">
                Empowering Voices,<br />
                Inspiring Leadership.
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-normal drop-shadow">
                An official speech, communication, and personal mentorship program inspired by Toastmasters, tailored exclusively for the students of Malik Deenar Islamic Academy.
              </p>

              {/* Active Batch Chips */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  Active ILM Cohorts (2026–27)
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SA'DA", 'SIDRA', 'SUFFA', 'VAHDA', 'ALFA'].map(cls => (
                    <span
                      key={cls}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm transition-colors"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/70 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white/80" />
                  <span>278 Enrolled Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white/80" />
                  <span>10 Academy Cohorts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/80" />
                  <span>Thalangara, Kasaragod</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Frosted Glass Portal Card (Matching Reference Image) */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
              <div className="bg-black/50 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                {/* Card Title */}
                <div className="mb-5 relative z-10">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Portal Sign In</h2>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    Select your role and enter your admission number to continue.
                  </p>
                </div>

                {/* Student / Parent Switcher */}
                <div className="flex rounded-xl border border-white/15 bg-black/40 p-1 mb-4 gap-1 relative z-10">
                  <button
                    type="button"
                    onClick={() => switchPanel('student')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      panel === 'student'
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => switchPanel('parent')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      panel === 'parent'
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Parent
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                  <div>
                    <label htmlFor="admission-no" className="block text-xs font-medium text-white/80 uppercase tracking-wider mb-2">
                      {panel === 'student' ? 'Student Admission Number' : "Child's Admission Number"}
                    </label>
                    <input
                      id="admission-no"
                      type="text"
                      inputMode="numeric"
                      value={admissionNo}
                      onChange={e => { setAdmissionNo(e.target.value); setErrorNotice(null); }}
                      placeholder="e.g. 1056, 941, 1136, 872 …"
                      autoFocus
                      className="w-full border border-white/20 bg-black/40 focus:border-white/50 rounded-xl px-4 py-3 text-base sm:text-lg font-medium text-white tracking-widest placeholder:text-white/35 placeholder:tracking-normal outline-none focus:outline-none focus:ring-1 focus:ring-white/30 transition-all shadow-inner"
                    />
                  </div>

                  {/* Error / Non-ILM Guidance Box */}
                  {errorNotice && (
                    errorNotice.type === 'no_ilm' ? (
                      <div className="bg-black/60 border border-white/20 rounded-2xl p-3.5 space-y-2.5 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <StudentAvatar
                            name={errorNotice.studentName || 'Student'}
                            admissionNo={errorNotice.admissionNo}
                            imageUrl={errorNotice.photoUrl}
                            size="md"
                            className="border border-white/30 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-white text-sm truncate">
                              {errorNotice.studentName}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {errorNotice.className && (
                                <span className="text-xs font-medium text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                                  Class {errorNotice.className}
                                </span>
                              )}
                              {errorNotice.admissionNo && (
                                <span className="text-xs font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded">
                                  #{errorNotice.admissionNo}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 text-white/90 text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-white">
                            <Info className="w-4 h-4 text-white/80 flex-shrink-0" />
                            <span>{errorNotice.title || 'Not part of the ILM program'}</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed pl-5">
                            {errorNotice.message}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 bg-black/60 border border-red-500/40 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-red-200 shadow-lg">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <p>{errorNotice.message}</p>
                      </div>
                    )
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl py-3 text-sm shadow-lg transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Verifying Records…</>
                    ) : (
                      <>Sign In to Portal <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>

                {/* Staff / Evaluator link */}
                <div className="mt-4 pt-3.5 border-t border-white/10 text-center relative z-10">
                  <Link
                    href="/admin-login"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-white/80" />
                    Ustadh &amp; Evaluator Login Portal →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Bottom Hint: Prompt user to scroll down to reveal the full campus photo */}
        <footer className="flex items-center justify-center flex-shrink-0 pt-2 pb-1">
          <button
            type="button"
            onClick={scrollToRevealPhoto}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-xs font-medium text-white/80 hover:text-white shadow-lg transition-all cursor-pointer group"
          >
            <span>Scroll down to view campus photo</span>
            <ChevronDown className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </footer>
      </div>

      {/* ── SCROLLED-DOWN FLOATING PILL: "Scroll up to Sign In" ── */}
      {/* Centered perfectly across full viewport with inset-x-0 mx-auto w-fit */}
      <div
        className="fixed bottom-8 inset-x-0 mx-auto w-fit z-30 flex justify-center items-center pointer-events-none transition-all duration-300"
        style={{
          opacity: isScrolledDown ? 1 : 0,
          transform: `translateY(${isScrolledDown ? '0px' : '20px'})`,
        }}
      >
        <button
          type="button"
          onClick={scrollToSignIn}
          style={{ pointerEvents: isScrolledDown ? 'auto' : 'none' }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/80 hover:bg-black backdrop-blur-xl border border-white/25 text-xs sm:text-sm font-semibold text-white shadow-2xl transition-all cursor-pointer group"
          aria-label="Scroll back up to sign in"
        >
          <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
          <span>Scroll up to Sign In</span>
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <CampusPhotoModal
        isOpen={isCampusModalOpen}
        onClose={() => setIsCampusModalOpen(false)}
      />
    </div>
  );
}