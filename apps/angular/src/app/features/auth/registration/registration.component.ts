import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { matchValidator } from '@js-camp/angular/core/utils/password-validator';

/** Registration. */
@Component({
	selector: 'camp-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
	/** Show password or not. */
	protected hidePassword = true;

	/** Show password retype or not. */
	protected hidePasswordRetype = true;

	private readonly authService = inject(AuthService);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly registrationForm = this.fb.group(
		{
			email: ['', [Validators.required,	Validators.email]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: [
				'', [
					Validators.required,
					matchValidator('reTypePassword', true),
				],
			],
			reTypePassword: [
				'', [
					Validators.required,
					matchValidator('password'),
				],
			],
		}, { updateOn: 'submit' },
	);

	/** Registration form submit. */
	protected onSubmit(): void {
		if (!this.registrationForm.invalid) {
			const body = this.registrationForm.getRawValue();
			this.authService.registration(body).subscribe();
		}
	}
}
