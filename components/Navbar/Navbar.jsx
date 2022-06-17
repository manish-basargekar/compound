import Style from "./Nav.module.scss"
import { logout } from "../../firebase";


const Navbar = ({setSidebarOpen, sidebarOpen}) => {
  return (
		<div className={Style.navbar}>
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
				className={Style["sidebar-toggle"]}
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				<path d="M3 6h18M3 12h18M3 18h18" />
			</svg>
			<button onClick={logout} className={Style.logoutBtn}>
				Log out
			</button>
		</div>
	);
}

export default Navbar