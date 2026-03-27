import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../style/Auth.css';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const { login, user } = useContext(AppContext);
  const navigate = useNavigate();

  const signin = async e => {
    e.preventDefault();
    const res = await login(emailValue, passwordValue);
    setPasswordValue('');

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }
    navigate('/dashboard');
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

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

        <form onSubmit={signin} className="auth-form">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="john.a.smith.mil@socom.mil"
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
            />
          </div>

          <button className="auth-button" type="submit">
            Authenticate
          </button>
        </form>

        <div className="auth-footer">
          No account? <Link to="/signup">Request access</Link>
        </div>
      </div>
    </div>
  );
}
