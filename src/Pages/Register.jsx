import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment-timezone";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDocRef = doc(db, "users", userCredential.user.uid);
      const pakistanTimestamp = moment().tz("Asia/Karachi").toDate();
      const firestoreTimestamp = Timestamp.fromDate(pakistanTimestamp);

      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        fullName,
        email,
        createdAt: firestoreTimestamp,
      });

      await signOut(auth);

      toast.success("Register successful! Redirecting...", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3200);
    } catch (error) {
      console.error("Error registering user:", error);

      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is Already in Use");
      } else {
        setErrorMessage(
          error.message || "Something went wrong! Please try again."
        );
      }
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
      }}
    >
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
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#7600ff",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "0.5rem", textAlign: "center" }}
            >
              {errorMessage}
            </Typography>
          )}
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

      <ToastContainer />
    </Container>
  );
};

export default Register;
