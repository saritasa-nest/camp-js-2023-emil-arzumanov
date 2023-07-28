import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, AnimeType } from '../models/anime';

import { AiredDateMapper } from './aired-date.mapper';

export namespace AnimeMapper {

	/**
	 * Maps AnimeDto dto to Anime model.
	 * @param dto Anime.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			imageUrl: dto.image,
			aired: AiredDateMapper.fromDto(dto.aired),
			type: ANIME_TYPES_FROM_DTO_MAP[dto.type],
			status: ANIME_STATUSES_FROM_DTO_MAP[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		});
	}

	/**
		* Anime type mapper.
		* From dto to model.
		*/
	const ANIME_TYPES_FROM_DTO_MAP = {
		[AnimeTypeDto.TV]: AnimeType.TV,
		[AnimeTypeDto.OVA]: AnimeType.OVA,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.ONA]: AnimeType.ONA,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	/**
		* Anime type mapper.
		* From model to dto.
		*/
	export const ANIME_TYPES_TO_DTO_MAP = {
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	/**
		* Anime statuses mapper.
		* From dto to model.
		*/
	const ANIME_STATUSES_FROM_DTO_MAP = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.Unknown]: AnimeStatus.Unknown,
	};
}
