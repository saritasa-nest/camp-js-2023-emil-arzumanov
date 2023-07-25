import { SortingParamsDto } from '../dtos/sorting-params.dto';
import { SortingParams } from '../models/sorting-params';

export namespace SortingParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model SortingParams model.
	 */
	export function toDto(model: SortingParams): SortingParamsDto {
		const direction = model.direction === 'asc' ? '' : '-';
		return ({
			ordering: direction + model.activeField,
		});
	}
}
