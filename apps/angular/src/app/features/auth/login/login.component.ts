import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Login. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	/** Show password or not. */
	protected hidePassword = true;

	/** Show password retype or not. */
	protected hidePasswordRetype = true;

	private readonly authService = inject(AuthService);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly loginForm = this.fb.group(
		{
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		},
		{ updateOn: 'submit' },
	);

	/** Login form submit. */
	protected onSubmit(): void {
		if (!this.loginForm.invalid) {
			const body = this.loginForm.getRawValue();
			this.authService.login(body).subscribe();
		}
	}
}
