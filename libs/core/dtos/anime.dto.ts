import { AiredDateDto } from './aired-date.dto';

/** Represents one anime. Dto of received data. */
export interface AnimeDto {

	/** Id. */
	readonly id: number;

	/**
		* Creation date.
		* @example 2023-07-14T08:26:42.842112Z
		*/
	readonly created: string;

	/**
		* Modification date.
		* @example 2023-07-14T08:26:42.842112Z
		*/
	readonly modified: string;

	/** Title on english. */
	readonly title_eng: string;

	/** Title on japanese. */
	readonly title_jpn: string;

	/** Link on image. */
	readonly image: string;

	/** Object of dates. When was aired (first and last time). */
	readonly aired: AiredDateDto;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. It's rating. */
	readonly score: number | null;

	/** User score . It's user rating. */
	readonly user_score: number | null;
}

/** All types. */
export enum AnimeTypeDto {
	TV = 'TV',
	OVA = 'OVA',
	MOVIE = 'MOVIE',
	SPECIAL = 'SPECIAL',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
	UNKNOWN = 'UNKNOWN',
}

/** All statuses. */
export enum AnimeStatusDto {
	AIRING = 'AIRING',
	FINISHED = 'FINISHED',
	NOT_YET_AIRED = 'NOT_YET_AIRED',
	UNKNOWN = 'UNKNOWN',
}
