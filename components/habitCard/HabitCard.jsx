import { useState } from "react";
import Style from "./HabitCard.module.scss";

const HabitCard = ({ habitList, setHabitList }) => {
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

	return (
		<>
			{habitList.map((t) => (
				<div key={t.id} className={`${Style.task}`}>
					<div className={Style.taskWrapper}>
						<div className={Style.taskContent}>
							<div className={Style.taskOption}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
									strokeWidth="2"
									// class="ai ai-DragVerticalFill"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
									/>
								</svg>
							</div>
							<div
								className={
									t.done ? `${Style.checkboxDone}` : `${Style.checkbox}`
								}
								onClick={(id) => toggleTaskState(t.id)}
							></div>
							<div
								className={
									t.done ? `${Style.taskTitleChecked}` : `${Style.taskTitle}`
								}
							>
								{t.title}
							</div>
						</div>
						{/* <div className={Style.tags}>
							<div className={Style.tag}>🔥 14</div>
							<div className={Style.tag}>
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
									// class="ai ai-Clock"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M15 16l-2.414-2.414A2 2 0 0 1 12 12.172V6" />
								</svg>
								<span className={Style.tagType}>Daily</span>
							</div>
						</div> */}
					</div>
				</div>
			))}
		</>
	);
};

export default HabitCard;
