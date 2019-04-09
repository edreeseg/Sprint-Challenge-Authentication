import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(props) {
  const handleLogout = ev => {
    localStorage.removeItem('jwt');
    props.history.push('/');
  };
  const token = localStorage.getItem('jwt');
  return (
    <nav className="nav-bar">
      <NavLink exact to="/">
        Home
      </NavLink>
      {token ? (
        <>
          <NavLink to="/jokes">View Dad Jokes</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}
