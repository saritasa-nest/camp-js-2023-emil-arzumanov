import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	/** URL for Anime API requests. */
	private readonly animeURL = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/';

	public constructor(
		private http: HttpClient,
	) {}

	/**
	 * Sends get request to API, maps received data and saves it.
	 * @param offset The starting point within the collection of resource results.
	 * @param limit Maximum of results to return.
	 */
	public getAnimeList(offset = '25', limit = '25'): Observable<Pagination<Anime>> {
		return this.http
			.get<PaginationDto<AnimeDto>>(this.animeURL, { params: { limit, offset } })
			.pipe(
				map(
					(elem: PaginationDto<AnimeDto>): Pagination<Anime> =>
						PaginationMapper.fromDto<AnimeDto, Anime>(elem, result => AnimeMapper.fromDto(result)),
				),
			);
	}
}
