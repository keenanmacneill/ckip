import { Link, useNavigate } from 'react-router-dom';
import '../style/Auth.css';

export default function Signup() {
  const navigate = useNavigate();

  const signup = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container card">
        <div className="auth-version">
          CKIP <span>// v2.1</span>
        </div>

        <div className="auth-banner status-banner">
          <span className="auth-dot status-dot"></span>
          <span>Requesting platform access</span>
        </div>

        <h1 className="auth-title">Request access</h1>
        <p className="auth-subtitle">Civil Knowledge Integration Platform</p>

        <div className="auth-form">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="email">
              Username
            </label>
            <input
              id="email"
              type="text"
              placeholder="john.a.smith.mil@socom.mil"
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button className="auth-button" onClick={signup}>
            Submit request
          </button>
        </div>

        <div className="auth-footer">
          Already have access? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
