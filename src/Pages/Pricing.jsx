import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import {
  getDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Component/Firebase"; // Ensure correct import paths
import "remixicon/fonts/remixicon.css";
import "./Pricing.css"; // Ensure you have corresponding CSS
import Logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import footerimage01 from "../assets/footerimage01.png";

const Pricing = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

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

    // Check if the user is logged in
    if (!user) {
      alert("Please log in first to submit your data!");
      return;
    }

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
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <>
      <div id="main">
        <div id="upper-nav">
          <h2>Get 40% Off on your first order!</h2>
        </div>
        <nav>
          <Link to="/">
            <img src={Logo} alt="" />
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

            {user && (
              <Link to="/CompleteProfile">
                <img src={reviewscardelem03} alt="User Icon" />
              </Link>
            )}

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
        <div id="page-1">
          <div className="page-1-content">
            <h1>Choose Your Service Plan</h1>
            <p>Choose the perfect plan and order now!</p>
          </div>
          <div id="plans">
            <div className="pricing-card-2">
              <div className="card-top-2">
                <h3>Vector Tracing</h3>
                <span>Vector Graphics</span>
              </div>
              <div className="center-2">
                <h1>$15.0</h1>
                <Link to={"/Contact"}>
                  <button className="order-btn-2">Order Now</button>
                </Link>
              </div>
              <div className="features-2">
                <p>
                  <i className="ri-check-double-line" />
                  Vector Art
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Completely depends upon the complexity of design
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  24 Hrs Support
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Contact us for special discount
                </p>
              </div>
            </div>
            <div className="pricing-card">
              <div className="card-top-2">
                <h3>Full Back</h3>
                <span>Embroidery Digitizing</span>
              </div>
              <div className="center">
                <h1>$20.0</h1>
                <Link to={"/Contact"}>
                  <button className="order-btn-2">Order Now</button>
                </Link>
              </div>
              <div className="features">
                <p>
                  <i className="ri-check-double-line" />
                  Full back or other
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Maximum $200
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Revision, Edits, Changes Free
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Contact us for special discount
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  24 Hrs Support
                </p>
              </div>
            </div>

            <div className="pricing-card-2">
              <div className="card-top-2">
                <h3>Left Chest</h3>
                <span>Embroidery Digitizing</span>
              </div>
              <div className="center-2">
                <h1>$10.0</h1>
                <Link to={"/Contact"}>
                  <button className="order-btn-2">Order Now</button>
                </Link>
              </div>
              <div className="features-2">
                <p>
                  <i className="ri-check-double-line" />
                  Left Chest/CAP
                </p>
                <p>
                  <i className="ri-check-double-line" />1 Digitized logo
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Flat Fee Minimum $10
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  Revision/Edits/Color Changes Free
                </p>
                <p>
                  <i className="ri-check-double-line" />
                  24 Hrs Support
                </p>
              </div>
            </div>
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
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/portfolio">
                    <li>Portfolio</li>
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
                  <li>11718 N Garden St,</li>
                  <li>Houston, Tx 77071</li>
                </ul>
              </div>
            </div>
            <div className="social-links">
              <div id="social">
                <a href="https://www.facebook.com/profile.php?id=61574087804821">
                  {" "}
                  <i className="ri-facebook-circle-fill" />
                </a>
                <a href="https://www.instagram.com/pixel_threadsstudio/">
                  {" "}
                  <i className="ri-instagram-fill" />
                </a>
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
      </div>
    </>
  );
};

export default Pricing;
