import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Config service to construct api URLs. */
@Injectable({
	providedIn: 'root',
})
export class AppUrlsConfig {

	/** Api Url. */
	public readonly baseUrl = environment.apiUrl;

	/**
		* Creates API url based on arguments.
		* @param args Array of strings that will be added to URL.
		*/
	public toApi(...args: readonly string[]): string {
		const path = args.join('');
		return new URL(path, this.baseUrl).toString();
	}
}
