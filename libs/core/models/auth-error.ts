/** Authentication and registration error model. */
export interface AuthErrorType {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attribute: string;
}
