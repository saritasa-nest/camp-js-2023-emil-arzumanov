import { AuthErrorDto } from '../dtos/auth-error.dto';
import { AuthErrorType } from '../models/auth-error';
import { snakeToCamel } from '../utils/snake-to-camel.util';

export namespace AuthErrorMapper {

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	export function fromDto(dto: AuthErrorDto): AuthErrorType {
		return ({
			code: dto.code,
			attribute: dto.attr === null ? 'email' : snakeToCamel(dto.attr),
			detail: dto.detail,
		});
	}
}
