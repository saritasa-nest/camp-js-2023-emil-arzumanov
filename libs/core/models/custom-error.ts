import { ErrorType } from './error';

/** Authentication custom error. */
export class CustomError<TAttribute> extends Error {
	public constructor(
		public readonly mappedErrorArray: readonly ErrorType<TAttribute>[],
		public readonly type: string,
	) {
		super();
	}
}
