import { useState } from "react";
import Style from "./Task.module.scss";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { query, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";

const Task = ({ habitList, setHabitList , currentListUid, user}) => {
	// const [toggleDone, setToggleDone] = useState(false);

	const toggleTaskState = (task) => {
		// console.log(task)
		// const updatedTask = { ...task, status: !task.status };
		updateTaskStatus(task);
		// setHabitList({ ...habitList, [task.id]: updatedTask });



		
	};

	// write a function to update task status in db
	const updateTaskStatus = async (task) => {
		const listPath = `users/${user.uid}/lists/${currentListUid}/tasks/${task.uid}`;

		const listRef = doc(db, listPath);  
		await updateDoc(listRef, { status: !task.status });
	}


	const handleEditTask = (e, id) => {
		console.log(e.value);
		console.log(id);
		
		updateTaskonDb(e.value, id);
		
	};


	const updateTaskonDb = async(updatedTitle, uid) => {
		const listPath = `users/${user.uid}/lists/${currentListUid}/tasks/${uid}`;

		const listRef = doc(db, listPath);
		await updateDoc(listRef, {
			taskTitle: updatedTitle,
		});
	}



	return (
		<>
			{habitList.map((t) => (
				<div key={t.uid} className={`${Style.task}`}>
					{/* {console.log(t)} */}
					<div className={Style.taskWrapper}>
						<div className={Style.taskContent}>
							<div
								className={
									t.status ? `${Style.checkboxDone}` : `${Style.checkbox}`
								}
								onClick={() => toggleTaskState(t)}
							></div>
							{/* {console.log(t.taskTitle)} */}
							<EditTextarea
								style={{
									height: "max-content",
									width: "100%",
								}}
								// rows={3}
								defaultValue={t.taskTitle}
								className={
									t.status ? `${Style.taskTitleChecked}` : `${Style.taskTitle}`
								}
								inputClassName={Style.taskTitleInput}
								onSave={(e) => handleEditTask(e, t.uid)}
							/>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Task;
