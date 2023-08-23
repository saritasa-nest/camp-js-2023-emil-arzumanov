import { first } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { catchErrorOnSubmit, getFieldErrors } from '@js-camp/angular/core/utils/error.util';
import { Login } from '@js-camp/core/models/login';
import { ValidatedFormGroupType } from '@js-camp/angular/core/models/validated-form';

/** Login. */
@Component({
	selector: 'camp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	/** Show password retype or not. */
	protected hidePasswordRetype = true;

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly cdr = inject(ChangeDetectorRef);

	/** Form group for login. */
	protected readonly loginForm: ValidatedFormGroupType<Login> = this.formBuilder.group(
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
				catchErrorOnSubmit(this.loginForm, this.cdr),
			)
			.subscribe(() => {
				this.router.navigate(['/home/profile']);
			});
	}

	/**
	 * Track by error type.
	 * @param index Index.
	 * @param type Error type.
	 */
	protected trackByErrorType(index: number, type: string): string {
		return type;
	}
}
