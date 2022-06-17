import Style from "../styles/Dashboard.module.scss";
import { useState, useEffect } from "react";
import Task from "../components/Task/Task";

import { nanoid } from "nanoid";


import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

import { auth,  db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";

import {
	setDoc,
	doc,
	query,
	collection,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import NewTaskInput from "../components/NewTaskInput/NewTaskInput";

function Dashboard() {
	const [newHabit, setNewHabit] = useState("");

	const [habitList, setHabitList] = useState(null);

	const [user, loading, error] = useAuthState(auth);

	const [currentListUid, setCurrentListUid] = useState(null);

	const [allLists, setAllLists] = useState([]);

	const [currentHeading, setCurrentHeading] = useState("");

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const router = useRouter();

	useEffect(() => {
		if (loading) return;
		if (!user) return router.push("/login");

		if (window.innerWidth < 500) {
			setSidebarOpen(false);
		}
	}, [user, loading]);

	useEffect(() => {
		if (loading) return;
		if (!user) return router.push("/login");
		const useListsPath = `users/${user?.uid}/lists`;

		const q = query(collection(db, useListsPath));

		onSnapshot(q, (snapshot) => {
			setAllLists(snapshot.docs.map((doc) => doc.data()));
		});

		const currentListPath = `users/${user?.uid}`;

		const current = doc(db, currentListPath);

		onSnapshot(current, (snapshot) => {
			const data = snapshot.data();
			setCurrentListUid(data.currentList.uid);
			setCurrentHeading(data.currentList.name);
			fetchTasks(snapshot.data().currentList.uid);
		});
	}, [user]);

	const addHabit = (e) => {
		e.preventDefault();
		const addNewHabit = { uid: nanoid(), taskTitle: newHabit, status: false };
		addTaskToDb(addNewHabit);
		// setHabitList([...habitList, addNewHabit]);
		setNewHabit("");
	};

	const addTaskToDb = async (task) => {
		const listPath = `users/${user.uid}/lists/${currentListUid}/tasks`;
		const taskRef = doc(db, listPath, task.uid);

		await setDoc(taskRef, task);
	};

	const HandleListClick = (listId) => {
		const list = allLists.find((f) => f.uid === listId);
		setCurrentListUid(list.uid);
		setCurrentHeading(list.name);
		// console.log(allLists);
		fetchTasks(listId);
		setCurrentListOnDb(list.uid, list.name);

		if (window.innerWidth < 500) {
			setSidebarOpen(false);
		}
	};

	const setCurrentListOnDb = async (listId, name) => {
		const listPath = `users/${user.uid}`;
		const listRef = doc(db, listPath);

		await updateDoc(listRef, { currentList: { uid: listId, name: name } });
	};

	const fetchTasks = (listId) => {
		const taskPath = `users/${user.uid}/lists/${listId}/tasks`;

		const taskRef = collection(db, taskPath);
		// fetch all tasks from the current list
		onSnapshot(taskRef, (snapshot) => {
			// console.log(snapshot.docs.map((doc) => doc.data()));
			setHabitList(snapshot.docs.map((doc) => doc.data()));
		});
	};

	const handleEditSave = (e) => {
		// console.log(e.value);
		updateHeadingonDb(e.value);
	};

	const updateHeadingonDb = async (newHeading) => {
		const listPath = `users/${user.uid}/lists/${currentListUid}`;
		const listRef = doc(db, listPath);
		await updateDoc(listRef, { name: newHeading });
	};

	const CreateNewList = () => {
		const newList = {
			uid: nanoid(),
			name: "Untitled Checklist",
		};
		addListToDb(newList);
		if (window.innerWidth < 500) {
			setSidebarOpen(false);
		}
	};

	const addListToDb = async (list) => {
		const listPath = `users/${user.uid}/lists`;
		const listRef = doc(db, listPath, list.uid);

		await setDoc(listRef, list);
		setCurrentHeading(list.name);
		fetchTasks(list.uid);
	};

	return (
		<>
			<div className={Style.container}>
				<Sidebar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					CreateNewList={CreateNewList}
					allLists={allLists}
					currentListUid={currentListUid}
					HandleListClick={HandleListClick}
				/>

				<Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

				{!habitList ? (
					<div className={Style.Defaultmain}>
						Create or select a new list to continue
					</div>
				) : (
					<main
						className={Style.main}
						style={{
							width: sidebarOpen ? "calc(100% - 22rem)" : "100%",
						}}
					>
						<div className={Style.tasklist}>
							<div className={Style.head}>
								<EditTextarea
									defaultValue={currentHeading}
									className={Style.listTitle}
									onSave={(e) => handleEditSave(e)}
									// className={Style.listTitle}
									inputClassName={Style.listTitleInput}
									rows={2}
								/>
							</div>
							<ProgressBar habitList={habitList} />
							<Task
								habitList={habitList}
								setHabitList={setHabitList}
								currentListUid={currentListUid}
								user={user}
							/>
							<NewTaskInput
								addHabit={addHabit}
								newHabit={newHabit}
								setNewHabit={setNewHabit}
							/>
						</div>
					</main>
				)}
			</div>
		</>
	);
}

export default Dashboard;
