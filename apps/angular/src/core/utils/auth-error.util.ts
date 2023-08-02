import { FormControl } from '@angular/forms';

/**
 * Return errors array of form field.
 * @param formField Form field.
 */
export function getFieldErrors(formField: FormControl<string | null>): string[] {
	let errorsArray: string[] = [];
	if (formField.errors) {
		errorsArray = Object.keys(formField.errors).map(error => formField.getError(error));
	}
	return errorsArray;
}
