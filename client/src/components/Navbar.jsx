import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav >
    <div className="flex-1">
    
      <button tag="a" className="text-xl normal-case" color="ghost">
        <a href="./pages/Home.jsx">Home</a>
      </button>
     
      <button tag="a" className="text-xl normal-case" color="ghost">
        <a href="./pages/Login.jsx">Login</a>
      </button>
   
      <button tag="a" className="text-xl normal-case" color="ghost">
      <a href="./pages/Profile.jsx">Profile</a>
      </button>

      <button tag="a" className="text-xl normal-case" color="ghost">
      <a href="./pages/Recommendations.jsx">Recommendations</a>
      </button>
  
    </div>

         
      
    <div className="flex-none gap-2">


      <form>
        <input bordered="true" type="text" placeholder="Search" className="w-24 md:w-auto" />
      </form>

        <button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
          <div className="w-10 rounded-full">
            
          </div>
        </button>
        {/* <dropdown.Menu className="w-52 menu-sm mt-3 z-[1] p-2">
          <li>
            <a className="justify-between">
              Profile
              <Badge>New</Badge>
            </a>
          </li>
          {/* <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown.Menu>*/}

    </div>
  </nav>
  );
}

export default Navbar;