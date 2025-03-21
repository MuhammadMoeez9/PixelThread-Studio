import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import "./App.css";
import { AuthProvider, useAuth } from "./Context/AuthContext";
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
import Pricing from "./Pages/Pricing";
// import Loader from "./Component/Loader"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Service" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/About" element={<About />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Upload" element={<UploadForm />} />
          <Route path="/Animation" element={<AboutAnimation />} />
          <Route path="/" element={<HomeAnimation />} />
          <Route path="/portfolio" element={<HomeAnimation />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
