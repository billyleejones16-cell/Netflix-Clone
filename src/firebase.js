import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA8-Yl7FLczPw2ckAg0nVAopmJ1SYOoMt8",
  authDomain: "netflix-clone-2026-c0174.firebaseapp.com",
  projectId: "netflix-clone-2026-c0174",
  storageBucket: "netflix-clone-2026-c0174.firebasestorage.app",
  messagingSenderId: "892275094205",
  appId: "1:892275094205:web:5935771e7d56f519e3bdd4",
  measurementId: "G-1VSPN9CKCR"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
     const res = await createUserWithEmailAndPassword(auth, email, password);
     const user = res.user; 
     await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    }); 
    } catch (error) {
        console.log(error);
        alert(error);
        toast.error(error.code.split("/")[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
        toast.error(error.code.split("/")[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };