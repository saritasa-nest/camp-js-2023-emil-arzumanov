import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class AiredDate extends Immerable {
	public readonly start: Date;

	public readonly end: Date;

	public constructor(data: AiredDateConstructorData) {
		super();
		this.start = data.start;
		this.end = data.end;
	}
}

type AiredDateConstructorData = OmitImmerable<AiredDate>;
