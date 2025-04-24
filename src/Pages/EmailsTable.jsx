import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { db } from "../Component/Firebase"; // Ensure correct import paths
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";

const EmailsTable = () => {
  const [emails, setEmails] = useState([]);
  const [totalEmails, setTotalEmails] = useState(0); // For total number of emails
  const [totalReadEmails, setTotalReadEmails] = useState(0); // For total number of read emails
  const [lastVisible, setLastVisible] = useState(null); // Keeps track of the last document fetched
  const [currentPage, setCurrentPage] = useState(1); // Keeps track of current page
  const [hasMore, setHasMore] = useState(true); // To check if more emails are available
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ✅ Added user state
  const [role, setRole] = useState(); // ✅ Added user state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userData } = useAuth();

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

  const emailsPerPage = 20; // Number of emails per page

  const fetchEmails = async () => {
    setLoading(true);
    try {
      // First, get the total count of emails for display purposes
      const totalQuery = query(collection(db, "Emails"));
      const totalSnapshot = await getDocs(totalQuery);
      setTotalEmails(totalSnapshot.size);

      let q = query(
        collection(db, "Emails"),
        orderBy("createdAt", "desc"),
        limit(emailsPerPage)
      );

      // Apply pagination logic only after the first page
      if (currentPage > 1 && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      // Fetching the data
      const querySnapshot = await getDocs(q);
      const emailsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEmails(emailsData);

      // Set the last visible document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);

      // If there are fewer than 20 documents, set hasMore to false (no more pages)
      if (emailsData.length < emailsPerPage) {
        setHasMore(false);
      }

      // Update total read emails count
      const readCount = emailsData.filter((email) => email.read).length;
      setTotalReadEmails(readCount);
    } catch (error) {
      console.error("Error fetching emails: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [currentPage]); // Fetch emails whenever the page changes

  const handleRowClick = (id) => {
    navigate(`/EmailsTable092930jkmsdkj/${id}`);
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCheckboxChange = async (emailId, readStatus) => {
    try {
      const emailRef = doc(db, "Emails", emailId);
      await updateDoc(emailRef, { read: !readStatus });

      // Update emails state locally
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === emailId ? { ...email, read: !readStatus } : email
        )
      );

      // Recalculate total read emails
      const readCount = emails.filter((email) => email.read).length;
      setTotalReadEmails(readCount);
    } catch (error) {
      console.error("Error updating email read status: ", error);
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
      <div style={{ padding: "2rem" }}>
        <h2>Email Submissions</h2>

        {/* Display total emails and read emails */}
        <p>Total Emails: {totalEmails}</p>
        <p>Total Read Emails: {totalReadEmails}</p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#7600ff", color: "white" }}>
              <th style={thStyle}>#</th> {/* Serial number column */}
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Time</th> {/* Email time */}
              <th style={thStyle}>Read</th> {/* Checkbox for read/unread */}
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr
                key={email.id}
                onClick={() => handleRowClick(email.id)}
                style={{ borderBottom: "1px solid #ccc", cursor: "pointer" }}
              >
                <td style={tdStyle}>
                  {(currentPage - 1) * emailsPerPage + index + 1}
                </td>{" "}
                {/* Serial number */}
                <td style={tdStyle}>{email.user_name}</td>
                <td style={tdStyle}>{email.user_email}</td>
                <td style={tdStyle}>
                  {email.message.length > 50
                    ? email.message.slice(0, 50) + "..."
                    : email.message}
                </td>
                <td style={tdStyle}>
                  {new Date(email.createdAt.seconds * 1000).toLocaleString()}
                </td>{" "}
                {/* Time */}
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={email.read || false}
                    onChange={() => handleCheckboxChange(email.id, email.read)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Only show pagination buttons if there are 20 or more emails */}
        {totalEmails >= emailsPerPage && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1 || loading}
              style={paginationButtonStyle}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!hasMore || loading}
              style={paginationButtonStyle}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
  verticalAlign: "top",
};

const paginationButtonStyle = {
  padding: "10px 20px",
  margin: "0 10px",
  backgroundColor: "#7600ff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default EmailsTable;
