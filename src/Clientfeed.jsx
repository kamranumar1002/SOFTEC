import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ExploreCreators from "./ExploreCreators";
import ClientSidebar from "./ClientSidebar";

const Clientfeed = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (!token || role !== "client") {
      navigate("/login");
    } else {
      setLoading(false);  
    }
  }, [])

  return loading ? "Loading..." : (
    <div className="client-feed-wrapper">
      <ClientSidebar />
 

      <main className="client-main">
        <h1 className="page-title">Client Feed</h1>
        <div className="feed-container">
          <h2>Explore Creators</h2>
          <ExploreCreators />
        </div>
      </main>
      </div>
)
};

export default Clientfeed;