import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import videoBg from '../assets/206173_medium.mp4';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black font-['Outfit']">
      {/* 1. Cinematic Background Video - Maximum Presence */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        {/* Subtle Dark Vignette for Focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* 2. Top Navigation Bar - Minimal & Transparent */}
      <header className="relative z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 text-white font-black text-2xl tracking-tighter drop-shadow-lg pointer-events-auto cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-2 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span>ADHD <span className="text-white/60 font-light">VISION</span></span>
        </div>
      </header>

      {/* 3. Hero Content - Confined to Center Viewport */}
      <main className="relative z-10 h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-10">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500/10 backdrop-blur-2xl border border-white/20 rounded-full text-blue-300 font-bold text-xs uppercase tracking-[0.3em] mb-4 shadow-xl"
          >
            <Sparkles className="w-4 h-4" /> AI Neural Diagnostic
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              Decoding <br /> 
              <span className="text-blue-500 italic">Complexity.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-md"
            >
              Advanced AI linguistic patterns & behavioral mapping <br />
              to understand the neurodivergent spectrum.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center pt-8"
            >
              <button
                onClick={() => navigate('/assessment')}
                className="group relative inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-14 py-6 rounded-full font-black text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:shadow-[0_0_70px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Start Assessment
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* 4. Bottom Status Area - No Scrolling Needed */}
      <footer className="absolute bottom-10 left-0 w-full z-50 px-10 flex justify-between items-end pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-6 pointer-events-auto">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Model Precision</span>
                <span className="text-lg font-black text-blue-400">89.4%</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Classification</span>
                <span className="text-lg font-black text-blue-400">CNN + LSTM</span>
            </div>
        </div>
        
        <div className="text-right">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-1">ADHD VISION LAB</p>
            <div className="flex gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase">System Active</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
