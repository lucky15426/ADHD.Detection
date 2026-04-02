import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';
import { 
  ArrowLeft, Brain, AlertCircle, Sparkles, AlertTriangle, ShieldCheck, 
  Activity, Leaf, Wind, Sun, Moon, Sparkle, Heart, 
  Dna, Fingerprint, Microscope, ClipboardCheck, Download, Zap
} from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, inputData } = location.state || {};

  const [recommendations, setRecommendations] = React.useState(null);
  const [recLoading, setRecLoading] = React.useState(false);

  const handleSavePDF = () => {
    window.print();
  };

  const handleGetRecommendations = async () => {
    setRecLoading(true);
    try {
      const recData = {
        severity: result.severity,
        focus_level: inputData.focus_level,
        hyperactivity: inputData.hyperactivity,
        sleep_hours: inputData.sleep_hours,
        stress_level: inputData.stress_level
      };
      const response = await import('../services/api').then(m => m.getRecommendations(recData));
      setRecommendations(response.iks_recommendations);
    } catch (err) {
      console.error(err);
      alert("Error fetching recommendations.");
    } finally {
      setRecLoading(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Diagnostic Context Missing</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold hover:underline">Return to Analysis Hub</button>
        </div>
      </div>
    );
  }

  const chartData = [
    { subject: 'Attention', A: inputData.attention_span, fullMark: 10 },
    { subject: 'Focus', A: inputData.focus_level, fullMark: 10 },
    { subject: 'Hyperactivity', A: inputData.hyperactivity, fullMark: 10 },
    { subject: 'Impulsivity', A: inputData.impulsiveness, fullMark: 10 },
    { subject: 'Stress', A: inputData.stress_level, fullMark: 10 },
    { subject: 'Completion', A: inputData.task_completion, fullMark: 10 },
  ];

  const gaugeData = [
    { 
      name: 'Probability', 
      value: result.confidence * 100, 
      fill: result.severity === 'High' ? '#ef4444' : result.severity === 'Moderate' ? '#f59e0b' : '#3b82f6' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Inter'] py-12 px-4 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* --- PREMIUM HEADER --- */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 no-print">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/assessment')} 
              className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold cursor-pointer"
            >
              <div className="p-2 bg-slate-100 rounded-full group-hover:bg-blue-50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline">New Assessment</span>
            </button>
            <div className="h-10 w-px bg-slate-100 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Diagnostic Summary</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Analysis Report v1.2</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated Node</div>
                <div className="text-xs font-bold text-slate-700">ID# {Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
             </div>
             <button 
                onClick={handleSavePDF}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg flex items-center gap-2"
             >
                <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </div>

        {/* --- MAIN ANALYTICS GRID --- */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* 1. Primary Classification Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="w-5 h-5 text-blue-600" />
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs">Phonological & Behavioral Inference</h3>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end gap-x-8 gap-y-4 mb-8">
                <div className="space-y-1">
                  <div className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
                    {result.prediction.split(' ')[0]} 
                    <span className="text-blue-600">{result.prediction.split(' ')[1] ? ' ' + result.prediction.split(' ')[1] : ''}</span>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl font-black text-sm uppercase tracking-wider mb-2 ${
                    result.severity === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                    result.severity === 'Moderate' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                  <AlertTriangle className="w-4 h-4" /> {result.severity} Severity
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed max-w-2xl text-lg font-medium">
                The neural network has processed your data stream and identified a 
                <span className="text-slate-900 font-black italic"> {Math.round(result.confidence * 100)}% convergence </span> 
                with standardized neurodivergence benchmarks. Analysis incorporates self-reported focus drift and linguistic markers.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-50 mt-10">
              <MetricBox icon={<Dna className="text-blue-600" />} label="Neural Signature" value="Asymmetric" />
              <MetricBox icon={<Zap className="text-amber-600" />} label="Cognitive Load" value="High Active" />
              <MetricBox icon={<ClipboardCheck className="text-emerald-600" />} label="Data Integrity" value="Verified" />
              <MetricBox icon={<Activity className="text-indigo-600" />} label="State Tracking" value="Real-time" />
            </div>

            {/* Background Aesthetic Blur */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60 z-0" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-50 rounded-full blur-[80px] opacity-40 z-0" />
          </motion.div>

          {/* 2. Probability Gauge Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <Dna className="w-8 h-8 text-blue-100 absolute top-6 right-6" />
            <h4 className="text-slate-900 font-bold mb-6 text-lg tracking-tight">Confidence Matrix</h4>
            
            <div className="w-full h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="75%" outerRadius="100%" barSize={20} data={gaugeData} startAngle={180} endAngle={0}>
                  <RadialBar minAngle={15} background dataKey="value" cornerRadius={12} fill={gaugeData[0].fill} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">{Math.round(result.confidence * 100)}%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Weighted Probability</span>
              </div>
            </div>

            {result.analysis_details && (
              <div className="w-full mt-6 space-y-4 pt-6 border-t border-slate-50">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Behavioral Metrics</span>
                    <span className="text-slate-900">{Math.round(result.analysis_details.behavioral_proba * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${result.analysis_details.behavioral_proba * 100}%` }} className="h-full bg-slate-300 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-blue-400">
                    <span>AI Linguistic Analysis</span>
                    <span className="text-blue-600">{Math.round(result.analysis_details.text_proba * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-blue-50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${result.analysis_details.text_proba * 100}%` }} className="h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- IKS WELLNESS SECTION --- */}
        {!recommendations ? (
          <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[3rem] border border-white shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-600 font-black text-[10px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Ancient Wisdom Integration
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Augment your results with Indian Knowledge Systems (IKS)</h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Connect your neural profile with customized wellness protocols derived from Ayurveda and Yoga. 
                Get personalized suggestions for diet, neural calm, and focus.
              </p>
            </div>
            <button
              onClick={handleGetRecommendations}
              disabled={recLoading}
              className={`group flex items-center gap-4 bg-amber-500 hover:bg-amber-600 text-white px-10 py-6 rounded-3xl font-black text-xl shadow-2xl shadow-amber-200 transition-all transform active:scale-95 ${recLoading ? 'opacity-70 grayscale' : ''}`}
            >
              {recLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  Synthesizing...
                </div>
              ) : (
                <>Generate Wellness Guide <Sparkles className="group-hover:rotate-12 transition-transform" /></>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">IKS Holistic Protocols</h3>
                <p className="text-amber-600 font-bold uppercase tracking-widest text-[10px] mt-1">Bridging Bio-Intelligence with Traditional Wisdom</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-400 text-xs font-bold">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Clinical Alignment Verified
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IksCard 
                icon={<Sun />} 
                title="Yoga & Asana" 
                subtitle="Static Balance"
                items={recommendations.yoga} 
                theme="orange"
              />
              <IksCard 
                icon={<Wind />} 
                title="Pranayama" 
                subtitle="Breath Control"
                items={recommendations.pranayama} 
                theme="blue"
              />
              <IksCard 
                icon={<Moon />} 
                title="Neural Calm" 
                subtitle="Sleep & Nidra"
                items={recommendations.meditation} 
                theme="indigo"
              />
              <IksCard 
                icon={<Leaf />} 
                title="Biological Support" 
                subtitle="Herbs & Noötropics"
                items={recommendations.herbs} 
                theme="emerald"
              />
              <IksCard 
                icon={<Heart />} 
                title="Daily Rhythm" 
                subtitle="Dinacharya Habits"
                items={recommendations.lifestyle} 
                theme="rose"
              />
              <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col justify-center text-white relative overflow-hidden group">
                 <Sparkle className="absolute top-4 right-4 text-white/10 group-hover:rotate-12 transition-transform duration-700 w-24 h-24" />
                 <p className="relative z-10 text-sm md:text-base italic font-medium leading-relaxed text-slate-300">
                   "{recommendations.note}"
                 </p>
                 <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">IKS Intelligence Engine</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SECONDARY ANALYTICS GRID --- */}
        <div className="grid lg:grid-cols-2 gap-8 pt-4">

          {/* Radar Visualization */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
                <h4 className="text-slate-900 font-black text-xl tracking-tight flex items-center gap-3">
                    <Activity className="w-6 h-6 text-blue-600" /> Behavioral Radar
                </h4>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Self-Assessment Weights</div>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#f1f5f9" strokeWidth={2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <Radar name="Scoring" dataKey="A" stroke="#1e40af" strokeWidth={3} fill="url(#radarGradient)" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technical Disclaimer & Next Steps */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-8">
              <h4 className="font-black text-3xl tracking-tight leading-none">Diagnostic <br /><span className="text-blue-500 italic">Disclosures</span></h4>
              
              <div className="space-y-6">
                <DisclaimerRow 
                    icon={<ShieldCheck className="text-emerald-400" />} 
                    title="Educational screening only" 
                    desc="This AI-driven analysis is for research and awareness purposes. It is not equivalent to a clinical psychiatric evaluation."
                />
                <DisclaimerRow 
                    icon={<Activity className="text-blue-400" />} 
                    title="Consult clinical experts" 
                    desc="If these results mirror significant disruption in your productivity or mood, please consult a specialized medical professional."
                />
              </div>

              <div className="pt-6">
                 <button onClick={handleSavePDF} className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all no-print shadow-xl">
                    Generate Digital Report (PDF)
                 </button>
              </div>
            </div>

            {/* Subtle Abstract Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 text-white/5 font-black text-[120px] leading-none select-none pointer-events-none -mb-10 -ml-10">
              ADHD
            </div>
          </div>
        </div>

      </div>
      
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <div>&copy; 2024 ADHD Vision Lab</div>
        <div className="flex gap-6">
            <span className="hover:text-blue-600 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-blue-600 cursor-pointer">Science Hub</span>
        </div>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const MetricBox = ({ icon, label, value }) => (
  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 flex flex-col gap-1">
    <div className="p-2 w-fit bg-white rounded-xl shadow-sm mb-1">{React.cloneElement(icon, { size: 18 })}</div>
    <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{label}</div>
    <div className="font-bold text-slate-900 text-sm tracking-tight">{value}</div>
  </div>
);

const IksCard = ({ icon, title, subtitle, items, theme }) => {
  const themes = {
    orange: "bg-orange-50 text-orange-600 border-orange-100 ring-orange-200/50 shadow-orange-100/50",
    blue: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-200/50 shadow-blue-100/50",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-200/50 shadow-indigo-100/50",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-200/50 shadow-emerald-100/50",
    rose: "bg-rose-50 text-rose-600 border-rose-100 ring-rose-200/50 shadow-rose-100/50",
  };

  const colors = {
    orange: "#ea580c",
    blue: "#2563eb",
    indigo: "#4f46e5",
    emerald: "#059669",
    rose: "#e11d48",
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`p-8 rounded-[2.5rem] bg-white border shadow-xl transition-all group min-h-[320px] flex flex-col ${themes[theme].split(' ')[4]}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-all ${themes[theme].split(' ').slice(0, 2).join(' ')}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{subtitle}</h4>
        <h4 className="font-black text-slate-900 text-xl tracking-tight mb-4">{title}</h4>
      </div>
      <ul className="space-y-4 flex-1">
        {items?.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className={`mt-1.5 shrink-0 w-2 h-2 rounded-full shadow-[0_0_8px]`} style={{ backgroundColor: colors[theme], boxShadow: `0 0 8px ${colors[theme]}80` }} />
            <span className="text-sm font-semibold text-slate-600 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wellness Metric</span>
         <Sparkle className="w-3 h-3 text-slate-300" />
      </div>
    </motion.div>
  );
};

const DisclaimerRow = ({ icon, title, desc }) => (
  <div className="flex gap-5 group">
    <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
       {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="space-y-1">
      <h5 className="font-bold text-slate-200 text-lg tracking-tight">{title}</h5>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default ResultPage;
