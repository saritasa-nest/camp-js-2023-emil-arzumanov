/** Authentication and registration error model. */
export interface ErrorType<TAttribute> {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attribute: TAttribute;
}
