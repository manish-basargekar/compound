import React from "react";
import Link from "next/link";
import Style from "../styles/Home.module.scss";

const Home = () => {
	return (
		<div className={Style.container}>
			<div className={Style.bg}>
				{
					//a for loop for rendering number of inputs checkbox
					Array.from(Array(6000).keys()).map((item, index) => {
						return (
							<div
                key={index}
                // className={Style.box}
                
								className={
									// index === Math.floor(Math.random() * 10 + 1)
									// ?
									`${Style.checkbox}`
                  // give a random div a classname of checkboxDone


									// :
									// `${Style.checkboxDone}`
								}
								onClick={() => toggleTaskState(t)}
							>
								
							</div>
						);
					})
				}
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
