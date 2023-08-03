import { catchError, first, throwError } from 'rxjs';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { getFieldErrors, setErrorsToFields } from '@js-camp/angular/core/utils/auth-error.util';
import { AuthCustomError } from '@js-camp/core/models/auth-custom-error';

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

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Form group for login. */
	protected readonly loginForm = this.formBuilder.group(
		{
			email: ['', Validators.required],
			password: ['', Validators.required],
		},
		{ updateOn: 'submit' },
	);

	/** Util returns errors array of form field. */
	protected getFieldErrors = getFieldErrors;

	/** Login form submit. */
	protected onSubmit(): void {
		if (this.loginForm.invalid === false) {
			const body = this.loginForm.getRawValue();
			this.authService.login(body)
				.pipe(
					first(),
					catchError((error: unknown) => {
						if (error instanceof AuthCustomError) {
							setErrorsToFields(error.mappedErrorArray, this.loginForm);
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
