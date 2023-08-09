import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

	/**
	 * Maps dto to model.
	 * @param dto Studio dto.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return ({
			id: dto.id,
			created: dto.created ? new Date(dto.created) : null,
			modified: dto.modified ? new Date(dto.modified) : null,
			name: dto.name,
		});
	}
}
