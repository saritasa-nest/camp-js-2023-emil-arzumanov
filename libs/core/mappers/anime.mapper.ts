import { AnimeDto, AnimeStatusesDto, AnimeTypesDto } from '../dtos/anime.dto';
import { Anime, AnimeStatuses, AnimeTypes } from '../models/anime';

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
			modified: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: AiredDateMapper.fromDto(dto.aired),
			type: ANIME_TYPES_FROM_DTO[dto.type],
			status: ANIME_STATUSES_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
		});
	}

	/** Anime type transformation object in dto. */
	const ANIME_TYPES_FROM_DTO = {
		[AnimeTypesDto.TV]: AnimeTypes.TV,
		[AnimeTypesDto.OVA]: AnimeTypes.OVA,
		[AnimeTypesDto.MOVIE]: AnimeTypes.Movie,
		[AnimeTypesDto.SPECIAL]: AnimeTypes.Special,
		[AnimeTypesDto.ONA]: AnimeTypes.ONA,
		[AnimeTypesDto.MUSIC]: AnimeTypes.Music,
		[AnimeTypesDto.UNKNOWN]: AnimeTypes.Unknown,
	};

	/** Anime type transformation object in dto. */
	const ANIME_STATUSES_FROM_DTO = {
		[AnimeStatusesDto.AIRING]: AnimeStatuses.Airing,
		[AnimeStatusesDto.FINISHED]: AnimeStatuses.Finished,
		[AnimeStatusesDto.NOT_YET_AIRED]: AnimeStatuses.NotYetAired,
		[AnimeStatusesDto.UNKNOWN]: AnimeStatuses.Unknown,
	};
}
