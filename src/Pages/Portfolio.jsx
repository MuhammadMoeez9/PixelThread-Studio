import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import {
  getDocs,
  getDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../Component/Firebase"; // Ensure correct import paths
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import "./Portfolio.css";
import footerimage01 from "../assets/footerimage01.png";

const Portfolio = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Emails"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("Email data saved successfully!");
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch (error) {
      console.error("Error saving email:", error);
      alert("Failed to save. Try again.");
    }
  };

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
    // Projects
    // At top-level inside component, not inside any function

    // Projects
  };
  const fetchProjects = async () => {
    try {
      const q = query(
        collection(db, "Projects"),
        orderBy("uploadedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
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
      <div className="page-four" id="page-four">
        <div className="img-container" id="img-container">
          {projects.map((project) => (
            <div key={project.id} className="">
              <div className="col">
                <div className="text">
                  <h1>{project.title}</h1>
                  <h2>{project.category}</h2>
                  <p>
                    {project.uploadedAt?.toDate
                      ? project.uploadedAt.toDate().toLocaleDateString()
                      : "No date provided"}
                  </p>
                </div>
                <img src={project.imageUrl} alt={project.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="footer">
        <div id="footer-left">
          <div id="l-top">
            <h4>
              CONTACT NOW FOR SERVICES <br /> AND EXCLUSIVE OFFERS!
            </h4>
            <div id="l-top-img">
              <img src={footerimage01} alt="" />
              <p>2000+ satisfied customers </p>
            </div>
          </div>
          <div className="l-btm">
            <div className="box">
              <h2>Company</h2>
              <ul>
                <Link to="/portfolio">
                  <li>Home</li>
                </Link>
                <Link to="/pricing">
                  <li>Pricing</li>
                </Link>
                <Link to="/Services">
                  <li>Our Services</li>
                </Link>
                <Link to="/About">
                  {" "}
                  <li>About Us</li>
                </Link>
                <Link to="/Contact">
                  <li>Contact</li>
                </Link>
              </ul>
            </div>
            <div className="box">
              <h2>Contact</h2>
              <ul>
                <li>info@pixelthreadstudio.com</li>
                <li>career@pixelthreadstudio.com</li>
              </ul>
            </div>
            <div className="box">
              <h2>Location</h2>
              <ul>
                <li>123 Boulevard</li>
                <li>USA ABC 1223</li>
              </ul>
            </div>
          </div>
          <div className="social-links">
            <div id="social">
              <i className="ri-facebook-circle-fill" />
              <i className="ri-instagram-fill" />
              <i className="ri-twitter-x-fill" />
              <i className="ri-whatsapp-fill" />
              <i className="ri-linkedin-box-fill" />
            </div>
            <div id="line" />
          </div>
        </div>
        <div id="footer-right">
          <form className="contact-container" onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email Address"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
            <input
              className="message-box"
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="send-btn">
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
