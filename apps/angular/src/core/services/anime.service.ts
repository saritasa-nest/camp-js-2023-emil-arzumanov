import { map } from 'rxjs/operators';
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private animeURL = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/';

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Api-Key': '9c9da0d3-c65c-402b-8df6-4a04ad9fa847',
		}),
	};

	constructor(private http: HttpClient) {}

	/** GET heroes from the server. */
	getAnimeList(): Observable<Pagination<Anime>> {
		return this.http.get<PaginationDto<AnimeDto>>(this.animeURL, this.httpOptions).pipe(
			map((elem: PaginationDto<AnimeDto>): Pagination<Anime> =>
				PaginationMapper.fromDto<AnimeDto, Anime>(elem, result =>
					AnimeMapper.fromDto(result))),
		);
	}
}
