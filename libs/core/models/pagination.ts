import { Immerable, OmitImmerable } from './immerable';

/** Pagination class. */
export class Pagination<TModel> extends Immerable {
	/** Amount of elements in DB. */
	public readonly count: number;

	/** URL for list on next page. */
	public readonly next: string;

	/** URL for list on previous page. */
	public readonly previous: string;

	/** Array of results on current page. */
	public readonly results: readonly TModel[];

	public constructor(data: PaginationConstructorData<TModel>) {
		super();
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

type PaginationConstructorData<TModel> = OmitImmerable<Pagination<TModel>>;
