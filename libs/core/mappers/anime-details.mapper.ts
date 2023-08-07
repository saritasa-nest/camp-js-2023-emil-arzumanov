import { AnimeDetailsDto, AnimeRatingDto, AnimeSeasonDto, AnimeSourceDto } from '../dtos/anime-details.dto';
import { AnimeDetails, AnimeRating, AnimeSeason, AnimeSource } from '../models/anime-details';

import { AnimeMapper } from './anime.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps AnimeDetailsDto dto to AnimeDetails model.
	 * @param dto AnimeDetailsDto.
		* @param youtubeLink Link to youtube.
	 */
	export function fromDto(dto: AnimeDetailsDto, youtubeLink: string): AnimeDetails {
		return ({
			...AnimeMapper.fromDto(dto),
			trailerYoutubeId: dto.trailer_youtube_id ? `${youtubeLink}${dto.trailer_youtube_id}` : null,
			source: ANIME_DETAILS_SOURCE_FROM_DTO_MAP[dto.source],
			airing: dto.airing,
			rating: ANIME_DETAILS_RATING_FROM_DTO_MAP[dto.rating],
			season: ANIME_DETAILS_SEASON_FROM_DTO_MAP[dto.season],
			synopsis: dto.synopsis,
			studios: dto.studios,
			studiosData: dto.studios_data.map(StudioMapper.fromDto),
			genres: dto.genres,
			genresData: dto.genres_data.map(GenreMapper.fromDto),
		});
	}

	/**
		* Anime details source mapper.
		* From dto to model.
		*/
	export const ANIME_DETAILS_SOURCE_FROM_DTO_MAP = {
		[AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
		[AnimeSourceDto.Book]: AnimeSource.Book,
		[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
		[AnimeSourceDto.Game]: AnimeSource.Game,
		[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
		[AnimeSourceDto.Manga]: AnimeSource.Manga,
		[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
		[AnimeSourceDto.Music]: AnimeSource.Music,
		[AnimeSourceDto.Novel]: AnimeSource.Novel,
		[AnimeSourceDto.Original]: AnimeSource.Original,
		[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
		[AnimeSourceDto.Radio]: AnimeSource.Radio,
		[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
		[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
		[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
		[AnimeSourceDto.Other]: AnimeSource.Other,
		[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
	};

	/**
		* Anime details rating mapper.
		* From dto to model.
		*/
	export const ANIME_DETAILS_RATING_FROM_DTO_MAP = {
		[AnimeRatingDto.G]: AnimeRating.G,
		[AnimeRatingDto.PG]: AnimeRating.PG,
		[AnimeRatingDto.PG13]: AnimeRating.PG13,
		[AnimeRatingDto.R17]: AnimeRating.R17,
		[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
		[AnimeRatingDto.RX]: AnimeRating.RX,
		[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
	};

	/**
		* Anime details season mapper.
		* From dto to model.
		*/
	export const ANIME_DETAILS_SEASON_FROM_DTO_MAP = {
		[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
		[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
		[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
		[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
		[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
	};
}
