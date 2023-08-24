import { Fragment } from "react";
import loadingLogo from '../images/olympusLogo_white@3x.png';
import '../stylesheets/Loading.css'

const Loading = () => {
	return (
		<Fragment>
			<div className="loading-background">
				<img className="loading-logo" src={loadingLogo} alt="Olympus Logo" />
			</div>
		</Fragment>
	);
}

export default Loading;