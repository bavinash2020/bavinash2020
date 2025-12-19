import { useState } from 'react';

function App() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Driver Connect</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Premium Long-Trip Driver Hiring</p>
      </header>
      
      <main className="glass-panel" style={{ padding: '2rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Welcome to the MVP. Select your role to get started.</p>
        <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
           <button className="btn btn-primary">I am a Driver</button>
           <button className="btn btn-secondary">I am an Owner</button>
        </div>
      </main>
    </div>
  );
}

export default App;
