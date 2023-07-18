import { AiredDateDto } from './airedDate.dto';

export interface AnimeDto {
	readonly id: number;
	readonly created: string;
	readonly modified: string;
	readonly title_eng: string;
	readonly title_jpn: string;
	readonly image: string;
	readonly aired: AiredDateDto;
	readonly type: string;
	readonly status: string;
	readonly score: number | null;
	readonly user_score: number | null;
}
