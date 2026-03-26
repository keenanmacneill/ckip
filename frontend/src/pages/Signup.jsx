import { useNavigate } from 'react-router-dom';

import '../style/Signup.css';

export default function Signup() {
  const navigate = useNavigate();

  const signup = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-title">CKIP // Signup</div>
      <div className="signup-subtitle">Request Access</div>
      <input className="signup-email" type="text" placeholder="Email"></input>
      <input
        className="signup-password"
        type="password"
        placeholder="Password"
      ></input>
      {/* TO DO: check valid email domain */}
      <button className="signup-button" onClick={signup}>
        Submit Request
      </button>
    </div>
  );
}
