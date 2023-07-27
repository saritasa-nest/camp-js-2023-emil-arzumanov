import { SortFieldDto, SortingParamsDto } from '../dtos/sorting-params.dto';
import { Direction, SortField, SortingParams } from '../models/sorting-params';

export namespace SortingParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model SortingParams model.
	 */
	export function toDto(model: SortingParams): SortingParamsDto {
		const direction = model.direction === Direction.Descending ? '-' : '';
		const sortParamsDto = SORT_PARAMS_TO_DTO[model.field];
		return ({
			ordering: direction + sortParamsDto,
		});
	}
}

/** Sort field type transformation object from model to dto. */
const SORT_PARAMS_TO_DTO = {
	[SortField.AiredStart]: SortFieldDto.AiredStart,
	[SortField.TitleEnglish]: SortFieldDto.TitleEnglish,
	[SortField.Status]: SortFieldDto.Status,
	[SortField.None]: SortFieldDto.None,
};
