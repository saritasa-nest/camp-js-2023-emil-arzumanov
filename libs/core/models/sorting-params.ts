import { SortDirection } from '@angular/material/sort';

/** Sorting model. */
export interface SortParams {

	/** Field to sort by. */
	readonly field: SortField;

	/** Sort direction. */
	readonly direction: SortDirection;
}

/** All possible SortField values. */
export enum SortField {
	TitleEnglish = 'titleEng',
	AiredStart = 'airedStart',
	Status = 'status',
	None = '',
}
