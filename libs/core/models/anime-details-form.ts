import { AnimeType, AnimeStatus } from './anime';
import { AnimeSource, AnimeRating, AnimeSeason } from './anime-details';
import { Genre } from './genre';
import { Studio } from './studio';

/** Anime details form. */
export class AnimeDetailsForm {

	/** Title on english. */
	public readonly titleEng: string;

	/** Title on japanese. */
	public readonly titleJpn: string;

	/** Link on image. */
	public readonly imageUrl: string;

	/** When was aired first time. */
	public readonly airedStart: Date | null;

	/** When was aired last time. */
	public readonly airedEnd: Date | null;

	/** Type. */
	public readonly type: AnimeType | null;

	/** Status. */
	public readonly status: AnimeStatus | null;

	/** Id of trailer on youtube. */
	public readonly trailerYoutubeId: string | null;

	/** Source. */
	public readonly source: AnimeSource | null;

	/** Is airing. */
	public readonly airing: boolean | null;

	/** Rating. */
	public readonly rating: AnimeRating | null;

	/** Season of the year. */
	public readonly season: AnimeSeason | null;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Studios data. */
	public readonly studiosData: readonly Studio[];

	/** Genres data. */
	public readonly genresData: readonly Genre[];

	public constructor(data: InitAnimeDetailsForm) {
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.imageUrl = data.imageUrl;
		this.airedStart = data.airedStart;
		this.airedEnd = data.airedEnd;
		this.type = data.type;
		this.status = data.status;
		this.trailerYoutubeId = data.trailerYoutubeId;
		this.source = data.source;
		this.airing = data.airing;
		this.rating = data.rating;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.studiosData = data.studiosData;
		this.genresData = data.genresData;
	}
}

type InitAnimeDetailsForm = AnimeDetailsForm;
