import { Anime } from './anime';
import { Genre } from './genre';
import { Studio } from './studio';

/** Model for anime details. */
export interface AnimeDetails extends Anime {

	/** Id of trailer on youtube. */
	readonly trailerYoutubeId: string | null;

	/** Source. */
	readonly source: AnimeSource;

	/** Is airing. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: AnimeRating;

	/** Season of the year. */
	readonly season: AnimeSeason;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studiosData: readonly Studio[];

	/** Genres. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genresData: readonly Genre[];
}

/** Anime source. */
export enum AnimeSource {
	FourKomaManga = 'Four KomaManga',
	Book = 'Book',
	CardGame = 'Card Game',
	Game = 'Game',
	LightNovel = 'Light Novel',
	Manga = 'Manga',
	MixedMedia = 'Mixed Media',
	Music = 'Music',
	Novel = 'Novel',
	Original = 'Original',
	PictureBook = 'Picture Book',
	Radio = 'Radio',
	VisualNovel = 'Visual Novel',
	WebManga = 'Web Manga',
	WebNovel = 'Web Novel',
	Other = 'Other',
	Unknown = 'Unknown',
}

/** Anime rating. */
export enum AnimeRating {
	G = 'G',
	PG = 'PG',
	PG13 = 'PG-13',
	R17 = 'R-17+',
	RPlus = 'R+',
	RX = 'Rx',
	Unknown = 'Unknown',
}

/** Anime season. */
export enum AnimeSeason {
	Winter = 'Winter',
	Spring = 'Spring',
	Summer = 'Summer',
	Fall = 'Fall',
	NonSeasonal = 'Non seasonal',
}
