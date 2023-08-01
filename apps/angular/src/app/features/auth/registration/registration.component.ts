import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { matchValidator } from '@js-camp/angular/core/utils/password-validator';
import { first } from 'rxjs';

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
			email: ['', [Validators.required, Validators.email]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', [Validators.required, matchValidator('reTypePassword', true)]],
			reTypePassword: ['', [Validators.required, matchValidator('password')]],
		},
		{ updateOn: 'submit' },
	);

	/** Registration form submit. */
	protected onSubmit(): void {
		if (!this.registrationForm.invalid) {
			const body = this.registrationForm.getRawValue();
			this.authService
				.registration(body)
				.pipe(
					first(),
				)
				.subscribe({
					next: () => {
						this.router.navigate(['/home/login']);
					},
					error: (error: unknown) => {
						if (error instanceof HttpErrorResponse) {
							this.registrationForm.controls.email.setErrors({
								appError: 'afafsd',
							});
						}
					},
				});
		}
	}
}
