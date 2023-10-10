/* In this file i am  going to list all the error or the problems that is had faced and how i overcome it */

/*

1-:  when trying to setup my firestore in i was not able to use the firestore in the native mode due to some 
    reason it saying that i can only use the firestore in datastore mode only in the google cloud console.

    **** The error statement was -: This project is set up to use Cloud Firestore in Datastore mode. This mode 
    can only be accessed from the Google Cloud Console when try use the firestore I am getting this error can 
    you help me how can I use the firestore directly instead of using console.*****

    Now to solve this problem what i have to do is i have to somehow change the mode form datastore to firestore
    after seraching for long hours i got the solution that is -:
      "If your Datastore database is empty, you can switch to Firestore in Native mode with the following command:
           you have write it in your google cloud wihtin your project in the cloud shell/terminal and enter 
                then finaly get back to firebase and refresh the page you will able to use the native firestore now.
                 *******(gcloud alpha firestore databases update --type=firestore-native)".

2-: Second Problem that i had faced was also in the firestore i was not able to connect with the my firestore
    the problem was with the The uploadBytesResumable function does not return an object with an on function for 
    listening to events. Instead, it returns an UploadTask object that you can use to track the upload progress. 
    
    So, in order to solve this problem instead of generating the object uploadTask is am going to directly 
    return the data to the db and create the users data collection.
    Like in the code.
                 */