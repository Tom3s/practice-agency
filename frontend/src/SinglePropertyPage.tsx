import { Fragment, useEffect, useState } from "react";
import searchLogo from './images/Image 1@3x.png';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import './ResultsPage.css';
import './SinglePropertyPage.css'
import { buildMediaUrl, buildSinglePropertyUrl } from "./UrlBuilder";
import Loading from "./Loading";



const SinglePropertyPage = () => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// const id = searchParams.get('id') || '';
	const [id, setId] = useState<string>(searchParams.get('id') || '');

	const [loading, setLoading] = useState<boolean>(true);

	const [property, setProperty] = useState<any>({});

	function fetchProperty() {
		const url = buildSinglePropertyUrl(id);

		setLoading(true);

		console.log(url);

		fetch(url)
			.then(response => {
				if (!response.ok) {
					setId('');
					return {};
				}
				return response.json();
			})
			.then(data => {
				setProperty(data);
			})
	}

	useEffect(() => {
		fetchProperty();
	}, [])

	useEffect(() => {
		setLoading(false);
	}, [property])


	function getResultTitle(transactionType: boolean, bedrooms: number | undefined, type: any | undefined, address: any | undefined){
		var title = '';

		if (bedrooms && bedrooms > 0) {
			title += bedrooms + ' bed ';
		}

		if (type && type.id !== 0) {
			title += type.name + ' ';
		}

		if (transactionType) {
			title += 'for sale ';
		} else {
			title += 'to rent ';
		}

		if (address) {
			if (address.street) {
				title += 'in ' + address.street;
			}

			if (address.town) {
				title += ', ' + address.town;
			}
		}

		return title.charAt(0).toUpperCase() + title.slice(1);
	}

	function getMainImage() {

		const hasMainPhoto = property.hasOwnProperty('mainPhoto');

		const mainPhotoUrl = buildMediaUrl(property.fileUrl, 0, hasMainPhoto ? property.mainPhoto : 'default.jpg');

		const resultTitle = getResultTitle(property.forSale, property.bedrooms, property.type?.at(0), property.address);

		return (
			<div className="main-image-container">
				<img className="main-image" src={mainPhotoUrl} alt="Main Property" />
				<div id="main-image-overlay"></div>
				<div className="main-image-title centered">
					<h1 className="light-text">{resultTitle}</h1>
				</div>
			</div>
		)
	}

	function mainContent() {
		return (
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

					{/* mainImage with title on top */}
					{getMainImage()}
					{/* Feature scroller */}
					{/* Price ------ bed / bath */}
					{/* Description */}
					{/* Property Images */}
					{/* Map */}
					{/* EPC */}
					{/* Floorplan */}
					{/* Brochure */}

				</div>
		);
	};
		

	return (
		(
			loading ?
				<Loading />
				:
				(
					id === '' ?
						<Navigate to="/" />
						:
						mainContent()
				)
		)
	);
};

export default SinglePropertyPage;