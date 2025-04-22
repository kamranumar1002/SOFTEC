import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Log In</h2>

        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <Link to="/clientfeed">
        <button> Log In as a client</button>
        </Link>

        <Link to="/creatorfeed">
        <button>Log in as a creator</button>
        </Link>



        <p className="toggle-text">
          Don't have an account?
          <Link to="/signup">
            <span> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
