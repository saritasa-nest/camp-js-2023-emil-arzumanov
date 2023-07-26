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
			type: ANIME_TYPES_FROM_DTO[dto.type],
			status: ANIME_STATUSES_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		});
	}

	/** Anime type transformation object in dto. */
	const ANIME_TYPES_FROM_DTO = {
		[AnimeTypeDto.TV]: AnimeType.TV,
		[AnimeTypeDto.OVA]: AnimeType.OVA,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.ONA]: AnimeType.ONA,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	/** Anime type transformation object in dto. */
	const ANIME_STATUSES_FROM_DTO = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.Unknown]: AnimeStatus.Unknown,
	};
}
