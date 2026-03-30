import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { CLEARANCES, RANK_GRADES, UNITS } from '../helpers/signupSelectOptions';
import '../style/Auth.css';

export default function Signup() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const { register, user } = useContext(AppContext);
  const navigate = useNavigate();

  const signup = async e => {
    e.preventDefault();
    const res = await register(emailValue, passwordValue);
    if (res.ok) {
      setPasswordValue('');
      navigate('/');
    } else {
      setPasswordValue('');
      const data = await res.json();
      setSubmitMessage(data.message);
    }
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
          CKIP <span>// ACCESS REQUEST</span>
        </div>

        <h1 className="auth-title">Request access</h1>

        <p className="auth-subtitle">
          Accounts require S2 approval before activation
        </p>

        <form className="auth-form" onSubmit={signup}>
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="fullName">
              Full name
            </label>

            <input id="fullName" type="text" placeholder="Doe, John A." />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="john.a.doe.mil@socom.mil"
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

          <div className="auth-row">
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="rank">
                Grade
              </label>

              <select id="rank" defaultValue="">
                <option value="" disabled>
                  Select
                </option>

                {RANK_GRADES.map(g => (
                  <option value={g.toLowerCase()}>{g}</option>
                ))}
              </select>
            </div>

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="mos">
                MOS
              </label>

              <input id="mos" type="text" placeholder="35F" />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="unit">
              Unit
            </label>

            <select id="unit" defaultValue="">
              <option value="" disabled>
                Select
              </option>

              {UNITS.map(u => (
                <option value={u.toLowerCase()}>{u}</option>
              ))}
            </select>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="clearance">
              Clearance level
            </label>

            <select id="clearance" defaultValue="">
              <option value="" disabled>
                Select
              </option>

              {CLEARANCES.map(c => (
                <option value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="justification">
              Justification
            </label>

            <input
              id="justification"
              type="text"
              placeholder="Deployment, OCONUS support..."
            />
          </div>

          {submitMessage && <div className="auth-message">{submitMessage}</div>}

          <button className="auth-button" type="submit">
            Submit request
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
