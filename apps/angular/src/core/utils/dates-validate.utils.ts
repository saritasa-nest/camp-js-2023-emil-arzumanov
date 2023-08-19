import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** Checks if end date is after start date. */
export function datesValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value >= control.parent?.get('airedStart')?.value) {
			return null;
		}
		return { matching: true };
	};
}
