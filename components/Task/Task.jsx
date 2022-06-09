import { useState } from "react";
import Style from "./Task.module.scss";

import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

const Task = ({ habitList, setHabitList }) => {
	const [toggleDone, setToggleDone] = useState(false);

	const toggleTaskState = (id) => {
		// console.log(habit)
		// const HabitDone = {...habit, done: !habit.done}
		const updatedHabits = habitList.map((h) => {
			if (id === h.id) {
				return { ...h, done: !h.done };
			}
			return h;
		});

		setHabitList(updatedHabits);
	};

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
			{habitList.map((t) => (
				<div key={t.id} className={`${Style.task}`}>
					<div className={Style.taskWrapper}>
						<div className={Style.taskContent}>
							<div
								className={
									t.done ? `${Style.checkboxDone}` : `${Style.checkbox}`
								}
								onClick={(id) => toggleTaskState(t.id)}
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
