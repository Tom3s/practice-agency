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

		// setLoading(true);

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
	}, [id])

	useEffect(() => {
		setLoading(!property.hasOwnProperty('id'));
		console.log(property);
	}, [property])


	function getResultTitle(transactionType: boolean, bedrooms: number | undefined, type: any | undefined, address: any | undefined) {
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

	function checkIfHasImages() {
		if (property.media === undefined) {
			return false;
		}
		return property.media.find((media: any) => media.typeId === 1);
	}

	function checkIfHasMapLocation() {
		return property.address?.latitude && property.address?.longitude;
	}

	function checkIfHasEPC() {
		if (property.media === undefined) {
			return false;
		}
		return property.media.find((media: any) => media.typeId === 3);
	}

	function checkIfHasFloorplan() {
		if (property.media === undefined) {
			return false;
		}
		return property.media.find((media: any) => media.typeId === 2);
	}

	function checkIfHasBrochure() {
		if (property.media === undefined) {
			return false;
		}
		return property.media.find((media: any) => media.typeId === 5);
	}

	function getFeatures() {
		console.log(property);
		return (
			<div className="features-container">
				{
					checkIfHasImages() ?
						<div className="feature">
							<i className="fa fa-image" /> Images
						</div>
						:
						<Fragment />
				}
				{
					checkIfHasMapLocation() ?
						<div className="feature">
							<i className="fa fa-map" /> Map
						</div>
						:
						<Fragment />
				}
				{
					checkIfHasEPC() ?
						<div className="feature">
							<i className="fa fa-bar-chart" /> EPC
						</div>
						:
						<Fragment />
				}
				{
					checkIfHasFloorplan() ?
						<div className="feature">
							<i className="material-icons">border_all</i> Floorplan
						</div>
						:
						<Fragment />
				}
				{
					checkIfHasBrochure() ?
						<div className="feature">
							<i className="fa fa-file-pdf-o" /> Brochure
						</div>
						:
						<Fragment />
				}
			</div>
		)
	}

	function getInfo() {
		const bedrooms = property.bedrooms || 0;
		const bathrooms = property.bathrooms || 0;
		return (
			<div className="info-container">
				<div className="price">
					{property.price}$
				</div>
				<div className="bed-bath">
					{
						bedrooms > 0 ?
							(
								<Fragment>
									<i className="fa fa-bed" /> {bedrooms}
								</Fragment>
							)
							: ''
					}
					<span> </span>
					{
						bathrooms > 0 ?
							(
								<Fragment>
									<i className="fa fa-bath" /> {bathrooms}
								</Fragment>
							)
							: ''
					}
				</div>
			</div>
		)
	}

	function getDescription() {
		return (
			<div className="description-container">
				{property.description}
			</div>
		)
	}

	function getPropertyImages() {

		if (!checkIfHasImages()) {
			return <Fragment />
		}

		const images = property.media.filter((media: any) => media.typeId === 1);

		if (images.length === 0) {
			return <Fragment />
		}

		var imageUrls: string[] = [];

		images.forEach((image: any) => {
			imageUrls.push(buildMediaUrl(property.fileUrl, 1, image.name));
		})

		const largeImages = imageUrls.slice(0, 2);
		const smallImages = imageUrls.slice(2);


		return (
			<div className="property-images-container">
				<div className="section-title">
					Property Images
				</div>
				<div className="property-images-large">
					{
						largeImages.map((image, index) => (
							<img className="property-image" src={image} alt="Property" key={index} />
						))
					}
				</div>
				<div className="property-images-grid">
					{
						smallImages.map((image, index) => (
							<img className="property-image" src={image} alt="Property" key={index} />
						))
					}
				</div>

			</div>
		)
	}

	function getMap() {
		// AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
		if (!checkIfHasMapLocation()) {
			return <Fragment />
		}

		const mapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=" +
			property.address.latitude.toString() + "," + property.address.longitude.toString();

		return (
			<div className="map-container">
				<div className="section-title">
					Map
				</div>

				<iframe
					className="map"
					loading="lazy"
					allowFullScreen
					// referrerpolicy="no-referrer-when-downgrade"
					src={mapUrl}>
				</iframe>
			</div>
		)
	}

	function getEPC() {
		if (!checkIfHasEPC()) {
			return <Fragment />
		}

		const image = buildMediaUrl(property.fileUrl, 3, property.media.find((media: any) => media.typeId === 3).name);

		return (
			<div className="property-images-container">
				<div className="section-title">
					EPC
				</div>
				<div className="property-images-large">

					<img className="property-image" src={image} alt="EPC" />
				</div>
			</div>
		)

	}

	function getFloorplan() {
		if (!checkIfHasFloorplan()) {
			return <Fragment />
		}

		const image = buildMediaUrl(property.fileUrl, 2, property.media.find((media: any) => media.typeId === 2).name);

		return (
			<div className="property-images-container">
				<div className="section-title">
					Floorplan
				</div>
				<div className="property-images-large">
					<img className="property-image" src={image} alt="Floorplan" />
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
				{getFeatures()}
				{/* Price ------ bed / bath */}
				{getInfo()}
				<div className="extra-info-container">

					{/* Description */}
					{getDescription()}
					{/* Property Images */}
					{getPropertyImages()}
					{/* Map */}
					{getMap()}
					{/* EPC */}
					{getEPC()}
					{/* Floorplan */}
					{getFloorplan()}
					{/* Brochure */}
				</div>

			</div>
		);
	};


	return (
		<Fragment>
			{
				loading ?
					<Loading />
					:
					(
						property.hasOwnProperty('id') === false ?
							<Navigate to={'/'} />
							:
							mainContent()
					)
			}
		</Fragment>
	);
};

export default SinglePropertyPage;