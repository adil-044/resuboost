'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Sparkles, ArrowRight, Loader2, 
  ShieldCheck, Zap, Bot, Target, X, CheckCircle2, Lock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Scene3D from '@/components/Scene3D';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);
  const [fileName, setResumeFileName] = useState<string | null>(null);

  const simulateScan = () => {
    setIsUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 85) {
        current = 85;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setShowUpsell(true);
        }, 1000);
      }
      setProgress(current);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <Scene3D />

      <main className="relative z-10">
        {/* Hero & Funnel Section */}
        <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Semantic Engine</span>
            </div>
            
            <h1 className="text-7xl xl:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-10">
              Get past the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Robots.</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed mb-12">
              Most executive resumes are filtered out in <span className="text-slate-900 font-bold underline decoration-indigo-500 underline-offset-4">seconds</span>. Our AI re-engineers your experience for 100% machine readability.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Instant Match
                </div>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">Real-time keyword salience scoring based on live JDs.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  Safe Export
                </div>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">Clean, single-column single-pass PDF logic for all ATS.</p>
              </div>
            </div>
          </motion.div>

          {/* Funnel Upload Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[3rem] border border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                <motion.div 
                  className="h-full bg-indigo-600" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Test Your Strength</h3>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Free Initial Semantic Scan</p>
                </div>

                <div className="space-y-6">
                  <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center group hover:border-indigo-400 transition-all duration-500 bg-slate-50/50">
                    <input 
                      type="file" 
                      onChange={(e) => setResumeFileName(e.target.files?.[0]?.name || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    {fileName ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 p-4 rounded-2xl mb-4 shadow-xl shadow-indigo-200">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-slate-900 font-black">{fileName}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <Upload className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-900 font-black">Drop Executive Resume</p>
                        <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-tighter">PDF or DOCX accepted</p>
                      </div>
                    )}
                  </div>

                  <textarea 
                    placeholder="Paste Target Job Description..."
                    className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-6 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium resize-none"
                  />

                  <button 
                    onClick={simulateScan}
                    disabled={isUploading}
                    className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-200 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center gap-3">
                      {isUploading ? (
                        <><Loader2 className="h-6 w-6 animate-spin" /> SCANNING ARCHITECTURE...</>
                      ) : (
                        <><Target className="h-6 w-6" /> INITIALIZE SCAN <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" /></>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-[100px] opacity-50" />
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-20 tracking-tight">Built for high-stakes roles.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                {
                  icon: <Bot className="h-6 w-6 text-indigo-600" />,
                  title: "Semantic Mapping",
                  desc: "AI identifies the true intent behind JD requirements, not just simple keywords."
                },
                {
                  icon: <Target className="h-6 w-6 text-purple-600" />,
                  title: "90% Match Target",
                  desc: "Our engine iteratively optimizes your content until you hit the green zone."
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
                  title: "Executive Styling",
                  desc: "Horizontal rules and single-column formatting designed for machine parsing."
                }
              ].map((f, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="mb-6">{f.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{f.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Conversion Modal (The Hook) */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setShowUpsell(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[500px] bg-white rounded-[3rem] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="h-40 w-40 text-indigo-600" />
              </div>
              
              <div className="text-center relative z-10">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Analysis Complete</h2>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                  We've identified <span className="text-indigo-600 font-black underline underline-offset-4 text-lg">12 critical gaps</span> in your resume architecture. Secure your account to unlock the full 90%+ match strategy.
                </p>
                
                <div className="space-y-4">
                  <Link 
                    href="/auth/login"
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                  >
                    Unlock Full Result <Lock className="h-4 w-4" />
                  </Link>
                  <button 
                    onClick={() => setShowUpsell(false)}
                    className="w-full py-5 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all text-sm uppercase tracking-widest"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-white py-12 border-t border-slate-100 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-slate-900 tracking-tighter uppercase text-sm">ResumeATS Engine</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Semantic Optimization Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
