import { Fragment } from "react";
import searchLogo from './images/Image 1@3x.png';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";


const SinglePropertyPage = () => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const id = searchParams.get('id') || '';

	return (
		(
			id === '' ? <Navigate to={'/'} /> :
			
				<div className="results-container">
					<div className="results-header" onClick={() => navigate(-1)}>
						{/* <span style={{
						fontSize: '30px',
						marginRight: '20px',
						fontFamily: 'andale mono,monospace',
					}} > {'<'} </span> */}
						<i className="fa fa-chevron-left" style={{ marginRight: '20px', color: '#022473' }} />
						<img className="logo" src={searchLogo} alt="Olympus Logo" />
					</div>

				</div>
		)
	);
};

export default SinglePropertyPage;