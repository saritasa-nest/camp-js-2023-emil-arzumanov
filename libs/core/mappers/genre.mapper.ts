import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';

export namespace GenreMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return ({
			id: dto.id,
			name: dto.name,
			created: dto.created ? new Date(dto.created) : null,
			modified: dto.modified ? new Date(dto.modified) : null,
			type: dto.type,
		});
	}
}
