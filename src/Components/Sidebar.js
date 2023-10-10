import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats_member from './Chats_member'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chats_member/>
    </div>
  )
}

export default Sidebar
