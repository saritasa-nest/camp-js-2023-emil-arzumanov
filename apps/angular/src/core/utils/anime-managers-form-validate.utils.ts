import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** Checks if end date is after start date. */
export function datesValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value === null) {
			return null;
		}
		if (control.value >= control.parent?.get('airedStart')?.value) {
			return null;
		}
		return { matching: true };
	};
}

/**
 * Checks if length of control value exceeds maximum length.
 * @param maxLength Max length.
 */
export function maxLengthValidator(maxLength: number): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value === null) {
			return null;
		}
		if (control.value.length <= maxLength) {
			return null;
		}
		return { maxLength: true };
	};
}
