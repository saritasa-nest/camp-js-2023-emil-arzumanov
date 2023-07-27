import { map } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { SortingParamsMapper } from '@js-camp/core/mappers/sorting-params.mapper';
import { FilterParamsMapper } from '@js-camp/core/mappers/filter-params.mapper';
import { AnimeParams } from '@js-camp/core/models/anime-params';

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	public constructor() {}

	/** URL to get list of all anime. */
	private readonly animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/**
		* Sends get request to API and maps receives data.
	 * @param params Request parameters.
	 */
	public getAnimeList(params: AnimeParams): Observable<Pagination<Anime>> {

		return this.http
			.get<PaginationDto<AnimeDto>>(this.animeListUrl, {
			params: {
				...PaginationParamsMapper.toDto(params.pagination),
				...SortingParamsMapper.toDto(params.sorting),
				...FilterParamsMapper.toDto(params.filter),
			},
		})
			.pipe(map(paginationDto => PaginationMapper.fromDto(paginationDto, animeDto => AnimeMapper.fromDto(animeDto))));
	}
}
