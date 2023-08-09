import { FilterParamsDto } from '../dtos/filter-params.dto';
import { FilterParams } from '../models/filter-params';

import { AnimeMapper } from './anime.mapper';

export namespace FilterParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Filtering params model.
	 */
	export function toDto(model: FilterParams): FilterParamsDto {
		const typeDto = model.type ? model.type.map(elem => AnimeMapper.ANIME_TYPES_TO_DTO_MAP[elem]).join(',') : '';
		return ({
			search: model.search ? model.search : '',
			type__in: typeDto,
		});
	}
}
