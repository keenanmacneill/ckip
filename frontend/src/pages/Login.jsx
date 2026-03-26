import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';

export default function Login() {
  const navigate = useNavigate();

  const signin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-title">CKIP // Authorized Access Only</div>
      <div className="login-signin-title">Sign In</div>
      <input className="login-email" type="text" placeholder="Email"></input>
      <input
        className="login-password"
        type="password"
        placeholder="Password"
      ></input>
      {/* TO DO: actually check email and password */}
      <button className="login-signin-button" onClick={signin}>
        Sign In
      </button>
      <div className="login-signup">
        Need access? <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}
