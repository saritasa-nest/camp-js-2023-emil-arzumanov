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

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	public constructor(
		private readonly appUrlsConfig: AppUrlsConfig,
		private readonly http: HttpClient,
	) {}

	/** URL to get list of all anime. */
	private readonly animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/** Sends get request to API and maps receives data. */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.http
			.get<PaginationDto<AnimeDto>>(this.animeListUrl)
			.pipe(
				map(elem =>
					PaginationMapper.fromDto(elem, result =>
						AnimeMapper.fromDto(result))),
			);
	}
}
