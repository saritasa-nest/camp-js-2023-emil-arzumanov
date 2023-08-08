/** Genre. */
export interface Genre {

	/** Id. */
	readonly id: number;

	/** Name. */
	readonly name: string;

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

	/** DTO type. */
	readonly type: string;
}
