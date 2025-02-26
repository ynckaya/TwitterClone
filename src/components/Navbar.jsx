import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
      <FontAwesomeIcon icon={faTwitter} className="mr-3"/>Twitter
      </Link>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="mr-4">Giriş Yap</Link>
            <Link to="/register">Kayıt Ol</Link>
          </>
        ) : (
          <>
          <Link to="/profile" className="mr-5">
            <FontAwesomeIcon icon={faUser} className="mr-2" />Profilim
          </Link>
          <button onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
