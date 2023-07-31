import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/login';
import { map, switchMap } from 'rxjs';

/** Login. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	private readonly authService = inject(AuthService);

	private readonly fb = inject(FormBuilder);

	/** Form group for login. */
	protected readonly loginForm = this.fb.group(
		{
			email: ['', Validators.required],
			password: ['', Validators.required],
		},
		{ updateOn: 'submit' },
	);

	/** Mapped filter valueChanges. */
	protected readonly loginForm$ = this.loginForm.valueChanges.pipe(
		map(
			({ email, password }): Login => ({
				email: email === undefined ? '' : email,
				password: password === undefined ? '' : password,
			}),
		),
		switchMap(body => this.authService.login(body)),
	);
}
