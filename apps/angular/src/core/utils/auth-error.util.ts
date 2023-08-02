import { FormControl } from '@angular/forms';

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
