/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private heroesUrl = 'https://api.camp-js.saritasa.rocks/api/v1/';

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation Name of the operation that failed.
	 * @param result Optional value to return as the observable result.
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: Error): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Api-Key': '9c9da0d3-c65c-402b-8df6-4a04ad9fa847',
		}),
	};

	constructor(private http: HttpClient) {}

	/** GET heroes from the server. */
	getAnimeList(): Observable<Anime[]> {
		const response = this.http
			.get<AnimeDto[]>(this.heroesUrl)
			.pipe(catchError(this.handleError<AnimeDto[]>('getAnimeList', [])));
		return new AnimeMapper.fromDto(response);
	}
}
