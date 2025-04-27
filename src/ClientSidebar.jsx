import React from "react";
import { Link } from "react-router-dom";

const ClientSidebar = () => {
  return (
    <aside style={sidebarStyle}>
      <Link to="/clientfeed" style={{ textDecoration: "none" }}><h2 style={headingStyle}>Dashboard</h2></Link>

      <div>
        <Link to="/new-request" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Create New Request</button>
        </Link>
        <Link to="/requests" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>View Requests</button>
        </Link>
      </div>
    </aside>
  );
};

const sidebarStyle = {
  backgroundColor: "#fff",
  borderRight: "1px solid #eee",
  minHeight: "100vh",
  minWidth: "10vw",
  padding: "30px 20px",
  boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
};

const headingStyle = {
  color: "#111",
  fontSize: "28px",
  marginBottom: "20px",
  textAlign: "center",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 2px",
  backgroundColor: "#000",
  color: "#fff",
  border: "1px solid #000",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default ClientSidebar;
