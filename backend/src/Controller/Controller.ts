import path from "path";
import { Address, Property, PropertyType, SearchOptions } from "../Model/EntityModels";
import { Result } from "../Model/StateModels";
import PropertyRepo from "../Repos/EstateRepo";
import fs from 'fs';

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
		if (typeId === 1) {
			// return new Result(
			// 	true,
			// 	'Operation successful',
			// 	200,
			// 	`/images/property/${mediaName}`
			// )
			filePath += `/images/property/${mediaName}`;
		} else if (typeId === 2) {
			// return new Result(
			// 	true,
			// 	'Operation successful',
			// 	200,
			// 	`/images/floorplan/${mediaName}`
			// )
			filePath += `/images/floorplan/${mediaName}`;
		} else if (typeId === 3) {
			// return new Result(
			// 	true,
			// 	'Operation successful',
			// 	200,
			// 	`/images/epc/${mediaName}`
			// )
			filePath += `/images/epc/${mediaName}`;
		} else if (typeId === 5) {
			// return new Result(
			// 	true,
			// 	'Operation successful',
			// 	200,
			// 	`/media/brochure/${mediaName}`
			// )
			filePath += `/images/brochure/${mediaName}`;
		}

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

	validateApiKey(apiKey: string): Result<boolean> {

		// TODO: Remove this line
		return new Result(
			true,
			'Operation successful',
			200,
			true
		)

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