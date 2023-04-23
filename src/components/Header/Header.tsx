import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav id="nav">
        <ul>
          <li>
            <NavLink
              to="home"
              style={({ isActive }) => {
                return { textDecoration: isActive ? 'underline' : 'none' };
              }}
            >
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              style={({ isActive }) => {
                return { textDecoration: isActive ? 'underline' : 'none' };
              }}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="form"
              style={({ isActive }) => {
                return { textDecoration: isActive ? 'underline' : 'none' };
              }}
            >
              Create Your Cocktail
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
