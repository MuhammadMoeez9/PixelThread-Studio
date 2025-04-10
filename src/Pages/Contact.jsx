import { useState, useEffect } from "react";
import "./contact.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Component/Firebase"; // Ensure correct import paths
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import footerimage01 from "../assets/footerimage01.png";

const Contact = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
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

  return (
    <div id="main">
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

      <div id="page-1">
        <div id="page-1-content">
          <h1>Let's Connect</h1>
          <p>
            Have any questions or need our services? Fill out the form below,
            and our team will respond to you quickly!
          </p>
        </div>
        <div id="footer-right">
          <div className="contact-container">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email Address" />
            <input
              className="message-box"
              placeholder="Write something here..."
            />
            <button className="send-btn">Send Email</button>
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
                <li>Home</li>
                <li>Our Services</li>
                <li>About Us</li>
                <li>Contact</li>
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
          <div className="contact-container">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email Address"
              required
            />
            <input
              className="message-box"
              placeholder="Your Message..."
              required
            />
            <button type="submit" className="send-btn">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
