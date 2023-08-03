import { AuthErrorDto } from '../dtos/auth-error.dto';
import { AuthErrorType } from '../models/auth-error';

export namespace AuthErrorMapper {

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	export function fromDto(dto: AuthErrorDto): AuthErrorType {
		const ATTRIBUTE_TO_MODEL: Record<string, string> = {
			email: 'email',
			password: 'password',
			first__name: 'firstName',
			last__name: 'lastName',
		};

		return ({
			code: dto.code,
			attribute: ATTRIBUTE_TO_MODEL[dto.attr] ?? 'email',
			detail: dto.detail,
		});
	}
}
