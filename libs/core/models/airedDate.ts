import { Immerable, OmitImmerable } from './immerable';

/** Object of dates. When was aired (first and last time). */
export class AiredDate extends Immerable {
	/** Date when anime was first aired. */
	public readonly start: Date;

	/** Date when anime was aired last time. */
	public readonly end: Date;

	public constructor(data: AiredDateConstructorData) {
		super();
		this.start = data.start;
		this.end = data.end;
	}
}

type AiredDateConstructorData = OmitImmerable<AiredDate>;
