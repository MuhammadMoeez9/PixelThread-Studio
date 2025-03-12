import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import ProjectsPage from "./Pages/ProjectPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import UserDetail from "./Pages/UserDetail";
import UploadForm from "./Pages/uploadform";
import RotatingText from "./Component/RotatingText";
import "../src/Component/RotatingText.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AboutAnimation from "./Pages/AboutAnimation";
import HomeAnimation from "./Pages/HomeAnimation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Service" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Upload" element={<UploadForm />} />
          <Route path="/Animation" element={<AboutAnimation />} />
          <Route path="/HomeAnimation" element={<HomeAnimation />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
