import { onAuthStateChanged } from "firebase/auth";
import {  createContext,useEffect, useState } from "react";
import { auth } from "../Firebase";
// create the contextApi.
export const Authcontext=createContext();

// create an context provider which is going to handle the current user.
 export const AuthProvider=({children})=>{
   const [currentUser,SetcurrentUser]=useState();

/*    what we want is that our context api will check on first rendreing of the page if we are logedin or not
  and that can be done using useEffect() hook.*/

  useEffect(()=>{
    // check user is login or not.
    const cleanup=onAuthStateChanged(auth,(user)=>{
        SetcurrentUser(user);
        
    })

    return()=>{
      cleanup();
    }
  },[]);

  

//Now, with the help of the Context.provider we can provide the access of the data(ie. currentUser ) to all the 
//  children component wraped inside it.So now any component we wrap inside this authprovdier will aceess to the 
// value passed in the provider.
return(

<Authcontext.Provider value={{currentUser}}>
    {children}
</Authcontext.Provider>
)

};



