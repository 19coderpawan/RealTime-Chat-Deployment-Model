/*********************** FireBase Setup **********************************************************
 
1. open firebase and click on getting started.
2. login and then click on create new project .
3. fill the project name and other stuffs. 
5. Once you have created your app now use the configuation and the initlization code given in your program and
create firebase.js file where you are going to initilize and cofigurate your firebase app.


********(NOTE-: If your Datastore database is empty, you can switch to Firestore in Native mode with the following command:
           you have write it in your google cloud wihtin your project in the cloud shell/terminal and enter 
                then finaly get back to firebase and refresh the page you will able to use the native firestore now.
                 *******gcloud alpha firestore databases update --type=firestore-native*******

***********************************************************************************************************/



/*****************Firebase details and what the code that i have used for configuation in firebase.js*******************

This code is setting up Firebase in a JavaScript application using the Firebase JavaScript SDK. 
Firebase is a Google product that provides various cloud-based services, including authentication, 
real-time database, cloud storage, and more. In this code, it is specifically configuring Firebase Authentication.

Here's a breakdown of what each part of the code does:

Import Firebase SDK Functions:

What is SDK and its purpose?
SDK stands for software development kit. An SDK is a set of tools to build software for a particular platform. 
These tools also allow an app developer to build an app which can integrate with another program–i.e. a mobile 
measurement partner (MMP) like Adjust

What is SDK in Firebase?
The Admin SDK is a set of server libraries that lets you interact with Firebase from privileged 
environments to perform actions like: Read and write Realtime Database data with full admin privileges.

1.The code starts by importing the necessary functions from the Firebase SDK. It uses ES6 import syntax to import two specific functions:
initializeApp from "firebase/app": This function initializes Firebase with your app's configuration settings.
getAuth from "firebase/auth": This function is used to get an instance of Firebase Authentication.
Firebase Configuration:

2.The firebaseConfig object contains configuration settings for your Firebase project. These settings include:
apiKey: A unique identifier for your Firebase project.
authDomain: The domain associated with your Firebase project for authentication.
projectId: The ID of your Firebase project.
storageBucket: The storage bucket where Firebase will store files.
messagingSenderId: An ID used for Cloud Messaging.
appId: The ID of your Firebase app.
Initialize Firebase:

3.The initializeApp function is called with the firebaseConfig object as its argument. 
This function initializes Firebase with the provided configuration settings.
It returns an instance of the Firebase app, which is assigned to the app variable. 
You can use this app object to interact with various Firebase services in your application.
Get Firebase Authentication Instance:

4.The getAuth function is called to get an instance of Firebase Authentication.
This instance is assigned to the auth variable. With this auth object, you can perform user 
authentication operations, such as sign-up, sign-in, and managing user sessions, in your application.
After running this code, your JavaScript application is configured to work with Firebase, 
and you can start using Firebase Authentication and other Firebase services by referencing the app and 
auth objects in your application code.

To use Firebase Authentication, you would typically use the auth object to implement features like user 
registration, login, password reset, and more in your web application.

************************************************************************************************************/




/**************** Firebase Authentication/Signup setup ***********************************************************
 
1. when you have use the given configuation code of the firebase you have to import and then initilize one more
   thing  that is your Authentication . firtly import the getAuth file from firebase/auth and initilize/export 
   your auth .

2. Now, let use the signup authentication first,
  2.1=> For that simply go the doc section in the firebase and type createuser  email and  password  . 
  And select the first option of the Authentication with password account.

  2.2=> there you will find the template for the createuser authentication copy it and paste
  it in your  Signup file.   so before we pass the data to the createuserwithEmailandPassword lets first fetch 
  the user data from the input fields you can do it in two ways one is to  use the statehook another is to 
  simply fetch the data statically, for now we are going to fetch it statically .

        2.2.1=> for that we can use the onSubmit() eventListener which i going to mange the task of fetching the 
             data of the user from the form once it is submited.

 2.3=> Once you have fetched your data from the input fields its time to use the signup Authentication for 
      password and email . so copy the give code of authentication from the firebase in the handleSubmit().
      now once you have done this much its time to set up the Authentication in the Firebase application.
      go on the Authentication section of firebase and choose the provider , then enable it.

 2.4=> how whenever you click on the signup btn with new email and password a new user will be created , which you
     can see in the Users section of the Authentication section in the firebase app.
 
 2.5=> But, now the problem is that the createUserWithEmailAndPassword() method only takes auth, email, and password
       as parameters so what about the img and the image let see how we can tackle them.
       
       2.5.1=>To use the upload feature of the firebase search the upload image in the doc section.There you 
             find that you have use the firebase cloud storage.so let,s setup the cloud storage first, for 
             that simply go to the storage section of the firebase and click on getstarted then select storage
             for test mode and finish the setup.
       2.5.2=>Now, once the storage is setup now get back to the doc section and click on the cloud storage one
             then , in order to upload a file, you first create a reference to the full path of the file, 
             including the file name.so copy the root reference code of getstorage and import part and paste
             it in our firebase file.     
       2.5.3=>Now , go below the doc you will find the other method to upload a file here we will use the 
             monitor upload progress one copy the template and paste it in the try block of the handlesubmit()
             below the createUserWithEmailAndPassword().and , customise it in your own way like remove the 
             progess code section and import the storage that we have exported from the firebase.js file and 
             also to update the file , In the getDownloadUrl() use the updateProfile() method of the firebase/auth       
             package and inside it pass the res.user as well as in the object from pass {displayname and 
             photoUrl : downloadUrl };

           NOTE-:"The uploadBytesResumable function is used to upload a file to Firebase Storage in a resumable 
           manner. This means that even if the upload is interrupted due to network issues or other reasons, 
           it can be resumed from where it left off, rather than starting the upload from scratch. 
           This is particularly useful for large files or in scenarios where network connectivity is unreliable."

             With , this you can successfully store your data in the cloud storage of the firebase. you can
             see the data's in the storage section of the firebase.
  
  2.6=>Now, that you are able to store the name and the image of the user , but there's one more remaning 
      problem that is even though you can create new user ,you can perform login ,  you can update the current user
      data but you cannot access or contact other users, means what if you want to chat with your friends you must 
      able to get the access to message them but with the current scenario you can't do it , so let see how can 
      we tackle this problem.  
      
      2.6.1=> So, what the next is that we are going to set up firstore in the firebase where we are going to 
              store the users.For that simply open firstore and click on get started and then go to the 
              documentation section and search for create doc and option will appear add to firestore click on it.
      2.6.2=> Now to add data or users we have to follow some steps-:
             1-> firstly let's initilize the cloud firestore . using getFirestore() of 'firebase/firestore'.       
             2-> after expoting the instance of the firestore , now its time to set the document by using 
             setDoc() method in the signup file.
             3->In the setDoc() pass the db from the firebase.js file and pass collection name and also pass 
                an unique id to that particular user to loacate it easily.
             4->And inside the scope specify all the details you want to store like uid , email, name,photoURl.
             2.6.2.1=>Also, what we want is that once the user is registered , an another colletion should be
                formed for that particular user where the data about its messages with the other users are there
                and we are going to get the user with its uid.
    
   2.7=>Now, once every thing is done user is successfully signedup we ,are going to navigate the user to the 
        home page for that we are going to use the React-router-dom and create router for each page.
   
   
    
                        ********** Use Of Context API to avoid Prop drilling**************
             
     1=>Now, after signup and the navigation we are able to register the user and also able to navigate between 
        the pages but, here what happing is even when you dont have any user you can still able to access the 
        home page that's not correct right. So, in order to solve this issue what we are going to do is we are 
        going to check if the user is logedin or not then only we are going to navigate to the home page else not
        and not only that we also want to send the user data to multiple components which we can do as a prop also
        but that will lead to prop drilling instead we are going to create an context api and wrap all the 
        component in it let see how we can do it !

     2=>firstly, in the Authcontext.js file create the Context Api using the createContext() of react.
        secondly, alos create another context provider which will haldle the user data , in that function 
        we are going to use the useEffect() hook to fetch the user data on first render of the page to know
        wheather the user is login or not.For which you dont have to worry about anything firebase will do everything
        you  can simply use the onAuthStateChanged() pass the Auth you have initilize in the firebase file it will 
        return you the current user data. Simply store the data in the state .
        Also, you have to make sure that wile using the useEffect() hook you are lisiting to the realtime operation
        like here you must also use the clean up operation.

     3=>Also, once everything is fine , lets also create the logOut functionality also. To do that 
       we are simply going to use the signOut(Auth) of the firebase/Auth package to signout automatically. 

*********************************************************************************************************/

/**********************Login Setup Authentication using Firebase*****************************************
  
      1=>Now, to set up the login authentication once your registraction is done what you have to is we are 
        simply going to use the firebase libraries to automatically check the user credentials.
      
      2=>To, do that we have SignInWithEmailAndPassword(auth,email,password) method of the firebase/Auth file
         so, basically you have to do the same procedure like in the signup page create an handlesubmit() that
         will invoked when the user clicks on the Submit btn. 
      
      3=>In, this function simply firtly fetch the current data enter by the user using target[].value
        and then also mantian one state hook to chceck the error behaviour and once the user credentials are 
        correct then redirect him to the home page using useNavigate() method of react-router-dom.  
        
      4=>And, finally once you have the useData simply go to the navbar page and use the useContext()hook to access
         the data from the context api that you have created and use that data to display the user name and its 
         photoURL in the home page.  

 */

/*****************************************Search button setup*************************************************
  
1=>Now, to work with the search bar what we are going to do is firstly , we need three states one for the 
  currentuser that was enter by the user in the search box , second is for to store the user data if its mathes
  with the user in the firestore datbase, and last state is to track the behaviour of the error.

2=>simply use the onchange() eventlistner to fetch the user enter in the box . and also use another onkeyDown()
   eventlistner which is going to call the searchUser() method if user clicks on the enter btn.
   
3=>searchUser() work-: in the serachUser() method we are going to use the firebase query() method to work with
  search queries.for that simply go to the doc and type serach queries and you will find quiers templates there.

4=>first, thing you have to do is initlize the query means create an quaries against the collection.
   once , you have the quaries use the getDocs() method to reterive the data associated with the queries.

5=>Once you have the user displayed in the sidebar , now what you want is that once you click that user a 
   message section should be formed where both you and that particular user can privately chat with each other
   , but how are you gona do that.
   
   5.1=>To, acheive that what we can do is, we can create a newCollection in the firestore where we are going to 
       save the messages of the users. so what we can do is in the document field of the collection we have created
       we can join both uid of the user and as for the field section we can set the field message and it's type to
       be array .
       
   5.2=>So, the first thing i have to do make the serached user clickable so for that use the onClick() event on
        on the searched user so when you click on that particular user a function is going to invoked here it is
        handleSelect().
        
        5.2.1=>So, the first thing to do is to combine both the user id (currentuser,searcheduser) and store it 
        in the variable.then , what we have to do is in the try-catch block firstly we have to check wheather
        a new collection name chats exists or not , it is where we are going to store the users last chats.
        you can check that using the getDoc() method .

        5.2.2=>if its exists then its fine otherwise create a new collection named chats. which will store the 
        array of messages of the users.

        5.2.3=>Next, thing we have to do is to update the userchats that we have created when the user first 
        signup with the objective where we can store the details of whom the user had establish the chatgroup.
        so basically, what we are going to do is we are going to update that particular collection doc.
        To, do that simply use the updatedoc() and pass the collection name and the combinedid of both users
        we have to update the doc of both the user in which under the usercombineid we will store the userinfo 
        and the current date using the firestore timestamping().

   6=>Ok, finally ,do a simple task that once the user clicks on the serachedUser firstly make the input field 
      empty and secondly make the seracheduser invisible. Worry, not we are going to display that user using 
      the chats_member.js file.     
       
*/

/******Displaying Chatuser in the Chats_member section in  Realtime***********************************
  
1=>To fetch the data in realtime we are going to user the libraries of the firestore only and i am going to
fetch the data on firstrendering of the page using the useeffect() hook.

2=>Now, to fetch the data in realtime (means whenever their is some changes in the firestore it will be
   automatically reflected in the page as well). we are going to use the onSnapshot() method of the firestore
   .for that simply in the doc search realtime get updates.

3=> then , from there select the onSnapshot() method import it and with the help of which fetch the realtime
    data of the searched users stored under the uid of the currentuser under the chatUser collections.
    
4=>then, simply store that data which is in the object form in the state and then before destructing it 
   convert the data into  the array using the Ojbects.entries(state) and then apply the map function on it 
   an inside that map fucntion include the code to build the chat memeber where now you can easily use the 
   fetch data from the collectin in realtime.    
*/



/************How to fetch private Chat messages between the user***************************************************/
/**********Displaying the searched user data in the chat section / chat page.*********************************
    
 1=>Now , that we are able to merge the both the current user and the searched user it time to send the data of the 
    searched user to all the chat section component so that we can display the data there for that we have to 
    pass the prop to all the component but we have a better way and that is let create an context api and bind 
    all the component into it which makes the work easier.

 2=>Also, in the chatcontext api i am going to use the useReducer() hook to keep the track on the state of the 
    data also, because we here this time we have to work with multiple state so to make our code more readable we
    its a good option to use the useReducer() hook.

 3=> so in the chatcontext use the useReducer() hook . In that firslty initilize the state first like, here we
     have set our chatid=null and chats={} , then call the reducer method which takes two argument one is 
     state and the action, use swithc statement to build multiple cases based on different action types.
     after that call the useReducer () method which takes two argument reducer() and initial_state and returns 
     two thing one is current_state and disptach() method this method  passes the action type to the recuder fun.
     Then finally pass the state as the data in the value attribute of the context provider and also pass the 
     dispatch method.

 4=>also now, you have to wrap all the component in the chatcontext provider who you want to have the access to  
    passed data of the user. After that go to the chats_member.js file in which you new member will be added 
    then use an eventListener on that user and call an function to hadndle the selected user and also pass the
    userinfo at the same time . Then in the handle() call the dispath method of the ChatContext and pass the 
    action type and the payload to the reducer funtion from there. Now, with that once you click on the new 
    member its data is now stored in the ChatContext.
 
 5=>Now, lets use the data so first go to the navbar of the chat section and call the ChatContext and destructure
    the data in which the user info is store now use this data object and update the name in the navbar in the chat.js file.
 
    *********************************************************************************************************/

    /**************How to fetch the message from firstore in realtime and use it in application*****************
     
    1=>So, now we have the Searhed user , let see how we can fetch the message between the seached user and the 
       current user and display them in the message section for this we are going to use the combined id that
       we had created to set up the linkage between the users. And then we are going to use the onSnapshot() 
       metod of the firestore to fetch the message from the database in realtime.
    
    2=>So,now let's begin, we have to fetch the realtime data first from the firstore database so inside the 
       the useEffect() hook use the onSnapshot() method and difine you db, collection and the docId and then 
       use the doc.data().message to get the message in the array form and store that data in the setmessage(doc.data())
       state . 

    3=>Now, simply apply the map function as the data is in the array form to iterate to each message then 
    pass the message to the <Message/> component as a prop .   
    
    4=>Now, in the Message.js file accept the message which was passed to it as a prop. Also, we have to differentiate
       between the messages of the current user and the searched user for that firstly call both the context api
       in which their details are stored.other thing we will do in a little bit of time before that let's first 
       work on the input field to send the messages.

        ************Input filed and send Button Working *********************
        1=>Our, next job is to make the input field wroking which means if the sender type any message or selcet 
           any image and then he clicks on the send btn the message and the file should be send to the other person 
           ie the message should be seen on the screen.
       
        2=>To, make that happens we are going to use two states one is for the messages and another is for the 
           files . so, firstly we have to access the data enter in the input filed or the images selceted by the user
           for that we can simply use the javascript event.target.value or event.target.files[0] to fetch the data 
           . 
       
      3=>Now, you have the data its time to make the send btn functionalbe for that we can use the onclick() event
         listener which will invoke a function in which we are going to define how to send the fetched message and 
         the images in the data base .
      
      4=>Storing in the database means that in order to fetch the data and show it somewhere we have  to firslty  
         store it somewhere that's exactly what we are going to do we are going to store the data in the firestore 
         in the Chats collections under the combinedid document of the currentuser and the serached user.
      
      5=>So, for that we will firstly we will check if the sender is only sending the text or he is sending the images 
         also based on the condition if it is sending the text only then using the updatedoc() update the message 
         Array by including senderid , uuid (it's a package that will generate random unique identifiers),date and 
         the text. However , if he sending the images also we have to store the images as well as the text now, so for 
         that we are going to use the same methods to store the images like we did at the time of registration.
         we can use Storageref() and  updatebyteresumabe() and getdownload url to get the url of the imgae and 
         then again call the updatedoc() which will update the uuid,senderid,text,image:DownloadURL,date.
         
   ************************How to display the recent message under the users name***************************
    1=>to display the current message in the chat_members section we can store the last message in the userChat
       collection under both the users the currentUser and the serchedUser. and then we can fetch the message from
       there and display them just below the user name.

    2=>Now,in order to store the last message in the userChat what we can do is at the time when the sender clicks
       on the send btn by using the updatedoc() we can get to the specific collection in the specfic document and 
       can update the document by includin new ojbect there with name lastmessage and under that we can store the 
       text there this all we have to do in the input_send.js file.
       
    3=>Now,once you have stored the data in the collection or db now to fetch the last message just go to the 
       chat_members.js file where you have already accessed the collection there simply select the lastmessage 
       using the ?. opereator(The question mark (?) is used in this code as the nullish coalescing operator. 
       The nullish coalescing operator (??) returns the right-hand operand if the left-hand operand is null or 
       undefined, otherwise it returns the left-hand operand. In this case, the left-hand operand is 
       `chat[1].lastMessage` and the right-hand operand is `""`. This means that if `chat[1].lastMessage` 
       is null or undefined, the code will return `""` instead. This is useful for ensuring that the code 
       does not crash if `chat[1].lastMessage` is null or undefined.)

   ************How can we fetch the messages of both the users in the message section and distinguish them********
     
       1=> Now, in the end we have to show the messages also. You must have remember that in the messagee_section.js
          file after fetching  all the data about the users we have send it to the Message.js file where we are 
          displaying the messages all you have to do is just use the message prop and access the data from it.
          also to distinguish between the users you have to apply some conditions also . 

          WEll That's all for now --------------------------------->>

    */