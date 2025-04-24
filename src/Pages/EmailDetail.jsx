import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Component/Firebase";

const EmailDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const docRef = doc(db, "Emails", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmail(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching email detail: ", error);
      }
    };

    fetchEmail();
  }, [id]);

  if (!email) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📧 Email Details</h2>
        <p>
          <strong style={styles.label}>Name:</strong> {email.user_name}
        </p>
        <p>
          <strong style={styles.label}>Email:</strong> {email.user_email}
        </p>
        <p>
          <strong style={styles.label}>Message:</strong>
          <br />
          <span style={styles.message}>{email.message}</span>
        </p>
        <button
          onClick={() => navigate("/EmailsTable092930jkmsdkj")}
          style={styles.button}
        >
          ← Back to Emails
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "2rem",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    color: "#7600ff",
    fontSize: "24px",
    marginBottom: "1.5rem",
  },
  label: {
    color: "#7600ff",
    fontWeight: "bold",
  },
  message: {
    marginTop: "0.5rem",
    display: "inline-block",
    color: "#333",
  },
  button: {
    marginTop: "2rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#7600ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loading: {
    fontSize: "18px",
    color: "#7600ff",
  },
};

export default EmailDetail;
