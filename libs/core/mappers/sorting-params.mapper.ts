import { SortFieldDto, SortParamsDto } from '../dtos/sorting-params.dto';
import { Direction, SortField, SortParams } from '../models/sorting-params';

export namespace SortParamsMapper {

	/**
		* Maps model to dto.
		* @param model SortParams model.
		*/
	export function toDto(model: SortParams): SortParamsDto {
		const direction = model.direction === Direction.Descending ? '-' : '';
		const sortParamsDto = SORT_PARAMS_TO_DTO_MAP[model.field];
		return ({
			ordering: direction + sortParamsDto,
		});
	}
}

/**
	* Sort field type mapper.
	* From model to dto.
	*/
const SORT_PARAMS_TO_DTO_MAP = {
	[SortField.AiredStart]: SortFieldDto.AiredStart,
	[SortField.TitleEnglish]: SortFieldDto.TitleEnglish,
	[SortField.Status]: SortFieldDto.Status,
	[SortField.None]: SortFieldDto.None,
};
