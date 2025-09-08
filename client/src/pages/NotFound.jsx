// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto px-3 col-sm-7 col-md-6 col-lg-5">
      <div id="register" className="p-4 rounded border border-2 mt-5 text-center text-primary">
        <h1 className="text-danger">404</h1>
        <h2>Page Not Found!</h2>
        <p className="text-dark">Oops! The page you are looking for doesn’t exist.</p>
        <hr className=""/>
        <Link className="text-primary" to="/" style={{ color: "blue", textDecoration: "underline" }}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
