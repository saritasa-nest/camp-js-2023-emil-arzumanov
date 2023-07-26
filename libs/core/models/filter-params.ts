import { AnimeType } from './anime';

/** Anime filter. */
export class FilterParams {
	/** Search. */
	public readonly search: string;

	/** Type array. */
	public readonly type: AnimeType[];

	public constructor(data: AnimeFilterParams) {
		this.search = data.search;
		this.type = data.type;
	}
}

type AnimeFilterParams = FilterParams;
