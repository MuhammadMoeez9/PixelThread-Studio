import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { db } from "../Component/Firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";

const Admin = () => {
  const [user, setUser] = useState(null); // ✅ Added user state
  const [role, setRole] = useState(); // ✅ Added user state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

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

  useEffect(() => {
    if (userData?.role === "user") {
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        let q = query(usersRef, orderBy("createdAt", "desc"), limit(10));

        if (page > 1 && lastVisible) {
          q = query(
            usersRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(10)
          );
        }

        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        const totalUsersQuery = await getDocs(collection(db, "users"));
        setTotalPages(Math.ceil(totalUsersQuery.size / 10));
      } catch (err) {
        setError("Error fetching users: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.role === "admin") {
      fetchUsers();
    }
  }, [page, userData]);

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

          <img src={reviewscardelem03} alt="User Icon" />

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
      <Container
        maxWidth="lg"
        style={{
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          style={{
            padding: "2rem",
            width: "100%",
            maxWidth: "900px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Users List
          </Typography>
          {error && (
            <Typography color="error" align="center" paragraph>
              {error}
            </Typography>
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Registered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => navigate(`/user/${user.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone ? user.phone : "-"}</TableCell>
                    <TableCell>{formatTimestamp(user.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <Box
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                color="primary"
                style={{ backgroundColor: "transparent" }}
              />
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Admin;
