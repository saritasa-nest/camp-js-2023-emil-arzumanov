import { FilterParamsDto } from '../dtos/filter-params.dto';
import { FilterParams } from '../models/filter-params';

export namespace FilterParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model SortingParams model.
	 */
	export function toDto(model: FilterParams): FilterParamsDto {
		const dtoType = model.type ? model.type.map(elem => elem.toUpperCase()).join(',') : '';
		return ({
			search: model.search ? model.search : '',
			type__in: dtoType,
		});
	}
}
