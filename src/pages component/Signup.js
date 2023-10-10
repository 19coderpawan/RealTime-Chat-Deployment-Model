import React, { useState } from 'react'
import avatar from '../imges/avatar.avif';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage,db } from '../Firebase';
import { useNavigate,Link } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [error, seterror] = useState(false);
  // to observe the loader behaviour we are going to make the state to track its behaviour.
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let file = e.target[3].files[0];
    // console.log(auth)
    // console.log(email)
    // console.log(password)
    // Signup Authentication of the firebase.
    // after
    try {
      setloading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
       console.log(response);

      // to upload an file 
      
      /*This would create a storage reference with the user's email as a directory and the displayname as the object 
      name within that directory.Ensure that both email and displayname are valid and unique to avoid conflicts in
      your Firebase Storage.*/

      // const sanitizedEmail = email.replace(/[@.]/g, '-'); // Replace "@" and "." with hyphens
      //  const sanitizedDisplayName = displayname.replace(/[^a-zA-Z0-9-_]/g, ''); // Remove invalid characters
      // const storageRef = ref(storage, `${sanitizedEmail}/${sanitizedDisplayName}`);

      const storageRef = ref(storage, `${email}/${displayName}`);

     await  uploadBytesResumable(storageRef, file).then(() => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL
            });

             // Add a new document in collection "Users"
            await setDoc(doc(db, "users", response.user.uid), {
              uid:response.user.uid,
              displayName,
              email,
              photoURL:downloadURL
            });

            // Add another document in collection "user-chat"
            await setDoc(doc(db,"userChat",response.user.uid),{});
            
            // after successfull registration just navigate to the home page.
              navigate("/");
          });
        }
      );

    } catch (error) {
      setloading(false);
      seterror(true);
      // console.log(error)

    }
    
    // before
    /*.then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })*/
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });


  };

  return (
    <>
      <div className="FormContainer">
        <div className="formWrapper">
          <span className="logo">Hello Chat</span>
          <span className="title">Register</span>
          <form action="" onSubmit={handleSubmit}>
            <input type="name" placeholder='enter your name'  title='name' required/>
            <input type="email" placeholder='enter your email' title='email id' required />
            <input type="password" placeholder='enter your password' title='password' minLength={6} required/>
            <input type="file" style={{ display: "none" }} id="file" placeholder='select your avatar' />
            <label htmlFor="file">
              <img src={avatar} style={{ width: "50px" }} alt="" />
              <span>ADD an Avatar?</span>
            </label>
            <button>Signup</button>
            {loading && <div className='loader'></div>}
            {loading && <p>Please wait......</p>}
            {error && alert("check your credentials")}
          </form>
          <p style={{ color: "#7b96ec" }}>Already an user? <Link to="/login">Login</Link> </p>
        </div>
      </div>
    </>
  )
}

export default Signup
