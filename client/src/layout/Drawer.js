import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';

function Drawer(props) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
    {props.isVisible ?
    <div className="h-screen w-screen	bg-black bg-opacity-40 fixed top-0">
      <div className="h-screen w-9/12	bg-white px-5 py-10 relative flex flex-col items-start">
        <button className="d-block absolute top-2 right-5" onClick={props.hideDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Link>Current list</Link>
        <Link>All recipes</Link>
        { isLoggedIn === false && <> 
          <Link to="/register">Register</Link>
          <Link to="/login">Log in</Link>
        </> }
        { isLoggedIn === true && <Link to="/customer">Customers</Link> }
        <button>Logout</button>
      </div>
    </div>
    :
    null }
    </>
  )
}

export default Drawer
