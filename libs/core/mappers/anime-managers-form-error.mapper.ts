import { ErrorDto } from '../dtos/error.dto';
import { AnimeDetailsForm } from '../models/anime-details-form';
import { ErrorType } from '../models/error';
import { transformIfInArray } from '../utils/error-mapper.util';

import { ErrorMapper } from './error.mapper';

export type AnimeDetailsFormAttribute = keyof AnimeDetailsForm;

/** Login Error Mapper class. */
export class AnimeManagersFormErrorMapper implements ErrorMapper<AnimeDetailsFormAttribute> {

	private readonly possibleAttributes = [
		'airedEnd',
		'airedStart',
		'airing',
		'genresData',
		'imageFile',
		'imageUrl',
		'rating',
		'season',
		'source',
		'status',
		'studiosData',
		'synopsis',
		'titleEng',
		'titleJpn',
		'trailerYoutubeId',
		'type',
	];

	/**
	 * Maps AuthErrorDto dto to AuthErrorType model.
	 * @param dto AuthErrorDto dto.
	 */
	public fromDto(dto: ErrorDto): ErrorType<AnimeDetailsFormAttribute> {
		return {
			code: 'appError',
			attribute: transformIfInArray(dto.attr, this.possibleAttributes, 'titleEng'),
			detail: dto.detail,
		};
	}
}

export const animeManagersFormErrorMapper = new AnimeManagersFormErrorMapper();
