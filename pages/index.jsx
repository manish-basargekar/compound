import React from "react";
import Link from "next/link";
import Style from "../styles/Home.module.scss";

const Home = () => {
	return (
		<div className={Style.container}>
			<div className={Style.bg}>
				
				
			</div>
			<div className={Style.box}>
				<h1>Checklist</h1>
				<span>A bare bones checklist app</span>
				<div className={Style.btns}>
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
					<Link href="/login">
						<a className={Style.login}>Log in</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
