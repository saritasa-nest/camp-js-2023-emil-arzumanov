import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { SortingParams } from '@js-camp/core/models/sorting-params';
import { SortingParamsMapper } from '@js-camp/core/mappers/sorting-params.mapper';
import { FormControl } from '@angular/forms';

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	public constructor(private readonly appUrlsConfig: AppUrlsConfig, private readonly http: HttpClient) {}

	/** URL to get list of all anime. */
	private readonly animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/** Sends get request to API and maps receives data.
	 * @param params Request parameters.
	 */
	public getAnimeList(params: [
		PaginationParams,
		SortingParams,
		FormControl<string | null>,
		FormControl<AnimeType[] | null>,
	]): Observable<Pagination<Anime>> {
		return this.http
			.get<PaginationDto<AnimeDto>>(this.animeListUrl, {
			params: {
				...PaginationParamsMapper.toDto(params[0]),
				...SortingParamsMapper.toDto(params[1]),
				type__in: params[3].value ? params[3].value.join(',') : '',
				search: params[2].value ? params[2].value : '',
			},
		})
			.pipe(map(elem => PaginationMapper.fromDto(elem, result => AnimeMapper.fromDto(result))));
	}
}
