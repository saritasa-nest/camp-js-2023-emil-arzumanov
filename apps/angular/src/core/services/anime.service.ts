import { map, switchMap } from 'rxjs/operators';
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
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
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

	private readonly s3DirectParamsUrl = this.appUrlsConfig.toApi('s3direct', 'get_params');

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
