import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-white text-slate-900">
        <div className="text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-slate-200 mx-auto" />
          <h2 className="text-2xl font-black tracking-tight uppercase tracking-[0.2em]">Diagnostic Cache Empty</h2>
          <button onClick={() => navigate('/')} className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-slate-800 transition-all">Return to Analysis Hub</button>
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
      fill: result.severity === 'High' ? '#dc2626' : result.severity === 'Moderate' ? '#d97706' : '#2563eb' 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12 px-4 z-10 selection:bg-blue-100 selection:text-blue-700"
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* --- PREMIUM HUD HEADER --- */}
        <div className="flex flex-col md:flex-row items-center justify-between glass p-8 rounded-[2.5rem] border-slate-100 shadow-2xl no-print">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate('/assessment')} 
              className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-black uppercase tracking-widest text-xs cursor-pointer"
            >
              <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline">New Analysis</span>
            </button>
            <div className="h-12 w-px bg-slate-100 hidden md:block" />
            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <Microscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Diagnostic Summary</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Neural Analysis Report v1.2.4</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-6">
             <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Authenticated Node</div>
                <div className="text-xs font-bold text-slate-400 tabular-nums">ID# {Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
             </div>
             <button 
                onClick={handleSavePDF}
                className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-2xl flex items-center gap-3 active:scale-95"
             >
                <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </div>

        {/* --- MAIN ANALYTICS HUD --- */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* 1. Primary Classification Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 glass-card p-12 rounded-[3rem] relative overflow-hidden flex flex-col justify-between min-h-[450px]"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Fingerprint className="w-5 h-5 text-blue-600" />
                <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">AI Neural Analysis</h3>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end gap-x-10 gap-y-6 mb-10">
                <div className="space-y-2">
                  <div className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">
                    {result.prediction.split(' ')[0]} 
                    <span className="text-blue-600">{result.prediction.split(' ')[1] ? ' ' + result.prediction.split(' ')[1] : ''}</span>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest mb-4 border ${
                    result.severity === 'High' ? 'bg-red-50 text-red-600 border-red-100 shadow-sm' :
                    result.severity === 'Moderate' ? 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm' : 
                    'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm'
                  }`}>
                  <AlertTriangle className="w-4 h-4" /> {result.severity} Severity Index
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed max-w-3xl text-xl font-medium">
                Our AI model has identified a 
                <span className="text-slate-900 font-black italic"> {Math.round(result.confidence * 100)}% match </span> 
                with common ADHD behavioral and writing patterns. This is based on your focus levels and how you expressed your thoughts.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-100 mt-12">
              <MetricBox icon={<Dna className="text-blue-600" />} label="Pattern Match" value="Detected" />
              <MetricBox icon={<Zap className="text-amber-600" />} label="Mental Effort" value="Variable" />
              <MetricBox icon={<ClipboardCheck className="text-emerald-600" />} label="Data Quality" value="High" />
              <MetricBox icon={<Activity className="text-indigo-600" />} label="Tracking" value="Active" />
            </div>

            {/* Aesthetic Glow Overlays */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[140px] opacity-40 z-0" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[120px] opacity-20 z-0" />
          </motion.div>

          {/* 2. Confidence Matrix Card */}
          <div className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <Dna className="w-10 h-10 text-slate-100 absolute top-8 right-8 group-hover:rotate-12 transition-transform duration-700" />
            <h4 className="text-slate-900 font-black mb-8 text-[10px] uppercase tracking-[0.4em] opacity-40">Confidence Score</h4>
            
            <div className="w-full h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="75%" outerRadius="100%" barSize={24} data={gaugeData} startAngle={180} endAngle={0}>
                  <RadialBar minAngle={15} background dataKey="value" cornerRadius={16} fill={gaugeData[0].fill} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">
                    {Math.round(result.confidence * 100)}<span className="text-2xl text-slate-300">%</span>
                </span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mt-4">Composite Score</span>
              </div>
            </div>

            {result.analysis_details && (
              <div className="w-full mt-8 space-y-6 pt-10 border-t border-slate-100">
                <ProgressDetail label="Behavior Pattern" value={result.analysis_details.behavioral_proba} color="bg-slate-200" textColor="text-slate-400" />
                <ProgressDetail label="Writing Pattern" value={result.analysis_details.text_proba} color="bg-blue-600" textColor="text-blue-600" />
              </div>
            )}
          </div>
        </div>

        {/* --- IKS WISDOM ENGINE SECTION --- */}
        {!recommendations ? (
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-slate-50 p-14 rounded-[3.5rem] border border-slate-100 shadow-3xl flex flex-col md:flex-row items-center justify-between gap-12 group overflow-hidden relative"
          >
            <div className="space-y-6 max-w-2xl text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-100 rounded-full text-amber-700 font-black text-[10px] uppercase tracking-widest border border-amber-200">
                <Sparkles className="w-4 h-4" /> IKS Intelligence Integration
              </div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Improve your well-being with <span className="text-amber-600 italic">Ancient Wisdom.</span></h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Connect your unique profile with natural wellness steps from traditional Yoga and Ayurveda.
              </p>
            </div>
            <button
              onClick={handleGetRecommendations}
              disabled={recLoading}
              className={`group flex items-center gap-5 bg-amber-500 hover:bg-amber-400 text-white px-12 py-7 rounded-[2.5rem] font-black text-xl shadow-xl transition-all transform active:scale-95 z-10 ${recLoading ? 'opacity-50 grayscale cursor-wait' : ''}`}
            >
              {recLoading ? (
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  Synthesizing...
                </div>
              ) : (
                <>Generate Wellness Guide <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /></>
              )}
            </button>
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:opacity-100 opacity-50 transition-opacity" />
          </motion.div>
        ) : (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">IKS Holistic Protocols</h3>
                <p className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px]">Neural-Traditional Convergence v2.0</p>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                 <ShieldCheck className="w-4 h-4 text-emerald-600" /> Protocol Alignment Verified
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <IksCard icon={<Sun />} title="Yoga & Exercise" subtitle="Balance your Body" items={recommendations.yoga} theme="orange" />
              <IksCard icon={<Wind />} title="Breathing" subtitle="Calm your Mind" items={recommendations.pranayama} theme="blue" />
              <IksCard icon={<Moon />} title="Meditation" subtitle="Sleep better" items={recommendations.meditation} theme="indigo" />
              <IksCard icon={<Leaf />} title="Natural Herbs" subtitle="Healthy Boost" items={recommendations.herbs} theme="emerald" />
              <IksCard icon={<Heart />} title="Daily Routine" subtitle="Daily Habits" items={recommendations.lifestyle} theme="rose" />
              <div className="glass-dark p-10 rounded-[3rem] flex flex-col justify-center text-slate-700 relative overflow-hidden group border-slate-100">
                 <Sparkle className="absolute top-6 right-6 text-slate-100 group-hover:rotate-12 transition-transform duration-700 w-28 h-28" />
                 <p className="relative z-10 text-lg italic font-medium leading-relaxed text-slate-500">
                   "{recommendations.note}"
                 </p>
                 <div className="mt-8 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Synthesized Wisdom Engine</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SECONDARY ANALYTICS GRID --- */}
        <div className="grid lg:grid-cols-2 gap-10 pt-10">

          {/* Radar Visualization */}
          <div className="glass p-12 rounded-[3.5rem] border-slate-100 shadow-xl">
            <div className="flex items-center justify-between mb-12 px-4">
                <h4 className="text-slate-900 font-black text-2xl tracking-tighter uppercase flex items-center gap-4">
                    <Activity className="w-8 h-8 text-blue-600" /> Behavioral Habits
                </h4>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Habit breakdown</div>
            </div>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="rgba(15,23,42,0.05)" strokeWidth={2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(15,23,42,0.4)', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <Radar name="Scoring" dataKey="A" stroke="#2563eb" strokeWidth={3} fill="url(#radarGradient)" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technical Disclosure & Next Steps */}
          <div className="glass-dark p-12 rounded-[3.5rem] shadow-3xl text-slate-900 relative overflow-hidden flex flex-col justify-between border-slate-100">
            <div className="relative z-10 space-y-10 text-center md:text-left">
              <h4 className="font-black text-4xl tracking-tighter leading-none uppercase">Technical <br /><span className="text-blue-600 italic">Disclosures</span></h4>
              
              <div className="space-y-8">
                <DisclaimerRow 
                    icon={<ShieldCheck className="text-emerald-600" />} 
                    title="Self-Screening Tool" 
                    desc="This is an AI screening tool for awareness. It is NOT a medical diagnosis and cannot replace a professional doctor's evaluation."
                />
                <DisclaimerRow 
                    icon={<Activity className="text-blue-600" />} 
                    title="Next Phase Actions" 
                    desc="If these analytics correlate with chronic executive dysfunction, it is recommended to bring this report to a mental health professional."
                />
              </div>

              <div className="pt-10">
                 <button onClick={handleSavePDF} className="w-full h-20 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all no-print shadow-2xl active:scale-[0.98]">
                    Generate Certified Report (PDF)
                 </button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 text-slate-100 font-black text-[150px] leading-none select-none pointer-events-none -mb-16 -ml-16 uppercase">
              ADHD
            </div>
          </div>
        </div>

        <footer className="max-w-6xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
          <div>&copy; 2024 ADHD Vision Lab &bull; v1.2.4 Production Build</div>
          <div className="flex gap-10">
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Protocol</span>
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Lab Hub</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

// --- MODERN HUD SUB-COMPONENTS ---

const ProgressDetail = ({ label, value, color, textColor }) => (
  <div className="space-y-3 text-left">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
      <span className="text-slate-400">{label}</span>
      <span className={textColor}>{Math.round(value * 100)}%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${value * 100}%` }} 
        transition={{ duration: 1.5, delay: 0.5 }}
        className={`h-full rounded-full ${color}`} 
      />
    </div>
  </div>
);

const MetricBox = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-2 hover:bg-slate-100 transition-colors group">
    <div className="p-3 w-fit bg-white rounded-2xl mb-2 group-hover:scale-110 shadow-sm transition-transform text-slate-700">
        {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em]">{label}</div>
    <div className="font-black text-slate-900 text-base tracking-tight uppercase">{value}</div>
  </div>
);

const IksCard = ({ icon, title, subtitle, items, theme }) => {
  const themes = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl transition-all group min-h-[350px] flex flex-col"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-all ${themes[theme]} group-hover:scale-110 group-hover:rotate-3`}>
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <div className="mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2">{subtitle}</h4>
        <h4 className="font-black text-slate-900 text-2xl tracking-tighter uppercase leading-none">{title}</h4>
      </div>
      <ul className="space-y-5 flex-1">
        {items?.map((item, index) => (
          <li key={index} className="flex items-start gap-5">
            <div className={`mt-2 shrink-0 w-2 h-2 rounded-full ${themes[theme].split(' ')[1].replace('text-', 'bg-')}`} />
            <span className="text-base font-semibold text-slate-500 leading-tight group-hover:text-slate-800 transition-colors">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between opacity-40">
         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Wellness Protocol</span>
         <Sparkle className="w-4 h-4 text-slate-200" />
      </div>
    </motion.div>
  );
};

const DisclaimerRow = ({ icon, title, desc }) => (
  <div className="flex gap-6 group text-center md:text-left">
    <div className="shrink-0 w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors mx-auto md:mx-0 text-slate-700">
       {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="space-y-2">
      <h5 className="font-black text-slate-900 text-xl tracking-tight uppercase">{title}</h5>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default ResultPage;
