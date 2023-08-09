import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.authService.isLoggedIn$.subscribe(isLoggedIn => {
			if (isLoggedIn === false) {
				this.router.navigate(['/anime/table']);
			}
		});
	}
}
