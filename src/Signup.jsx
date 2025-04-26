import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import bg from './assets/form-bg.jpg';

const Signup = () => {
  const navigate = useNavigate();

  const [signupType, setSignupType] = useState("client");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_no: "",
    cnic: "",
    username: "",
    password: "",
    camera_gear_desc: "",
    profile_type: "",
    budget_range: "",
    bio: "",
    profile_img: null,
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
  
    try {
      let profileImgURL = "";
  
      // 1. If user selected an image, upload it to CDN first
      if (formData.profile_img) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.profile_img);
        imageFormData.append("cloud_name", "dp4k97bhg"); // optional depending on CDN
        imageFormData.append("upload_preset", "unsigned");
  
        const imgUploadRes = await fetch("https://api.cloudinary.com/v1_1/dp4k97bhg/image/upload", {
          method: "POST",
          body: imageFormData,
        });
  
        const imgData = await imgUploadRes.json();
        profileImgURL = imgData.secure_url; // <-- get CDN URL
      }
  
      // 2. Now prepare final data to send
      const finalPayload = new FormData();
      for (const key in formData) {
        if (key === "profile_img") {
          if (profileImgURL) {
            finalPayload.append("profile_img", profileImgURL);
          }
        } else if (formData[key]) {
          finalPayload.append(key, formData[key]);
        }
      }
      finalPayload.append("role", signupType);
  
      // 3. Debug: see what is being sent
      for (let [key, value] of finalPayload.entries()) {
        console.log(key, value);
      }
  
      // 4. Send signup request
      const response = await fetch("http://localhost:5000/api/auth/signup/", {
        method: "POST",
        body: finalPayload,
      });
  
      if (!response.ok) throw new Error("Signup failed");
  
      alert("User registered successfully");
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
          <input name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required />
          <input name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          <input name="phone_no" type="tel" value={formData.phone_no} onChange={handleChange} placeholder="Phone Number" required />
          <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="CNIC" required />
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

          {signupType === "creator" && (
            <>
              <input name="camera_gear_desc" value={formData.camera_gear_desc} onChange={handleChange} placeholder="Camera Gear Description" />
              <input name="profile_type" value={formData.profile_type} onChange={handleChange} placeholder="Profile Type" />
              <input name="budget_range" value={formData.budget_range} onChange={handleChange} placeholder="Budget Range" />
              <div>
                <label style={{border:"None"}}>Profile Image</label>
                <input style={{marginTop:"5px"}} name="profile_img" type="file" accept="image/*" onChange={handleChange} />
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
