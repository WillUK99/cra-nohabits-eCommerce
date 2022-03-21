import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

// Web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN9pJ0TH8sDROd70_g3kzCuO59qw870e8",
  authDomain: "nohabits-db.firebaseapp.com",
  projectId: "nohabits-db",
  storageBucket: "nohabits-db.appspot.com",
  messagingSenderId: "480495160669",
  appId: "1:480495160669:web:d5a25db9866e292c192cb4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  // Sets which collection we want to use, in this case the users collection, 
  // and what the document will be called in this case the users uid
  const userDocRef = doc(db, "users", userAuth.uid)
  // console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (err) {
      console.log("Oops looks like something went wrong,", err.message)
    }
  } 

  return userDocRef
}