import { DollarSign } from 'lucide-react';

export function DriverEarnings() {
    const transactions = [
        { id: 1, date: '10 Oct', trip: 'Mumbai -> Pune', amount: 4500, status: 'Completed' },
        { id: 2, date: '05 Oct', trip: 'Local 8hr', amount: 1500, status: 'Completed' },
        { id: 3, date: '01 Oct', trip: 'Airport Drop', amount: 800, status: 'Processing' },
    ];

    return (
        <div className="earnings-container">
            <div className="earnings-header">
                <h1>Monthly Earnings</h1>
                <p>Track your income and payouts.</p>
            </div>

            <div className="summary-card glass-panel">
                <div className="total-balance">
                    <span className="label">Total Balance</span>
                    <div className="amount">₹6,800</div>
                    <span className="subtext">+ ₹1,200 this week</span>
                </div>
                <button className="btn btn-primary withdraw-btn">Withdraw Funds</button>
            </div>

            <div className="history-section">
                <h3>Transaction History</h3>
                <div className="history-list">
                    {transactions.map(tx => (
                        <div key={tx.id} className="tx-item glass-panel">
                            <div className="tx-left">
                                <div className="icon-bg"><DollarSign size={18} /></div>
                                <div>
                                    <h4>{tx.trip}</h4>
                                    <p>{tx.date}</p>
                                </div>
                            </div>
                            <div className="tx-right">
                                <span className="tx-amount">+ ₹{tx.amount}</span>
                                <span className={`tx-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .earnings-container { max-width: 600px; margin: 0 auto; }
        .earnings-header { margin-bottom: 2rem; text-align: center; }
        
        .summary-card { padding: 2rem; text-align: center; margin-bottom: 3rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(15, 23, 42, 0.6)); }
        .total-balance { margin-bottom: 2rem; }
        .amount { font-size: 3rem; font-weight: 800; color: var(--text-primary); margin: 0.5rem 0; }
        .withdraw-btn { width: 100%; max-width: 200px; }
        
        .history-section h3 { margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .tx-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; margin-bottom: 1rem; }
        .tx-left { display: flex; gap: 1rem; align-items: center; }
        .icon-bg { width: 40px; height: 40px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); color: var(--success); display: flex; align-items: center; justify-content: center; }
        .tx-left h4 { font-size: 1rem; margin-bottom: 2px; }
        .tx-left p { font-size: 0.8rem; color: var(--text-secondary); }
        
        .tx-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .tx-amount { font-weight: 700; color: var(--success); }
        .tx-status { font-size: 0.75rem; }
        .tx-status.processing { color: var(--warning); }
        .tx-status.completed { color: var(--text-muted); }
      `}</style>
        </div>
    );
}
