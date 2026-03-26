import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const signin = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <div>Welcome to the Civil Knowledge Integration Platform</div>
      <div>Sign In</div>
      <div>
        or <Link to="/signup">create an account</Link>
      </div>
      <input type="text" placeholder="Email"></input>
      <input type="password" placeholder="Password"></input>
      {/* TO DO: actually check email and password, check valid email domain */}
      <button onClick={signin}>Sign In</button>
    </div>
  );
}
