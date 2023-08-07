/** Object of dates. When was aired (first and last time). */
export interface AiredDate {

	/** Date when anime was first aired. */
	readonly start: Date | null;

	/** Date when anime was aired last time. */
	readonly end: Date | null;
}
