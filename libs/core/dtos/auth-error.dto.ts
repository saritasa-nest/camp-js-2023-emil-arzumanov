/** Authentication and registration error dto. */
export interface AuthErrorDto {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attr: string;
}
