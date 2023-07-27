import { AnimeType } from './anime';

/** Anime filter. */
export interface FilterParams {

	/** Search. */
	readonly search: string | null;

	/** Type array. */
	readonly type: readonly AnimeType[] | null;
}
