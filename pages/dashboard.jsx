import Style from "../styles/Dashboard.module.scss";
import { useState, useEffect } from "react";
import Task from "../components/Task/Task";

import { nanoid } from "nanoid";
import TextareaAutosize from "react-textarea-autosize";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

import { auth, logout, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";

import {
	getDoc,
	setDoc,
	doc,
	query,
	collection,
	onSnapshot,
	addDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

function Dashboard() {
	const [newHabit, setNewHabit] = useState("");

	const [habitList, setHabitList] = useState(null);

	const [user, loading, error] = useAuthState(auth);

	const [currentListUid, setCurrentListUid] = useState(null);

	const [allLists, setAllLists] = useState([]);

	const [currentHeading, setCurrentHeading] = useState("");

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const router = useRouter();

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
			// console.log(data.currentList.uid);
			fetchTasks(snapshot.data().currentList.uid);
			// setCurrentHeading(allLists.find((f) => f.uid === curentListUid).name);
		});
		// console.log(allLists);
	}, [user]);

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
			{/* {console.log(allLists)} */}
			<div className={Style.container}>
				<div
					className={Style.sidebar}
					style={{
						transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
					}}
				>
					<div className={Style.sidebar__header}>
						<h1>Checklist</h1>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							// class="ai ai-TextAlignJustified"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							<path d="M3 6h18M3 12h18M3 18h18" />
						</svg>
					</div>
					<div className={Style.sidebar__content}>
						<div className={Style.head}>
							<h3>All lists</h3>
							<button onClick={CreateNewList}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#646262"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									// class="ai ai-Plus"
								>
									<path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
								</svg>
							</button>
						</div>
						{/* {console.log(currentListUid)} */}
						<ul>
							{
								// allLists.map()
								allLists.map((list) => (
									<li
										key={list.uid}
										onClick={() => {
											HandleListClick(list.uid);
										}}
										style={{
											backgroundColor: currentListUid === list.uid && "#e7e7e6",
										}}
									>
										{list.name}
									</li>
								))
							}
						</ul>
					</div>
					<button className={Style.createListBtn} onClick={CreateNewList}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							// class="ai ai-Plus"
						>
							<path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
						</svg>
						<span>New list</span>
					</button>
				</div>
				{/* {console.log(window.innerWidth)} */}
				<div className={Style.navbar}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={Style["sidebar-toggle"]}
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<path d="M3 6h18M3 12h18M3 18h18" />
					</svg>
					<button onClick={logout} className={Style.logoutBtn}>
						Log out
					</button>
				</div>
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
								{/* <h1>Daily checklist</h1> */}
								<EditTextarea
									defaultValue={currentHeading}
									className={Style.listTitle}
									onSave={(e) => handleEditSave(e)}
									// className={Style.listTitle}
									inputClassName={Style.listTitleInput}
									rows={2}
								/>
							</div>
							<div className={Style.outof}>
								{habitList.length > 0 ? (
									<span className={Style.status}>
										{(
											(habitList.filter((f) => f.status === true).length /
												habitList.length) *
											100
										).toFixed()}
										%
									</span>
								) : (
									"0%"
								)}
								<div className={Style.progressWrapper}>
									<div
										className={Style.bar}
										style={{
											width: `${
												(habitList.filter((f) => f.status === true).length /
													habitList.length) *
												100
											}%`,
										}}
									></div>
								</div>
							</div>
							<Task
								habitList={habitList}
								setHabitList={setHabitList}
								currentListUid={currentListUid}
								user={user}
							/>
							<form onSubmit={addHabit}>
								<div className={Style.addTask}>
									<div className={Style.icon}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											// class="ai ai-Plus"
										>
											<path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
										</svg>
									</div>
									<TextareaAutosize
										maxRows={5}
										required
										placeholder="Add a task"
										className={Style.addHabitInput}
										value={newHabit}
										onChange={(e) => setNewHabit(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									disabled={newHabit ? false : true}
									className={Style.addHabitBtn}
									// style={{ backgroundColor: newHabit ? "#F900BF" : "none" }}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										// class="ai ai-ArrowUp"
									>
										<path d="M12 20V4" />
										<path d="M5 11l7-7 7 7" />
									</svg>
								</button>
							</form>
						</div>
					</main>
				)}
			</div>
		</>
	);
}

export default Dashboard;
