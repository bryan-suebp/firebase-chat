import React, {useState, useEffect} from 'react';
import Button from './Button';
import Channel from './Channel';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBIq7p72sc8Pbt9LcUN99eVQSu5Igla41k",
  authDomain: "fir-chat-86919.firebaseapp.com",
  projectId: "fir-chat-86919",
  storageBucket: "fir-chat-86919.appspot.com",
  messagingSenderId: "394923417602",
  appId: "1:394923417602:web:ae34471bbd9721c587071b",
})

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
      } else {
          setUser(false);
      }
      if(initializing){
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing])
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if(initializing) return "Loading...";
  return (
    <div >
     {user? (
       <>
       <Button onclick={signOut}>Sign out</Button>
       <Channel user={user} db={db}/>
       </>
       ) : 
       <Button onclick={signInWithGoogle}>Sign in with Google</Button>
      }
    </div>
  );
}

export default App;
