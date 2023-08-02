import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** Checks if confirm password matches password. */
export function matchValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null =>
		control.parent?.value && control.value === control.parent?.get('password')?.value ?
			null : { matching: true };
}
