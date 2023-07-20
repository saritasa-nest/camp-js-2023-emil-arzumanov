import { AiredDateDto } from './airedDate.dto';

/** Represents one anime. Dto of received data. */
export interface AnimeDto {

	/** Id. */
	readonly id: number;

	/** Date of creation in DB. */
	readonly created: string;

	/** Date of last updated in DB. */
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
	readonly type: AnimeTypesDto;

	/** Status. Is it aired, finished, or net aired yet. */
	readonly status: AnimeStatusesDto;

	/** Score. It's rating. */
	readonly score: number | null;

	/** User score . It's user rating. */
	readonly user_score: number | null;
}

/** All types. */
export enum AnimeTypesDto {
	TV = 'TV',
	OVA = 'OVA',
	MOVIE = 'MOVIE',
	SPECIAL = 'SPECIAL',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
	UNKNOWN = 'UNKNOWN',
}

/** All statuses. */
export enum AnimeStatusesDto {
	AIRING = 'AIRING',
	FINISHED = 'FINISHED',
	NOT_YET_AIRED = 'NOT_YET_AIRED',
	UNKNOWN = 'UNKNOWN',
}
