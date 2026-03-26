import { useNavigate } from 'react-router-dom';
import '../style/Header.css';

export default function Header() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToReports = () => {
    navigate('/reports');
  };

  const logout = () => {
    navigate('/');
  };

  return (
    <div className="header-container">
      <div className="header-title">
        CKIP / Civil Knowledge Integration Platform
      </div>
      <div className="nav-container">
        <div className="nav-dashboard" onClick={goToDashboard}>
          Dashboard
        </div>
        <div className="nav-reports" onClick={goToReports}>
          Reports
        </div>
        <div className="nav-logout" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
}
