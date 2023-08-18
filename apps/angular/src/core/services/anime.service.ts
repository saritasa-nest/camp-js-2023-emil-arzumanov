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
import { SortParamsMapper } from '@js-camp/core/mappers/sorting-params.mapper';
import { FilterParamsMapper } from '@js-camp/core/mappers/filter-params.mapper';
import { AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDetailsForm } from '@js-camp/core/models/anime-details-form';
import { AnimeDetailsFormMapper } from '@js-camp/core/mappers/anime-details-form.mapper';

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL to get list of all anime or create a new one. */
	private readonly animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/** URL to get details of anime. */
	private readonly animeDetailsUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/**
	 * Sends get request on list of all anime to API and maps receives data.
	 * @param params Request parameters.
	 */
	public getAnimeList(params: AnimeParams): Observable<Pagination<Anime>> {
		return this.http
			.get<PaginationDto<AnimeDto>>(this.animeListUrl, {
			params: {
				...PaginationParamsMapper.toDto(params.pagination),
				...SortParamsMapper.toDto(params.sorting),
				...FilterParamsMapper.toDto(params.filter),
			},
		})
			.pipe(map(paginationDto => PaginationMapper.fromDto(paginationDto, animeDto => AnimeMapper.fromDto(animeDto))));
	}

	/**
	 * Sends get request on details of anime to API and maps receives data.
	 * @param id Anime id.
	 */
	public getAnimeDetails(id: number): Observable<AnimeDetails> {
		return this.http
			.get<AnimeDetailsDto>(`${this.animeDetailsUrl}${id}/`)
			.pipe(map(animeDetailsDto => AnimeDetailsMapper.fromDto(animeDetailsDto)));
	}

	/**
	 * Edit anime.
	 * @param id Id.
	 * @param body Anime form body.
	 */
	public	editAnime(id: number, body: AnimeDetailsForm): Observable<AnimeDetails> {
		return this.http.put<AnimeDetailsDto>(`${this.animeListUrl}${id}/`, AnimeDetailsFormMapper.toDto(body))
			.pipe(map(animeDetailsDto => AnimeDetailsMapper.fromDto(animeDetailsDto)));
	}

	/**
	 * Create anime.
	 * @param body Anime form body.
	 */
	public	createAnime(body: AnimeDetailsForm): Observable<AnimeDetails> {
		return this.http.post<AnimeDetailsDto>(this.animeListUrl, AnimeDetailsFormMapper.toDto(body))
			.pipe(map(animeDetailsDto => AnimeDetailsMapper.fromDto(animeDetailsDto)));
	}

	/**
	 * Delete anime by id.
	 * @param id Id.
	 */
	public deleteAnimeById(id: number): Observable<void> {
		return this.http
			.delete<undefined>(`${this.animeDetailsUrl}${id}/`);
	}
}
