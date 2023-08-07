/** Studio data. */
export interface Studio {

	/** Id. */
	readonly id: number;

	/**
		* Creation date.
		* @example 2023-08-07T08:15:29.084Z
		*/
	readonly created: Date | null;

	/**
		* Modification date.
		* @example 2023-08-07T08:15:29.084Z
		*/
	readonly modified: Date | null;

	/** Name. */
	readonly name: string;
}
