/** Sorting model. */
export class SortingParams {
	/** Page size. */
	public activeField: string;

	/** Page index. */
	public direction: Direction;

	public constructor(data: InitSortingParams) {
		this.activeField = data.activeField;
		this.direction = data.direction;
	}
}

/** All possible activeField values. */
export enum ActiveField {
	titleEnglish = 'titleEnglish',
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

type InitSortingParams = SortingParams;
