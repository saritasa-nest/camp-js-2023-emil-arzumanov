/** Registration dto. */
export interface RegistrationDto {

	/** Email. */
	readonly email: string | null;

	/** First name. */
	readonly first_name: string | null;

	/** Last name. */
	readonly last_name: string | null;

	/** Password. */
	readonly password: string | null;
}
