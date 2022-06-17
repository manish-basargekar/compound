import Style from "./Sidebar.module.scss";

const Sidebar = ({
	sidebarOpen,
	setSidebarOpen,
	CreateNewList,
	allLists,
	currentListUid,
    HandleListClick
}) => {
	return (
		<div
			className={Style.sidebar}
			style={{
				transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
			}}
		>
			<div className={Style.sidebar__header}>
				<h1>Checklist</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					// class="ai ai-TextAlignJustified"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<path d="M3 6h18M3 12h18M3 18h18" />
				</svg>
			</div>
			<div className={Style.sidebar__content}>
				<div className={Style.head}>
					<h3>All lists</h3>
					<button onClick={CreateNewList}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#646262"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							// class="ai ai-Plus"
						>
							<path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
						</svg>
					</button>
				</div>
				{/* {console.log(currentListUid)} */}
				<ul>
					{
						// allLists.map()
						allLists.map((list) => (
							<li
								key={list.uid}
								onClick={() => {
									HandleListClick(list.uid);
								}}
								style={{
									backgroundColor: currentListUid === list.uid && "#e7e7e6",
								}}
							>
								{list.name}
							</li>
						))
					}
				</ul>
			</div>
			<button className={Style.createListBtn} onClick={CreateNewList}>
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
	);
};

export default Sidebar;
