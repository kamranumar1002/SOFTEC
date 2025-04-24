import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreCreators from "./ExploreCreators";

const Clientfeed = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
      navigate('/login');
    }
  }, [])
  return (
    <div className="client-feed-wrapper">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/messages">
          <button className="sidebar-btn">Inbox</button>
        </Link>
        <Link to="/requests">
          <button className="sidebar-btn">View Requests</button>
        </Link>
      </aside>

      <main className="client-main">
        <h1 className="page-title">Client Feed</h1>
        <div className="feed-container">
          <h2>Explore Creators</h2>
          <ExploreCreators />
        </div>
      </main>
    </div>
  );
};

export default Clientfeed;
