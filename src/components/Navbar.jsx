import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    },
  ];
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
            {routes.map((route) => (
              <Link key={route.path} to={route.path}>
                {route.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
