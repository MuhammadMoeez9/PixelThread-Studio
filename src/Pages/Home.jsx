import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Component/Firebase"; // Ensure correct import paths
import "./Home.css";
import "../App.css";
import "remixicon/fonts/remixicon.css";
// import Typed from "react-typed";
import logo from "../assets/300x100-01.png";
import boy3 from "../assets/boy3.png";
import flag01 from "../assets/flag01.png";
import flag02 from "../assets/flag02.png";
import flag03 from "../assets/flag03.png";
import flag04 from "../assets/flag04.png";
import flag05 from "../assets/flag05.png";
import flag06 from "../assets/flag06.png";
import flag07 from "../assets/flag07.png";
import flag08 from "../assets/flag08.png";
import elem2v01 from "../assets/elem2v01.png";
import elem01 from "../assets/elem01.png";
import elem05 from "../assets/elem05.png";
import elements01 from "../assets/elements01.png";
import elements02 from "../assets/elements02.png";
import elements03 from "../assets/elements03.png";
import elements04 from "../assets/elements04.png";
import elements05 from "../assets/elements05.png";
import elements06 from "../assets/elements06.png";
import elements07 from "../assets/elements07.png";
import elements08 from "../assets/elements08.png";
import CountUp from "../Component/Countup";
import reviewscardelem01 from "../assets/reviewscardelem01.png";
import reviewscardelem02 from "../assets/reviewscardelem02.png";
import reviewscardelem03 from "../assets/reviewscardelem03.png";
import AlohaistLogJB from "../assets/projects/AlohaistLogJB.JPG";
import ColorfulGirllogo from "../assets/projects/ColorfulGirllogo.png";
import ARROW from "../assets/projects/ARROW.JPG";
import SOUTHBAYLOGO from "../assets/projects/SOUTHBAYLOGO.png";
import VIPLOGO from "../assets/projects/VIPLOGO.JPG";
import R2LSKULLLOGO02 from "../assets/projects/R2LSKULLLOGO02.jpg";
import MANLOGO2 from "../assets/projects/MANLOGO2.JPG";
import LonghurstDetailslogo from "../assets/projects/LonghurstDetailslogo.png";
import Santa from "../assets/projects/Santa.JPG";
import LakeLogo from "/src/assets/projects/lakeLogo.JPG";
import LakeLogo02222 from "/src/assets/projects/LakeLogo02222.JPG";
import MonkeyJB from "/src/assets/projects/MonkeyJB.JPG";
import BrotherStellaireembroiderymachineThumbnail from "../assets/BrotherStellaireembroiderymachineThumbnail.png";
import video from "../assets/BrotherStellaireembroiderymachine.mp4";
import Icons01 from "../assets/icons-01.png";
import Icons02 from "../assets/icons-02.png";
import Icons03 from "../assets/icons-03.png";
import Icons04 from "../assets/icons-04.png";
import Icons05 from "../assets/icons-05.png";
import FaceOneGirl from "/src/assets/Clients/FaceOneGirl.jpeg";
import FaceTwoGirl from "/src/assets/Clients/FaceOneGirl.jpeg";
import FaceThreeGirl from "/src/assets/Clients/FaceOneGirl.jpeg";
import FaceOneBoy from "/src/assets/Clients/FaceOneBoy.jpeg";
import FaceTwoBoy from "/src/assets/Clients/FaceOneBoy.jpeg";
import FaceThreeBoy from "/src/assets/Clients/FaceOneBoy.jpeg";
import footerimage01 from "../assets/footerimage01.png";

const Home = () => {
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
              <button onClick={handleLogout}>Logout</button>
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
            </div>
          </div>
        </nav>

        <div id="page-1-hero-section">
          <div id="hero-sec-1">
            <div id="hero-left">
              <div id="content-left">
                <span>Hello</span>
                <h1>
                  We Are Professional Vector And Embroidery Digitizing{" "}
                  <span>Agency</span>
                </h1>
                <p>
                  Get high quality vector conversions and precise embroidery
                  digitizing for logos, apparel, and custom designs.
                </p>
                <button className="cta">
                  <span className="span">Get in touch</span>
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
            </div>
            <div id="hero-right">
              <img src={boy3} alt="" />
            </div>
          </div>
          <div id="hero-sec-2">
            <h4>Trusted By Businesses Across The Globe</h4>
            <div id="flags">
              <div id="white-1" />
              <div id="white-2" />
              <div className="move">
                <img src={flag01} alt="" />
                <img src={flag02} alt="" />
                <img src={flag03} alt="" />
                <img src={flag04} alt="" />
                <img src={flag05} alt="" />
                <img src={flag06} alt="" />
                <img src={flag07} alt="" />
                <img src={flag08} alt="" />
              </div>
              <div className="move">
                <img src={flag01} alt="" />
                <img src={flag02} alt="" />
                <img src={flag03} alt="" />
                <img src={flag04} alt="" />
                <img src={flag05} alt="" />
                <img src={flag06} alt="" />
                <img src={flag07} alt="" />
                <img src={flag08} alt="" />
              </div>
              <div className="move">
                <img src={flag01} alt="" />
                <img src={flag02} alt="" />
                <img src={flag03} alt="" />
                <img src={flag04} alt="" />
                <img src={flag05} alt="" />
                <img src={flag06} alt="" />
                <img src={flag07} alt="" />
                <img src={flag08} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          id="page-2"
          style={{
            backgroundImage: `url(${elem05})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div id="page-2-content">
            <h2>All-inclusive</h2>
            <p>
              Offering all-inclusive services for vector digitizing, custom
              graphics, and screen printing. We create high-quality, scalable
              designs for embroidery and printing with precision and ease.
            </p>
            <h1>Precision and Creativity, All in One Place!</h1>
          </div>
          <div id="floating-div">
            <div id="float-1">
              <img src={elem2v01} alt="" />
            </div>
            <div id="float-2">
              <img src={elem01} alt="" />
            </div>
          </div>
        </div>
        <div id="page-3">
          <div id="page-3-content">
            <h1>Our Serivces</h1>
            <p>
              Professional Embroidery Digitizing and Vector Graphic Services,
              Every design is punched by our experienced digitizers in a
              systematic, consistent manner.
            </p>
          </div>
          <div id="page-3-cards">
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
        <div id="page-4">
          <div id="page-4-content">
            <h2>Work &amp; Projects</h2>
            <p>
              Showcasing unique our embroidery designs, and vector projects
              crafted with precision and creativity.
            </p>
          </div>
          {/* <div id="pr-cards">
          <div class="project-card">
              <img src="./Assets/Projects/transport control logo (1).png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/I Said Yes.JPG" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/DRAGON LOGO.png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/Monkey JB.JPG" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/Colorful Girl logo.png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/logo02.JPG" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/Longhurst Details logo.png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/logo02.JPG" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/WTF LOGO.png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/kayeejz Logo1.JPG" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/Skull.png" alt="">
          </div>
          <div class="project-card">
              <img src="./Assets/Projects/BUG GUTZ Logo1.jpg" alt="">
          </div>
      </div> */}
          <div id="image-container">
            <div className="row">
              <div className="col wide">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={AlohaistLogJB} alt="" />
              </div>
              <div className="col short">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Vector Graphic</h4>
                </div>
                <img src={ColorfulGirllogo} alt="" />
              </div>
              <div className="col">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={ARROW} alt="" />
              </div>
              <div className="col">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Vector Graphic</h4>
                </div>
                <img src={SOUTHBAYLOGO} alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col short">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={VIPLOGO} alt="" />
              </div>
              <div className="col wide">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Vector Graphic</h4>
                </div>
                <img src={R2LSKULLLOGO02} alt="" />
              </div>
              <div className="col">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={MANLOGO2} alt="" />
              </div>
              <div className="col">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Vector Graphic</h4>
                </div>
                <img src={LonghurstDetailslogo} alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col short">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={Santa} alt="" />
              </div>
              <div className="col wide">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={LakeLogo} alt="" />
              </div>
              <div className="col wide">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={LakeLogo02222} alt="" />
              </div>
              <div className="col">
                <div className="text">
                  <p>PixelThread Studio</p>
                  <h4>Embroidery Digitizing</h4>
                </div>
                <img src={MonkeyJB} alt="" />
              </div>
            </div>
          </div>
          <div id="project-counter">
            <div id="container">
              <div className="count-container">
                <img src={Icons01} alt="" />
                <h3>
                  <span>
                    <CountUp
                      from={0}
                      to={1000}
                      separator=","
                      direction="up"
                      duration={5}
                      className="count-up-text"
                    />
                    +
                  </span>
                </h3>
                <h4>Project Completed</h4>
              </div>
              <div className="count-container">
                <img src={Icons02} alt="" />
                <h3>
                  <span>
                    <CountUp
                      from={0}
                      to={1000}
                      separator=","
                      direction="up"
                      duration={5}
                      className="count-up-text"
                    />
                    +
                  </span>
                </h3>
                <h4>Happy Clients</h4>
              </div>
              <div className="count-container">
                <img src={Icons03} alt="" />
                <h3>
                  <span>
                    <CountUp
                      from={0}
                      to={1000}
                      separator=","
                      direction="up"
                      duration={5}
                      className="count-up-text"
                    />
                    +
                  </span>
                </h3>
                <h4>Vector Designs</h4>
              </div>
              <div className="count-container">
                <img src={Icons04} alt="" />
                <h3>
                  <span>
                    <CountUp
                      from={0}
                      to={1000}
                      separator=","
                      direction="up"
                      duration={5}
                      className="count-up-text"
                    />
                    +
                  </span>
                </h3>
                <h4>Embroidery Digitizing</h4>
              </div>
              <div className="count-container">
                <img src={Icons05} alt="" />
                <h3>
                  <span>
                    <CountUp
                      from={0}
                      to={1000}
                      separator=","
                      direction="up"
                      duration={5}
                      className="count-up-text"
                    />
                    +
                  </span>
                </h3>
                <h4>Custom Design</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="page-5">
        <div id="page-5-content">
          <h1>
            <span>About</span> PixelThread Studio
          </h1>
          <p>
            PixelThread Studio specializes in high-quality vector conversions
            and embroidery digitizing for logos, apparel, and custom branding.
            We ensure precision, scalability, and production-ready designs
            tailored for businesses worldwide
          </p>
        </div>
        <div id="page-5-btm">
          <div id="about-btm">
            <div id="offer">
              <h4>
                <q>Our Story</q>
              </h4>
              <div id="offers">
                <p>
                  PixelThread Studio is a professional embroidery digitizing and
                  vector art service dedicated to delivering precision,
                  creativity, and efficiency. We specialize in crafting high
                  quality vector artwork and meticulously digitized embroidery
                  files, ensuring seamless results for apparel, merchandise, and
                  branding needs. <br />
                  <br />
                  Our commitment to fast turnaround, unmatched quality, and
                  customer satisfaction has earned us the trust of clients
                  worldwide. With a strong presence across 60+ countries and the
                  ability to serve 250+ daily customers, we continue to push the
                  boundaries of excellence in the digitizing and vector
                  industry. <br /> <br />
                  At PixelThread Studio, we don’t just create designswe bring
                  visions to life with precision and passion.
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
            <video ref={videoRef} src={video} muted loop />
          </div>
        </div>
      </div>
      <div id="page-6">
        <div id="page-6-content">
          <h2>Why Choose Us?</h2>
          <p>
            Choose PixelThread Studio for high-quality designs, fast delivery,
            affordable pricing, and reliable support tailored to your needs.
          </p>
        </div>
        <div id="page-6-cards">
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
          </div>
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
        </div>
      </div>
      <div id="page-7">
        <div id="page-7-content">
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
                <img src={FaceOneGirl} alt="" />
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src={FaceTwoGirl} alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah T.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah S.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah A.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah J.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah K.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah M.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
                <div className="client-info">
                  <h5> Noah J.</h5>
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
                Fantastic service! The team was very professional and delivered
                everything on time. I am beyond satisfied with my experience!
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
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                I wasn't sure at first, but this service completely exceeded my
                expectations. The attention to detail was incredible!
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
                I love how smooth and easy the whole process was. The quality is
                top-tier, and I will definitely be using this again!
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
                Everything was perfect! Great communication, fast delivery, and
                amazing quality. I couldn't be happier!
              </p>
              <div className="client-profile">
                <img src="./Assets/reviews card elem-03.png" alt="" />
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
                and customer support were top-notch. I will definitely be coming
                back!
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
        </div>
      </div>
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
          <div className="content">
            <h2>Can I avail the free triral for cheak quality and time?</h2>
            <i className="ri-arrow-down-line" />
          </div>
          <div className="content">
            <h2>How can i place the order?</h2>
            <i className="ri-arrow-down-line" />
          </div>
          <div className="content">
            <h2>How do i request for Quote/Estimate?</h2>
            <i className="ri-arrow-down-line" />
          </div>
          <div className="content">
            <h2>How much do you charge for digitizing?</h2>
            <i className="ri-arrow-down-line" />
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

export default Home;
