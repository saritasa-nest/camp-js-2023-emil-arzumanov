import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

export interface AnimeDetailsDto extends AnimeDto {
	readonly trailer_youtube_id: string | null;

	readonly source: AnimeSourceDto;

	readonly airing: boolean;

	readonly rating: AnimeRatingDto;

	readonly season: AnimeSeasonDto;

	readonly synopsis: string;

	readonly studios: readonly number[];

	readonly studios_data: readonly StudioDto[];

	readonly genres: readonly number[];

	readonly genres_data: readonly GenreDto[];
}

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

export enum AnimeRatingDto {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG_13',
	R17 = 'R_17',
	RPlus = 'R_PLUS',
	RX = 'R_X',
	Unknown = 'UNKNOWN',
}

export enum AnimeSeasonDto {
	Winter = 'WINTER',
	Spring = 'SPRING',
	Summer = 'SUMMER',
	Fall = 'FALL',
	NonSeasonal = 'NON_SEASONAL',
}
