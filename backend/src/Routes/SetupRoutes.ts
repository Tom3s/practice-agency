import express, { Express, Request, Response } from 'express';
import { Result } from '../Model/StateModels';
import Controller from '../Controller/Controller';
import { Address, Property, PropertyType, SearchOptions } from '../Model/EntityModels';
import fs from 'fs';


function setupRoutes(app: Express, controller: Controller): void {
	app.get('/', (request: Request, response: Response) => {
		response.send('Express + TypeScript Server');
	});

	app.get('/v2/property/residential/sale', async (request: Request, response: Response) => {

		const apiKey: string = request.query['api-key'] as string;
		if (controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}

		const searchOptions: SearchOptions = new SearchOptions();

		if (request.query['location']) {
			searchOptions.addLocation(request.query['location'] as string);
		}
		if (request.query['max-price']) {
			searchOptions.addMaxPrice(parseInt(request.query['max-price'] as string));
		}
		if (request.query['prop-type']) {
			searchOptions.addType(request.query['prop-type'] as string);
		}
		if (request.query['min-bed']) {
			searchOptions.addBedrooms(parseInt(request.query['min-bed'] as string));
		} 
		
		const result: Result<Array<Property>> = await controller.getResidentialSaleProperties(searchOptions);
		

		if (result.success) {
			response.status(result.status).send(result.data);
			return;
		}
		response.status(result.status).send(result.message);
	});

	app.get('/v2/property/residential/letting', async (request: Request, response: Response) => {
		
		const apiKey: string = request.query['api-key'] as string;
		if (controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}
		const searchOptions: SearchOptions = new SearchOptions();

		if (request.query['location']) {
			searchOptions.addLocation(request.query['location'] as string);
		}
		if (request.query['max-price']) {
			searchOptions.addMaxPrice(parseInt(request.query['max-price'] as string));
		}
		if (request.query['prop-type']) {
			searchOptions.addType(request.query['prop-type'] as string);
		}
		if (request.query['min-bed']) {
			searchOptions.addBedrooms(parseInt(request.query['min-bed'] as string));
		} 
		
		const result: Result<Array<Property>> = await controller.getResidentialLettingProperties(searchOptions);
		if (result.success) {
			response.status(result.status).send(result.data);
			return;
		}
		response.status(result.status).send(result.message);
	});

	app.get('/v2/property/location', async (request: Request, response: Response) => {
		const apiKey: string = request.query['api-key'] as string;
		if (controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}
		const transactionType: number = parseInt(request.query['transaction-type'] as string); 
		const result: Result<Array<string>> = await controller.getLocations(transactionType);

		console.log(result.data);

		if (result.success) {
			response.status(result.status).send(result.data);
			return;
		}
		response.status(result.status).send(result.message);
	});

	app.get('/v2/property/type', async (request: Request, response: Response) => {
		const apiKey: string = request.query['api-key'] as string;
		if (controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}
		const transactionType: number = parseInt(request.query['transaction-type'] as string); 
		const result: Result<PropertyType[]> = await controller.getTypes(transactionType);
		if (result.success) {
			response.status(result.status).send(result.data);
			return;
		}
		response.status(result.status).send(result.message);
	});


	app.get('/v2/media/:typeId/:mediaName', async (request: Request, response: Response) => {
		const typeId: number = parseInt(request.params['typeId']);

		const needApiKey: boolean = typeId !== 5;


		const apiKey: string = request.query['api-key'] as string;
		if (needApiKey && controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}
		const mediaName: string = request.params['mediaName'];
		const result: Result<string> = await controller.getMedia(typeId, mediaName);

		console.log(result.data);

		if (result.success) {
			response.status(result.status).sendFile(result.data as string);
			return;
		}
		response.status(result.status).send(result.message);
	});

	app.get('/v2/property/residential/:type/:id', async (request: Request, response: Response) => {
		const apiKey: string = request.query['api-key'] as string;
		if (controller.validateApiKey(apiKey).data === false) {
			response.status(401).send('Invalid API key');
			return;
		}

		const type: string = request.params['type'];
		const id: number = parseInt(request.params['id']);

		console.log(type);
		console.log(id);

		const result: Result<Property> = await controller.getProperty(type, id);

		if (result.success) {
			response.status(result.status).send(result.data);
			return;
		}
		response.status(result.status).send(result.message);
	});


	
}

export default setupRoutes;