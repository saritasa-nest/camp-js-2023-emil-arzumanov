import { FormControl, FormGroup } from '@angular/forms';
import { AuthErrorType } from '@js-camp/core/models/auth-error';

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
