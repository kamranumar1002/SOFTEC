import React from 'react';
import { Link } from 'react-router-dom';
import './Creatorfeed.css'; // Import the CSS file for styling

const CreatorLayout = ({ children }) => {
  return (
    <div className="creator-feed-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/creator/messages">
          <button className="sidebar-btn">Inbox</button>
        </Link>
        <Link to="/creator/catalogManager">
          <button className="sidebar-btn">Manage Catalog</button>
        </Link>
        <Link to="/creator/creatorReview">
          <button className="sidebar-btn">Your Reviews</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="creator-main">{children}</main>
    </div>
  );
};

export default CreatorLayout;