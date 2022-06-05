import Style from "../styles/Home.module.scss";
import { useState } from "react";
import HabitCard from "../components/habitCard/HabitCard";

import { nanoid } from "nanoid";
import TextareaAutosize from "react-textarea-autosize";
export default function Home() {

	// What I want to do
	// Reset done state of every habit to false every 24 hours 
	// Initial start date

	// time created
	// if time created + 24 hours > current time set done to false


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

	const [habitList, setHabitList] = useState(tasks);

	const addHabit = (e) => {
		e.preventDefault();
		const addNewHabit = { id: nanoid(), title: newHabit, done: false };
		setHabitList([...habitList, addNewHabit]);
		setNewHabit("");
	};

	const percent =
		(habitList.filter((f) => f.done === true).length / habitList.length) * 100;

	return (
		<>
			<div className={Style.container}>
				<div className={Style.tasklist}>
					<div className={Style.head}>
						<h3>Daily checklist</h3>
						<div className={Style.outof}>
							<span className={Style.status}>
								{habitList.filter((f) => f.done === true).length}/
								{habitList.length}
							</span>
							<div className={Style.progressWrapper}>
								<div
									className={Style.bar}
									style={{ width: `${percent}%` }}
								></div>
							</div>
						</div>
					</div>
					<HabitCard habitList={habitList} setHabitList={setHabitList} />
					<form onSubmit={addHabit}>
						<div className={Style.addTask}>
							<TextareaAutosize
								required
								placeholder="Add a task"
								className={Style.addHabitInput}
								value={newHabit}
								onChange={(e) => setNewHabit(e.target.value)}
							/>
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
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
