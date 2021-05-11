import React, { useState } from "react";
import Drawer from '../layout/Drawer';

function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  function hideDrawer() {
    setOpenDrawer(false);
  }
  return (
    <>
      <div className="w-screen p-5 flex items-center text-white font-semibold bg-green-500">
        <button className="mr-5" onClick={() => setOpenDrawer(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <p>Weekly Menu</p>
        <button className="ml-auto shadow-md border rounded p-2">Generate list</button>
      </div>
      <Drawer isVisible={openDrawer} hideDrawer={hideDrawer} />
    </>
  );
}

export default Navbar;