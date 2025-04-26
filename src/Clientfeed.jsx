import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreCreators from "./ExploreCreators";

const Clientfeed = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="client-feed">
      <ExploreCreators />
    </div>
  );
};

export default Clientfeed;