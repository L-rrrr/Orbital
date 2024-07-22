import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import './navbar.css';

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const defaultPhotoURL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || defaultPhotoURL);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    } else {
      setPhotoURL(defaultPhotoURL);
    }
  }, [currentUser]);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/utown.jpg" alt="Logo" />
          <span>NUStay</span>
        </Link>
        <Link to="/home" className="nav-button">Home</Link>
        <Link to="/explore" className="nav-button">Explore</Link>
        <Link to="/forum" className="nav-button">Forum</Link>
        {userLoggedIn && (
          <Link to="/saved" className="nav-button">Saved</Link>
        )}
        <Link to="/about" className="nav-button">About</Link>
      </div>
      <div className="right">
        {userLoggedIn ? (
          <>
            <button
              onClick={() => { doSignOut().then(() => { navigate('/login'); }); }}
              className="nav-button"
            >
              Logout
            </button>
            <div className="user">
              <img
                src={photoURL}
                alt="User"
              />
              <span>{currentUser?.displayName || currentUser?.email}</span>
              <Link to="/profile" className="profile nav-button">
                <span>Profile</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">Sign in</Link>
            <Link to="/register" className="nav-button register">Sign up</Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setOpen(prev => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/agents">Agents</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
