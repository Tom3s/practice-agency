import { Fragment } from "react";
import loadingLogo from './images/olympusLogo_white@3x.png';
import './Loading.css';

const Loading = () => {
	return (
		<Fragment>
			<div className="loading-background">
				<img className="loading-logo" src={loadingLogo} alt="Olympus Logo" />
				{/* <h1 className="light-text">Loading...</h1> */}
			</div>
		</Fragment>
	);
}

export default Loading;