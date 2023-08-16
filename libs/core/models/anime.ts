import { AiredDate } from './aired-date';

/** Represents one anime. */
export interface Anime {

	/** Id. Model of received data. */
	readonly id: number;

	/** Creation date. */
	readonly created: Date;

	/** Modification date. */
	readonly modified: Date;

	/** Title on english. */
	readonly titleEng: string;

	/** Title on japanese. */
	readonly titleJpn: string;

	/** Link on image. */
	readonly imageUrl: string;

	/** Object of dates. When was aired (first and last time). */
	readonly aired: AiredDate;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Score. It's rating. */
	readonly score: number | null;

	/** User score . It's user rating. */
	readonly userScore: number | null;
}

/** All types. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** All statuses. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not Yet Aired',
}
