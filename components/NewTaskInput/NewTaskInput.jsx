import Style from "./NewTaskInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";


const NewTaskInput = ({addHabit , newHabit, setNewHabit}) => {
  return (
		<form onSubmit={addHabit} className={Style.NewTaskForm}>
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
	);
}

export default NewTaskInput