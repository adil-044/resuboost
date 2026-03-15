'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, FileText, Bot, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6 shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Next-Gen ATS Optimization Engine</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8"
              >
                Get past the robots. <br />
                <span className="text-indigo-600">Land the interview.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Stop losing jobs to bad formatting. Our AI-driven engine restructures your experience into a machine-readable format that ATS algorithms love.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  href="/dashboard"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Get Started for Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  How it Works
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[120px]" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-indigo-600" />,
                  title: "Instant Scoring",
                  description: "Real-time ATS strength analysis based on hard-keyword salience and structural integrity."
                },
                {
                  icon: <Bot className="h-6 w-6 text-purple-600" />,
                  title: "AI Optimization",
                  description: "Contextual injection of missing keywords into your bullet points without sounding like a robot."
                },
                {
                  icon: <FileText className="h-6 w-6 text-green-600" />,
                  title: "Machine-Readable PDF",
                  description: "Clean, single-column exports that bypass the formatting pitfalls of legacy hiring systems."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-transparent transition-all"
                >
                  <div className="bg-white w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 ResumeATS Engine. Built for the modern job seeker.</p>
        </div>
      </footer>
    </div>
  );
}
