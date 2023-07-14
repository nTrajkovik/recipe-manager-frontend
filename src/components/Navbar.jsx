import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const routes = [
    {
      path: "/",
      title: "Homepage",
    },
    {
      path: "/recipes",
      title: "My Recipes",
    },
    {
      path: "/add",
      title: "Add recipe",
      roles: ['admin'],
    },
    {
      path: "/login",
      title: "Log in",
      guestsOnly: true,
    },
    {
      path: "/register",
      title: "Sign up",
      guestsOnly: true,
    },
  ];
  const filteredRoutes = routes.filter((route) => {
    if (route.guestsOnly && !user) return true;
    if (route.guestsOnly && user) return false;
    if (!route.roles) return true;
    if (route.roles && user && route.roles.includes(user.role)) return true;
    return false;
  });
  return (
    <div>
      <div style={{ height: "86px" }}></div>
      <div
        style={{
          height: "86px",
          background: "#fbdab7",
          position: "fixed",
          width: "100%",
          top: 0,
        }}
      >
        <div
          style={{
            height: "86px",
            display: "flex",
            padding: "0 4rem",
          }}
        >
          <h1>Recipe Manager 9000</h1>
          <nav
            style={{
              display: "flex",
              justfiyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              gap: "20px",
            }}
          >
            {filteredRoutes.map((route) => (
              <Link key={route.path} to={route.path}>
                {route.title}
              </Link>
            ))}
            {user ? <button onClick={logout}>Log out</button> : ""}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
