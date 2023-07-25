import { AiredDateDto } from '../dtos/airedDate.dto';
import { AiredDate } from '../models/airedDate';

export namespace AiredDateMapper {

	/**
	 * Maps AiredDateDto dto to AiredDate model.
	 * @param dto AiredDateDto dto.
	 */
	export function fromDto(dto: AiredDateDto): AiredDate {
		return new AiredDate({
			start: dto.start ? new Date(dto.start) : null,
			end: dto.end ? new Date(dto.end) : null,
		});
	}
}
