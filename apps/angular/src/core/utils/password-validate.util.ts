import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** Checks if confirm password matches password. */
export function matchValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value === control.parent?.get('password')?.value) {
			return null;
		}
		return { matching: true };
	};
}
