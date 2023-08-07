/** Authentication and registration error dto. */
export interface ErrorDto {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attr: string;
}
