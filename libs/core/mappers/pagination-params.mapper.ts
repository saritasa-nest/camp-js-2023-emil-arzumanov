import { PaginationParamsDto } from '../dtos/pagination-params.dto';
import { PaginationParams } from '../models/pagination-params';

export namespace PaginationParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model PaginationParams model.
	 */
	export function toDto(model: PaginationParams): PaginationParamsDto {
		return ({
			offset: model.pageSize * model.pageIndex,
			limit: model.pageSize,
		});
	}
}
