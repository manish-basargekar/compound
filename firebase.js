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

import { nanoid } from "nanoid";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,

	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,

	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,

	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,

	appId: process.env.NEXT_PUBLIC_APP_ID,

	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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

		const newList = {
			uid: nanoid(),
			name: "Untitled Checklist",
		};

		if (docs.docs.length === 0) {
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
				currentList: newList,
			});
		}

		const listPath = `users/${user.uid}/lists`;
		const listRef = doc(db, listPath, newList.uid);

		await setDoc(listRef, newList);
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

		const newList = {
			uid: nanoid(),
			name: "Untitled Checklist",
		};

		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			currentList: newList,
		});

		const listPath = `users/${user.uid}/lists`;
		const listRef = doc(db, listPath, newList.uid);

		await setDoc(listRef, newList);
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
