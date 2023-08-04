import { ErrorDto } from '../dtos/error.dto';
import { ErrorType } from '../models/error';
import { Login } from '../models/login';

import { ErrorMapper } from './error.mapper';

export type LoginAttribute = keyof Login;

/** */
export class LoginErrorMapper implements ErrorMapper<LoginAttribute> {
	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	public fromDto(dto: ErrorDto): ErrorType<LoginAttribute> {
		/**
		 * A.
		 * @param value A.
		 */
		function isOfType(value: string): value is LoginAttribute {
			return ['email', 'password', 'first_name', 'last_name'].includes(value);
		}

		return {
			code: 'appError',
			attribute: isOfType(dto.attr) ? dto.attr : 'email',
			detail: dto.detail,
		};
	}
}

export const loginErrorMapper = new LoginErrorMapper();
