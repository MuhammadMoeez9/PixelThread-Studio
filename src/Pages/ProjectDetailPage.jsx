import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Component/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../Component/Loader"; // Import Loader component

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "Projects", id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          console.error("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <Loader /> {/* Use Loader while loading */}
      </div>
    );
  }

  if (!project) {
    return <div className="container text-center my-5">Project not found.</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">{project.title}</h1>
      <img
        src={project.imageUrl}
        alt={project.title}
        className="img-fluid rounded my-3"
        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
      />
      <h4>Category: {project.category}</h4>
      <p>{project.description}</p>
      <p className="text-muted">
        Uploaded At:{" "}
        {new Date(project.uploadedAt?.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default ProjectDetailPage;
