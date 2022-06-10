import { signInWithGoogle } from "../../firebase";
import Style from "./GoogleLogin.module.scss";

function GoogleLogin() {
	return (
		<button onClick={signInWithGoogle} className={Style.btn}>
			<img
				className={Style["google-icon"]}
				src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
			/>
			<span>Continue with google</span>
			<div></div>
		</button>
	);
}

export default GoogleLogin;
