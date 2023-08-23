import { exitCode } from "process";

function buildQueryParams(type: string, location: string, price: string, propertyType: string[], bedroom: string, apiKey: boolean): string {
	var params = [];
	if (type) {
		params.push('transaction-type=' + type);
	}
	if (location) {
		params.push('location=' + location);
	}
	if (price) {
		params.push('max-price=' + price);
	}
	if (propertyType.length > 0) {
		params.push('prop-type=' + propertyType.join(','));
	}
	if (bedroom) {
		params.push('min-bed=' + bedroom);
	}
	if (apiKey)
		params.push('api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN')
	return params.join('&');
}

function BuildUrl(type: string, location: string, price: string, propertyType: string[], bedroom: string): string {
	var baseUrl = 'http://localhost:8000/v2/property/residential/';
	baseUrl += type + '?';
	
	baseUrl += buildQueryParams('', location, price, propertyType, bedroom, true);

	return baseUrl;
}

function buildMediaUrl(fileUrl: string, mediaType: number, mediaName: string): string {
	var url = 'http://localhost:8000/v2'

	url += fileUrl;
	url += mediaType.toString() + '/';
	url += mediaName;

	return url;
}

function buildSinglePropertyUrl(id: string): string {
	var url = 'http://localhost:8000/v2/property/residential/';
	if (Math.random() > 0.5) {
		url += 'sale/';
	}
	else {
		url += 'letting/';
	}
	url += id + '?api-key=xYfyViCWX3ghasznzOK3jWwFhLtDRrUN';

	return url;
}

export { buildMediaUrl, BuildUrl, buildQueryParams, buildSinglePropertyUrl };