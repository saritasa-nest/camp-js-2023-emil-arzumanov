import { AiredDateDto } from '../dtos/aired-date.dto';
import { AiredDate } from '../models/aired-date';

export namespace AiredDateMapper {

	/**
	 * Maps AiredDateDto dto to AiredDate model.
	 * @param dto AiredDateDto dto.
	 */
	export function fromDto(dto: AiredDateDto): AiredDate {
		return ({
			start: dto.start ? new Date(dto.start) : null,
			end: dto.end ? new Date(dto.end) : null,
		});
	}
}
