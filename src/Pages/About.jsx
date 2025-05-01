import React from "react";
import "remixicon/fonts/remixicon.css";
import "./About.css";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import gsap from "gsap";
import { db } from "../Component/Firebase"; // Adjust this import path to your Firebase config
import Logo from "../assets/300x100-01.png";
import BrotherStellaireembroiderymachineThumbnail from "../assets/BrotherStellaireembroiderymachineThumbnail.png";
import BrotherStellaireembroiderymachineVideo from "../assets/BrotherStellaireembroiderymachine.mp4";
import FadeInSection from "../Component/FadeInSection";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import aboutimage01 from "../assets/About-images/aboutimage01.png";
import aboutimage02 from "../assets/About-images/aboutimage02.png";
import aboutimage03 from "../assets/About-images/aboutimage03.png";
import aboutimage04 from "../assets/About-images/aboutimage04.png";
import footerimage01 from "../assets/footerimage01.png";

const About = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true); // ✅ Define setLoading

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

  // FAQ

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question:
        "Can I get a free trial to check the service quality and speed?",
      answer: "Yes, we offer a free trial so you can check quality and speed.",
    },
    {
      question: "How do I place an order and complete a full order process?",
      answer: "You can place an order by filling out our simple order form.",
    },
    {
      question: "How can I request a custom quote or price estimate easily?",
      answer: "You can easily request a quote by using our contact form.",
    },
    {
      question: "What's are the charges for digitizing based on design type?",
      answer: "Charges vary depending on the size and complexity involved.",
    },
  ];

  useEffect(() => {
    let tl = gsap.timeline();

    tl.from("#loader h3", {
      x: 35,
      stagger: 0.2,
      opacity: 0,
      duration: 1,
    });

    tl.to("#loader h3", {
      x: -35,
      stagger: 0.1,
      opacity: 0,
      duration: 1,
    });

    tl.to("#loader", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.querySelector("#loader").style.display = "none";
      },
    });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // FAQ ending

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
      setLoading(false);

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
      navigate("/");
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
            </div>
          </div>
        </nav>
        {/* <div id="main"> */}
        <FadeInSection>
          <div id="about-page">
            <div id="about-content">
              <span>Our Story</span>
              <h1>Pixel Perfect Designs, Thread by Thread!</h1>
              <button className="cta">
                <span className="span">Connect With Us!</span>
                <span className="second">
                  <svg
                    width="50px"
                    height="20px"
                    viewBox="0 0 66 43"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="arrow"
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        className="one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      />
                      <path
                        className="two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      />
                      <path
                        className="three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      />
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            {/* <ScrollText
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            When does a man die? When he is hit by a bullet? No! When he suffers
            a disease? No! When he ate a soup made out of a poisonous mushroom?
            No! A man dies when he is forgotten!
          </ScrollText> */}

            <div id="about-sec">
              <div id="about-btm">
                <div id="offer">
                  <h4>Who we are?</h4>
                  <div id="offers">
                    <p>
                      PixelThread Studio is a professional embroidery digitizing
                      and vector art service dedicated to delivering precision,
                      creativity, and efficiency. We specialize in crafting high
                      quality vector artwork and meticulously digitized
                      embroidery files, ensuring seamless results for apparel,
                      merchandise, and branding needs. <br />
                      <br />
                      Our commitment to fast turnaround, unmatched quality, and
                      customer satisfaction has earned us the trust of clients
                      worldwide. With a strong presence across 60+ countries and
                      the ability to serve 250+ daily customers, we continue to
                      push the boundaries of excellence in the digitizing and
                      vector industry. <br /> <br />
                      At PixelThread Studio, we don’t just create designswe
                      bring visions to life with precision and passion.
                    </p>
                  </div>
                </div>
              </div>
              <div
                id="btm-right"
                onMouseEnter={() => videoRef.current.play()}
                onMouseOver={() => videoRef.current.play()}
                onMouseLeave={() => videoRef.current.pause()}
              >
                <img src={BrotherStellaireembroiderymachineThumbnail} alt="" />
                <video ref={videoRef} muted loop playsInline controls>
                  <source
                    src={BrotherStellaireembroiderymachineVideo}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </FadeInSection>

        <div id="journey">
          <div className="service-story">
            <div className="s-left">
              <img src={aboutimage01} alt="Embroidery Digitizing Image" />
            </div>
            <FadeInSection>
              <div className="s-right">
                <h1>Embroidery Digitizing</h1>
                <p>
                  We provide high-quality embroidery digitizing services,
                  ensuring smooth, precise, and detailed stitch files. Our
                  clients have achieved flawless embroidery results, enhancing
                  their brand reputation and product quality.
                </p>
              </div>
            </FadeInSection>
          </div>
          <div className="service-story">
            <FadeInSection>
              <div className="s-right">
                <h1>DTF Printing</h1>
                <p>
                  Our DTF (Direct-to-Film) printing service delivers vibrant,
                  durable, and high-resolution prints on various fabrics.
                  Clients have seen a significant boost in their apparel
                  business due to the premium quality and long-lasting results.
                </p>
              </div>
            </FadeInSection>
            <div className="s-left">
              <img src={aboutimage02} alt="" />
            </div>
          </div>
          <div className="service-story">
            <div className="s-left">
              <img src={aboutimage03} alt="" />
            </div>
            <FadeInSection>
              <div className="s-right">
                <h1>Graphic Printing</h1>
                <p>
                  We offer professional graphic printing services with sharp and
                  vivid designs. Businesses using our services have experienced
                  increased customer engagement and satisfaction due to
                  high-quality prints that stand out.
                </p>
              </div>
            </FadeInSection>
          </div>
          <div className="service-story">
            <FadeInSection>
              <div className="s-right">
                <h1>Custom Patches</h1>
                <p>
                  We create high-quality embroidered and printed patches for
                  branding, uniforms, and personal customization. Many clients
                  have strengthened their brand identity with our premium
                  patches, making their products more attractive and
                  professional.
                </p>
              </div>
            </FadeInSection>
            <div className="s-left">
              <img src={aboutimage04} alt="" />
            </div>
          </div>
        </div>
        <div id="page-6-cards">
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 01</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  Fast
                  <br />
                  Turnaround
                </h4>
                <h3>
                  Standard turnaround is next day.
                  <br />
                  For urgent works or revisions.
                </h3>
              </div>
            </div>{" "}
          </FadeInSection>
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 02</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  Customer
                  <br />
                  Support
                </h4>
                <h3>
                  Our customer service representatives
                  <br />
                  are trained and committed.
                </h3>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 03</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  Risk Free
                  <br />
                  Guarantee
                </h4>
                <h3>
                  We give each order our very best.
                  <br />
                  If there are any adjustments, we <br />
                  will do it right away
                </h3>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 04</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  Unmatched
                  <br />
                  Quality
                </h4>
                <h3>
                  Every design is punched by our
                  <br />
                  experienced digitizers in a systematic, <br />
                  consistent manner.
                </h3>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 05</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  60+
                  <br />
                  Countries
                </h4>
                <h3>
                  We have successfully collaborated
                  <br />
                  with clients from more than 60
                  <br />
                  countries worldwide.
                </h3>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="about-card">
              <div className="about-card-top">
                <h4>| 06</h4>
                <i className="ri-arrow-right-up-line" />
              </div>
              <div className="about-card-btm">
                <h4>
                  70+
                  <br />
                  Daily Customers
                </h4>
                <h3>
                  We serve over 250 customers daily, <br />
                  ensuring high-quality service and <br /> satisfaction.
                </h3>
              </div>
            </div>
          </FadeInSection>
        </div>
        <FadeInSection>
          <div id="page-8">
            <div id="page-8-content">
              <h1>Frequently Asked Questions</h1>
              <p>
                At PixelThread Studio, we ensure clear and transparent service
                details. Find answers about embroidery digitizing, pricing,
                turnaround time, and orders here. Need more help? Contact us
                anytime!
              </p>
            </div>
            <div id="page-8-left">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <div
                    className={`content ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <h2 className="">{faq.question}</h2>
                    <i
                      className={`ri-arrow-down-line ${
                        activeIndex === index ? "rotated" : ""
                      }`}
                    />
                  </div>
                  <div
                    className="answer-box"
                    style={{
                      maxHeight: activeIndex === index ? "180px" : "0px",
                      opacity: activeIndex === index ? "1" : "0",
                      padding: activeIndex === index ? "15px 3vw" : "0px 3vw",
                      transition: "all 0.3s ease-in-out",
                      overflow: "hidden",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
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
                <li>123 Boulevard</li>
                <li>USA ABC 1223</li>
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
    </>
  );
};

export default About;
