import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save, User, Activity, Coffee } from 'lucide-react';
import { predictADHD } from '../services/api';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 22,
    gender: 'Other',
    education: 'Bachelor',
    sleep_hours: 7.0,
    screen_time: 5.0,
    focus_level: 5.0,
    hyperactivity: 5.0,
    impulsiveness: 5.0,
    stress_level: 5.0,
    attention_span: 5.0,
    task_completion: 5.0,
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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: '25%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-3 rounded-full ${step === i ? 'bg-blue-600' : 'bg-slate-200'}`} />
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
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-slate-900 mb-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                </div>

                <div className="space-y-4">
                  <InputGroup label="Age" name="age" value={formData.age} onChange={handleChange} min={10} max={100} type="number" />

                  <div className="grid grid-cols-2 gap-4">
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
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-slate-900 mb-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold">Behavioral Assessment</h2>
                </div>

                <div className="space-y-8">
                  <SliderGroup label="Focus Level" description="How easy is it for you to stay focused?" name="focus_level" value={formData.focus_level} onChange={handleSliderChange} />
                  <SliderGroup label="Hyperactivity" description="Do you often feel restless or physically active?" name="hyperactivity" value={formData.hyperactivity} onChange={handleSliderChange} />
                  <SliderGroup label="Impulsiveness" description="Do you make quick decisions without thinking?" name="impulsiveness" value={formData.impulsiveness} onChange={handleSliderChange} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-slate-900 mb-2">
                  <Coffee className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold">Lifestyle & Productivity</h2>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Sleep Hours" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} type="number" step="0.5" />
                    <InputGroup label="Screen Time" name="screen_time" value={formData.screen_time} onChange={handleChange} type="number" step="0.5" />
                  </div>
                  <SliderGroup label="Attention Span" description="How long can you focus on a single task?" name="attention_span" value={formData.attention_span} onChange={handleSliderChange} />
                  <SliderGroup label="Task Completion" description="Do you often finish what you start?" name="task_completion" value={formData.task_completion} onChange={handleSliderChange} />
                  <SliderGroup label="Stress Level" description="How stressed have you felt lately?" name="stress_level" value={formData.stress_level} onChange={handleSliderChange} />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-slate-900 mb-2">
                  <Save className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold">Personal Journal (AI Text Analysis)</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Our AI models will analyze your writing for patterns associated with ADHD. Describe your daily challenges, thoughts, or any experiences you think are relevant.
                  </p>
                  <textarea
                    name="journal_text"
                    value={formData.journal_text}
                    onChange={handleChange}
                    placeholder="E.g., I find it really hard to start tasks, even when I know they are important. My mind often drifts to other things..."
                    className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl p-6 outline-none focus:border-blue-600 transition-colors resize-none leading-relaxed"
                  />
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 text-blue-600 text-xs font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                    Our trained models analyze tone, vocabulary, and linguistic patterns from your actual dataset recordings.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors"
                disabled={loading}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all cursor-pointer"
              >
                Next <ArrowRight className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all cursor-pointer ${loading ? 'opacity-70' : 'hover:bg-emerald-700'}`}
              >
                {loading ? 'Analyzing...' : <><Save className="w-5 h-5 text-white" /> Get Prediction</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input {...props} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" />
  </div>
);

const SelectGroup = ({ label, options, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <select {...props} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SliderGroup = ({ label, description, name, value, onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <div>
        <h4 className="font-bold text-slate-800">{label}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className="text-blue-600 font-bold text-lg">{value}</span>
    </div>
    <input
      type="range"
      min="1" max="10" step="0.5"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
      <span>Low / Poor</span>
      <span>High / Excellent</span>
    </div>
  </div>
);

export default AssessmentPage;
