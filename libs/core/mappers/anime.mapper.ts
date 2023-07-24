import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, AnimeType } from '../models/anime';

import { AiredDateMapper } from './airedDate.mapper';

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
		[AnimeTypeDto.MOVIE]: AnimeType.Movie,
		[AnimeTypeDto.SPECIAL]: AnimeType.Special,
		[AnimeTypeDto.ONA]: AnimeType.ONA,
		[AnimeTypeDto.MUSIC]: AnimeType.Music,
		[AnimeTypeDto.UNKNOWN]: AnimeType.Unknown,
	};

	/** Anime type transformation object in dto. */
	const ANIME_STATUSES_FROM_DTO = {
		[AnimeStatusDto.AIRING]: AnimeStatus.Airing,
		[AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
		[AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
		[AnimeStatusDto.UNKNOWN]: AnimeStatus.Unknown,
	};
}
