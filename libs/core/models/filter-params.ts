import { AnimeType } from './anime';

/** Anime filter. */
export interface FilterParams {

	/** Search. */
	search: string | null;

	/** Type array. */
	type: AnimeType[] | null;
}
