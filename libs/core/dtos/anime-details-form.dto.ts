import { AiredDateDto } from './aired-date.dto';
import { AnimeRatingDto, AnimeSeasonDto, AnimeSourceDto } from './anime-details.dto';
import { AnimeStatusDto, AnimeTypeDto } from './anime.dto';

export interface AnimeDetailsFormDto {

	/** Title on english. */
	readonly title_eng: string;

	/** Title on japanese. */
	readonly title_jpn: string;

	/** Link on image. */
	readonly image: string | null;

	/** Object of dates. When was aired (first and last time). */
	readonly aired: AiredDateDto;

	/** Type. */
	readonly type: AnimeTypeDto | null;

	/** Status. */
	readonly status: AnimeStatusDto | null;

	/** Id of trailer on youtube. */
	readonly trailer_youtube_id: string | null;

	/** Source. */
	readonly source: AnimeSourceDto | null;

	/** Is airing. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: AnimeRatingDto | null;

	/** Season of the year. */
	readonly season: AnimeSeasonDto | null;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios data. */
	readonly studios: readonly number[];

	/** Genres data. */
	readonly genres: readonly number[];
}
