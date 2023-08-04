import { ErrorDto } from '../dtos/error.dto';
import { ErrorType } from '../models/error';

/** Error mapper. */
export interface ErrorMapper<T> {

	/** From Dto to Model. */
	readonly fromDto: (dto: ErrorDto) => ErrorType<T>;
}
