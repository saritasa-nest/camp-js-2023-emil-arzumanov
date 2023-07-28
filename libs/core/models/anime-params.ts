import { SortParams } from './sorting-params';
import { PaginationParams } from './pagination-params';
import { FilterParams } from './filter-params';

/** AnimeParams model. */
export interface AnimeParams {

	/** Pagination query params. */
	readonly pagination: PaginationParams;

	/** Sorting query params. */
	readonly sorting: SortParams;

	/** Filter query params. */
	readonly filter: FilterParams;
}
