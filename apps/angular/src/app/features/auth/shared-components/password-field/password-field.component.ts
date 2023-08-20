import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CustomFormField } from '@js-camp/angular/shared/components/custom-form-field/custom-form-field.component';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	providers: [{ provide: MatFormFieldControl, useExisting: PasswordFieldComponent }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent extends CustomFormField<string> {
	/** @inheritdoc */
	protected override checkValueIsEmpty(value: string | null): boolean {
		return value === null || value.length === 0;
	}

	/** Show password or not. */
	protected hidePassword = true;

	/**
	 * Track by error type.
	 * @param index Index.
	 * @param type Error type.
	 */
	protected trackByErrorType(index: number, type: string): string {
		return type;
	}
}
