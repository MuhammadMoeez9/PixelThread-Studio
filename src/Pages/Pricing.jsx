import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore";
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
          <div className="page-1-content">
            <h1>Choose Your Service Plan</h1>
            <p>Choose the perfect plan and order now!</p>
          </div>
          <div id="plans">
            <div className="pricing-card-2">
              <div className="card-top-2">
                <h3>Full Back</h3>
                <span>Embroidery Digitizing</span>
              </div>
              <div className="center-2">
                <h1>$49.0</h1>
                <button className="order-btn-2">Order Now</button>
              </div>
              <div className="features-2">
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
            <div className="pricing-card">
              <div className="card-top">
                <h3>Full Back</h3>
                <span>Embroidery Digitizing</span>
              </div>
              <div className="center">
                <h1>$49.0</h1>
                <button className="order-btn">Order Now</button>
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
                <h3>Full Back</h3>
                <span>Embroidery Digitizing</span>
              </div>
              <div className="center-2">
                <h1>$49.0</h1>
                <button className="order-btn-2">Order Now</button>
              </div>
              <div className="features-2">
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
      </div>
    </>
  );
};

export default Pricing;
