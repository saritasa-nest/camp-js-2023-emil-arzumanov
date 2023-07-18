/* eslint-disable lines-around-comment */
import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
		* @param mapper Mapper for.
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
