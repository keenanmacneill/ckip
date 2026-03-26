import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ReportDetails from './pages/ReportDetails';
import Reports from './pages/Reports';
import './style/App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
