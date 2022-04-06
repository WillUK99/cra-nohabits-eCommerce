import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

// Allows us to write to the firebase db with a batch of Objects -> see product.context.jsx ~line 18
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Get a reference to the collection
  const collectionRef = collection(db, collectionKey)
  // Start a batch
  const batch = writeBatch(db)
  // Loop through the object we want to add
  objectsToAdd.forEach((obj) => {
    // Create a new doc ref for each new object we want to add
    const newDocRef = doc(collectionRef, obj.title.toLowerCase())
    // Set the data to be written to the doc
    batch.set(newDocRef, obj)
  })
  // Commit the batch
  return await batch.commit()
}

export const getCategoriesAndDocuments = async () => {
  // Get a reference to the collection we want to query
  const collectionRef = collection(db, "categories")

  const q = query(collectionRef)

  // Get the document snapshots we want to query
  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // Get the data from the docSnapshot in this case we want the title and items
    const { title, items } = docSnapshot.data()
    /**
     * We want to return an object with the title as the key and the items as the value to the accumulator.
     * in this case the value of the object is "items" is an object of the items in the category, the title is the key.
     * In this case the value of the object we are creating on each iteration of the reducer will have its key as the title and the value as the items{}.
     * 
     * console.log will show the object we are creating on each iteration of the reducer.
     */
    acc[title.toLowerCase()] = items
    // console.log(acc)
    // console.log(title, items)
    // the acc is the object we want to return for each subsequent iteration of the reducer.
    return acc
  }, {})
  
  // return the categoryMap object
  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return
  // Get a reference to the document we want to query
  // We want to query the users collection. 
  // And the userAuth.uid is the unique id of the user document we want to query
  const userDocRef = doc(db, "users", userAuth.uid)
  // console.log(userDocRef)

  // Get the data from the document we want to query
  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)

  // If the userSnapshot is empty then we want to create a new user document
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // Create a new user document with the data we want to write to the document
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (err) {
      console.log("Oops looks like something went wrong,", err.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = async (callback) => {
  onAuthStateChanged(auth, callback)
}
