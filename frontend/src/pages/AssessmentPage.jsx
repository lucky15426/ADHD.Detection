import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, User, Activity, Coffee, Sparkles } from 'lucide-react';
import { predictADHD } from '../services/api';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 22,
    gender: 'Other',
    education: 'Bachelor',
    sleep_hours: 8.0,
    screen_time: 2.0,
    focus_level: 1.0,
    hyperactivity: 1.0,
    impulsiveness: 1.0,
    stress_level: 1.0,
    attention_span: 10.0,
    task_completion: 10.0,
    journal_text: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: (name === 'journal_text' ? value : (parseFloat(value) || value)) }));
  };

  const handleSliderChange = (name, val) => {
    setFormData(prev => ({ ...prev, [name]: parseFloat(val) }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const dataToSubmit = {
        age: parseInt(formData.age),
        sleep_hours: parseFloat(formData.sleep_hours),
        screen_time: parseFloat(formData.screen_time),
        focus_level: parseFloat(formData.focus_level),
        hyperactivity: parseFloat(formData.hyperactivity),
        impulsiveness: parseFloat(formData.impulsiveness),
        stress_level: parseFloat(formData.stress_level),
        attention_span: parseFloat(formData.attention_span),
        task_completion: parseFloat(formData.task_completion),
        journal_text: formData.journal_text,
      };

      const result = await predictADHD(dataToSubmit);
      navigate('/result', { state: { result, inputData: formData } });
    } catch (err) {
      console.error(err);
      alert("Error submitting assessment. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-white py-12 px-4 z-10 flex items-center justify-center selection:bg-blue-100 selection:text-blue-700"
    >
      <div className="max-w-2xl w-full glass-card rounded-[2.5rem] overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 bg-white/5 w-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <button 
                onClick={() => navigate('/')} 
                className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold"
            >
              <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="text-sm uppercase tracking-widest hidden sm:inline">Exit</span>
            </button>
            
            <div className="flex gap-2.5">
              {[1, 2, 3, 4].map(i => (
                <div 
                    key={i} 
                    className={`h-1.5 transition-all duration-500 rounded-full ${step === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`} 
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-600">
                    <User className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Step 01</span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Personal Profile</h2>
                  <p className="text-slate-500 text-sm font-medium">Basic demographics for baseline comparison.</p>
                </div>

                <div className="space-y-6">
                  <InputGroup label="Age" name="age" value={formData.age} onChange={handleChange} min={10} max={100} type="number" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectGroup label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                    <SelectGroup label="Education" name="education" value={formData.education} onChange={handleChange} options={['High School', 'Bachelor', 'Master', 'PhD']} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Activity className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Step 02</span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Behavioral Habits</h2>
                  <p className="text-slate-500 text-sm font-medium">How you typically act and react.</p>
                </div>

                <div className="space-y-10">
                  <SliderGroup label="Focus Difficulty" description="Difficulty staying focused on one thing" name="focus_level" value={formData.focus_level} onChange={handleSliderChange} />
                  <SliderGroup label="Restlessness" description="Feeling the need to move or fidget constantly" name="hyperactivity" value={formData.hyperactivity} onChange={handleSliderChange} />
                  <SliderGroup label="Acting on Impulse" description="Tendency to do things without thinking first" name="impulsiveness" value={formData.impulsiveness} onChange={handleSliderChange} />
                  <SliderGroup label="Attention Span" description="How long you can pay attention to one thing" name="attention_span" value={formData.attention_span} onChange={handleSliderChange} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Coffee className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Step 03</span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Lifestyle & Sleep</h2>
                  <p className="text-slate-500 text-sm font-medium">Your daily routines and environment.</p>
                </div>

                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Sleep (Hours)" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} type="number" step="0.5" />
                    <InputGroup label="Screen Time" name="screen_time" value={formData.screen_time} onChange={handleChange} type="number" step="0.5" />
                  </div>
                  <SliderGroup label="Finishing Tasks" description="How often you finish the tasks you start" name="task_completion" value={formData.task_completion} onChange={handleSliderChange} />
                  <SliderGroup label="Stress Level" description="How much stress or pressure you feel daily" name="stress_level" value={formData.stress_level} onChange={handleSliderChange} />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Final Phase</span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Writing Sample</h2>
                  <p className="text-slate-500 text-sm font-medium">Share your thoughts to help the AI analyze your patterns.</p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <textarea
                        name="journal_text"
                        value={formData.journal_text}
                        onChange={handleChange}
                        placeholder="Type or paste a personal journal entry or a description of your typical day..."
                        className="w-full h-56 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 text-slate-900 outline-none focus:border-blue-500/50 transition-all resize-none leading-relaxed placeholder:text-slate-300"
                    />
                    <div className="absolute bottom-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {formData.journal_text.length} Characters
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg h-fit">
                        <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-blue-700 text-xs leading-relaxed font-semibold">
                            Our **AI Neural Network** will process this text to identify patterns and variances in the ADHD risk profile.
                        </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12 pt-10 border-t border-white/5">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 transition-all transform active:scale-95"
              >
                Next Step <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all transform active:scale-95 ${loading ? 'opacity-50 cursor-wait' : 'hover:bg-slate-800'}`}
              >
                {loading ? 'Synthesizing...' : <><Save className="w-4 h-4" /> Run Diagnosis</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InputGroup = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
    <input 
      {...props} 
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-blue-500/50 transition-all font-bold placeholder:text-slate-200" 
    />
  </div>
);

const SelectGroup = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
    <div className="relative">
        <select 
            {...props} 
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-blue-500/50 transition-all font-bold cursor-pointer"
        >
            {options.map(o => <option key={o} value={o} className="bg-white text-slate-900">{o}</option>)}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
            <ArrowRight className="w-4 h-4 rotate-90" />
        </div>
    </div>
  </div>
);

const SliderGroup = ({ label, description, name, value, onChange }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end px-2">
      <div className="space-y-1">
        <h4 className="font-black text-slate-900 text-lg tracking-tight">{label}</h4>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{description}</p>
      </div>
      <div className="text-blue-600 font-black text-xl tabular-nums">
        {value.toFixed(1)}
      </div>
    </div>
    <div className="relative pt-2">
        <input
            type="range"
            min="1" max="10" step="0.5"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500"
        />
        <div className="flex justify-between text-[9px] text-slate-300 font-black uppercase tracking-[0.2em] mt-3">
            <span>Minimum</span>
            <span>Maximum</span>
        </div>
    </div>
  </div>
);

export default AssessmentPage;
