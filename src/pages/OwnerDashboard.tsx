import { useState } from 'react';
import { MapPin, Calendar, Clock, Search, Star, Shield, Car } from 'lucide-react';

interface Driver {
    id: number;
    name: string;
    rating: number;
    experience: number;
    trips: number;
    rate: number;
    verified: boolean;
    image: string;
}

export function OwnerDashboard() {
    const [step, setStep] = useState<'search' | 'results' | 'booking'>('search');
    const [tripDetails, setTripDetails] = useState({
        pickup: '',
        drop: '',
        date: '',
        type: 'round-trip', // one-way, round-trip, local
        carType: 'sedan'
    });
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

    // Mock Drivers (FR-6)
    const drivers: Driver[] = [
        { id: 1, name: 'Rajesh Kumar', rating: 4.8, experience: 8, trips: 142, rate: 800, verified: true, image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D8ABC&color=fff' },
        { id: 2, name: 'Vikram Singh', rating: 4.9, experience: 12, trips: 310, rate: 1000, verified: true, image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=10B981&color=fff' },
        { id: 3, name: 'Amit Patel', rating: 4.6, experience: 4, trips: 56, rate: 700, verified: false, image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=F59E0B&color=fff' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('results');
    };

    const handleBook = (driver: Driver) => {
        setSelectedDriver(driver);
        setStep('booking');
    };

    const confirmBooking = () => {
        alert(`Booking confirmed with ${selectedDriver?.name}! Request sent.`);
        setStep('search');
        setSelectedDriver(null);
    };

    return (
        <div className="owner-dashboard">
            <div className="dashboard-header animated-fade-in">
                <h1>Book a Professional Driver</h1>
                <p>Reliable drivers for your outstation trips and local needs.</p>
            </div>

            {/* FR-5: Trip Creation Form */}
            {step === 'search' && (
                <div className="trip-form-card glass-panel animated-fade-in">
                    <form onSubmit={handleSearch}>
                        <div className="form-toggle">
                            <button
                                type="button"
                                className={`toggle-option ${tripDetails.type === 'round-trip' ? 'active' : ''}`}
                                onClick={() => setTripDetails({ ...tripDetails, type: 'round-trip' })}
                            >
                                Round Trip
                            </button>
                            <button
                                type="button"
                                className={`toggle-option ${tripDetails.type === 'one-way' ? 'active' : ''}`}
                                onClick={() => setTripDetails({ ...tripDetails, type: 'one-way' })}
                            >
                                One Way
                            </button>
                            <button
                                type="button"
                                className={`toggle-option ${tripDetails.type === 'local' ? 'active' : ''}`}
                                onClick={() => setTripDetails({ ...tripDetails, type: 'local' })}
                            >
                                Local (Hourly)
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <label>Pickup Location</label>
                                <div className="input-box">
                                    <MapPin size={18} className="icon" />
                                    <input
                                        type="text"
                                        placeholder="Enter pickup city/area"
                                        value={tripDetails.pickup}
                                        onChange={e => setTripDetails({ ...tripDetails, pickup: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Drop Location</label>
                                <div className="input-box">
                                    <MapPin size={18} className="icon" />
                                    <input
                                        type="text"
                                        placeholder="Enter destination"
                                        value={tripDetails.drop}
                                        onChange={e => setTripDetails({ ...tripDetails, drop: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Date</label>
                                <div className="input-box">
                                    <Calendar size={18} className="icon" />
                                    <input
                                        type="date"
                                        value={tripDetails.date}
                                        onChange={e => setTripDetails({ ...tripDetails, date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Time</label>
                                <div className="input-box">
                                    <Clock size={18} className="icon" />
                                    <input type="time" required />
                                </div>
                            </div>
                            <div className="input-group full-width">
                                <label>Car Type</label>
                                <div className="car-options">
                                    {['hatchback', 'sedan', 'suv', 'luxury'].map(type => (
                                        <div
                                            key={type}
                                            className={`car-option ${tripDetails.carType === type ? 'selected' : ''}`}
                                            onClick={() => setTripDetails({ ...tripDetails, carType: type })}
                                        >
                                            <Car size={20} />
                                            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary search-btn">
                            <Search size={20} /> Find Drivers
                        </button>
                    </form>
                </div>
            )}

            {/* FR-6: Driver Discovery */}
            {step === 'results' && (
                <div className="results-section animated-fade-in">
                    <button className="back-link" onClick={() => setStep('search')}>← Back to Search</button>
                    <h2>Available Drivers for {tripDetails.drop}</h2>

                    <div className="drivers-list">
                        {drivers.map(driver => (
                            <div key={driver.id} className="driver-card glass-panel">
                                <div className="driver-header">
                                    <img src={driver.image} alt={driver.name} className="driver-avatar" />
                                    <div className="driver-info">
                                        <h3>
                                            {driver.name}
                                            {driver.verified && <Shield size={16} className="verified-icon" fill="var(--success)" />}
                                        </h3>
                                        <div className="rating-row">
                                            <Star size={14} className="star" fill="#f59e0b" color="#f59e0b" /> <span style={{ fontWeight: 700 }}>{driver.rating}</span>
                                            <span className="experience">• {driver.experience} Yrs Exp</span>
                                            <span className="trips">• {driver.trips} Trips</span>
                                        </div>
                                    </div>
                                    <div className="driver-rate">
                                        <span className="rate-amount">₹{driver.rate}</span>
                                        <span className="rate-unit">/day</span>
                                    </div>
                                </div>

                                <div className="driver-badges">
                                    <span className="badge">Vaccinated</span>
                                    <span className="badge">Non-Smoker</span>
                                    <span className="badge">English Spoken</span>
                                </div>

                                <button className="btn btn-primary btn-book" onClick={() => handleBook(driver)}>
                                    Select Driver
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FR-7: Booking Confirmation */}
            {step === 'booking' && selectedDriver && (
                <div className="booking-review animated-fade-in">
                    <button className="back-link" onClick={() => setStep('results')}>← Back to Results</button>
                    <div className="glass-panel summary-card">
                        <h2>Booking Summary</h2>

                        <div className="summary-row">
                            <div className="col">
                                <span className="label">Driver</span>
                                <h3>{selectedDriver.name}</h3>
                            </div>
                            <div className="col text-right">
                                <span className="label">Rate</span>
                                <h3>₹{selectedDriver.rate}/day</h3>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="summary-row">
                            <div className="col">
                                <span className="label">Route</span>
                                <p>{tripDetails.pickup} ➝ {tripDetails.drop}</p>
                            </div>
                            <div className="col text-right">
                                <span className="label">Date</span>
                                <p>{tripDetails.date}</p>
                            </div>
                        </div>

                        <div className="payment-alert">
                            <p>Note: You will pay ₹500 advance now. Rest upon arrival.</p>
                        </div>

                        <button className="btn btn-primary btn-block btn-lg" onClick={confirmBooking}>
                            Confirm & Pay ₹500
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        .owner-dashboard { max-width: 800px; margin: 0 auto; }
        .dashboard-header { text-align: center; margin-bottom: 2rem; }
        .dashboard-header h1 { font-size: 2.2rem; margin-bottom: 0.5rem; }
        
        .trip-form-card { padding: 2rem; }
        .form-toggle { display: flex; background: var(--bg-secondary); padding: 5px; border-radius: var(--radius-md); margin-bottom: 1.5rem; }
        .toggle-option { flex: 1; padding: 10px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-radius: var(--radius-sm); font-weight: 500; transition: all 0.2s; }
        .toggle-option.active { background: var(--bg-primary); color: var(--text-primary); box-shadow: var(--shadow-sm); }
        .toggle-option:hover:not(.active) { color: var(--text-primary); }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .full-width { grid-column: 1 / -1; }
        
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); }
        .input-box { position: relative; display: flex; align-items: center; }
        .input-box .icon { position: absolute; left: 12px; color: var(--text-muted); }
        .input-box input { width: 100%; padding: 12px 12px 12px 42px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem; }
        
        .car-options { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 5px; }
        .car-option { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; min-width: 100px; transition: all 0.2s; background: var(--bg-secondary); }
        .car-option.selected { border-color: var(--primary); background: rgba(59, 130, 246, 0.1); color: var(--primary); }
        
        .search-btn { width: 100%; padding: 1rem; font-size: 1.1rem; gap: 0.5rem; display: flex; align-items: center; justify-content: center; }

        .back-link { background: none; border: none; color: var(--text-secondary); cursor: pointer; margin-bottom: 1rem; font-size: 0.9rem; }
        .back-link:hover { color: var(--primary); }

        .drivers-list { display: grid; gap: 1.5rem; margin-top: 1.5rem; }
        .driver-card { padding: 1.5rem; transition: transform 0.2s; }
        .driver-card:hover { transform: translateY(-2px); border-color: var(--primary); }
        
        .driver-header { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
        .driver-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; }
        .driver-info { flex: 1; }
        .driver-info h3 { display: flex; align-items: center; gap: 6px; font-size: 1.2rem; margin-bottom: 4px; }
        .verified-icon { color: var(--success); }
        .rating-row { display: flex; gap: 8px; font-size: 0.9rem; color: var(--text-secondary); }
        .star { color: var(--warning); font-weight: 700; }
        
        .driver-rate { text-align: right; }
        .rate-amount { display: block; font-size: 1.25rem; font-weight: 700; }
        .rate-unit { font-size: 0.8rem; color: var(--text-secondary); }
        
        .driver-badges { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .badge { background: var(--bg-secondary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: var(--text-secondary); border: 1px solid var(--border-color); }
        
        .btn-book { width: 100%; }

        /* Booking Review */
        .summary-card { padding: 2rem; max-width: 500px; margin: 0 auto; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .col .label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
        .text-right { text-align: right; }
        .divider { height: 1px; background: var(--border-color); margin: 1.5rem 0; }
        .payment-alert { background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 2rem; color: var(--primary); font-size: 0.9rem; text-align: center; }
        .btn-lg { padding: 1rem; font-size: 1.1rem; }
        
        .animated-fade-in { animation: fadeIn 0.4s ease-out; }
      `}</style>
        </div>
    );
}
