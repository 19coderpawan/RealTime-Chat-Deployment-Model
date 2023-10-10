import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chatsmember from './Chatsmember'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chatsmember/>
    </div>
  )
}

export default Sidebar
