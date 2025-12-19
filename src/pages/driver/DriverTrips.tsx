import { useState } from 'react';
import { MapPin, Calendar, Navigation, CheckCircle } from 'lucide-react';

export function DriverTrips() {
    const [activeTrip, setActiveTrip] = useState({
        id: 101,
        customer: 'Rahul Verma',
        pickup: 'Mumbai',
        drop: 'Pune',
        status: 'assigned', // assigned, on_way, arrived, started, completed
    });

    const nextStatus = {
        'assigned': 'on_way',
        'on_way': 'arrived',
        'arrived': 'started',
        'started': 'completed'
    };

    const statusLabels: Record<string, string> = {
        'assigned': 'Trip Assigned',
        'on_way': 'On the Way to Pickup',
        'arrived': 'Arrived at Pickup',
        'started': 'Trip Started',
        'completed': 'Trip Completed'
    };

    const handleUpdateStatus = () => {
        setActiveTrip(prev => ({
            ...prev,
            status: (nextStatus as any)[prev.status] || 'completed'
        }));
    };

    if (activeTrip.status === 'completed') {
        return (
            <div className="trips-container center-content">
                <div className="glass-panel success-card">
                    <CheckCircle size={64} className="success-icon" />
                    <h2>Trip Completed!</h2>
                    <p>You have successfully completed the trip with {activeTrip.customer}.</p>
                    <button className="btn btn-primary" onClick={() => setActiveTrip({ ...activeTrip, status: 'assigned' })}>Back to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div className="trips-container">
            <div className="header">
                <h1>Active Trip</h1>
            </div>

            <div className="trip-card glass-panel">
                <div className="trip-header">
                    <div>
                        <h3>{activeTrip.customer}</h3>
                        <span className="badge">Round Trip</span>
                    </div>
                    <div className="status-badge">
                        {statusLabels[activeTrip.status]}
                    </div>
                </div>

                <div className="route-info">
                    <div className="point">
                        <div className="u-icon"><MapPin size={18} /></div>
                        <div>
                            <span className="label">Pickup</span>
                            <h4>{activeTrip.pickup}</h4>
                        </div>
                    </div>
                    <div className="connector"></div>
                    <div className="point">
                        <div className="u-icon"><MapPin size={18} /></div>
                        <div>
                            <span className="label">Drop</span>
                            <h4>{activeTrip.drop}</h4>
                        </div>
                    </div>
                </div>

                <div className="trip-meta">
                    <div className="meta-item"><Calendar size={16} /> 15 Oct - 17 Oct</div>
                </div>

                <div className="action-area">
                    <p>Current Status: <strong>{statusLabels[activeTrip.status]}</strong></p>
                    <button className="btn btn-primary btn-lg btn-block" onClick={handleUpdateStatus}>
                        <Navigation size={20} style={{ marginRight: 8 }} />
                        {activeTrip.status === 'assigned' && 'Start Navigation / On Way'}
                        {activeTrip.status === 'on_way' && 'Mark Arrived'}
                        {activeTrip.status === 'arrived' && 'Start Trip'}
                        {activeTrip.status === 'started' && 'Complete Trip'}
                    </button>
                </div>
            </div>

            <style>{`
        .trips-container { max-width: 600px; margin: 0 auto; }
        .center-content { min-height: 60vh; display: flex; align-items: center; justify-content: center; }
        .header { margin-bottom: 2rem; }
        
        .trip-card { padding: 0; overflow: hidden; }
        .trip-header { padding: 1.5rem; background: rgba(59, 130, 246, 0.1); display: flex; justify-content: space-between; align-items: flex-start; }
        .badge { background: var(--bg-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin-top: 4px; display: inline-block; }
        .status-badge { color: var(--success); font-weight: 600; font-size: 0.9rem; }
        
        .route-info { padding: 2rem; display: flex; flex-direction: column; gap: 0rem; position: relative; }
        .point { display: flex; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .u-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .label { font-size: 0.8rem; color: var(--text-secondary); }
        
        .connector { width: 2px; height: 40px; background: var(--border-color); margin-left: 17px; margin-top: -5px; margin-bottom: -5px; }
        
        .trip-meta { padding: 0 2rem; margin-bottom: 2rem; color: var(--text-secondary); display: flex; gap: 1rem; }
        .meta-item { display: flex; align-items: center; gap: 6px; }
        
        .action-area { padding: 2rem; border-top: 1px solid var(--border-color); background: rgba(0,0,0,0.1); text-align: center; }
        .action-area p { margin-bottom: 1rem; color: var(--text-secondary); }
        .action-area strong { color: var(--text-primary); }
        .btn-lg { width: 100%; padding: 1rem; font-size: 1.1rem; }
        
        .success-card { padding: 3rem; text-align: center; }
        .success-icon { color: var(--success); margin-bottom: 1rem; }
        .success-card h2 { margin-bottom: 1rem; }
        .success-card p { color: var(--text-secondary); margin-bottom: 2rem; }
      `}</style>
        </div>
    );
}
