import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import './Layout.css';

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default Layout;
