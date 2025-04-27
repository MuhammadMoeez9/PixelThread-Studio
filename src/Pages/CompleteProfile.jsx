import { useState, useEffect } from "react";
import { db, auth } from "../Component/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";
import moment from "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  //const [role] = useState("user");
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  //const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const menuIcon = document.querySelector(".ri-menu-fill");
    const closeIcon = document.querySelector("#close-i");
    const fullScrNav = document.getElementById("fullScrNav");

    if (menuIcon && closeIcon && fullScrNav) {
      const openMenu = () => fullScrNav.classList.add("active");
      const closeMenu = () => fullScrNav.classList.remove("active");

      menuIcon.addEventListener("click", openMenu);
      closeIcon.addEventListener("click", closeMenu);

      return () => {
        menuIcon.removeEventListener("click", openMenu);
        closeIcon.removeEventListener("click", closeMenu);
      };
    }
  }, []);

  // ✅ Firebase Authentication Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Ensure loading stops

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // ❌ This is forcing navigation, remove it!
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const today = moment().tz("Asia/Karachi").format("YYYY-MM-DD");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      loadUserData(user.uid);
    }
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setFullName(userData.fullName || "");
        setPhone(userData.phone || "");
        setDob(userData.dob || "");
        setUserExists(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      toast.error("User is not authenticated.");
      return;
    }

    if (dob > today) {
      toast.warning("Date of Birth cannot be in the future.");
      return;
    }

    try {
      const pakistanTimestamp = moment().tz("Asia/Karachi").toDate();
      const firestoreTimestamp = Timestamp.fromDate(pakistanTimestamp);

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          fullName,
          phone,
          dob,
          updatedAt: firestoreTimestamp,
        },
        { merge: true }
      );

      toast.success("Profile Updated Successfully!", {
        autoClose: 3000, // 3 seconds
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving profile. Check console for details.");
    }
  };

  return (
    <>
      <div id="upper-nav">
        <h2>Get 40% Off on your first order!</h2>
      </div>
      <nav>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div id="links">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div id="menu">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              {role === "admin" && (
                <div className="admin-btn-container">
                  <button onClick={() => navigate("/Admin")}>Admin</button>
                </div>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
          <Link to="/CompleteProfile">
            <img src={reviewscardelem03} alt="User Icon" />
          </Link>

          <button className="btn mobile-nav-btn">
            <i className="ri-menu-fill"></i>
          </button>
        </div>

        <div id="fullScrNav">
          <div id="close-i">
            <i className="ri-close-fill" />
          </div>
          <div id="fullScrLinks">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {role === "admin" && <Link to="/Admin">Admin</Link>}
          </div>
        </div>
      </nav>
      <ToastContainer position="top-center" />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#eef2f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Complete Your Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                inputProps={{ max: today }}
                InputLabelProps={{ shrink: true }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(to right,rgb(106, 32, 185), #7600ff)",
                  "&:hover": {
                    background: "linear-gradient(to right, #7600ff, #6a11cb)",
                  },
                }}
              >
                Save
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CompleteProfile;
