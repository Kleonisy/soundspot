import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const check = ({ isActive }) => isActive ? 'navigation__item active-class' : 'navigation__item';
  return (
    <div className="navigation">
      <ul className="navigation__list">
        <li><Link to="/" className="navigation__item">Example</Link></li>
        <li><NavLink to="/add" className={check}>Example2</NavLink></li>
      </ul>
    </div>
  );
}

export default Navigation;
