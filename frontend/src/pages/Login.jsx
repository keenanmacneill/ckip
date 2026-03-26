import { Link, useNavigate } from 'react-router-dom';
import '../style/Auth.css';

export default function Login() {
  const navigate = useNavigate();

  const signin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container card">
        <div className="auth-version">
          CKIP <span>// v2.1</span>
        </div>

        <div className="auth-banner status-banner">
          <span className="auth-dot status-dot"></span>
          <span>Authorized access only</span>
        </div>

        <h1 className="auth-title">Sign in</h1>
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
            <input id="password" type="password" placeholder="••••••••" />
          </div>

          <button className="auth-button" onClick={signin}>
            Authenticate
          </button>
        </div>

        <div className="auth-footer">
          No account? <Link to="/signup">Request access</Link>
        </div>
      </div>
    </div>
  );
}
