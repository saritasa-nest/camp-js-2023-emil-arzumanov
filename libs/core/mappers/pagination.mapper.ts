import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps PaginationDto<TDto> dto to Pagination<TModel> model.
	 * @param dto PaginationDto<TDto>.
	 * @param mapper Mapper to Map "results" elements from TDto to TModel.
	 */
	export function fromDto<TDto, TModel>(dto: PaginationDto<TDto>, mapper: (dto: TDto) => TModel): Pagination<TModel> {
		return new Pagination<TModel>({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(mapper),
		});
	}
}
