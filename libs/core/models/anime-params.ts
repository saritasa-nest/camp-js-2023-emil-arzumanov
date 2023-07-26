import { SortingParams } from './sorting-params';
import { PaginationParams } from './pagination-params';
import { FilterParams } from './filter-params';

/** AnimeParams model. */
export class AnimeParams {
	/** Pagination query params. */
	public pagination: PaginationParams;

	/** Sorting query params. */
	public sorting: SortingParams;

	/** FIlter query params. */
	public filter: FilterParams;

	public constructor(data: InitAnimeParams) {
		this.pagination = data.pagination;
		this.sorting = data.sorting;
		this.filter = data.filter;
	}
}

type InitAnimeParams = AnimeParams;
