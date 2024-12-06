import React from 'react';
function Navbar() {
  return (
    <Navbar {...args}>
    <div className="flex-1">
      <Button tag="a" className="text-xl normal-case" color="ghost">
        daisyUI
      </Button>
    </div>
    <div className="flex-none gap-2">
      <Form>
        <Input bordered type="text" placeholder="Search" className="w-24 md:w-auto" />
      </Form>
      <Dropdown end>
        <Button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </Button>
        <Dropdown.Menu className="w-52 menu-sm mt-3 z-[1] p-2">
          <li>
            <a className="justify-between">
              Profile
              <Badge>New</Badge>
            </a>
          </li>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </Navbar>
  );
}

export default Navbar;