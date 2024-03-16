import { initializeApp } from "firebase/app";
import firebaseConfig from "./config"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


export const firebaseapp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseapp)

// export const provider = new GoogleAuthProvider()

export const storage = getStorage(firebaseapp);
export const firestore = getFirestore(firebaseapp)
