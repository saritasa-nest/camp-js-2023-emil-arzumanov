import { AuthErrorDto } from '../dtos/auth-error.dto';
import { AuthErrorType } from '../models/auth-error';
import { snakeToCamel } from '../utils/snake-to-camel.util';

export namespace AuthErrorMapper {

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	export function fromDto(dto: AuthErrorDto): AuthErrorType {
		let mappedAttribute: string;

		if (dto.attr === null) {
			mappedAttribute = 'email';
		} else {
			mappedAttribute = snakeToCamel(dto.attr);
		}

		return ({
			code: dto.code,
			attribute: mappedAttribute,
			detail: dto.detail,
		});
	}
}
