import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registrtion';

export namespace RegistrationMapper {

	/**
	 * Maps model to dto.
	 * @param model Pagination parameters model.
	 */
	export function toDto(model: Registration): RegistrationDto {
		return ({
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			password: model.password,
		});
	}
}
