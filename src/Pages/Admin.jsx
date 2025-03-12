import React, { useEffect, useState, useRef } from "react";
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
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    if (userData?.role === "user") {
      navigate("/home");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        let q = query(usersRef, orderBy("createdAt", "desc"), limit(5));

        if (page > 1 && lastVisible) {
          q = query(
            usersRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(5)
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
        setTotalPages(Math.ceil(totalUsersQuery.size / 5));
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

  useEffect(() => {
    if (listRef.current) {
      gsap.from(listRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [users]);

  const handleScroll = () => {
    if (listRef.current) {
      gsap.to(listRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    }
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
      maxWidth="lg"
      style={{ paddingTop: "2rem", display: "flex", justifyContent: "center" }}
    >
      <Paper
        elevation={6}
        style={{
          padding: "2rem",
          width: "100%",
          maxWidth: "700px",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
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
        <Box
          ref={listRef}
          onScroll={handleScroll}
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            marginBottom: "1rem",
          }}
        >
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => navigate(`/user/${user.id}`)}
                style={{
                  marginBottom: "1rem",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.target, { scale: 1.05, ease: "ease-out" })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.target, { scale: 1, ease: "ease-out" })
                }
              >
                <ListItemText
                  primary={`Name: ${user.fullName}`}
                  secondary={`Email: ${user.email} | Phone: ${
                    user.phone
                  } | Registered: ${formatTimestamp(user.createdAt)}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
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
  );
};

export default Admin;
