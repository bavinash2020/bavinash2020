import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendOtp } from '../services/sms';
import { Smartphone, ArrowRight, CheckCircle } from 'lucide-react';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<'driver' | 'owner' | 'admin'>('owner');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'driver' || roleParam === 'owner' || roleParam === 'admin') {
      setRole(roleParam as any);
    }
  }, [searchParams]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    // Generate random 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('Mobile:', mobile, 'Generated OTP:', generatedOtp);

    setIsLoading(true);

    // Call Fast2SMS Service with new signature
    const result = await sendOtp({ phone: mobile, otp: generatedOtp });
    setIsLoading(false);

    if (result.success) {
      setStep('otp'); // Move to OTP step
      localStorage.setItem('mock_otp', generatedOtp);

      if ((result as any).simulated) {
        alert(`DEMO MODE: Your OTP is ${generatedOtp}`);
      } else {
        alert('OTP sent to your mobile!');
      }
    } else {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    setIsLoading(true);

    // Simulate API & Redirect
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'driver') navigate('/driver-dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/owner-dashboard');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <h2>Welcome to OYD</h2>
          <p>{step === 'mobile' ? 'Enter your mobile number to continue' : `Enter the OTP sent to +91 ${mobile}`}</p>
        </div>

        {step === 'mobile' && (
          <div className="role-toggle">
            <button className={`toggle-btn ${role === 'owner' ? 'active' : ''}`} onClick={() => setRole('owner')}>Customer</button>
            <button className={`toggle-btn ${role === 'driver' ? 'active' : ''}`} onClick={() => setRole('driver')}>Driver</button>
            <button className={`toggle-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="form-group">
              <label>Mobile Number</label>
              <div className="input-wrapper">
                <span className="prefix">+91</span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  required
                />
                <Smartphone size={18} className="input-icon-right" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading || mobile.length < 10}>
              {isLoading ? 'Sending OTP...' : <><span style={{ marginRight: 8 }}>Get OTP</span> <ArrowRight size={18} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="form-group">
              <label>One-Time Password (OTP)</label>
              <div className="otp-inputs">
                <input
                  type="text"
                  placeholder="1234"
                  className="otp-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  autoFocus
                  required
                />
              </div>
              <p className="resend-text">Didn't receive it? <span className="link" onClick={() => setStep('mobile')}>Resend</span></p>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading || otp.length < 4}>
              {isLoading ? 'Verifying...' : <><span style={{ marginRight: 8 }}>Verify & Login</span> <CheckCircle size={18} /></>}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
        }
        .login-header { text-align: center; margin-bottom: 2rem; }
        .role-toggle {
          display: flex;
          background: var(--bg-secondary);
          padding: 4px;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .toggle-btn {
          flex: 1;
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: var(--bg-primary);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .prefix {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .input-wrapper input {
          width: 100%;
          padding: 12px 12px 12px 48px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: white;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }
        .input-icon-right {
          position: absolute;
          right: 12px;
          color: var(--text-muted);
        }
        .otp-field {
          width: 100%;
          padding: 1rem;
          font-size: 1.5rem;
          text-align: center;
          letter-spacing: 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--primary);
        }
        .btn-block { width: 100%; margin-top: 1rem; }
        .resend-text { font-size: 0.85rem; text-align: center; margin-top: 1rem; color: var(--text-secondary); }
        .link { color: var(--primary); cursor: pointer; }
      `}</style>
    </div>
  );
}
