/** Object of dates. When was aired (first and last time). */
export interface AiredDateDto {

	/**
		* Date when anime was first aired.
		* @example 1984-10-28T00:00:00Z
		*/
	readonly start: string;

	/**
		* Date when anime was aired last time.
		* @example 1984-10-28T00:00:00Z
		*/
	readonly end: string | null;
}
