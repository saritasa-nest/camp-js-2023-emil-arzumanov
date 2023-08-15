import { AnimeDetailsFormDto } from '../dtos/anime-details-form.dto';
import { AnimeSourceDto, AnimeRatingDto, AnimeSeasonDto } from '../dtos/anime-details.dto';
import { AnimeTypeDto, AnimeStatusDto } from '../dtos/anime.dto';
import { AnimeType, AnimeStatus } from '../models/anime';
import { AnimeSource, AnimeRating, AnimeSeason } from '../models/anime-details';
import { AnimeDetailsForm } from '../models/anime-details-form';

import { AiredDateMapper } from './aired-date.mapper';

export namespace AnimeDetailsFormMapper {

	/**
	 * Maps AnimeDetailsForm model to AnimeDetailsFormDto dto.
	 * @param model AnimeDetailsForm.
	 */
	export function toDto(model: AnimeDetailsForm): AnimeDetailsFormDto {
		return {
			title_eng: model.titleEng,
			title_jpn: model.titleJpn,
			image: model.imageUrl,
			aired: AiredDateMapper.toDto({
				start: model.airedStart,
				end: model.airedEnd,
			}),
			type: model.type !== null ? ANIME_TYPES_FROM_MODEL_MAP[model.type] : null,
			status: model.status !== null ? ANIME_STATUSES_FROM_MODEL_MAP[model.status] : null,
			trailer_youtube_id: model.trailerYoutubeId,
			source: model.source !== null ? ANIME_DETAILS_SOURCE_FROM_MODEL_MAP[model.source] : null,
			airing: model.airing !== null ? model.airing : false,
			rating: model.rating !== null ? ANIME_DETAILS_RATING_FROM_MODEL_MAP[model.rating] : null,
			season: model.season !== null ? ANIME_DETAILS_SEASON_FROM_MODEL_MAP[model.season] : null,
			synopsis: model.synopsis,
			studios: model.studiosData.map(studio => studio.id),
			genres: model.genresData.map(genre => genre.id),
		};
	}

	/**
	 * Anime details source mapper.
	 * From model to dto.
	 */
	export const ANIME_DETAILS_SOURCE_FROM_MODEL_MAP = {
		[AnimeSource.Book]: AnimeSourceDto.Book,
		[AnimeSource.CardGame]: AnimeSourceDto.CardGame,
		[AnimeSource.FourKomaManga]: AnimeSourceDto.FourKomaManga,
		[AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
		[AnimeSource.Manga]: AnimeSourceDto.Manga,
		[AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
		[AnimeSource.Music]: AnimeSourceDto.Music,
		[AnimeSource.Novel]: AnimeSourceDto.Novel,
		[AnimeSource.Original]: AnimeSourceDto.Original,
		[AnimeSource.Other]: AnimeSourceDto.Other,
		[AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
		[AnimeSource.Radio]: AnimeSourceDto.Radio,
		[AnimeSource.Unknown]: AnimeSourceDto.Unknown,
		[AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
		[AnimeSource.WebManga]: AnimeSourceDto.WebManga,
		[AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
		[AnimeSource.Game]: AnimeSourceDto.Game,
	};

	/**
	 * Anime details rating mapper.
	 * From model to dto.
	 */
	export const ANIME_DETAILS_RATING_FROM_MODEL_MAP = {
		[AnimeRating.G]: AnimeRatingDto.G,
		[AnimeRating.PG]: AnimeRatingDto.PG,
		[AnimeRating.PG13]: AnimeRatingDto.PG13,
		[AnimeRating.RX]: AnimeRatingDto.RX,
		[AnimeRating.R17]: AnimeRatingDto.R17,
		[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
		[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
	};

	/**
	 * Anime details season mapper.
	 * From model to dto.
	 */
	export const ANIME_DETAILS_SEASON_FROM_MODEL_MAP = {
		[AnimeSeason.Summer]: AnimeSeasonDto.Summer,
		[AnimeSeason.Fall]: AnimeSeasonDto.Fall,
		[AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
		[AnimeSeason.Spring]: AnimeSeasonDto.Spring,
		[AnimeSeason.Winter]: AnimeSeasonDto.Winter,
	};

	/**
	 * Anime details types mapper.
	 * From model to dto.
	 */
	export const ANIME_TYPES_FROM_MODEL_MAP = {
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	/**
	 * Anime details statuses mapper.
	 * From model to dto.
	 */
	export const ANIME_STATUSES_FROM_MODEL_MAP = {
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
		[AnimeStatus.Unknown]: AnimeStatusDto.Unknown,
	};
}
