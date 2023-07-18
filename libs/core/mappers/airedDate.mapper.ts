/* eslint-disable lines-around-comment */
import { AiredDateDto } from '../dtos/airedDate.dto';
import { AiredDate } from '../models/airedDate';

export namespace AiredDateMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AiredDateDto): AiredDate {
		return new AiredDate({
			start: new Date(dto.start),
			end: new Date(dto.end),
		});
	}
}
