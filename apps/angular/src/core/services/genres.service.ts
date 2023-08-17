import { map } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { FilterParamsMapper } from '@js-camp/core/mappers/filter-params.mapper';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to genres API. */
@Injectable({
	providedIn: 'root',
})
export class GenresService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL to get list of all genres. */
	private readonly animeGenresUrl = this.appUrlsConfig.toApi('anime', 'genres');

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
}
