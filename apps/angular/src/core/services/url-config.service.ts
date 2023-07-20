import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Config service to construct api URLs. */
@Injectable({
	providedIn: 'root',
})
export class UrlConfigService {

	/** Api Url. */
	public readonly apiUrl = environment.apiUrl;

	/** URL to get list of all anime. */
	public readonly animeListUrl = new URL('anime/anime/', this.apiUrl);

	public constructor() { }
}
