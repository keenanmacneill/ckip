import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../style/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Header />

      <main className="error-page">
        <div className="error-page__content">
          <div className="error-page__eyebrow">CKIP - NAVIGATION ERROR</div>

          <div className="error-page__code">404</div>

          <div className="error-page__title">Page not found</div>

          <div className="error-page__message">
            The route you requested doesn't exist or you don't have clearance to
            view it.
          </div>

          <div className="error-page__actions">
            <button className="page-action-primary" onClick={handleDashboard}>
              Go to dashboard
            </button>
          </div>

          <div className="error-page__timestamp">
            Error logged: {new Date().toISOString()}
          </div>
        </div>
      </main>
    </>
  );
}
