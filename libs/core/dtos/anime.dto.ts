import { AiredDateDto } from './airedDate.dto';

/** Represents one anime. Dto of received data. */
export interface AnimeDto {

	/** Id of this anime. */
	readonly id: number;

	/** Date when this anime was created in DB. */
	readonly created: string;

	/** Date when this anime was updated in DB. */
	readonly modified: string;

	/** Title of this anime on english. */
	readonly title_eng: string;

	/** Title of this anime on japanese. */
	readonly title_jpn: string;

	/** Link on image of this anime. */
	readonly image: string;

	/** Object of dates when this anime was aired. When it started and ended. */
	readonly aired: AiredDateDto;

	/** Type of this anime. */
	readonly type: string;

	/** Status of this anime. Is it aired, finished, or net aired yet. */
	readonly status: string;

	/** Score of this anime. It's rating. */
	readonly score: number | null;

	/** User score of this anime . It's user rating. */
	readonly user_score: number | null;
}
