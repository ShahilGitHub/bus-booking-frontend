import { NavLink } from "react-router-dom";
import busLogo from "../assets/bus-logo.png";

export default function Navbar() {

  return (
    <div className="navbar">

      <div className="logo-section">
        <img
          src={busLogo}
          alt="Bus Logo"
          className="logo"
        />
        <h2>Bus Booking</h2>
      </div>

      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Reservation
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

      </div>

    </div>
  );
}