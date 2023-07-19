import { Immerable, OmitImmerable } from './immerable';

/** Pagination class. */
export class Pagination<MODEL> extends Immerable {
	/** Amount of anime in DB. */
	public readonly count: number;

	/** URL for anime list on next page. */
	public readonly next: string;

	/** URL for anime list on previous page. */
	public readonly previous: string;

	/** Array of Anime on current page. */
	public readonly results: readonly MODEL[];

	public constructor(data: PaginationConstructorData<MODEL>) {
		super();
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

type PaginationConstructorData<MODEL> = OmitImmerable<Pagination<MODEL>>;
