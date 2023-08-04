import { ErrorDto } from '../dtos/error.dto';
import { ErrorType } from '../models/error';
import { Registration } from '../models/registrtion';

import { ErrorMapper } from './error.mapper';

export type RegistrationAttribute = keyof Registration;

/** Registration Error Mapper class. */
export class RegistrationErrorMapper implements ErrorMapper<RegistrationAttribute> {
	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	public fromDto(dto: ErrorDto): ErrorType<RegistrationAttribute> {
		/**
			* Checks if value exists in array.
			* @param value Value.
			*/
		function isOfType(value: string): value is RegistrationAttribute {
			return ['email', 'password', 'first_name', 'last_name'].includes(value);
		}

		return ({
			code: dto.code,
			attribute: isOfType(dto.attr) ? dto.attr : 'email',
			detail: dto.detail,
		});
	}
}

export const registrationErrorMapper = new RegistrationErrorMapper();
