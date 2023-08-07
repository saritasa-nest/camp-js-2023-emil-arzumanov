export interface StudioDto {
	readonly id: number;

	/**
		* Creation date.
		* @example 2023-08-07T08:15:29.084Z
		*/
	readonly created: string | null;

	/**
		* Modification date.
		* @example 2023-08-07T08:15:29.084Z
		*/
	readonly modified: string | null;

	readonly name: string;
}
