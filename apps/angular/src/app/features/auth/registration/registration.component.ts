import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { getFieldErrors, setErrorsToFields } from '@js-camp/angular/core/utils/auth-error.util';
import { matchValidator } from '@js-camp/angular/core/utils/password-validate.util';
import { AuthCustomError } from '@js-camp/core/models/auth-custom-error';
import { catchError, first, throwError } from 'rxjs';

/** Registration. */
@Component({
	selector: 'camp-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
	/** Show password retype or not. */
	protected hidePasswordRetype = true;

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Form group for registration. */
	protected readonly registrationForm = this.formBuilder.group(
		{
			email: ['', Validators.required],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', [Validators.required, matchValidator()]],
		},
		{ updateOn: 'submit' },
	);

	/** Util returns errors array of form field. */
	protected getFieldErrors = getFieldErrors;

	/** Registration form submit. */
	protected onSubmit(): void {
		if (this.registrationForm.invalid === false) {
			const body = this.registrationForm.getRawValue();
			this.authService.register(body)
				.pipe(
					first(),
					catchError((error: unknown) => {
						if (error instanceof AuthCustomError) {
							setErrorsToFields(error.mappedErrorArray, this.registrationForm);
						}
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.router.navigate(['/home/profile']);
				});
		}
	}
}
