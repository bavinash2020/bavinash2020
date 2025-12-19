import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Award, ArrowRight } from 'lucide-react';
import { Typewriter } from '../components/Typewriter';
import type { TypewriterSegment } from '../components/Typewriter';

export function Home() {
  const navigate = useNavigate();

  const headlineSegments: TypewriterSegment[] = [
    { text: "Drive with " },
    { text: "Professionalism", className: "text-gradient" },
    { text: "," },
    { isBr: true },
    { text: "Hire with " },
    { text: "Confidence", className: "text-gradient" },
    { text: "." }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title" style={{ minHeight: '160px' }}>
          <Typewriter segments={headlineSegments} />
        </h1>
        <p className="hero-subtitle">
          The premium platform connecting verified professional drivers with car owners for long-distance trips and temporary hires.
        </p>

        <div className="cta-group">
          <div className="cta-card glass-panel" onClick={() => navigate('/login?role=driver')}>
            <h3>I am a Driver</h3>
            <p>Find premium trips, get paid securely, and build your reputation.</p>
            <span className="cta-link">Start Driving <ArrowRight size={16} /></span>
          </div>

          <div className="cta-card glass-panel" onClick={() => navigate('/login?role=owner')}>
            <h3>I am a Car Owner</h3>
            <p>Hire verified, rated drivers for your vehicle for any duration.</p>
            <span className="cta-link">Hire a Driver <ArrowRight size={16} /></span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="feature-item">
          <Shield className="feature-icon" size={32} />
          <h4>Verified Professionals</h4>
          <p>Every driver passes a rigorous background check and skills assessment.</p>
        </div>
        <div className="feature-item">
          <Clock className="feature-icon" size={32} />
          <h4>Flexible Booking</h4>
          <p>Hire for a day, a week, or a month. You decide the schedule.</p>
        </div>
        <div className="feature-item">
          <Award className="feature-icon" size={32} />
          <h4>Premium Service</h4>
          <p>Top-rated drivers who understand luxury and safety protocols.</p>
        </div>
      </section>

      <style>{`
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .cta-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-card {
          padding: 2rem;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-glow);
          border-color: var(--primary);
        }

        .cta-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .cta-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 600;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .feature-item {
          padding: 1rem;
        }

        .feature-icon {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}
