import { map, switchMap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { s3DirectDto } from '@js-camp/core/dtos/s3direct.dto';
import { xml2js } from 'xml-js';

import { AppUrlsConfig } from './url-config.service';

interface S3Json {

	/** Post response. */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	readonly PostResponse: {

		/** Location. */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		readonly Location: {

			/** Url text. */
			readonly _text: string;
		};
	};
}

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class S3DirectService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL to get s3direct params. */
	private readonly s3DirectParamsUrl = this.appUrlsConfig.toApi('s3direct', 'get_params');

	/**
	 * Get s3direct params.
	 * @param imageFile Image file.
	 */
	public getS3DirectParams(imageFile: File): Observable<string> {
		return this.http.post<s3DirectDto>(this.s3DirectParamsUrl, { filename: imageFile.name })
			.pipe(
				map(s3dto => this.createS3FormData(s3dto, imageFile)),
				switchMap(({ formAction, formData }) => this.http.post(formAction, formData, { responseType: 'text' })),
				map(s3Xml => xml2js(s3Xml, { compact: true }) as S3Json),
				map(s3Json => s3Json.PostResponse.Location._text),
			);
	}

	/**
	 * Create s3 form data.
	 * @param s3dto S3 Dto.
		* @param imageFile Image file.
	 */
	private createS3FormData(s3dto: s3DirectDto, imageFile: File): { formAction: string; formData: FormData; } {
		const s3FormData = new FormData();
		Object.keys(s3dto).forEach(s3dtoElem => s3FormData.append(s3dtoElem, s3dto[s3dtoElem as keyof s3DirectDto]));
		s3FormData.append('file', imageFile);
		s3FormData.delete('form_action');
		return { formAction: s3dto.form_action, formData: s3FormData };
	}
}
