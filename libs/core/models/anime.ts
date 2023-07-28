import { AiredDate } from './aired-date';
import { Immerable, OmitImmerable } from './immerable';

/** Represents one anime. */
export class Anime extends Immerable {
	/** Id. Model of received data. */
	public readonly id: number;

	/** Creation date. */
	public readonly created: Date;

	/** Modification date. */
	public readonly modified: Date;

	/** Title on english. */
	public readonly titleEng: string;

	/** Title on japanese. */
	public readonly titleJpn: string;

	/** Link on image. */
	public readonly imageUrl: string;

	/** Object of dates. When was aired (first and last time). */
	public readonly aired: AiredDate;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

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
		this.imageUrl = data.imageUrl;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
	}
}

/** All types. */
export enum AnimeType {
	TV = 'TV',
	OVA = 'OVA',
	Movie = 'Movie',
	Special = 'Special',
	ONA = 'ONA',
	Music = 'Music',
	Unknown = 'Unknown',
}

/** All statuses. */
export enum AnimeStatus {
	Airing = 'Airing',
	Finished = 'Finished',
	NotYetAired = 'Not Yet Aired',
	Unknown = 'Unknown',
}

type AnimeConstructorData = OmitImmerable<Anime>;
