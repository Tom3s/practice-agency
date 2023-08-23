import { Fragment, useEffect, useState } from "react";
import './SearchPage.css';
import searchLogo from './images/Image 1@3x.png'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup, css } from "@mui/material";

const salePrices = ['75000', '100000', '125000', '150000', '175000', '200000', '225000', '250000', '275000', '300000', '325000', '350000', '375000', '400000', '425000', '450000', '475000', '500000', '600000', '700000', '800000', '900000', '1000000', '1250000', '1500000', '1750000', '2000000', '2250000', '2500000', '2750000', '3000000', '4000000', '5000000', '6000000', '7000000', '8000000', '9000000', '10000000'];
const lettingPrices = ['400', '425', '450', '475', '500', '525', '550', '575', '600', '650', '700', '750', '800', '850', '900', '950', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2250', '2500', '2750', '3000', '4000', '5000', '6000', '7500', '8000', '9000', '10000', '12500', '15000'];

class ApiGenerator {
	private baseUrl: string = "http://localhost:8000/v2/"

	public static readonly saleTypeUrl: string = "http://localhost:8000/v2/property/type?transaction-type=1";
	public static readonly lettingTypeUrl: string = "http://localhost:8000/v2/property/type?transaction-type=2";
	public static readonly saleLoctationUrl: string = "http://localhost:8000/v2/property/location?transaction-type=1";
	public static readonly lettingLoctationUrl: string = "http://localhost:8000/v2/property/location?transaction-type=2";
}

const SearchPage = () => {

	const [locations, setLocations] = useState<string[]>([]);
	const [prices, setPrices] = useState<string[]>(salePrices);
	const [priceLabel, setPriceLabel] = useState<string>('Max Price');
	const bedrooms = ['1', '2', '3', '4', '5', '6'];
	const [propertyTypes, setPropertyTypes] = useState<any[]>([]);

	const [currentTransactionType, setCurrentTransactionType] = useState<string>('sales');
	const [currentLocation, setCurrentLocation] = useState<string>('');
	const [currentPrice, setCurrentPrice] = useState<string>('');
	const [currentBedroom, setCurrentBedroom] = useState<string>('');
	const [currentPropertyType, setCurrentPropertyType] = useState<string[]>([]);


	function fetchPropertyTypes() {
		const url = currentTransactionType === 'sales' ? ApiGenerator.saleTypeUrl : ApiGenerator.lettingTypeUrl;

		setCurrentPropertyType([]);

		fetch(url)
			.then(response => response.json())
			.then(data => {
				setPropertyTypes(data);
			})
	}

	function fetchLocations() {
		const url = currentTransactionType === 'sales' ? ApiGenerator.saleLoctationUrl : ApiGenerator.lettingLoctationUrl;

		setCurrentLocation('');

		fetch(url)
			.then(response => response.json())
			.then(data => {
				setLocations(data);
			})
	}

	useEffect(() => {
		fetchPropertyTypes();
		fetchLocations();

		setCurrentPrice('');

		setPriceLabel(currentTransactionType === 'sales' ? 'Max Price' : 'Max Price (Per Month)');
		setPrices(currentTransactionType === 'sales' ? salePrices : lettingPrices);

	}, [currentTransactionType])

	function handleTransactionTypeChange(event: React.MouseEvent<HTMLElement>, newTransactionType: string) {
		setCurrentTransactionType(newTransactionType);
	}

	function handlePropertyTypeChange(event: SelectChangeEvent<typeof currentPropertyType>) {
		const {
			target: { value },
		} = event;

		setCurrentPropertyType(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	}

	function getLocationSelect() {
		return (
			<FormControl>
				<InputLabel id="location-label">Location</InputLabel>
				<Select
					sx={{ borderRadius: '50px', width: '80vw', marginBottom: '20px' }}
					labelId="location-label"
					id="location"
					value={currentLocation}
					onChange={(event) => setCurrentLocation(event.target.value as string)}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{locations.map((location, index) => (
						<MenuItem key={index} value={location}>
							{location}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		)
	}

	function getTypeSelect() {
		return (
			<FormControl>
				<InputLabel id="type-label">Property Type</InputLabel>
				<Select
					sx={{ borderRadius: '50px', width: '80vw', marginBottom: '20px' }}
					labelId="type-label"
					id="type"
					multiple
					value={currentPropertyType}
					onChange={handlePropertyTypeChange}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{propertyTypes.map((propertyType) => (
						<MenuItem
							key={propertyType.id}
							value={propertyType.id}
						>
							{propertyType.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

		)
	}

	function getPriceSelect() {
		return (
			<FormControl>
				<InputLabel id="price-label">{priceLabel}</InputLabel>
				<Select
					sx={{ borderRadius: '50px', width: '80vw' }}
					labelId="price-label"
					id="price"
					value={currentPrice}
					onChange={(event) => setCurrentPrice(event.target.value as string)}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{prices.map((price, index) => (
						<MenuItem key={index} value={price}>
							{price}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			)
	}

	return (
		<Fragment>
			<div className="search-container">
				<img className="logo" src={searchLogo} alt="Olympus Logo" />
				<ToggleButtonGroup sx={{ borderRadius: '50px' }} color="primary" value={currentTransactionType} onChange={handleTransactionTypeChange} exclusive>
					<ToggleButton sx={{ borderRadius: '50px', width: '40vw', height: '15px', marginBottom: '20px' }} value="sales">Sales</ToggleButton>
					<ToggleButton sx={{ borderRadius: '50px', width: '40vw', height: '15px', marginBottom: '20px' }} value="lettings">Lettings</ToggleButton>
				</ToggleButtonGroup>
				{getTypeSelect()}
				{getLocationSelect()}
				{getPriceSelect()}
			</div>
		</Fragment>
	)

}

export default SearchPage;