import React, { useEffect, useState } from "react";
import { db } from "../Component/Firebase"; // Ensure Firebase is configured
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut method
import { Link, useNavigate } from "react-router-dom"; // Import navigation
import Loader from "../Component/Loader"; // Import Loader component
import "./ProjectPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth(); // Auth must be inside the component

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth, navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
        const projectsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user
      navigate("/Home"); // Navigate to Home
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "N/A";
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-center my-4">Projects</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>{" "}
        {/* Logout Button */}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="projects-container">
          {projects.map(
            ({ id, Title, imageUrl, category, description, uploadedAt }) => (
              <Link key={id} to={`/project/${id}`} className="project-card">
                <img className="project-img" src={imageUrl} alt={Title} />
                <h5 className="project-title">{Title}</h5>
                <p className="project-category">
                  Category: {category || "N/A"}
                </p>
                <p className="project-description">{description}</p>
                <p className="project-uploaded">
                  Uploaded At: {formatTimestamp(uploadedAt)}
                </p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
