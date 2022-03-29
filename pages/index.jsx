import Style from "../styles/Home.module.scss";

export default function Home() {
	const tasks = [
		{
			id: 1,
			title: "Do the daily ritual(Physical, Emotional, Mental, Spiritual)",
			info: "First, all of them had some version of a daily practice to help them improve 1 percent every day. What are the essential types of components of a daily practice? Physical: Eat, move, sleep. If you’re in bed sick, then a purpose will do you no good. Emotional: Trim the toxic people (even if they are “friends” or family) and be with the people who love you and support you and whom you love and support. If you are constantly angry or resentful or nervous about your relationships, your purpose will forget you. Mental: Exercise your creativity muscle every day. If you aren’t creative every day, the muscle will atrophy. And if you are creative every day (just write down ten ideas a day on a pad), it will become a creativity superpower. Without that superpower, you will have no chance of finding a purpose and then exceeding what’s been done before. Find your own unique voice that will make you rise above everyone else. Spiritual: Surrender to the things you cannot control. Not in a prayer sense (although it could be). Not in a meditation sense (although it could be). Not in an “angels” sense (OK, it won’t be that). It’s a feeling that you can’t control everything. Only focus on the things within your control. Have no anxiety or regret or resentment about what you can’t control.",
		},
		{
			id: 2,
			title: "Flex your idea muscle by writing down 10 ideas",
			info: "Become the IDEA machine, https://jamesaltucher.com/blog/the-ultimate-guide-for-becoming-an-idea-machine/",
		},
		{
			id: 3,
			title: "Read for atleast half an hour",
			info: "",
		},
		{
			id: 4,
			title: "Write atleast 2 pages everyday",
		},
	];

	return (
		<>
			<div className={Style.container}>
				<div className={Style.time}>
					<h3>
						{new Date().toLocaleDateString()}{" "}
						<span className={Style.day}>
							{new Date().toLocaleString("en-us", { weekday: "long" })}{" "}
						</span>
					</h3>
				</div>
				{tasks.map((t) => (
					<div key={t.id} className={Style.task}>
						<li>{t.title}</li>
					</div>
				))}
			</div>
		</>
	);
}
