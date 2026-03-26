import { useNavigate } from 'react-router-dom';

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
    <div>
      <div>CKIP / Civil Knowledge Integration Platform</div>
      <div>
        <button onClick={goToDashboard}>Dashboard</button>
        <button onClick={goToReports}>Reports</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
