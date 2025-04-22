import { Link } from "react-router-dom";

const Creatorsignupform = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create account as a Creator</h2>

        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" required />
        <input type="text" placeholder="CNIC" required />
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />

        <input type="text" placeholder="Linktree or Portfolio URL" />
        <input type="text" placeholder="Camera Gear Description" />
        <input type="text" placeholder="Profile Type (e.g., Photographer, Videographer)" />
        <input type="text" placeholder="Budget Range (e.g., 5k–50k)" />

        <textarea placeholder="Bio" rows="3"></textarea>

        <label>Profile Image</label>
        <input type="file" accept="image/*" />

        <button>Submit</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Creatorsignupform;
