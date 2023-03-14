import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav id='nav'>
            <ul>
                <li>
                <NavLink to="home" style={({ isActive }) => {
                    return { textDecoration: isActive ? 'underline' : 'none' };
                }}
                >
                Main Page
                </NavLink>
                </li>
                <li>
                <NavLink to="about" style={({ isActive }) => {
                        return { textDecoration: isActive ? 'underline' : 'none' };
                    }}
                    >
                    About Us
                </NavLink>
                </li>
            </ul>
        </nav>
      </header>
    );
  }
}
