import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import bg from './assets/form-bg.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [signupType, setSignupType] = useState("client");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cnic: "",
    username: "",
    password: "",
    portfolioUrl: "",
    cameraGear: "",
    profileType: "",
    budgetRange: "",
    bio: "",
    profileImage: null,
  });

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const signupUser = async (e) => {
    e.preventDefault();
  
    const formPayload = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formPayload.append(key, formData[key]);
      }
    }
    formPayload.append("role", signupType);
  
    try {
      const response = await fetch("backend_url/api/auth/signup/", {
        method: "POST",
        body: formPayload, 
      });
  
      if (!response.ok) throw new Error("Signup failed");
  
      alert("User registered successfully")
      navigate(signupType === "client" ? "/clientfeed" : "/creatorfeed");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
      <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', padding: 0 , paddingTop : signupType === "creator" ? "50px" : 0}}
          className="auth-container">
    
          <div className="blurred-overlay"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(3px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', zIndex: 1}}>              
          </div>

      <div style={{ position: 'relative', zIndex: 2 }} className="auth-box">
        <h2>SIGN UP AS A {signupType.toUpperCase()}</h2>
        <form className="signup-form" onSubmit={signupUser}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="CNIC" required />
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

          {signupType === "creator" && (
            <>
              <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="Linktree or Portfolio URL" />
              <input name="cameraGear" value={formData.cameraGear} onChange={handleChange} placeholder="Camera Gear Description" />
              <input name="profileType" value={formData.profileType} onChange={handleChange} placeholder="Profile Type" />
              <input name="budgetRange" value={formData.budgetRange} onChange={handleChange} placeholder="Budget Range" />
              <div>
                <label style={{border:"None"}}>Profile Image</label>
                <input style={{marginTop:"5px"}} name="profileImage" type="file" accept="image/*" onChange={handleChange} />
              </div>
              <textarea name="bio" rows="2" value={formData.bio} onChange={handleChange} placeholder="Bio" />
              
              
            </>
          )}

          <button type="submit">Sign Up</button>
        </form>

        <button onClick={() => setSignupType((prev) => (prev === "client" ? "creator" : "client"))}>
          Switch to {signupType === "client" ? "Creator" : "Client"}'s Signup
        </button>

        <p className="toggle-text">
          Already have an account? <Link to="/login"><span>Log in</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
