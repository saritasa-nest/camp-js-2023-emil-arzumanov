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
import { Studio } from '@js-camp/core/models/studio';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { AppUrlsConfig } from './url-config.service';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';

/** Service for requests to Anime API. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL to get list of all anime. */
	private readonly animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/** URL to get details of anime. */
	private readonly animeDetailsUrl = this.appUrlsConfig.toApi('anime', 'anime');

	/** URL to get list of all studios. */
	private readonly animeStudiosUrl = this.appUrlsConfig.toApi('anime', 'studios');

	/** URL to get list of all genres. */
	private readonly animeGenresUrl = this.appUrlsConfig.toApi('anime', 'genres');

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
	 * Delete anime by id.
	 * @param id Id.
	 */
	public deleteAnimeById(id: number): Observable<void> {
		return this.http
			.delete<undefined>(`${this.animeDetailsUrl}${id}/`);
	}

	/**
	 * Get all studios.
	 * @param pagination Pagination param.
	 * @param search Search param.
	 */
	public getStudiosList(pagination: PaginationParams, search: string | null): Observable<Pagination<Studio>> {
		return this.http
			.get<PaginationDto<StudioDto>>(this.animeStudiosUrl, {
			params: {
				...PaginationParamsMapper.toDto(pagination),
				...FilterParamsMapper.toDto({ search, type: null }),
			},
		})
			.pipe(map(paginationDto => PaginationMapper.fromDto(paginationDto, studioDto => StudioMapper.fromDto(studioDto))));
	}

	/**
	 * Create studio.
	 * @param name Name.
	 */
	public createStudio(name: string): Observable<Studio> {
		return this.http.post<StudioDto>(this.animeStudiosUrl, { name })
			.pipe(map(studioDto => StudioMapper.fromDto(studioDto)));
	}

	/**
	 * Get all studios.
	 * @param pagination Pagination param.
	 * @param search Search param.
	 */
	public getGenresList(pagination: PaginationParams, search: string | null): Observable<Pagination<Genre>> {
		return this.http
			.get<PaginationDto<GenreDto>>(this.animeGenresUrl, {
			params: {
				...PaginationParamsMapper.toDto(pagination),
				...FilterParamsMapper.toDto({ search, type: null }),
			},
		})
			.pipe(map(paginationDto => PaginationMapper.fromDto(paginationDto, genreDto => GenreMapper.fromDto(genreDto))));
	}

	/**
	 * Create studio.
	 * @param name Name.
	 */
	public createGenre(name: string): Observable<Genre> {
		return this.http.post<GenreDto>(this.animeGenresUrl, { name })
			.pipe(map(genreDto => GenreMapper.fromDto(genreDto)));
	}

	/**
	 * Get all studios.
	 * @param name Genre name.
	 * @param search Search param.
	 */
	public getGenreCount(name: string): Observable<number> {
		return this.http
			.get<PaginationDto<GenreDto>>(this.animeGenresUrl, {
			params: { name },
		})
			.pipe(map(paginationDto => paginationDto.count));
	}
}
