import { Fragment, useEffect, useState } from "react";
import './SearchPage.css';
import searchLogo from './images/Image 1@3x.png'
import { ToggleButton, ToggleButtonGroup, css} from "@mui/material";

const salePrices = ['75000', '100000', '125000', '150000', '175000', '200000', '225000', '250000', '275000', '300000', '325000', '350000', '375000', '400000', '425000', '450000', '475000', '500000', '600000', '700000', '800000', '900000', '1000000', '1250000', '1500000', '1750000', '2000000', '2250000', '2500000', '2750000', '3000000', '4000000', '5000000', '6000000', '7000000', '8000000', '9000000', '10000000'];
const lettingPrices = ['400', '425', '450', '475', '500', '525', '550', '575', '600', '650', '700', '750', '800', '850', '900', '950', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2250', '2500', '2750', '3000', '4000', '5000', '6000', '7500', '8000', '9000', '10000', '12500', '15000'];

class ApiGenerator {
	private baseUrl: string = "http://localhost:8000/v2/"

	
}

const SearchPage = () => {

	const [locations, setLocations] = useState<string[]>([]);
	const [prices, setPrices] = useState<string[]>(salePrices);
	const bedrooms = ['1', '2', '3', '4', '5', '6'];
	const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
	
	const [currentTransactionType, setCurrentTransactionType] = useState<string | null>('sales');
	const [currentLocation, setCurrentLocation] = useState<string | null>(null);
	const [currentPrice, setCurrentPrice] = useState<string | null>(null);
	const [currentBedroom, setCurrentBedroom] = useState<string | null>(null);
	const [currentPropertyType, setCurrentPropertyType] = useState<string[]>([]);

	useEffect(() => {


	function handleTransactionTypeChange(event: React.MouseEvent<HTMLElement>, newTransactionType: string | null) {
		setCurrentTransactionType(newTransactionType);
	}

	return (
		<Fragment>
			<div className="search-container">
				<img className="logo" src={searchLogo} alt="Olympus Logo" />
				<ToggleButtonGroup sx={{borderRadius: '50px'}} color="primary" value={currentTransactionType} onChange={handleTransactionTypeChange} exclusive>
					<ToggleButton sx={{borderRadius: '50px'}} value="sales">Sales</ToggleButton>
					<ToggleButton sx={{borderRadius: '50px'}} value="lettings">Lettings</ToggleButton>
				</ToggleButtonGroup>
			</div>
		</Fragment>
	)

}

export default SearchPage;