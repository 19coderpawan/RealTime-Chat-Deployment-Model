import React, { useContext } from 'react'
import Messages_section from './Messages_section'
import Input_send from './Input_send'
import { Authcontext } from '../Context Api/Authcontext'
import { Chatcontext } from '../Context Api/Chatcontext'

const Chat = () => {
  // const {currentUser}=useContext(Authcontext);
  const {data}=useContext(Chatcontext);
  console.log(Object.entries(data));
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span style={{textTransform:"capitalize"}}>{data.chats.displayName}</span>
        <div className="chaticons">
        <i class="fa-solid fa-video  fa-xl"></i>
        <i class="fa-solid fa-user-plus fa-xl"></i>
        <i class="fa-solid fa-list"></i>
        </div>
      </div>
      <Messages_section/>
      <Input_send/>
    </div>
  )
}

export default Chat
