import { map } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { FilterParamsMapper } from '@js-camp/core/mappers/filter-params.mapper';
import { Studio } from '@js-camp/core/models/studio';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { AppUrlsConfig } from './url-config.service';

/** Service for requests to studios API. */
@Injectable({
	providedIn: 'root',
})
export class StudiosService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL to get list of all studios. */
	private readonly animeStudiosUrl = this.appUrlsConfig.toApi('anime', 'studios');

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
}
