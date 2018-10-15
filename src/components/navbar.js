import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard/home">Home</Link>
      <Link to="/dashboard/add">Add Food</Link>
      <Link to="/dashboard/calendar">Calendar</Link>
      <Link to="/dashboard/settings">Settings</Link>
    </nav>
  );
}

export default connect()(Navbar);
