import { Observable, catchError, first, throwError } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorType } from '@js-camp/core/models/error';
import { getFieldErrors } from '@js-camp/angular/core/utils/auth-error.util';

/** Login. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	/** Show password retype or not. */
	protected hidePasswordRetype = true;

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly loginForm = this.fb.group(
		{
			email: ['', Validators.required],
			password: ['', Validators.required],
		},
		{ updateOn: 'submit' },
	);

	/**
	 * Error handler for login request.
	 * @param error Error.
	 */
	private handleLoginError(error: unknown): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			error.error.errors.forEach((errorObject: ErrorType) => {
				const control = this.loginForm.get(errorObject.attr);
				if (control) {
					control.setErrors({
						...(control.errors ?? {}),
						[errorObject.code]: errorObject.detail,
					});
				} else {
					this.loginForm.controls.email.setErrors({
						[errorObject.code]: errorObject.detail,
					});
					this.loginForm.controls.password.setErrors({
						[errorObject.code]: errorObject.detail,
					});
				}
			});
		}
		return throwError(() => error);
	}

	/** Util returns errors array of form field. */
	protected getFieldErrors = getFieldErrors;

	/** Login form submit. */
	protected onSubmit(): void {
		if (!this.loginForm.invalid) {
			const body = this.loginForm.getRawValue();
			this.authService.login(body)
				.pipe(
					first(),
					catchError((error: unknown) => this.handleLoginError(error)),
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
