/** Sorting model. */
export interface SortingParams {

	/** Active sort field. */
	activeField: ActiveField;

	/** Sort direction. */
	direction: Direction;
}

/** All possible activeField values. */
export enum ActiveField {
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
