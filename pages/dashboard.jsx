import Style from "../styles/Home.module.scss";
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
	doc,
	query,
	collection,
	onSnapshot,
	addDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

import Link from "next/link";
import toast from "react-hot-toast";

function Dashboard() {
	const tasks = [
		{
			id: 1,
			title:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint, deserunt sunt",
			info: "First, all of them had some version of a daily practice to help them improve 1 percent every day. What are the essential types of components of a daily practice? Physical: Eat, move, sleep. If you’re in bed sick, then a purpose will do you no good. Emotional: Trim the toxic people (even if they are “friends” or family) and be with the people who love you and support you and whom you love and support. If you are constantly angry or resentful or nervous about your relationships, your purpose will forget you. Mental: Exercise your creativity muscle every day. If you aren’t creative every day, the muscle will atrophy. And if you are creative every day (just write down ten ideas a day on a pad), it will become a creativity superpower. Without that superpower, you will have no chance of finding a purpose and then exceeding what’s been done before. Find your own unique voice that will make you rise above everyone else. Spiritual: Surrender to the things you cannot control. Not in a prayer sense (although it could be). Not in a meditation sense (although it could be). Not in an “angels” sense (OK, it won’t be that). It’s a feeling that you can’t control everything. Only focus on the things within your control. Have no anxiety or regret or resentment about what you can’t control.",
			done: false,
		},
		{
			id: 2,
			title: "Lorem ipsum dolor sit amet consectetur adipisicing elitt",
			info: "Become the IDEA machine, https://jamesaltucher.com/blog/the-ultimate-guide-for-becoming-an-idea-machine/",
			done: false,
		},
		{
			id: 3,
			title: "Read for atleast half an hour",
			info: "",
			done: false,
		},
		{
			id: 4,
			title:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint, deserunt sunt",
			done: false,
		},
		{
			id: 5,
			title:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint, deserunt sunt quidem quibusdam dolore sequi consequuntur dicta repudiandae dolor tenetur culpa omnis molestiae corrupti molestias nesciunt, velit ducimus nulla?",
			done: false,
		},
	];

	const [newHabit, setNewHabit] = useState("");

	const [habitList, setHabitList] = useState(null);

	const [user, loading, error] = useAuthState(auth);

	const [curentList, setCurrentList] = useState(null);

	const [allLists, setAllLists] = useState([]);

	const [currentHeading, setCurrentHeading] = useState("");

	const router = useRouter();

	const addHabit = (e) => {
		e.preventDefault();
		const addNewHabit = { id: nanoid(), title: newHabit, status: false };
		addTaskToDb(addNewHabit);
		setHabitList([...habitList, addNewHabit]);
		setNewHabit("");
	};

	const addTaskToDb = async (task) => {
		const listPath = `users/${user.uid}/lists/${curentList.uid}`;

		const listRef = doc(db, listPath);

		await updateDoc(listRef, {
			listContent: arrayUnion(task),
		});
	};

	useEffect(() => {
		if (loading) return;
		if (!user) return router.push("/login");
	}, [user, loading]);

	useEffect(() => {
		if (loading) return;
		if (!user) return router.push("/login");
		const useListsPath = `users/${user?.uid}/lists`;

		const q = query(collection(db, useListsPath));

		onSnapshot(q, (snapshot) => {
			setAllLists(snapshot.docs.map((doc) => doc.data()));
		});

		// console.log(allLists);

		// fetchLists();
	}, [user]);

	const fetchListContent = (listId) => {
		const list = allLists.find((f) => f.uid === listId);
		setCurrentList(list);
		console.log(list.listContent);
		setCurrentHeading(list.name);
		setHabitList(list.listContent);
	};

	return (
		<>
			{/* {console.log(allLists)} */}
			<div className={Style.container}>
				<div className={Style.sidebar}>
					<button onClick={logout}>logout</button>
					<div className={Style.sidebar__header}>
						<h1>Checklist</h1>
					</div>
					<div className={Style.sidebar__content}>
						<div className={Style.head}>
							<h3>All lists</h3>
							{/* <button>+</button> */}
						</div>
						<ul>
							{
								// allLists.map()
								allLists.map((list) => (
									<li
										key={list.uid}
										onClick={() => {
											fetchListContent(list.uid);
										}}
									>
										{/* <Link href={`/list/${list.id}`}>
											<a>{list.name}</a>
										</Link> */}
										{list.name}
									</li>
								))
							}
						</ul>
					</div>
					<button className={Style.createListBtn}>
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

				{!habitList ? (
					<div className={Style.Defaultmain}>
						Create or select a new list to continue
					</div>
				) : (
					<main className={Style.main}>
						<div className={Style.navbar}>
							<div className={Style.outof}>
								<span className={Style.status}>
									{habitList.filter((f) => f.tatus === true).length}/
									{habitList.length}
								</span>
								<div className={Style.progressWrapper}>
									<div
										className={Style.bar}
										style={{
											width: `${
												(habitList.filter((f) => f.done === true).length /
													habitList.length) *
												100
											}%`,
										}}
									></div>
								</div>
							</div>
						</div>
						<div className={Style.tasklist}>
							<div className={Style.head}>
								{/* <h1>Daily checklist</h1> */}
								<EditText
									defaultValue={currentHeading}
									className={Style.listTitle}
								/>
							</div>
							<Task
								habitList={habitList}
								setHabitList={setHabitList}
								currentList={curentList}
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
