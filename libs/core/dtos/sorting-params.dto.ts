/** Sorting params dto. */
export interface SortingParamsDto {

	/** Sort ordering. */
	readonly ordering: string;
}

/** All possible SortField dto values. */
export enum SortFieldDto {
	TitleEnglish = 'title_eng',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}
