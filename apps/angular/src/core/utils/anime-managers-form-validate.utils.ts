import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Checks if end date is after start date.
 * @param startDateControlName Start date control name.
 * @param endDateControlName End date control name.
 */
export function startEndDatesIntervalValidator(startDateControlName: string, endDateControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		if (formGroup.get(startDateControlName) === null && formGroup.get(endDateControlName) === null) {
			return null;
		}

		const startDate = formGroup.get(startDateControlName)?.value;
		const endDate = formGroup.get(endDateControlName)?.value;

		if (startDate === null || endDate === null) {
			return null;
		}
		if (startDate <= endDate) {
			return null;
		}
		return { matching: true };
	};
}
