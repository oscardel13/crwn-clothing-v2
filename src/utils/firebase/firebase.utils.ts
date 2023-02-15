// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User,
    NextOrObserver, 
    } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore,
    doc,
    getDoc,
    setDoc, 
    collection, 
    writeBatch,
    query,
    getDocs,    
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category } from "../../store/category/category.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2dMqIa0DJGZSLXuC2wh90FUlqh4EDg4M",
  authDomain: "crwn-clothing-db-b80bf.firebaseapp.com",
  projectId: "crwn-clothing-db-b80bf",
  storageBucket: "crwn-clothing-db-b80bf.appspot.com",
  messagingSenderId: "550453182265",
  appId: "1:550453182265:web:5ce4988c272109b76872e8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    promt: 'Select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export type UserData = {
    displayName?: string;
    email: string;
    createdAt: Date;
}

export type ObjectToAdd = {
    title: string
}

// CRUD DB USERS
export const db = getFirestore();

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const colletionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(colletionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    })
    await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(docSnapchat => docSnapchat.data() as Category)
}

export type AdditionalInfromation = {
    displayName?: string;   
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo={} as AdditionalInfromation): Promise<void | QueryDocumentSnapshot<UserData>>=> {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }
        catch (error){
            console.error();
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailPassword = async (email: string,password: string): Promise<UserCredential|void> => {
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWtihEmailPassword = async (email: string,password:string): Promise<UserCredential|void> => {
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback);
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            }, reject
        )
    })
}