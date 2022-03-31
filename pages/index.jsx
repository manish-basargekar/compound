import Style from "../styles/Home.module.scss";
import { useState } from "react";

export default function Home() {
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
			done: true,
		},
		{
			id: 5,
			title:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint, deserunt sunt quidem quibusdam dolore sequi consequuntur dicta repudiandae dolor tenetur culpa omnis molestiae corrupti molestias nesciunt, velit ducimus nulla?",
			done: true,
		},
	];

	return (
		<>
			<div className={Style.container}>
				{/* <div className={Style.time}>
					<h3>
						{new Date().toLocaleDateString()}{" "}
						<span className={Style.day}>
							{new Date().toLocaleString("en-us", { weekday: "long" })}{" "}
						</span>
					</h3>
				</div> */}

				<div className={Style.tasklist}>
					<div className={Style.head}>
						<h3>Tasks remaining today</h3>
						<div className={Style.outof}>
							<span className={Style.status}>2/5</span>
							<div className={Style.progressWrapper}>
								<div className={Style.bar} style={{ width: "35%" }}></div>
							</div>
						</div>
					</div>
					<div className={Style.addTask}>
						<svg
							stroke="currentColor"
							fill="none"
							strokeWidth="2"
							viewBox="0 0 24 24"
							strokeLinecap="round"
							strokeLinejoin="round"
							// class="AddTask__AddIcon-h0zgp9-0 fwbGyI"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						<input placeholder="Add task" className="" value="" />
					</div>
					{tasks.map((t) => (
						<div key={t.id} className={`${Style.task}`}>
							<div className={Style.taskWrapper}>
								<div className={Style.taskContent}>
									<div
										className={
											t.done ? `${Style.checkboxDone}` : `${Style.checkbox}`
										}
										// onClick={toggleClass}
									></div>
									<div
										className={
											t.done
												? `${Style.taskTitleChecked}`
												: `${Style.taskTitle}`
										}
									>
										{t.title}
									</div>
									<div className={Style.taskOption}>
										<svg
											stroke="currentColor"
											fill="none"
											stroke-width="2"
											viewBox="0 0 24 24"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="Task__ActionIcon-wbyoqt-8 fGldON"
											height="1em"
											width="1em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="12" cy="12" r="1"></circle>
											<circle cx="12" cy="5" r="1"></circle>
											<circle cx="12" cy="19" r="1"></circle>
										</svg>
									</div>
								</div>
								<div className={Style.tags}>
									<div className={Style.tag}>🔥 {Math.floor(Math.random() * 100)}</div>
									{/* <div className={Style.tag}>
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
											// class="ai ai-Fire"
										>
											<path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c1.949-1.052 3.101-2.99 2.813-5l-.563-3 2.086.795c3.757 1.43 6.886 3.912 8.914 7.066A8.495 8.495 0 0 1 21 14.464V15c0 1.562-.504 2.895-1.375 3.965" />
											<path d="M12 22c-1.657 0-3-1.433-3-3.2 0-1.4 1.016-2.521 1.91-3.548L12 14l1.09 1.252C13.984 16.28 15 17.4 15 18.8c0 1.767-1.343 3.2-3 3.2z" />
										</svg>
										<span className={Style.tagType}>14</span>
									</div> */}
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
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
