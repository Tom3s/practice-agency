import path from "path";
import { Address, Property, PropertyType, SearchOptions } from "../Model/EntityModels";
import { Result } from "../Model/StateModels";
import PropertyRepo from "../Repos/PropertyRepo";
import fs from 'fs';
import { match } from "assert";

class Controller {
	private propertyRepo: PropertyRepo;

	constructor() {
		this.propertyRepo = new PropertyRepo();
	}

	getResidentialSaleProperties(searchOptions: SearchOptions | null = null): Result<Array<Property>> {
		if (searchOptions === null) {
			return this.propertyRepo.getAllSale();
		}

		return this.propertyRepo.getSaleFiltered(searchOptions);
	}

	getResidentialLettingProperties(searchOptions: SearchOptions | null = null): Result<Array<Property>> {
		if (searchOptions === null) {
			return this.propertyRepo.getAllLetting();
		}

		return this.propertyRepo.getLettingFiltered(searchOptions);
	}

	getLocations(transactionType: number): Result<Array<string>> {
		if (transactionType === 1) {
			return this.propertyRepo.getAllSaleLocations();
		}
		return this.propertyRepo.getAllLettingLocations();
	}

	getTypes(transactionType: number): Result<PropertyType[]> {
		if (transactionType === 1) {
			return this.propertyRepo.getAllSaleTypes();
		}
		return this.propertyRepo.getAllLettingTypes();
	}

	getMedia(typeId: number, mediaName: string): Result<string> {
		var filePath: string = '../../src';
		// if (typeId === 1) {
		// 	filePath += `/images/property/${mediaName}`;
		// } else if (typeId === 2) {
		// 	filePath += `/images/floorplan/${mediaName}`;
		// } else if (typeId === 3) {
		// 	filePath += `/images/epc/${mediaName}`;
		// } else if (typeId === 5) {
		// 	filePath += `/images/brochure/${mediaName}`;
		// }
		switch(typeId) {
			case 0:
				filePath += `/images/thumbnails/${mediaName}`;
				break;
			case 1:
				filePath += `/images/property/${mediaName}`;
				break;
			case 2:
				filePath += `/images/floorplan/${mediaName}`;
				break;
			case 3:
				filePath += `/images/epc/${mediaName}`;
				break;
			case 5:
				filePath += `/images/brochure/${mediaName}`;
				break;
		};

		console.log(filePath);


		if (filePath === '../../src') {
			return new Result(
				false,
				'Invalid media type',
				400
			)
		}
		filePath = path.join(__dirname, filePath);

		if (!fs.existsSync(filePath)) {
			return new Result(
				false,
				'File not found',
				404
			)
		}

		return new Result(
			true,
			'Operation successful',
			200,
			filePath
		)
	}

	getProperty(type: string, id: number): Result<Property> {
		if (type !== 'sale' && type !== 'letting') {
			return new Result(
				false,
				'Invalid property type',
				400
			)
		}
		return this.propertyRepo.getProperty(id);
	}

	validateApiKey(apiKey: string): Result<boolean> {

		if (apiKey !== process.env.API_KEY) {
			return new Result(
				false,
				'Invalid API key',
				401,
				false
			)
		}
		return new Result(
			true,
			'Operation successful',
			200,
			true
		)
	}
}

export default Controller;