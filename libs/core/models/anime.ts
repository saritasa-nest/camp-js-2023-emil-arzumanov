import { AiredDate } from './airedDate';
import { Immerable, OmitImmerable } from './immerable';

/** Represents one anime. */
export class Anime extends Immerable {
	/** Id. Model of received data. */
	public readonly id: number;

	/** Date of creation in DB. */
	public readonly created: Date;

	/** Date of last updated in DB. */
	public readonly modified: string;

	/** Title on english. */
	public readonly titleEng: string;

	/** Title on japanese. */
	public readonly titleJpn: string;

	/** Link on image. */
	public readonly image: string;

	/** Object of dates. When was aired (first and last time). */
	public readonly aired: AiredDate;

	/** Type. */
	public readonly type: AnimeTypes;

	/** Status. Is it aired, finished, or net aired yet. */
	public readonly status: AnimeStatuses;

	/** Score. It's rating. */
	public readonly score: number | null;

	/** User score . It's user rating. */
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

/** All types. */
export enum AnimeTypes {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** All statuses. */
export enum AnimeStatuses {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not Yet Aired',
	Unknown = 'Unknown',
}

type AnimeConstructorData = OmitImmerable<Anime>;
