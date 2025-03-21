import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut, // Import signOut function
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../Component/Firebase";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import moment from "moment-timezone";

const Register = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store user data in Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const pakistanTimestamp = moment().tz("Asia/Karachi").toDate();
      const firestoreTimestamp = Timestamp.fromDate(pakistanTimestamp);

      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        fullName,
        email,
        createdAt: firestoreTimestamp,
      });

      // Sign out the user immediately after registration
      await signOut(auth);

      toast.success("Account created successfully! Redirecting to login...", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login"); // Navigate to login page
      }, 3000);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {showConfetti && <Confetti width={windowWidth} height={windowHeight} />}
      <Paper elevation={3} style={{ padding: "2rem", width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
        <Button
          onClick={() => navigate("/login")}
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Already have an account? <br /> Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
