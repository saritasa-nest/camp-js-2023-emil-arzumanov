import { AuthErrorType } from './auth-error';

/** Authentication custom error. */
export class AuthCustomError extends Error {
	public constructor(public readonly mappedErrorArray: AuthErrorType[]) {
		super();
	}
}
