import { ErrorDto } from '../dtos/error.dto';
import { ErrorType } from '../models/error';
import { Login } from '../models/login';
import { transformIfInArray } from '../utils/error-mapper.util';

import { ErrorMapper } from './error.mapper';

export type LoginAttribute = keyof Login;

/** Login Error Mapper class. */
export class LoginErrorMapper implements ErrorMapper<LoginAttribute> {

	private readonly possibleAttributes = ['email', 'password'];

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	public fromDto(dto: ErrorDto): ErrorType<LoginAttribute> {

		return {
			code: 'appError',
			attribute: transformIfInArray(dto.attr, this.possibleAttributes, 'email'),
			detail: dto.detail,
		};
	}
}

export const loginErrorMapper = new LoginErrorMapper();
