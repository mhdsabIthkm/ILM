'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookMarked, Shield, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = 'kunjonkunjon';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password) { setError('Please enter your password.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setUser({
          role: 'admin',
          adminName: email.trim().split('@')[0] || 'Ustadh Abdullah',
          adminEmail: email.trim() || 'kunjonkunjon@ilm.org',
          adminPhotoUrl: '/avatars/admin.jpg',
        });
        router.push('/admin');
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  // Mock Google sign-in — in production this will use real Google OAuth via Supabase
  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setUser({
        role: 'admin',
        adminName: 'Ustadh Abdullah',
        adminEmail: 'kunjonkunjon@ilm.org',
        adminPhotoUrl: '/avatars/admin.jpg',
      });
      router.push('/admin');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4">
      {/* Background Campus with rich overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/campus.jpg"
          alt="Malik Deenar Islamic Academy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 border border-white/20 rounded-2xl mb-4 shadow-xl">
          <BookMarked className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">MDIA ILM</h1>
        <p className="text-sm text-slate-300 mt-1">Staff &amp; Admin Portal</p>
        <p className="text-xs text-slate-400 mt-0.5">Malik Deenar Islamic Academy</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Admin badge */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 mb-5">
          <Shield className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-700">Administrative Access</p>
            <p className="text-[11px] text-slate-500">For ILM coordinators and school staff</p>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-slate-700 shadow-sm disabled:opacity-60 mb-4"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          ) : (
            /* Google logo SVG */
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {googleLoading ? 'Signing in with Google…' : 'Sign in with Google'}
        </button>

        {/* Divider */}
        <div className="relative flex items-center gap-2 mb-4">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-xs text-slate-400 flex-shrink-0">or sign in with email</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="you@mdia.edu"
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••••••"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-slate-900 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>

      <div className="mt-5 text-center">
        <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Back to student / parent login
        </Link>
      </div>
    </div>
  </div>
);
}
