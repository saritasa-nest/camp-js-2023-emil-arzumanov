/** Sorting model. */
export interface SortParams {

	/** Field to sort by. */
	readonly field: SortField;

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
