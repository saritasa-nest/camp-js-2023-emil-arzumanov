/** Sorting model. */
export interface SortingParams {

	/** Field to sort by. */
	readonly activeSortField: SortField;

	/** Sort direction. */
	readonly direction: Direction;
}

/** All possible SortField values. */
export enum SortField {
	TitleEnglish = 'titleEng',
	AiredStart = 'airedStart',
	Status = 'status',
	None = '',
}

/** All possible directions. */
export enum Direction {
	Ascending = 'asc',
	Descending = 'desc',
	None = '',
}
