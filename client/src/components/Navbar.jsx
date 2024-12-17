import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    console.log('Logged out');
    navigate('/');
  }

  return (
    <div className="navbar bg-cream shadow-md fixed top-0 left-0 right-0">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex px-1">
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/Home">Home</a></li>
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/Recommendations">Recommendations</a></li>
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/profile">Profile</a></li>
        </ul>
        <div className="navbar-end hidden lg:flex">        
          <button id="logoutbtn" className="btn bg-pink-600 text-white border-none hover:bg-pink-700 w-auto px-4 py-2 text-base" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-cream rounded-box w-52">
      
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/Home">Home</a></li>
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/Recommendations">Recommendations</a></li>
          <li><a className="btn bg-pink-600 text-white border-none hover:bg-pink-700" href="/profile">Profile</a></li>
          <li><button className="btn bg-pink-600 text-white border-none hover:bg-pink-700" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;