import { useState } from "react";
import Style from "./Task.module.scss";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

const Task = ({ habitList, setHabitList , currentList, user}) => {
	const [toggleDone, setToggleDone] = useState(false);

	const toggleTaskState = (task) => {
		console.log(task)
		const updatedTask = { ...task, status: !task.status };
		updateTaskStatus(updatedTask, task);
		// setHabitList({ ...habitList, [task.id]: updatedTask });



		
	};

	// write a function to update task status in db
	const updateTaskStatus = async (updatedTask, oldTask) => {
		const listPath = `users/${user.uid}/lists/${currentList.uid}`;
		const listRef = doc(db, listPath);

		await updateDoc(listRef, {
			listContent: arrayRemove(oldTask),
		});


		await updateDoc(listRef, {
			listContent: arrayUnion(updatedTask),
		});
	}


	const handleEditTask = (value, id) => {
		console.log(value, id);

		// if (value === "") {
		// 	return;
		// }
		//  if value is empty string, then delete task
		if (value.value === "") {
			console.log("delete task");
			const updatedHabits = habitList.filter((h) => h.id !== id);
			setHabitList(updatedHabits);
			return;
		}
	};
	return (
		<>

			

			{ habitList.map((t) => (
				<div key={t.id} className={`${Style.task}`}>
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
								defaultValue={t.title}
								className={
									t.done ? `${Style.taskTitleChecked}` : `${Style.taskTitle}`
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
