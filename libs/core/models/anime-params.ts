import { SortingParams } from './sorting-params';
import { PaginationParams } from './pagination-params';
import { FilterParams } from './filter-params';

/** AnimeParams model. */
export interface AnimeParams {

	/** Pagination query params. */
	readonly pagination: PaginationParams;

	/** Sorting query params. */
	readonly sorting: SortingParams;

	/** Filter query params. */
	readonly filter: FilterParams;
}
