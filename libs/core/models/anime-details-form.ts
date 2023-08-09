import { AnimeType, AnimeStatus } from './anime';
import { AnimeSource, AnimeRating, AnimeSeason } from './anime-details';
import { Genre } from './genre';
import { Studio } from './studio';

/** Anime details form.	*/
export interface AnimeDetailsForm {

	/** Title on english. */
	readonly titleEng: string;

	/** Title on japanese. */
	readonly titleJpn: string;

	/** Link on image. */
	readonly imageUrl: string;

	/** Image file. */
	readonly imageFile: File | null;

	/** When was aired first time. */
	readonly airedStart: Date | null;

	/** When was aired last time. */
	readonly airedEnd: Date | null;

	/** Type. */
	readonly type: AnimeType | null;

	/** Status. */
	readonly status: AnimeStatus | null;

	/** Id of trailer on youtube. */
	readonly trailerYoutubeId: string | null;

	/** Source. */
	readonly source: AnimeSource | null;

	/** Is airing. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: AnimeRating | null;

	/** Season of the year. */
	readonly season: AnimeSeason | null;

	/** Synopsis. */
	readonly synopsis: string;

	/** Studios data. */
	readonly studiosData: readonly Studio[];

	/** Genres data. */
	readonly genresData: readonly Genre[];
}
