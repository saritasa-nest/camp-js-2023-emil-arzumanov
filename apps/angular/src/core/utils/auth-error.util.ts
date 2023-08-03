import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthErrorDto } from '@js-camp/core/dtos/auth-error.dto';
import { AuthErrorMapper } from '@js-camp/core/mappers/auth-error.mapper';
import { AuthCustomError } from '@js-camp/core/models/auth-custom-error';
import { AuthErrorType } from '@js-camp/core/models/auth-error';
import { OperatorFunction, catchError, throwError } from 'rxjs';

/**
 * Return errors array of form field.
 * @param formField Form field.
 */
export function getFieldErrors(formField: FormControl<string | null>): string[] {
	const errorsArray: string[] = [];
	if (formField.errors) {
		errorsArray.push(...Object.keys(formField.errors).map(error => formField.getError(error)));
	}
	return errorsArray;
}

/** Custom catch error for domain. */
export function errorCatchDomain<T>(): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof HttpErrorResponse) {
			const authErrorArray = error.error.errors.map(
				(errorsElement: AuthErrorDto) => AuthErrorMapper.fromDto(errorsElement),
			);
			return throwError(() => new AuthCustomError(authErrorArray));
		}
		return throwError(() => error);
	});
}

/**
	* Custom catch error for UI.
	* @param formGroup Form group.
	*/
export function errorCatchUI<T>(formGroup: FormGroup): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof AuthCustomError) {
			setErrorsToFields(error.mappedErrorArray, formGroup);
		}
		return throwError(() => error);
	});
}

/**
	* Sets errors to fields of form group.
	* @param errorArray Array of mapped errors.
	* @param formGroup Form group.
	*/
export function setErrorsToFields(errorArray: AuthErrorType[], formGroup: FormGroup): void {
	errorArray.forEach((errorObject: AuthErrorType) => {
		const control = formGroup.get(errorObject.attribute);
		if (control) {
			control.setErrors({
				...(control.errors ?? {}),
				[errorObject.code]: errorObject.detail,
			});
		}
	});
}
