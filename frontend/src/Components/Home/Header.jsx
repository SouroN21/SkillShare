import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthModal from "../Modals/AuthModal";
import AuthService from "../../Services/AuthService"
const Header = () => {
  const navigate = useNavigate();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const isAuthenticated = AuthService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("focus", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("focus", checkLoginStatus);
    };
  }, []);
  
  const authButtonClicked = () => {
    if (isLoggedIn) {
      navigate("/community");
    } else {
      setIsAuthModalOpened(true);
    }
  };
  
  const handleAuthSuccess = () => {
    setIsAuthModalOpened(false);
    setIsLoggedIn(true);
    navigate("/");
  };
  
  return (
    <header className={`header ${isLoggedIn ? 'header--logged-in' : ''}`}>
      <Navbar />
      <div className="section__container">
        <div className="header__container">
          <div className="header__content">
            <h1>SKILL UP WITH SKILLSHARE</h1>
            <h2>PLAN. TRACK. MASTER.</h2>
            <p>
              Level up your software development journey with curated learning paths, real-world projects, 
              and a vibrant developer community. Your growth starts here.
            </p>
            <div className="header__btn">
              <button className="btn btn__primary" onClick={authButtonClicked}>
                {isLoggedIn ? "My Dashboard" : "GET STARTED"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="motivation-banner">
        <p>"Code hard. Learn fast. Share freely." <strong>- SkillShare GYM</strong></p>
      </div>
      
      <AuthModal
        onClose={() => setIsAuthModalOpened(false)}
        onSuccess={handleAuthSuccess}
        isOpen={isAuthModalOpened}
      />
    </header>
  );
};

export default Header;
