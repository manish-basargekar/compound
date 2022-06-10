// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	setDoc,
	doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
	apiKey: "AIzaSyCzjKHeucJiInPkvoNAz3z7aXGnUIm2bwQ",

	authDomain: "checklist-b48a7.firebaseapp.com",

	projectId: "checklist-b48a7",

	storageBucket: "checklist-b48a7.appspot.com",

	messagingSenderId: "1033453929418",

	appId: "1:1033453929418:web:16e3e660bd2418065f0533",

	measurementId: "G-N2HGL5TSTW",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (error) {
		console.log(error);
		alert(error.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
		toast.error(error.message);
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
	} catch (error) {
		console.log(error.message);
		toast.error(error.message);
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.log(error);
		alert(error.message);
	}
};

const logout = () => {
	signOut(auth);
};

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	storage,
};
