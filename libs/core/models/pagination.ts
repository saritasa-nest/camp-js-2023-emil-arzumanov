/* eslint-disable jsdoc/require-jsdoc */
import { Immerable, OmitImmerable } from './immerable';

export class Pagination<T> extends Immerable {
	public readonly count: number;

	public readonly next: string;

	public readonly previous: string;

	public readonly results: readonly T[];

	public constructor(data: PaginationConstructorData) {
		super();
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

type PaginationConstructorData = OmitImmerable<Pagination<T>>;
