import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Dto for anime details. */
export interface AnimeDetailsDto extends AnimeDto {

	/** Id of trailer on youtube. */
	readonly trailer_youtube_id: string | null;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Is airing. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: AnimeRatingDto;

	/** Season of the year. */
	readonly season: AnimeSeasonDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studios_data: readonly StudioDto[];

	/** Genres. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genres_data: readonly GenreDto[];
}

/** Anime source. */
export enum AnimeSourceDto {
	FourKomaManga = 'FOUR_KOMA_MANGA',
	Book = 'BOOK',
	CardGame = 'CARD_GAME',
	Game = 'GAME',
	LightNovel = 'LIGHT_NOVEL',
	Manga = 'MANGA',
	MixedMedia = 'MIXED_MEDIA',
	Music = 'MUSIC',
	Novel = 'NOVEL',
	Original = 'ORIGINAL',
	PictureBook = 'PICTURE_BOOK',
	Radio = 'RADIO',
	VisualNovel = 'VISUAL_NOVEL',
	WebManga = 'WEB_MANGA',
	WebNovel = 'WEB_NOVEL',
	Other = 'OTHER',
	Unknown = 'UNKNOWN',
}

/** Anime rating. */
export enum AnimeRatingDto {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG_13',
	R17 = 'R_17',
	RPlus = 'R_PLUS',
	RX = 'R_X',
	Unknown = 'UNKNOWN',
}

/** Anime season. */
export enum AnimeSeasonDto {
	Winter = 'WINTER',
	Spring = 'SPRING',
	Summer = 'SUMMER',
	Fall = 'FALL',
	NonSeasonal = 'NON_SEASONAL',
}
