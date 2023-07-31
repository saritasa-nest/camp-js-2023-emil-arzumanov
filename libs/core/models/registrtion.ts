/** Registration module. */
export interface Registration {

	/** Email. */
	readonly email: string | null;

	/** First name. */
	readonly firstName: string | null;

	/** Last name. */
	readonly lastName: string | null;

	/** Password. */
	readonly password: string | null;

	/** Password re type. */
	readonly reTypePassword: string | null;
}
