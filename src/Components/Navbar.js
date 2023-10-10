import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
// import {Link} from 'react-router-dom';
import { auth } from '../Firebase';
import { Authcontext } from '../Context Api/Authcontext';

const Navbar = () => {
  const {currentUser}=useContext(Authcontext);
  console.log("current user details are-:",currentUser)
  return (
    <>
       <div className="nav">
        <span className="logo">Hello chat</span>
        <div className="usernav">
            <img src={currentUser.photoURL} alt="" />
            <span className="name" >{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
       </div>
    </>
  )
}

export default Navbar
