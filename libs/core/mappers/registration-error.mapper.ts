import { ErrorDto } from '../dtos/error.dto';
import { ErrorType } from '../models/error';
import { Registration } from '../models/registrtion';
import { transformIfInArray } from '../utils/error-mapper.util';

import { ErrorMapper } from './error.mapper';

export type RegistrationAttribute = keyof Registration;

/** Registration Error Mapper class. */
export class RegistrationErrorMapper implements ErrorMapper<RegistrationAttribute> {

	private readonly possibleAttributes = ['email', 'password', 'first_name', 'last_name'];

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	public fromDto(dto: ErrorDto): ErrorType<RegistrationAttribute> {

		return ({
			code: 'appError',
			attribute: transformIfInArray(dto.attr, this.possibleAttributes, 'email'),
			detail: dto.detail,
		});
	}
}

export const registrationErrorMapper = new RegistrationErrorMapper();
