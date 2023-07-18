/* eslint-disable lines-around-comment */
import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from './../models/anime';
import { AiredDateMapper } from './airedDate.mapper';

export namespace AnimeMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: dto.created,
			modified: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: AiredDateMapper.fromDto(dto.aired),
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
		});
	}
}
