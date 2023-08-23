import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorDto } from '@js-camp/core/dtos/error.dto';
import { CustomError } from '@js-camp/core/models/custom-error';
import { OperatorFunction, catchError, throwError } from 'rxjs';
import { ErrorMapper } from '@js-camp/core/mappers/error.mapper';
import { ErrorType } from '@js-camp/core/models/error';
import { ChangeDetectorRef } from '@angular/core';

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

/**
 * Custom catch error for request.
 * @param errorMapper Mapper for error.
 */
export function catchErrorOnRequest<T, TAttribute, TMapper extends ErrorMapper<TAttribute>>(errorMapper: TMapper): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof HttpErrorResponse) {
			const errorArray = error.error.errors.map(
				(errorsElement: ErrorDto) => errorMapper.fromDto(errorsElement),
			);
			return throwError(() => new CustomError<TAttribute>(errorArray, error.error.type));
		}
		return throwError(() => error);
	});
}

/**
 * Custom catch error for onSubmit.
 * @param formGroup Form group.
 * @param cdr Change detector reference.
 */
export function catchErrorOnSubmit<T, TAttribute extends string>(
	formGroup: FormGroup,
	cdr: ChangeDetectorRef,
): OperatorFunction<T, T> {
	return catchError((error: unknown) => {
		if (error instanceof CustomError) {
			setErrorsToFields<TAttribute>(error.mappedErrorArray, formGroup);
			cdr.markForCheck();
		}
		return throwError(() => error);
	});
}

/**
 * Sets errors to fields of form group.
 * @param errorArray Array of mapped errors.
 * @param formGroup Form group.
 */
export function setErrorsToFields<TAttribute extends string>(errorArray: readonly ErrorType<TAttribute>[], formGroup: FormGroup): void {
	errorArray.forEach((errorObject: ErrorType<TAttribute>) => {
		const control = formGroup.get(errorObject.attribute);
		if (control) {
			control.setErrors({
				[errorObject.code]: errorObject.detail,
			});
		}
	});
}
