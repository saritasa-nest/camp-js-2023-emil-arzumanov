import { SortingParams } from './sorting-params';
import { PaginationParams } from './pagination-params';

/** AnimeParams model. */
export class AnimeParams {
	/** Pagination query params. */
	public paginationParams: PaginationParams;

	/** Sorting query params. */
	public sortingParams: SortingParams;

	public constructor(data: InitAnimeParams) {
		this.sortingParams = data.sortingParams;
		this.paginationParams = data.paginationParams;
	}
}

type InitAnimeParams = AnimeParams;
