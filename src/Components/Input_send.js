import React, { useContext, useState } from 'react'
import { Authcontext } from '../Context Api/Authcontext'
import { Chatcontext } from '../Context Api/Chatcontext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import {v4 as uuidv4} from 'uuid';// this will generate unique uid each time.
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input_send = () => {
 const [text,settext]=useState("");
 const [img,setimg]=useState(null);

  const {currentUser}=useContext(Authcontext);
  const {data}=useContext(Chatcontext);
  const handleSend=async()=>{
    // firstly check that if the user only sending the text or he is sending the text and imgaes also.
    if(img){
      // to send the image or we have to firstly store the image in the same location only.
      const storageRef = ref(storage, uuidv4());

      await  uploadBytesResumable(storageRef, img).then(() => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db,"chats",data.chat_Id),{
            message:arrayUnion({
              id:uuidv4(),
              senderid:currentUser.uid,
              text,
              date:Timestamp.now(),
              img:downloadURL
            })
          });
        });
      }
    );
    }
    else{
      // for that lets see how we can update a array in the firestore.
      /* f your document contains an array field, you can use arrayUnion() and arrayRemove() 
      to add and remove elements. arrayUnion() adds elements to an array but only elements not 
      already present. arrayRemove() removes all instances of each given element.*/ 
      await updateDoc(doc(db,"chats",data.chat_Id),{
        message:arrayUnion({
          id:uuidv4(),
          senderid:currentUser.uid,
          text,
          date:Timestamp.now(),
        })
      });
    }
     
    await updateDoc(doc(db,"userChat",currentUser.uid),{
      // to update in the nested document.
      [data.chat_Id + ".lastMessage"]:{
        text
      },
      [data.chat_Id +".date"]: serverTimestamp()
    })
    // await updateDoc(doc(db,"userChat",data.chat_Id),{
    //   [data.chat_Id+".lastMessage"]:{
    //     text
    //   },
    //   [data.chat_Id +".date"]:serverTimestamp()
    // })


    setTimeout(()=>{
      settext("");
      setimg(null);
    })
  }
  return (
    <>
      <div className="inputsend">
        <input type="text" placeholder='Type Message...........' value={text} onChange={(e)=>settext(e.target.value)}/>
        <div className="sendicons">
        <input type="file" style={{display:"none"}}  id="filesend"  onChange={(e)=>setimg(e.target.files[0])} />
        <label htmlFor="filesend">
        <i class="fa-solid fa-paperclip fa-xl"></i>
        <i class="fa-regular fa-image fa-xl"></i>
        </label>
        <i class="fa-solid fa-paper-plane fa-xl" onClick={handleSend}></i>
        </div>
      </div>
    </>
  )
}

export default Input_send
