import { SortingParams } from './sorting-params';
import { PaginationParams } from './pagination-params';
import { FilterParams } from './filter-params';

/** AnimeParams model. */
export interface AnimeParams {

	/** Pagination query params. */
	pagination: PaginationParams;

	/** Sorting query params. */
	sorting: SortingParams;

	/** FIlter query params. */
	filter: FilterParams;
}
