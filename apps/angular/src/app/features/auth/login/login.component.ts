import { first } from 'rxjs';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { errorCatchUI, getFieldErrors } from '@js-camp/angular/core/utils/auth-error.util';

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
		if (this.loginForm.invalid) {
			return;
		}
		const body = this.loginForm.getRawValue();
		this.authService.login(body)
			.pipe(
				first(),
				errorCatchUI(this.loginForm),
			)
			.subscribe(() => {
				this.router.navigate(['/home/profile']);
			});
	}
}
