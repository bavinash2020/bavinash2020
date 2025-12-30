import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, User as UserIcon, MapPin, DollarSign, Shield, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export type Role = 'driver' | 'owner' | 'admin';

interface LayoutProps {
  children: ReactNode;
  userRole?: Role; // If undefined, treated as guest
}

export function Layout({ children, userRole }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="layout-root">
      <nav className="navbar glass-panel">
        <div className="container nav-content">
          <Link to="/" className="brand">
            <Car className="icon" />
            <span>OYD</span>
          </Link>

          <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {!isAuthPage && (
              <>
                {/* Customer (Owner) Nav */}
                {userRole === 'owner' && (
                  <>
                    <NavItem to="/owner-dashboard" icon={MapPin} label="Book Trip" />
                    <NavItem to="/owner/trips" icon={Car} label="My Trips" />
                    <NavItem to="/owner/profile" icon={UserIcon} label="Profile" />
                    <NavItem to="/feedback" icon={MessageSquare} label="Feedback" />
                  </>
                )}

                {/* Driver Nav */}
                {userRole === 'driver' && (
                  <>
                    <NavItem to="/driver-dashboard" icon={Car} label="Requests" />
                    <NavItem to="/driver/trips" icon={MapPin} label="My Rides" />
                    <NavItem to="/driver/earnings" icon={DollarSign} label="Earnings" />
                    <NavItem to="/driver/profile" icon={UserIcon} label="Profile" />
                    <NavItem to="/feedback" icon={MessageSquare} label="Feedback" />
                  </>
                )}

                {/* Admin Nav */}
                {userRole === 'admin' && (
                  <>
                    <NavItem to="/admin/dashboard" icon={Shield} label="Verify Drivers" />
                    <NavItem to="/admin/trips" icon={MapPin} label="All Trips" />
                    <NavItem to="/admin/reports" icon={DollarSign} label="Reports" />
                    <NavItem to="/feedback" icon={MessageSquare} label="Feedback" />
                  </>
                )}

                {/* Guest Auth Buttons */}
                {!userRole && (
                  <div className="auth-buttons">
                    <Link to="/login" className="btn btn-sm btn-secondary">
                      Sign In
                    </Link>
                    <Link to="/signup" className="btn btn-sm btn-primary">
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Logout for Authenticated Users */}
                {userRole && (
                  <button onClick={handleLogout} className="btn btn-sm btn-ghost">
                    <LogOut size={18} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container main-content">
        {children}
      </main>

      <style>{`
        .layout-root {
          min-height: 100vh;
        }
        
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          margin: var(--spacing-md);
          padding: 1rem;
          border-radius: var(--radius-lg);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0; 
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--primary);
          letter-spacing: -0.5px;
        }

        .icon {
          color: var(--primary);
        }
        
        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .nav-link.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary);
        }

        .btn-ghost {
          color: var(--text-muted);
        }
        .btn-ghost:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }

        .auth-buttons {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .mobile-toggle {
          display: none;
          cursor: pointer;
        }
        
        .main-content {
          padding-top: var(--spacing-xl);
          padding-bottom: var(--spacing-xl);
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 1rem;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            margin-top: 0.5rem;
          }

          .nav-links.mobile-open {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
