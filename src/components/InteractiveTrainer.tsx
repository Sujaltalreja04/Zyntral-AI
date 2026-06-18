import React, { useState, useEffect } from 'react';
import { Cpu, Play, CheckCircle, RefreshCw } from 'lucide-react';

export const InteractiveTrainer: React.FC = () => {
  const [model, setModel] = useState('llama-3-8b');
  const [method, setMethod] = useState('lora');
  const [epochs, setEpochs] = useState('3');
  const [lr, setLr] = useState('2e-5');
  const [status, setStatus] = useState<'idle' | 'training' | 'completed'>('idle');
  
  const [currentEpoch, setCurrentEpoch] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [currentLoss, setCurrentLoss] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [vram, setVram] = useState(0);
  const [throughput, setThroughput] = useState(0);

  const totalSteps = 300;

  useEffect(() => {
    if (status !== 'training') return;

    let step = 0;
    let localEpoch = 1;
    setLossHistory([2.42]);
    setCurrentLoss(2.42);
    setAccuracy(42.5);
    setVram(72.4); // 72.4% VRAM
    setThroughput(1850); // tokens/sec

    const interval = setInterval(() => {
      step += 15;
      setCurrentStep(step);

      // Math for loss decrease
      const completionRatio = step / totalSteps;
      const noise = (Math.random() - 0.5) * 0.15;
      const baseLoss = 2.4 * Math.exp(-2.2 * completionRatio) + 0.3;
      const nextLoss = Math.max(0.25, parseFloat((baseLoss + noise).toFixed(3)));
      
      setLossHistory((prev) => [...prev, nextLoss]);
      setCurrentLoss(nextLoss);

      // Accuracy increase
      const baseAcc = 42.5 + (88.4 - 42.5) * completionRatio;
      setAccuracy(parseFloat((baseAcc + (Math.random() - 0.5) * 2).toFixed(1)));

      // VRAM and Throughput variation
      setVram(parseFloat((72.4 + (Math.random() - 0.5) * 1.5).toFixed(1)));
      setThroughput(Math.floor(1850 + (Math.random() - 0.5) * 120));

      // Epoch transitions
      if (step === 100) localEpoch = 2;
      if (step === 200) localEpoch = 3;
      setCurrentEpoch(localEpoch);

      if (step >= totalSteps) {
        clearInterval(interval);
        setStatus('completed');
        setCurrentLoss(0.321);
        setAccuracy(89.2);
        setVram(0);
        setThroughput(0);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [status]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('training');
  };

  const handleReset = () => {
    setStatus('idle');
    setCurrentStep(0);
    setLossHistory([]);
  };

  return (
    <div className="glass-card" style={{ padding: '40px', background: 'rgba(5, 5, 12, 0.5)' }}>
      <div className="glow-glow" style={{ background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 60%)' }}></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', position: 'relative', zIndex: 2 }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
            <Cpu size={24} style={{ color: '#d1d5db' }} />
            On-Prompt Fine-Tuner
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', marginTop: '5px' }}>
            Initiate automated model optimization and alignments.
          </p>
        </div>
        
        {status !== 'idle' && (
          <button 
            onClick={handleReset} 
            className="nav-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={status === 'training' ? 'spin-anim' : ''} />
            Configure New
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', position: 'relative', zIndex: 2 }}>
        {/* Left Side: Parameters Setup */}
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '25px', borderRadius: '15px' }}>
          {status === 'idle' ? (
            <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="input-group">
                <label className="input-label">Base Model</label>
                <select 
                  value={model} 
                  onChange={(e) => setModel(e.target.value)} 
                  className="input-field"
                  style={{ appearance: 'none' }}
                >
                  <option value="llama-3-8b">Llama-3-8B-Instruct (8.0B parameters)</option>
                  <option value="mistral-7b">Mistral-7B-v0.2 (7.2B parameters)</option>
                  <option value="phi-3-medium">Phi-3-Medium (14.0B parameters)</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Alignment Strategy</label>
                <select 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)} 
                  className="input-field"
                  style={{ appearance: 'none' }}
                >
                  <option value="lora">LoRA Fine-Tuning (Rank=8, Alpha=16)</option>
                  <option value="qlora">QLoRA Quantized SFT (4-bit Double Quant)</option>
                  <option value="dpo">Direct Preference Optimization (DPO)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="input-group">
                  <label className="input-label">Epochs</label>
                  <select 
                    value={epochs} 
                    onChange={(e) => setEpochs(e.target.value)} 
                    className="input-field"
                  >
                    <option value="1">1 Epoch</option>
                    <option value="3">3 Epochs</option>
                    <option value="5">5 Epochs</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Learning Rate</label>
                  <select 
                    value={lr} 
                    onChange={(e) => setLr(e.target.value)} 
                    className="input-field"
                  >
                    <option value="1e-5">1e-5</option>
                    <option value="2e-5">2e-5 (Recommended)</option>
                    <option value="5e-5">5e-5</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(95deg, #ffffff 0%, #9ca3af 100%)', alignSelf: 'stretch', justifyContent: 'center' }}>
                <Play size={16} fill="currentColor" />
                Initialize Training Loop
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={20} className={status === 'training' ? 'spin-anim' : ''} style={{ color: status === 'completed' ? 'var(--green)' : '#d1d5db' }} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {status === 'training' ? `Training: Epoch ${currentEpoch}/3` : 'Model Merged & Saved!'}
                </span>
              </div>

              {/* Training Metrics Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontStyle: 'normal', fontSize: '0.75rem', color: 'var(--muted-color)' }}>Training Loss</span>
                  <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#e5e7eb', marginTop: '4px' }}>
                    {currentLoss.toFixed(3)}
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontStyle: 'normal', fontSize: '0.75rem', color: 'var(--muted-color)' }}>Validation Acc</span>
                  <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>
                    {accuracy}%
                  </div>
                </div>
              </div>

              {/* Hardware Monitor */}
              {status === 'training' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted-color)' }}>
                      <span>GPU VRAM Allocation (A100 SXM4)</span>
                      <span>{vram}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                      <div style={{ height: '100%', width: `${vram}%`, background: '#9ca3af' }}></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted-color)' }}>
                    <span>Throughput Velocity</span>
                    <span style={{ color: '#fff', fontFamily: 'monospace' }}>{throughput} Tok/sec</span>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--green)' }} />
                  <div style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                    Model compiled, validated, and pushed to active API registry.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Training Log / Graphical Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <span className="input-label" style={{ marginBottom: '5px' }}>Loss Convergence curve</span>
          <div 
            style={{ 
              height: '220px', 
              background: 'rgba(5, 5, 8, 0.7)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '4px',
              position: 'relative'
            }}
          >
            {/* Loss graph Y Axis Labels */}
            <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
              <span>2.5</span>
              <span>1.5</span>
              <span>0.5</span>
            </div>

            {/* Bars representing steps */}
            {status === 'idle' ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--muted-color)', fontSize: '0.85rem' }}>
                Start fine-tuning to populate metrics...
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', width: '100%', height: '100%', paddingLeft: '25px' }}>
                {lossHistory.map((loss, idx) => {
                  const maxLoss = 2.5;
                  const percentHeight = (loss / maxLoss) * 100;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        flex: 1, 
                        height: `${Math.min(100, Math.max(5, percentHeight))}%`, 
                        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(156, 163, 175, 0.5))',
                        borderRadius: '2px 2px 0 0',
                        position: 'relative',
                        transition: 'height 0.3s ease'
                      }}
                      title={`Step ${idx}: Loss ${loss}`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {status === 'training' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
              <span>Iter: {currentStep}/{totalSteps}</span>
              <span>Est. Remaining: {((totalSteps - currentStep) * 0.4).toFixed(0)}s</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTrainer;
