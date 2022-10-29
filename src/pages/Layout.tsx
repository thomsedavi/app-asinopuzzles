import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact</Link>
        <a href="/login/aad">Login AAD</a>
        <a href="/login/twitter">Login Twitter</a>
        <a href="/login/github">Login GitHub</a>
        <a href="/logout">Logout</a>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
