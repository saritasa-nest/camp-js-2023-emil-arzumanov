/* eslint-disable jsdoc/require-jsdoc */
import { Immerable, OmitImmerable } from './immerable';

export class Pagination<MODEL> extends Immerable {
	public readonly count: number;

	public readonly next: string;

	public readonly previous: string;

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
