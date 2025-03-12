import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Component/Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import gsap from "gsap";

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error fetching user details: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (user) {
      gsap.from(".user-details", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [user]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    const date = new Date(timestamp);
    return !isNaN(date.getTime()) ? date.toLocaleString() : "Invalid Date";
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "2rem", display: "flex", justifyContent: "center" }}
    >
      <Paper
        className="user-details"
        elevation={6}
        style={{
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              User Details
            </Typography>
            <Typography>
              <strong>Full Name:</strong> {user?.fullName || "N/A"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user?.email || "N/A"}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {user?.phone || "N/A"}
            </Typography>
            <Typography>
              <strong>DOB:</strong> {user?.dob || "N/A"}
            </Typography>
            <Typography>
              <strong>Registered:</strong> {formatTimestamp(user?.createdAt)}
            </Typography>
            <Typography>
              <strong>Last Updated:</strong> {formatTimestamp(user?.updatedAt)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/admin")}
              style={{ marginTop: "1rem" }}
            >
              Back to Users
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default UserDetail;
