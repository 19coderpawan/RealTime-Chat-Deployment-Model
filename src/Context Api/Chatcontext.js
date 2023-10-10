// import { onAuthStateChanged } from "firebase/auth";
import {  createContext,useContext, useReducer } from "react";
// import { auth } from "../Firebase";
import { Authcontext } from "./Authcontext";
// create the contextApi.
export const Chatcontext=createContext();

// create an context provider which is going to handle the current user.
 export const ChatProvider=({children})=>{
  const {currentUser}=useContext(Authcontext);
  //  firstly let create an initial state.

  const Initial_state={
    chat_Id:"null",
    chats:{}
  }

  const reducer=(state,action)=>{
    switch(action.type){
      case "Change_User":
        return{
          chats:action.payload,
          chat_Id:currentUser.uid >action.payload.uid ? 
          currentUser.uid+action.payload.uid : 
          action.payload.uid+currentUser.uid
        };
        
        default:return state;
        
    }
  }


// call the useReducer() hook.

const [state,dispatch]=useReducer(reducer,Initial_state);
  

//Now, with the help of the Context.provider we can provide the access of the data(ie. currentUser ) to all the 
//  children component wraped inside it.So now any component we wrap inside this authprovdier will aceess to the 
// value passed in the provider.
return(

<Chatcontext.Provider value={{data:state, dispatch}}>
    {children}
</Chatcontext.Provider>
)

};



