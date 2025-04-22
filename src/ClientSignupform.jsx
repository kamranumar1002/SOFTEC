import React from "react";

const ClientSignupForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Client Signup</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />
          <input type="text" name="cnic" placeholder="CNIC" required />
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />

          <label>Upload Profile Image:</label>
          <input type="file" name="profileImage" accept="image/*" />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default ClientSignupForm;
