import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

/** Authorization guard for logged user. */
@Injectable({
	providedIn: 'root',
})
export class LoggedAuthGuard implements CanActivate {

	private readonly auth = inject(AuthService);

	private readonly router = inject(Router);

	/** @inheritdoc */
	public canActivate(): boolean {
		if (this.auth.isLoggedIn()) {
			this.router.navigate(['/home/profile']);
			return false;
		}
		return true;
	}
}
