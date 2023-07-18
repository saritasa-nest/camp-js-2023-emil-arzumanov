/* eslint-disable lines-around-comment */
import { AnimeDto } from '../dtos/anime.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

import { Anime } from './../models/anime';

export namespace PaginationMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: PaginationDto<AnimeDto>): Anime {
		return new Pagination<Anime>({
			count = dto.count;
		});
	}
}
