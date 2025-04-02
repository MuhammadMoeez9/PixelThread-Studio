import { React, useState, useEffect, useRef } from "react";
import "./Service.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/300x100-01.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Component/Firebase"; // Ensure correct import paths
import footerimage01 from "../assets/footerimage01.png";
import reviewscardelem01 from "../assets/reviewscardelem01.png";
import reviewscardelem02 from "../assets/reviewscardelem02.png";
import FaceOneGirl from "/src/assets/Clients/FaceOneGirl.jpeg";
import FaceTwoGirl from "/src/assets/Clients/FaceTwoGirl.jpeg";
import FaceThreeGirl from "/src/assets/Clients/FaceThreeGirl.jpeg";
import FaceFourGirl from "/src/assets/Clients/FaceFourGirl.jpeg";
import FaceFiveGirl from "/src/assets/Clients/FaceFiveGirl.jpeg";
import FaceOneBoy from "/src/assets/Clients/FaceOneBoy.jpeg";
import FaceTwoBoy from "/src/assets/Clients/FaceTwoBoy.jpeg";
import FaceThreeBoy from "/src/assets/Clients/FaceThreeBoy.jpeg";
import FaceFourBoy from "/src/assets/Clients/FaceFourBoy.jpeg";
import elements01 from "../assets/elements01.png";
import elements02 from "../assets/elements02.png";
import elements03 from "../assets/elements03.png";
import elements04 from "../assets/elements04.png";
import elements05 from "../assets/elements05.png";
import elements06 from "../assets/elements06.png";
import elements07 from "../assets/elements07.png";
import elements08 from "../assets/elements08.png";

const Service = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const videoUrl = "/assets/BrotherStellaireembroiderymachine.MP4";

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

  return (
    <>
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
            <h2>
              Ready to get started?
              <br />
              Contact us today for a custom quote!
            </h2>
            <p>
              Professional Embroidery Digitizing and Vector Graphic Services,
              Every design is punched by our experienced digitizers in a
              systematic, consistent manner.
            </p>
          </div>
          <div id="page-1-cards">
            <div className="card">
              <div className="card-top">
                <img src={elements01} alt="" />
              </div>
              <div className="card-btm">
                <h3>Vector Graphics</h3>
                <p>
                  Having trouble with your logo file not being in the correct
                  format? We offer vector art conversion service that will save
                  you time and money both.
                </p>
                <img src={elements04} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <img src={elements02} alt="" />
              </div>
              <div className="card-btm">
                <h3>Embroidery Digitizing</h3>
                <p>
                  Pixel Thread Studio is of one of the prominent embroidery
                  digitizing companies of America.
                </p>
                <img src={elements05} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <img src={elements03} alt="" />
              </div>
              <div className="card-btm">
                <h3>Screen Printing</h3>
                <p>
                  We have the on-site capacity for larger runs on our automated
                  presses or smaller runs on our manual presses.
                </p>
                <img src={elements06} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <img src={elements07} alt="" />
              </div>
              <div className="card-btm">
                <h3>Custom Graphics</h3>
                <p>
                  Custom graphics designed for your needs, with high-quality,
                  scalable results.
                </p>
                <img src={elements08} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div id="page-2">
          <div id="page-2-content">
            <h2>What Our Clients Say's</h2>
            <p>
              Read what our satisfied clients have to say about our services.
              Their feedback reflects the quality, precision, and dedication we
              put into every project.
            </p>
          </div>
          <div id="testimonials">
            <div id="row-1">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneBoy} alt="" />
                  <div className="client-info">
                    <h5> Noah W.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src={FaceTwoBoy} alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src={FaceThreeGirl} alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src={FaceThreeBoy} alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceThreeGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-1">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-1">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-1">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="testimonials">
            <div id="row-2">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-2">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R..</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-2">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceFourBoy} alt="" />
                  <div className="client-info">
                    <h5> Adam R.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="row-2">
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  The quality exceeded my expectations, and the customer support
                  was top-notch. Highly recommend to anyone looking for the best
                  in the market!"
                </p>
                <div className="client-profile">
                  <img src={FaceTwoGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily R.</h5>
                    <p> Fantastic Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Excellent service and very professional! Everything was
                  delivered on time and just as promised. Couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneBoy} alt="" />
                  <div className="client-info">
                    <h5> Noah W.</h5>
                    <p> Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Fantastic service! The team was very professional and
                  delivered everything on time. I am beyond satisfied with my
                  experience!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>James T.</h5>
                    <p>Highly Recommend!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I had an amazing experience with this product/service. The
                  quality was exceptional, and the customer support was super
                  helpful. I highly recommend it to anyone!
                </p>
                <div className="client-profile">
                  <img src={FaceFiveGirl} alt="" />
                  <div className="client-info">
                    <h5>Sarah L.</h5>
                    <p>Outstanding Quality!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I wasn't sure at first, but this service completely exceeded
                  my expectations. The attention to detail was incredible!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Ava C.</h5>
                    <p>Worth Every Penny!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  I love how smooth and easy the whole process was. The quality
                  is top-tier, and I will definitely be using this again!
                </p>
                <div className="client-profile">
                  <img src="./Assets/reviews card elem-03.png" alt="" />
                  <div className="client-info">
                    <h5>Michael B.</h5>
                    <p>Best Decision Ever!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  Everything was perfect! Great communication, fast delivery,
                  and amazing quality. I couldn't be happier!
                </p>
                <div className="client-profile">
                  <img src={FaceOneGirl} alt="" />
                  <div className="client-info">
                    <h5>Emily S.</h5>
                    <p>Excellent Service!</p>
                  </div>
                </div>
              </div>
              <div className="testimonials-card">
                <div className="comma">
                  <img src={reviewscardelem01} alt="" />
                </div>
                <img src={reviewscardelem02} alt="" />
                <p>
                  This service exceeded all my expectations! The quality, speed,
                  and customer support were top-notch. I will definitely be
                  coming back!
                </p>
                <div className="client-profile">
                  <img src={FaceFourGirl} alt="" />
                  <div className="client-info">
                    <h5>Daniel R.</h5>
                    <p> Absolutely Amazing!</p>
                  </div>
                </div>
              </div>
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
    </>
  );
};

export default Service;
