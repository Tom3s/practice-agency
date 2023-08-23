import { Fragment, useEffect, useState } from "react";
import searchLogo from './images/Image 1@3x.png';
import './ResultsPage.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildMediaUrl, BuildUrl } from "./UrlBuilder";
import Loading from "./Loading";


const ResultsPage = () => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const transactionType = searchParams.get('transaction-type') || 'sale';

	const [results, setResults] = useState<any[]>([]);

	const [loading, setLoading] = useState<boolean>(true);

	function fetchResults(/*type: string, location: string, price: string, propertyType: string[], bedroom: string*/) {
		const location = searchParams.get('location') || '';
		const price = searchParams.get('max-price') || '';
		const propertyType = searchParams.get('prop-type')?.split(',') || [];
		const bedroom = searchParams.get('min-bed') || '';

		const url = BuildUrl(transactionType, location, price, propertyType, bedroom);

		console.log(url);

		setLoading(true);

		fetch(url)
			.then(response => {
				if (!response.ok) {
					return [];
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				setResults(data);
			})
	}


	useEffect(() => {
		fetchResults();
	}, [])

	useEffect(() => {
		setLoading(results.length === 0);
	}, [results])

	function getResultInfo(title: string, bedrooms: number, bathrooms: number, description: string) {

		const maxDescriptionLength = 70;

		var cutDescription = '';
		if (description.length <= maxDescriptionLength) {
			cutDescription = description;
		}
		else {
			const lastDescriptionSpaceIndex = description.lastIndexOf(' ', maxDescriptionLength);

			cutDescription = description.substring(0, lastDescriptionSpaceIndex) + '...';
		}

		return (
			<Fragment>
				<div className="result-title">
					{title}
				</div>
				<div className="result-bath-bed">
					{
						bedrooms > 0 ?
							(
								<Fragment>
									<i className="fa fa-bed" /> {bedrooms},
								</Fragment>
							)
							: ''
					}
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
				<div className="result-description">
					{cutDescription}
				</div>
			</Fragment>
		)
	}

	function getResultTitle(bedrooms: number | undefined, type: any | undefined, address: any | undefined) {
		var title = '';

		if (bedrooms && bedrooms > 0) {
			title += bedrooms + ' bed ';
		}

		if (type && type.id !== 0) {
			title += type.name + ' ';
		}

		if (transactionType === 'sale') {
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


	function getResultElement(result: any, index: number) {

		const hasMainPhoto = result.hasOwnProperty('mainPhoto');

		// const mainPhotoUrl = hasMainPhoto ? buildMediaUrl(result.fileUrl, 0, result.mainPhoto) : '';
		const mainPhotoUrl = buildMediaUrl(result.fileUrl, 0, hasMainPhoto ? result.mainPhoto : 'default.jpg');

		const resultTitle = getResultTitle(result.bedrooms, result.type?.at(0), result.address);

		return (
			<div className="result" key={index} onClick={() => navigate('/property?id=' + result.id)}>
				{/* <div className="result-image-container"> */}
				<img className="result-image" src={mainPhotoUrl} alt="Property" />
				{/* </div> */}
				<div className="result-info-container">
					{getResultInfo(resultTitle, result.bedrooms, result.bathrooms, result.description)}
				</div>
				<div className="result-price-container">
					{result.price.toLocaleString('en-US')}$
				</div>
			</div>
		)
	}

	function getResultHeaderText() {
		if (results.length === 0) {
			return 'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.';
		} else {
			return 'Properties' + (transactionType === 'sale' ? ' for sale' : ' to rent');
		}
	}

	function mainContent() {
		return (
			<div className="results-container">
				<div className="results-header" onClick={() => navigate('/')}>
					{/* <span style={{
						fontSize: '30px',
						marginRight: '20px',
						fontFamily: 'andale mono,monospace',
					}} > {'<'} </span> */}
					<i className="fa fa-chevron-left" style={{ marginRight: '20px', color: '#022473' }} />
					<img className="logo" src={searchLogo} alt="Olympus Logo" />
				</div>

				<div className="results-header-text">
					{getResultHeaderText()}
				</div>

				{
					results.map((result, index) => (
						getResultElement(result, index)
					))
				}

			</div>
		)
	}

	return (
		<Fragment>
			{
				loading ?
					<Loading />
					:
					mainContent()
			}
		</Fragment>
	);
}

export default ResultsPage;