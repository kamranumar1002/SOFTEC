import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "./assets/form-bg.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("client");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      role: loginType,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      localStorage.clear();
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_id', data.user._id);
      localStorage.setItem('role', loginType);

      setIsLoggedIn(true);

      if (loginType === "client") {
        navigate("/clientfeed");
      } else {
        navigate("/creatorfeed");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: 0,
      }}
      className="auth-container"
    >
      <div
        className="blurred-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          zIndex: 1,
        }}
      ></div>

      <div className="auth-box" style={{ position: "relative", zIndex: 2 }}>
        <h2>{`LOG IN AS A ${loginType.toUpperCase()}`}</h2>
        {!isLoggedIn ? (
          <form onSubmit={loginUser}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              placeholder="Username"
              required
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              type="password"
              placeholder="Password"
              required
            />

            <button style={{ backgroundColor: "#333" }} type="submit">
              Log In
            </button>
          </form>
        ) : (
          <button style={{ backgroundColor: "#333" }} onClick={logoutUser}>
            Log Out
          </button>
        )}

        {!isLoggedIn && (
          <button
            onClick={() =>
              setLoginType((prev) => (prev === "client" ? "creator" : "client"))
            }
          >
            {`Switch to  ${loginType === "client" ? "Creator" : "Client"}'s Login`}
          </button>
        )}

        {!isLoggedIn && (
          <p className="toggle-text">
            Don't have an account?
            <Link to="/signup">
              <span> Sign Up</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;