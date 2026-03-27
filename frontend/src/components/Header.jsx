import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../style/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);

  return (
    <div className="header">
      <div className="header-inner">
        <div
          className="header-title"
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          CKIP<span>/ Civil Knowledge Integration Platform</span>
        </div>

        <div className="header-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/reports')}>Reports</button>
          <button
            className="header-logout"
            onClick={async () => {
              await logout();
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
