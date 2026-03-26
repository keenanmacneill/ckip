import { useNavigate } from 'react-router-dom';
import '../style/Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-title">
          CKIP<span>/ Civil Knowledge Integration Platform</span>
        </div>

        <div className="header-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/reports')}>Reports</button>
          <button className="header-logout" onClick={() => navigate('/')}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
