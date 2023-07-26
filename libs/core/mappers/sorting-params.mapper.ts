import { ActiveFieldDto, SortingParamsDto } from '../dtos/sorting-params.dto';
import { ActiveField, SortingParams } from '../models/sorting-params';

export namespace SortingParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model SortingParams model.
	 */
	export function toDto(model: SortingParams): SortingParamsDto {
		const direction = model.direction === 'desc' ? '-' : '';
		const sortParamsDto = SORT_PARAMS_TO_DTO[model.activeField];
		return ({
			ordering: direction + sortParamsDto,
		});
	}
}

/** Anime type transformation object in dto. */
const SORT_PARAMS_TO_DTO = {
	[ActiveField.AiredStart]: ActiveFieldDto.AiredStart,
	[ActiveField.TitleEnglish]: ActiveFieldDto.TitleEnglish,
	[ActiveField.Status]: ActiveFieldDto.Status,
	[ActiveField.None]: ActiveFieldDto.None,
};
