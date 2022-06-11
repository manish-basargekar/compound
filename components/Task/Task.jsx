import { useState } from "react";
import Style from "./Task.module.scss";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { query, onSnapshot } from "firebase/firestore";

const Task = ({ habitList, setHabitList , currentList, user}) => {
	// const [toggleDone, setToggleDone] = useState(false);

	const toggleTaskState = (task) => {
		// console.log(task)
		// const updatedTask = { ...task, status: !task.status };
		updateTaskStatus(task);
		// setHabitList({ ...habitList, [task.id]: updatedTask });



		
	};

	// write a function to update task status in db
	const updateTaskStatus = async (task) => {
		const listPath = `users/${user.uid}/lists/${currentList.uid}/tasks/${task.uid}`;

		const listRef = doc(db, listPath);  
		await updateDoc(listRef, { status: !task.status });
	}


	const handleEditTask = (value, id) => {
		console.log(value, id);
	};



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
								onSave={(value) => handleEditTask(value, t.id)}
							/>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Task;
