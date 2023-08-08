import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getFieldErrors } from '@js-camp/angular/core/utils/error.util';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent {
	/** Show password or not. */
	protected hidePassword = true;

	/** Util returns errors array of form field. */
	protected getFieldErrors = getFieldErrors;

	/** Password form control. */
	@Input() public passwordControl: FormControl;

	public constructor() {
		this.passwordControl = new FormControl();
	}

	/**
	 * Track by error type.
	 * @param index Index.
	 * @param type Error type.
	 */
	protected trackByErrorType(index: number, type: string): string {
		return type;
	}
}
