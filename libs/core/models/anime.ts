/* eslint-disable jsdoc/require-jsdoc */
import { AiredDate } from './airedDate';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {
	public readonly id: number;

	public readonly created: string;

	public readonly modified: string;

	public readonly titleEng: string;

	public readonly titleJpn: string;

	public readonly image: string;

	public readonly aired: AiredDate;

	public readonly type: string;

	public readonly status: string;

	public readonly score: number | null;

	public readonly userScore: number | null;

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
