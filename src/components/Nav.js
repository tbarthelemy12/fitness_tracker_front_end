import React from "react";
import { useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/routines", name: "All Routines" },
  { id: 2, to: "/activities", name: "All Activities" },
  { id: 3, to: "/myroutines", name: "My Routines" },
];

const loggedOutLinks = [
  { id: 1, to: "/routines", name: "All Routines" },
  { id: 2, to: "/activities", name: "All Activities" },
  { id: 3, to: "/login", name: "Login" },
  { id: 4, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
 
  const NavLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav>
      {NavLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="onScreenLink">
          {name}
        </NavLink>
      ))}
      {isLoggedIn && (
        <button onClick={logout} className="logoutButton">
          Logout
        </button>
      )}
    </nav>
  );
}