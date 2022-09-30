import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import { FiSettings } from 'react-icons/fi';
import SoundSpotLogo from '../UI/SoundSpotLogo/SoundSpotLogo';

function Navigation() {
  const check = ({ isActive }) => isActive ? 'active-class' : 'navigation__item';
  return (
    <div className="navigation">
      <ul className="navigation__list">
        <div className="navigation__logo-container navigation__container">
          <li><Link className={check} to="/"><SoundSpotLogo /></Link></li>
        </div>
        <div className="navigation__menu-container navigation__container">
          <li><NavLink className={check} to="/home">Home</NavLink></li>
          <li><NavLink className={check} to="/profile">My profile</NavLink></li>
          <li><NavLink className={check} to="/bands">Bands</NavLink></li>
          <li><NavLink className={check} to="/artists">Artists</NavLink></li>
          <li><NavLink className={check} to="/spots">Spots</NavLink></li>
          <li><NavLink className={check} to="/music">My music</NavLink></li>
          <li><NavLink className={check} to="/profilesettings"><FiSettings /></NavLink></li>
        </div>
        <div className="navigation__logout-container navigation__container">
          <li><NavLink className={check} to="/signout">Sign Out</NavLink></li>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
