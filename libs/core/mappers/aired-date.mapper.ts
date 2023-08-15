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

	/**
	 * Maps AiredDate dto to AiredDateDto model.
	 * @param model AiredDate model.
	 */
	export function toDto(model: AiredDate): AiredDateDto {
		return ({
			start: model.start !== null ? model.start.toISOString() : null,
			end: model.end !== null ? model.end.toISOString() : null,
		});
	}
}
