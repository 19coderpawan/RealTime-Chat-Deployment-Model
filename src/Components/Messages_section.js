import React, {  useContext, useEffect, useState } from 'react'
import Message from './Message'
import { Chatcontext } from '../Context Api/Chatcontext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

const Messages_section = () => {
  const {data}=useContext(Chatcontext);
  // and then also create an state that will hold the messages.
  const [messages,setmessages]=useState([]);

  useEffect(()=>{
   const unsub=onSnapshot(doc(db,"chats",data.chat_Id),(doc)=>{
     doc.exists() && setmessages(doc.data().message);
   })

   return ()=>{
    unsub();
   }
  },[data.chat_Id]);
  console.log(messages);
  return (
    <>
      <div className="messages_section">
       {messages.map((m)=>(
        <Message key={m.id} message={m}/>
       ))}
      </div>
    </>
  )
}

export default Messages_section
