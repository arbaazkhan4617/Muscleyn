"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Target, Dumbbell, Zap } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// AI Quiz Steps
const steps = [
  {
    id: "goal",
    question: "What is your primary fitness goal?",
    options: [
      { id: "muscle", label: "Build Muscle", icon: Dumbbell, desc: "Increase mass and strength" },
      { id: "fat_loss", label: "Burn Fat", icon: Zap, desc: "Get lean and defined" },
      { id: "performance", label: "Performance", icon: Target, desc: "Boost stamina and energy" }
    ]
  },
  {
    id: "experience",
    question: "What is your training experience?",
    options: [
      { id: "beginner", label: "Beginner", desc: "Just starting out" },
      { id: "intermediate", label: "Intermediate", desc: "1-3 years of consistent training" },
      { id: "advanced", label: "Advanced", desc: "3+ years of intense training" }
    ]
  },
  {
    id: "diet",
    question: "How would you describe your diet?",
    options: [
      { id: "vegan", label: "Plant-Based", desc: "No animal products" },
      { id: "balanced", label: "Balanced", desc: "Mix of everything" },
      { id: "keto", label: "Keto / Low-Carb", desc: "High fat, low carb" }
    ]
  }
];

// Mock Recommendation Logic
const getRecommendation = (answers: any) => {
  const isVegan = answers.diet === 'vegan';
  const isMuscle = answers.goal === 'muscle';
  
  return {
    stackName: isMuscle ? (isVegan ? "Plant Power Mass Stack" : "Ultimate Muscle Builder") : "Lean Definition Stack",
    description: "Based on your unique profile, our AI has curated this exact supplement stack to accelerate your progress.",
    products: [
      {
        id: 1,
        name: isVegan ? "Vegan Protein Isolate" : "Whey Protein Gold",
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2670&auto=format&fit=crop",
        reason: "Essential for post-workout recovery and hitting your daily macros."
      },
      {
        id: 2,
        name: answers.goal === 'performance' ? "Endurance BCAA" : "Pre-Workout Elite",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2670&auto=format&fit=crop",
        reason: "Delivers smooth energy and intense focus for your training sessions."
      },
      {
        id: 3,
        name: "Pure Creatine Monohydrate",
        image: "https://images.unsplash.com/photo-1626279933903-516d001dfd60?q=80&w=2574&auto=format&fit=crop",
        reason: "Proven to increase strength and cellular hydration."
      }
    ]
  };
};

export default function AIRecommenderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [steps[currentStep].id]: optionId }));
    
    // Automatically proceed to next step after a short delay
    setTimeout(() => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            analyzeResults();
        }
    }, 500);
  };

  const analyzeResults = () => {
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      const result = getRecommendation(answers);
      setRecommendation(result);
      setIsAnalyzing(false);
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex flex-col pt-20">
        
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] bg-red-900/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 relative z-10 flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-xs mb-6">
              <Sparkles className="w-4 h-4" /> Muscleyn AI
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {recommendation ? "Your Custom Stack" : "Find Your Perfect Stack"}
            </h1>
            <p className="text-zinc-400 max-w-lg mx-auto font-medium">
              {recommendation 
                ? "Powered by AI, tailored to your exact physiology and goals." 
                : "Answer 3 quick questions and our AI will build a personalized supplement protocol for your goals."}
            </p>
          </div>

          {/* Quiz Container */}
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait">
              
              {!isAnalyzing && !recommendation && (
                <motion.div 
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-2xl"
                >
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 mb-12">
                    {steps.map((_, idx) => (
                      <div key={idx} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                         {idx <= currentStep && (
                             <motion.div 
                               initial={{ width: "0%" }}
                               animate={{ width: "100%" }}
                               transition={{ duration: 0.5 }}
                               className="absolute inset-0 bg-red-600"
                             />
                         )}
                      </div>
                    ))}
                  </div>

                  <h2 className="text-3xl font-black mb-8 text-center">{steps[currentStep].question}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {steps[currentStep].options.map((option) => {
                      const Icon = (option as any).icon;
                      const isSelected = answers[steps[currentStep].id] === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 overflow-hidden group ${
                            isSelected 
                              ? "border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(220,38,38,0.2)] scale-[0.98]" 
                              : "border-white/10 bg-zinc-900/50 hover:bg-white/5 hover:border-white/20"
                          }`}
                        >
                          {Icon && (
                            <div className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-red-500 text-white' : 'bg-white/5 text-zinc-400 group-hover:text-white'}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                          )}
                          <h3 className={`text-xl font-black mb-2 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{option.label}</h3>
                          <p className={`text-sm font-medium ${isSelected ? 'text-red-200' : 'text-zinc-500'}`}>{option.desc}</p>
                          
                          {isSelected && (
                              <div className="absolute top-4 right-4 text-red-500">
                                  <CheckCircle2 className="w-6 h-6" />
                              </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {currentStep > 0 && (
                      <div className="mt-12 flex justify-center">
                          <button 
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors"
                          >
                              <ArrowLeft className="w-4 h-4" /> Previous Step
                          </button>
                      </div>
                  )}
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="relative w-32 h-32 mb-8">
                     <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-red-500 border-r-red-500 animate-spin"></div>
                     <div className="absolute inset-2 rounded-full border-4 border-white/5 border-b-red-600 animate-[spin_2s_linear_infinite_reverse]"></div>
                     <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-red-500 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-black mb-2 text-white">Analyzing Your Profile</h2>
                  <p className="text-zinc-400 font-medium">Cross-referencing 100+ clinical studies...</p>
                </motion.div>
              )}

              {recommendation && !isAnalyzing && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="w-full"
                >
                   <div className="bg-gradient-to-b from-zinc-900/80 to-black rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                       
                       <div className="relative z-10">
                           <div className="text-center mb-12">
                               <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-4">
                                   {recommendation.stackName}
                               </h2>
                               <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                                   {recommendation.description}
                               </p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                               {recommendation.products.map((product: any, idx: number) => (
                                   <motion.div 
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.2 + (idx * 0.1) }}
                                      key={product.id} 
                                      className="bg-black/50 rounded-3xl p-6 border border-white/5 hover:border-red-500/30 transition-colors group"
                                   >
                                       <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-zinc-950">
                                           <Image 
                                              src={product.image}
                                              alt={product.name}
                                              fill
                                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                                           />
                                       </div>
                                       <h3 className="text-lg font-black mb-2 text-white">{product.name}</h3>
                                       <p className="text-sm text-zinc-500 leading-relaxed font-medium">{product.reason}</p>
                                   </motion.div>
                               ))}
                           </div>

                           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                               <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3">
                                   Add Stack To Cart <ArrowRight className="w-4 h-4" />
                               </button>
                               <button 
                                 onClick={resetQuiz}
                                 className="w-full sm:w-auto px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors flex items-center justify-center gap-3"
                               >
                                   <RotateCcw className="w-4 h-4" /> Retake Quiz
                               </button>
                           </div>
                       </div>
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
