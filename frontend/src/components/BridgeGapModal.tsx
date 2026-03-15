'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { getGapQuestions, bridgeGapOptimize } from '@/lib/api';
import { useResumeStore } from '@/store/useResumeStore';

interface BridgeGapModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  onComplete: (newMarkdown: string) => void;
}

export default function BridgeGapModal({ isOpen, onClose, taskId, onComplete }: BridgeGapModalProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAnalysisResult } = useResumeStore();

  useEffect(() => {
    if (isOpen) {
      const fetchQuestions = async () => {
        setIsLoading(true);
        try {
          const res = await getGapQuestions(taskId);
          setQuestions(res.questions);
          setAnswers(new Array(res.questions.length).fill(''));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [isOpen, taskId]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const combinedAnswers = questions.map((q, i) => `Q: ${q}\nA: ${answers[i]}`).join('\n\n');
      const result = await bridgeGapOptimize(taskId, combinedAnswers);
      setAnalysisResult(result);
      onComplete(result.optimized_content.raw_text);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Optimization failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
          <X className="h-5 w-5" />
        </button>

        <div className="p-10">
          {isLoading ? (
            <div className="h-[400px] flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
              <p className="text-slate-500 font-bold animate-pulse text-sm">CRAFTING CUSTOM QUESTIONS...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Bridge the Gap</h2>
                  <p className="text-slate-500 text-sm font-medium">Answering these helps us reach that 90%+ match score.</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Step {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-slate-800 leading-snug">{questions[currentStep]}</h3>
                    <textarea 
                      autoFocus
                      value={answers[currentStep]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[currentStep] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      placeholder="Share specific details, metrics, or tools you used..."
                      className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none resize-none text-slate-700 text-sm"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!answers[currentStep] || isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Optimizing...</>
                  ) : (
                    <>{currentStep === questions.length - 1 ? 'Finish Scan' : 'Next Question'} <ChevronRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
