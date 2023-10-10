import React, { useContext, useEffect, useRef } from 'react'
import { Authcontext } from '../Context Api/Authcontext'
import { Chatcontext } from '../Context Api/Chatcontext';

const Message = ({message}) => {
    const {currentUser}=useContext(Authcontext);
    const {data}=useContext(Chatcontext);
    const ref=useRef();// this is to create a reference of the component.
    // console.log(data);
    // let date= new Date();
       useEffect(()=>{
          ref.current?.scrollIntoView({behaviour:"smoot"});
       },[message])
    return (
        <>
        {/* if the sender is the currentUser then it means the message is sent by the owner so message
        will display in the left side other wise it will display in the Right side. */}
            <div  ref={ref}
            className={`message ${message.senderid === currentUser.uid && "owner"}`}>
                <div className="messageinfo">
                    {/* if the sender is the currentuser only then display the image of the current user only
                      but if not then display the image of the other user. */}
                    <img src={message.senderid === currentUser.uid ? currentUser.photoURL :data.chats.photoURL}
                    alt="" />
                     {/* <span>{date.getTimezoneOffset()}</span>  */}
                </div>
                <div className="messagecontent">
                   
                        <span>{message.text}</span>
                    {/* if the message has the image then only show the image . */}
                       {
                    message.img &&  
                    <img src={message.img} alt="" />
                    } 
                        
                    </div>
                    
            </div>
        </>
    )
}

export default Message
