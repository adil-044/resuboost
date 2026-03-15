'use client';

import { FileText, Github, User, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthPage = pathname.startsWith('/auth');

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              Resume<span className="text-indigo-600">ATS</span>
            </span>
          </Link>

          {!isAuthPage && (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
                <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                {user && <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>}
                <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
              </div>

              <div className="h-4 w-px bg-slate-200 hidden md:block" />

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
                      {(user.user_metadata?.full_name?.[0] || user.email?.[0]).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-slate-700 hidden sm:block">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/auth/login" 
                    className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/login" 
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
