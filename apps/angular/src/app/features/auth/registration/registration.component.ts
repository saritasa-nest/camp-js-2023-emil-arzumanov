import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { getFieldErrors } from '@js-camp/angular/core/utils/auth-error.utils';
import { matchValidator } from '@js-camp/angular/core/utils/password-validate.utils';
import { ErrorType } from '@js-camp/core/models/error';
import { Observable, catchError, first, throwError } from 'rxjs';

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

	private readonly router = inject(Router);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly registrationForm = this.fb.group(
		{
			email: ['', Validators.required],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', [Validators.required, matchValidator('reTypePassword', true)]],
			reTypePassword: ['', [Validators.required, matchValidator('password')]],
		},
		{ updateOn: 'submit' },
	);

	/**
	 * Error handler for registration requests.
	 * @param error Error.
	 */
	private handleRegistrationError(error: unknown): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			error.error.errors.forEach((errorObject: ErrorType) => {
				const control = this.registrationForm.get(errorObject.attr);
				if (control) {
					control.setErrors({
						...(control.errors ?? {}),
						[errorObject.code]: errorObject.detail,
					});
				} else {
					this.registrationForm.controls.email.setErrors({
						[errorObject.code]: errorObject.detail,
					});
					this.registrationForm.controls.password.setErrors({
						[errorObject.code]: errorObject.detail,
					});
				}
			});
		}
		return throwError(() => error);
	}

	/** Util returns errors array of form field. */
	protected getFieldErrors = getFieldErrors;

	/** Registration form submit. */
	protected onSubmit(): void {
		if (!this.registrationForm.invalid) {
			const body = this.registrationForm.getRawValue();
			this.authService
				.registration(body)
				.pipe(
					first(),
					catchError((error: unknown) => this.handleRegistrationError(error)),
				)
				.subscribe({
					next: () => {
						this.router.navigate(['/home/profile']);
					},
					error(err: unknown) {
						console.error('Error during registration', err);
					},
				});
		}
	}
}
