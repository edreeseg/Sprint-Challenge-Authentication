import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(props) {
  const handleLogout = ev => {
    localStorage.removeItem('jwt');
    props.history.push('/');
  };
  return (
    <nav className="nav-bar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/jokes">View Dad Jokes</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
