import { AnimeType } from './anime';

/** Anime filter. */
export class FilterParams {
	/** Search. */
	public readonly search: string | null;

	/** Type array. */
	public readonly type: AnimeType[] | null;

	public constructor(data: AnimeFilterParams) {
		this.search = data.search;
		this.type = data.type;
	}
}

type AnimeFilterParams = FilterParams;
