/** Sorting model. */
export interface SortingParams {

	/** Active sort field. */
	activeField: ActiveField;

	/** Sort direction. */
	direction: Direction;
}

/** All possible activeField values. */
export enum ActiveField {
	titleEnglish = 'titleEng',
	airedStart = 'airedStart',
	status = 'status',
	none = '',
}

/** All possible directions. */
export enum Direction {
	ascending = 'asc',
	descending = 'desc',
	none = '',
}
