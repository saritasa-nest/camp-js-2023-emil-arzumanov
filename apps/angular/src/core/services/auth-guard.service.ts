import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

/** Authorization guard for profile. */
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	private readonly auth = inject(AuthService);

	private readonly router = inject(Router);

	/** @inheritdoc */
	public canActivate(): boolean {
		if (!this.auth.isLoggedIn()) {
			this.router.navigate(['/home/login']);
			return false;
		}
		return true;
	}
}
