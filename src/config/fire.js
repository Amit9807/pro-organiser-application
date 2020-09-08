import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBvQKcOjz1winUM5FInE_Hso_Nj2OVCX2M",
    authDomain: "pro-organizers.firebaseapp.com",
    databaseURL: "https://pro-organizers.firebaseio.com",
    projectId: "pro-organizers",
    storageBucket: "pro-organizers.appspot.com",
    messagingSenderId: "988435621912",
    appId: "1:988435621912:web:e30570f42615c8597abb6d"
  };

  const fire= firebase.initializeApp(firebaseConfig);

  export default fire;


  
  