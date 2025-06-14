import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">
        Task Manager
      </Link>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      ) : (
        <div className="navbar-links">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
