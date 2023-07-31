import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { tap } from 'rxjs';

/** Registration. */
@Component({
	selector: 'camp-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
	private readonly authService = inject(AuthService);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly registrationForm = this.fb.group(
		{
			email: ['', [Validators.required, Validators.email]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', Validators.required],
			reTypePassword: ['', Validators.required],
		},
		{ updateOn: 'submit' },
	);

	/** Registration form submit. */
	protected onSubmit(): void {
		if (this.registrationForm.invalid) {
			return;
		}
		const body = this.registrationForm.getRawValue();
		this.authService.registration(body)
			.pipe(
				tap(elem => console.log(elem)),
			)
			.subscribe();
	}
}
