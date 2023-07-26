/** Sorting params dto. */
export interface SortingParamsDto {

	/** Sort ordering. */
	readonly ordering: string;
}

/** All possible activeField dto values. */
export enum ActiveFieldDto {
	TitleEnglish = 'title_eng',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}
