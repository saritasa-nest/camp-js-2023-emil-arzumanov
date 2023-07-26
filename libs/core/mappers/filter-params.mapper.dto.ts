import { FilterParamsDto } from '../dtos/filter-params.dto';
import { FilterParams } from '../models/filter-params';

export namespace SortingParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model SortingParams model.
	 */
	export function toDto(model: FilterParams): FilterParamsDto {
		return ({
			search: model.search,
			type__in: model.type.join(','),
		});
	}
}
