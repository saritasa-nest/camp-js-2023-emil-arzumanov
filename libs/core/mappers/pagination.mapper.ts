import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps PaginationDto<DTO> dto to Pagination<MODEL> model.
	 * @param dto PaginationDto<DTO>.
	 * @param mapper Mapper to Map "results" elements from DTO to MODEL.
	 */
	export function fromDto<DTO, MODEL>(dto: PaginationDto<DTO>, mapper: (dto: DTO) => MODEL): Pagination<MODEL> {
		return new Pagination<MODEL>({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(mapper),
		});
	}
}
