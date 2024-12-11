import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav >
    <div className="flex-1">
    
      <button tag="a" className="text-xl normal-case" color="ghost">
        Home
      </button>
     
      <button tag="a" className="text-xl normal-case" color="ghost">
        Login
      </button>
   
      <button tag="a" className="text-xl normal-case" color="ghost">
        Profile
      </button>

      <button tag="a" className="text-xl normal-case" color="ghost">
        Recommendations
      </button>
  
    </div>

          <Link className="flex-1"
            to="/Login"
          >
           SignIn
          </Link>
      
    <div className="flex-none gap-2">
      <form>
        <input bordered="true" type="text" placeholder="Search" className="w-24 md:w-auto" />
      </form>

        <button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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