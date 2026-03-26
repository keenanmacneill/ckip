import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const signup = () => {
    navigate('/');
  };

  return (
    <div>
      <div>Welcome to the Civil Knowledge Integration Platform</div>
      <div>Enter your email and a password to sign up.</div>
      <input type="text" placeholder="Email"></input>
      <input type="password" placeholder="Password"></input>
      {/* TO DO: check valid email domain */}
      <button onClick={signup}>Sign Up and Return to Login</button>
    </div>
  );
}
