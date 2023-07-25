/** Sorting params dto. */
export interface SortingParamsDto {

	/** Sort ordering. */
	readonly ordering: string;
}

/** All possible activeField dto values. */
export enum ActiveFieldDto {
	titleEnglish = 'title_eng',
	airedStart = 'aired__startswith',
	status = 'status',
	none = '',
}
