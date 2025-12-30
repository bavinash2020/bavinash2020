import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { DriverDashboard } from './pages/DriverDashboard';
import { DriverProfile } from './pages/driver/DriverProfile';
import { DriverTrips } from './pages/driver/DriverTrips';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { OwnerProfile } from './pages/owner/OwnerProfile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DriverEarnings } from './pages/driver/DriverEarnings';
import { Feedback } from './pages/Feedback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/feedback" element={<Layout><Feedback /></Layout>} />


      {/* Driver Routes */}
      <Route path="/driver-dashboard" element={<Layout userRole="driver"><DriverDashboard /></Layout>} />
      <Route path="/driver/trips" element={<Layout userRole="driver"><DriverTrips /></Layout>} />
      <Route path="/driver/profile" element={<Layout userRole="driver"><DriverProfile /></Layout>} />

      <Route path="/driver/earnings" element={<Layout userRole="driver"><DriverEarnings /></Layout>} />

      {/* Owner Routes */}
      <Route path="/owner-dashboard" element={<Layout userRole="owner"><OwnerDashboard /></Layout>} />
      <Route path="/owner/profile" element={<Layout userRole="owner"><OwnerProfile /></Layout>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Layout userRole="admin"><AdminDashboard /></Layout>} />
    </Routes>
  );
}

export default App;
