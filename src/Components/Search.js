import React, { useContext, useState } from 'react'
// Create a reference to the cities collection
import { collection, query, where, getDoc, setDoc, doc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { Authcontext } from '../Context Api/Authcontext';

const Search = () => {
  const [User, setUser] = useState("");
  const [fetchuser, setfetchuser] = useState("");
  const [error, setError] = useState(false);
  // lets fetch the current users using the Auth.
  const {currentUser}=useContext(Authcontext);
  const searchUser = async () => {
    // Create a query against the collection.
    const q = query(collection(db, "users"), where("displayName", "==", User));

    try {
      // After creating a query object, use the get() function to retrieve the results:
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setfetchuser(doc.data());
      });

    } catch (error) {
      setError(true);
      
    }
  }

  const handlekeydown = (e) => {
    
   e.code === 'Enter' && searchUser();
  }
  console.log(fetchuser)

  const handleSelect=async()=>{
    console.log(currentUser.uid +"its the handleselect");
    console.log(fetchuser.uid +"its the handleselect");
    
    const userscombineid= currentUser.uid >fetchuser.uid ? 
    currentUser.uid+fetchuser.uid : 
    fetchuser.uid+currentUser.uid;
   console.log(userscombineid);
    // console.log(currrentUser.uid +"its the handleselect");
    // console.log(fetchuser.uid +"its the handleselect");
    try {
      //  firstly we have to check wheather the group/collection where we have to store the messages exisits or not.
       const response=await getDoc(doc(db,"chats",userscombineid));
       console.log(response);
      //  if user not exisits.
      if(!response.exists()){
        // lets create the user chat with usercombinedid.
        await setDoc(doc(db,"chats",userscombineid),{message:[]});

        // lets create the chat where we are going to store the user info and their messages.
        /* Structure to create the chat of the users 
           chats:{
            userid:{
              combinedid:{
                userinfo:{
                  name,image,id
                },
                lastmessage:"",
                date:
              }
            }
           }
        */
      //  for fetchuser.
       await updateDoc(doc(db,"userChat",fetchuser.uid),{
        [userscombineid+".userinfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [userscombineid+".date"]:serverTimestamp()
       });
      // for currentuser.
      await updateDoc(doc(db,"userChat",currentUser.uid),{
        [userscombineid+".userinfo"]:{
          uid:fetchuser.uid,
          displayName:fetchuser.displayName,
          photoURL:fetchuser.photoURL
        },
        [userscombineid+".date"]:serverTimestamp()
      });

      }
      
    } catch (error) {
       console.log(error);
    }
    setUser("");
    setfetchuser("");
  }
  return (
    <>
      <div className="search">
        <div className="searchform">
          <input type="text" placeholder='Find users....' value={User} onKeyDown={handlekeydown} onChange={(e) => setUser(e.target.value)} />
        </div>
      </div>
      {error && alert("No such user exists")};
      { fetchuser &&
        <div className="userchat" onClick={handleSelect} >
          <img src={fetchuser.photoURL} alt="" />
          <div className="userinfo">
            <span>{fetchuser.displayName}</span>
          </div>
        </div>
      }

    </>
  )
}

export default Search
