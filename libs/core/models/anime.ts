import { AiredDate } from './airedDate';
import { Immerable, OmitImmerable } from './immerable';

/** Represents one anime. */
export class Anime extends Immerable {
	/** Id of this anime. Model of received data. */
	public readonly id: number;

	/** Date when this anime was created in DB. */
	public readonly created: Date;

	/** Date when this anime was updated in DB. */
	public readonly modified: string;

	/** Title of this anime on english. */
	public readonly titleEng: string;

	/** Title of this anime on japanese. */
	public readonly titleJpn: string;

	/** Link on image of this anime. */
	public readonly image: string;

	/** Object of dates when this anime was aired. When it started and ended. */
	public readonly aired: AiredDate;

	/** Type of this anime. */
	public readonly type: string;

	/** Status of this anime. Is it aired, finished, or net aired yet. */
	public readonly status: string;

	/** Score of this anime. It's rating. */
	public readonly score: number | null;

	/** User score of this anime . It's user rating. */
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
