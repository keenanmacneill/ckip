import { Link, useNavigate } from 'react-router-dom';
import '../style/Auth.css';

export default function Signup() {
  const navigate = useNavigate();

  const signup = e => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container auth-container-wide card">
        <div className="auth-version">
          CKIP <span>// ACCESS REQUEST</span>
        </div>

        <h1 className="auth-title">Request access</h1>
        <p className="auth-subtitle">
          Accounts require S2 approval before activation.
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
                <option>CW-1</option>
                <option>CW-2</option>
                <option>CW-3</option>
                <option>CW-4</option>
                <option>CW-5</option>
                <option>E-1</option>
                <option>E-2</option>
                <option>E-3</option>
                <option>E-4</option>
                <option>E-5</option>
                <option>E-6</option>
                <option>E-7</option>
                <option>E-8</option>
                <option>E-9</option>
                <option>O-1</option>
                <option>O-2</option>
                <option>O-3</option>
                <option>O-4</option>
                <option>O-5</option>
                <option>O-6</option>
                <option>O-7</option>
                <option>O-8</option>
                <option>O-9</option>
                <option>O-10</option>
                <option>O-11</option>
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
              <option>1st PSYOP</option>
              <option>1st SFG</option>
              <option>3rd PSYOP</option>
              <option>3rd SFG</option>
              <option>5th PSYOP</option>
              <option>5th SFG</option>
              <option>6th PSYOP</option>
              <option>7th PSYOP</option>
              <option>7th SFG</option>
              <option>8th PSYOP</option>
              <option>9th PSYOP</option>
              <option>10th SFG</option>
              <option>91st CA</option>
              <option>92nd CA</option>
              <option>95th CA</option>
              <option>96th CA</option>
              <option>97th CA</option>
              <option>98th CA</option>
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
              <option>Secret</option>
              <option>Top Secret</option>
              <option>TS/SCI</option>
            </select>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="justification">
              Justification
            </label>
            <input
              id="justification"
              type="text"
              placeholder="OCONUS CA assessment support"
            />
          </div>

          {/* TO DO: check valid email domain */}
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
